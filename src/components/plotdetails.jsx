"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "@/firebase/firebase_config"; // Import Firebase auth
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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
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
    if (!employeeID) {
      setError("Please enter the Employee ID.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push("/login");
      return;
    }

    if (!validateEmployeeID(employeeID)) {
      setError("Invalid Employee ID.");
      return;
    }
    setError("");

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_sD6C6D9RNmcc22",
      amount: (property.bookPrice * 100) + 49560,
      currency: "INR",
      name: "Property Booking",
      description: `Booking for Plot No: ${property.plotNo}`,
      handler: async (response) => {
        setPaymentSuccess(true);

        const docRef = doc(db, "Property", id);
        await updateDoc(docRef, {
          availability: "booked",
          bookedBy: employeeID,
          plan: paymentPlan,
        });

        setProperty((prev) => ({
          ...prev,
          availability: "booked",
          bookedBy: employeeID,
          plan: paymentPlan,
        }));
      },
      prefill: {
        name: employeeID,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
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

          <p className=" text-gray-400 cursor-pointer" onClick={() => router.push("/termAndCondition")}>
            Terms & Conditions Apply
          </p>

          {paymentSuccess && (
            <div className=" bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-center">
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
