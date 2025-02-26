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
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
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

  const validateEmployeeID = (id) => {
    const validPattern = /^eppl000[1-9]$|^eppl0010$/;
    return validPattern.test(id);
  };

  const handleBooking = async () => {
    console.log("🟢 handleBooking started");

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
    setShowQR(true);

    setTimeout(() => {
      setShowPaymentConfirmation(true);
    }, 20000);
  };

  const handlePaymentConfirmation = async (status) => {
    if (status === "done") {
      try {
        console.log("⏳ Updating Firestore for booking...");
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

        setBookingSuccess(true);
        setShowQR(false);
        setShowPaymentConfirmation(false);
        console.log("✅ Booking Successful!");
      } catch (error) {
        console.error("❌ Booking error:", error);
        setError("Something went wrong. Please try again.");
      }
    } else {
      router.push("/");
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
          <p className="text-lg"><strong>Total Price:</strong> ₹{parseInt(property.size) * 16000}</p>

          <p className="text-gray-400 cursor-pointer" onClick={() => router.push("/termAndCondition")}>Terms & Conditions Apply</p>

          {showQR && (
            <div className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg text-center">
              <p>🔳 Scan the QR Code for Payment</p>
              <img src="/assets/Qr.jpg" alt="QR Code" className="mx-auto my-4" />
            </div>
          )}

          {showPaymentConfirmation && (
            <div className="mt-4 text-center">
              <p className="text-lg">Was the payment successful?</p>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg mx-2" onClick={() => handlePaymentConfirmation("done")}>Yes</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg mx-2" onClick={() => handlePaymentConfirmation("no")}>No</button>
            </div>
          )}

          {(property.availability === "booked" || property.availability === "sold") ? (
            <p className="text-lg mt-4 text-red-500">
              <strong>Booked by:</strong> @{property.bookedBy}@25 | {property.plan} Plan
            </p>
          ) : (
            !bookingSuccess && !showQR && (
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

                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg w-full" onClick={handleBooking}>
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
