"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "@/firebase/firebase_config";
import { db } from "@/firebase/firebase_config";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [employeeID, setEmployeeID] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("One-Time Payment");
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        const docRef = doc(db, "Property", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      }
    };
    fetchProperty();
  }, [id]);

  const loadCashfreeScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const validateEmployeeID = (id) => {
    const validPattern = /^eppl000[1-9]$|^eppl0010$/;
    return validPattern.test(id);
  };

  const handlePayment = async () => {
    console.log("🟢 handlePayment started");

    if (!employeeID) {
        console.error("❌ Error: Employee ID is missing");
        setError("Please enter the Employee ID.");
        return;
    }

    const user = auth.currentUser;
    if (!user) {
        console.warn("⚠️ User not logged in. Redirecting to login.");
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        router.push("/login");
        return;
    }

    if (!validateEmployeeID(employeeID)) {
        console.error("❌ Invalid Employee ID format");
        setError("Invalid Employee ID.");
        return;
    }

    setError("");

    // 🛑 Ensure the Cashfree script is fully loaded
    const scriptLoaded = await loadCashfreeScript();
    if (!scriptLoaded) {
        console.error("❌ Cashfree SDK failed to load");
        alert("Cashfree SDK failed to load. Check your internet connection.");
        return;
    }

    // Set the total amount to ₹1 for testing
    const totalAmount = "1.00"; // Fixed ₹1 amount
    console.log("✅ Total Amount:", totalAmount);

    try {
        console.log("⏳ Sending request to /api/cashfree-order...");
        const response = await fetch("/api/cashfree-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                orderAmount: totalAmount,
                customerName: employeeID,
                customerEmail: `${employeeID}@example.com`,
                customerPhone: "9999999999",
            }),
        });

        if (!response.ok) {
            console.error("❌ Order creation failed:", await response.text());
            setError("Failed to create order. Try again later.");
            return;
        }

        const result = await response.json();
        console.log("✅ API Response:", result);

        if (result.status === "OK") {
            if (!window.Cashfree) {
                console.error("❌ Cashfree SDK is not loaded");
                setError("Payment system error. Please refresh and try again.");
                return;
            }

            // ✅ Correctly Open the Payment Gateway
            const cashfree = new window.Cashfree();
            cashfree
                .checkout({
                    paymentSessionId: result.paymentSessionId,
                    mode: process.env.NEXT_PUBLIC_CASHFREE_MODE // Ensure this is "production"
                })
                .then(async (paymentData) => {
                    console.log("✅ Payment Data:", paymentData);

                    // ✅ If Payment is Successful, Update Firebase & Redirect
                    if (paymentData.txStatus === "SUCCESS") {
                        console.log("🎉 Payment Successful!");

                        // ✅ Update Firebase Document (Availability -> "Booked")
                        try {
                            const docRef = doc(db, "Property", id);
                            await updateDoc(docRef, {
                                availability: "booked",
                                bookedBy: employeeID,
                                plan: paymentPlan,
                            });

                            console.log("✅ Firebase Updated: Plot is now booked.");

                            // ✅ Redirect to Home Page After 3 Seconds
                            setTimeout(() => {
                                router.push("/");
                            }, 3000);

                            // ✅ Update Local State to Reflect Booking
                            setProperty((prev) => ({
                                ...prev,
                                availability: "booked",
                                bookedBy: employeeID,
                                plan: paymentPlan,
                            }));
                        } catch (firebaseError) {
                            console.error("❌ Error Updating Firebase:", firebaseError);
                            setError("Payment successful, but failed to update booking.");
                        }

                        setPaymentSuccess(true);
                    } else {
                        console.warn("⚠️ Payment failed:", paymentData);
                        setError("Payment failed. Please try again.");
                    }
                })
                .catch((error) => {
                    console.error("❌ Payment process error:", error);
                    setError("Payment process encountered an error.");
                });
        } else {
            console.warn("⚠️ Order creation failed:", result);
            setError("Failed to create order. Try again later.");
        }
    } catch (error) {
        console.error("❌ Payment error:", error);
        setError("Something went wrong. Please try again.");
    }
};


  

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-20 flex justify-center items-center bg-white">
      <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-lg border">
        <h2 className="text-2xl font-bold text-center mb-4">Plot Details</h2>

        <div>
          <p className="text-lg"><strong>Plot No:</strong> {property.plotNo}</p>
          <p className="text-lg"><strong>Size:</strong> {property.size} SQ.YD</p>
          <p className="text-lg"><strong>Booking Price:</strong> ₹{property.bookPrice}</p>
          <p className="text-lg"><strong>Transaction + GST Charges:</strong> ₹495.60</p>
          <p className="text-lg"><strong>Total Price:</strong> ₹{parseInt(property.size) * 16000}</p>

          <p className="text-gray-400 cursor-pointer" onClick={() => router.push("/termAndCondition")}>
            Terms & Conditions Apply
          </p>

          {paymentSuccess && (
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-center">
              ✅ Payment Successful! Your booking is confirmed.
            </div>
          )}

          {(property.availability === "booked" || property.availability === "sold") ? (
            <p className="text-lg mt-4 text-red-500">
              <strong>Booked by:</strong> {property.bookedBy} | {property.plan} Plan
            </p>
          ) : (
            !paymentSuccess && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Enter Employee ID"
                  className="w-full px-4 py-2 border rounded-lg mb-2 text-black"
                  value={employeeID}
                  onChange={(e) => setEmployeeID(e.target.value)}
                />
                <select
                  className="w-full px-4 py-2 border rounded-lg mb-2 text-black"
                  value={paymentPlan}
                  onChange={(e) => setPaymentPlan(e.target.value)}
                >
                  <option value="One-Time Payment">One-Time Payment</option>
                  <option value="3 months">3 Months Payment Plan</option>
                  <option value="6 months">6 Months Payment Plan</option>
                  <option value="1 year">1 Year Payment Plan</option>
                </select>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg w-full" onClick={handlePayment}>
                  Book Now
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
