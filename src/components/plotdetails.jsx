"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "@/firebase/firebase_config";
import { db } from "@/firebase/firebase_config";

const PropertyDetails = () => {
  const { id } = useParams();
  const [showWaitMessage, setShowWaitMessage] = useState(false); // ✅ State to show/hide text

  const [property, setProperty] = useState(null);
  const [employeeID, setEmployeeID] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("One-Time Payment");
  const [error, setError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    contact: "", 
    plotNo: "",  // ✅ Added Plot Number 
    image: null 
  });
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

  const handleBooking = () => {
    if (!auth.currentUser) { // ✅ Check if user is logged in
      localStorage.setItem("redirectTo", window.location.pathname); // ✅ Save the current page
      router.push("/login"); // ✅ Redirect to login
      return;
    }
    if (!validateEmployeeID(employeeID)) {
      setError("Invalid Employee ID.");
      return;
    }
    setShowQR(true);
    setTimeout(() => {
      setShowVerifyButton(true);
    }, 10000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleVerifyPayment = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.plotNo || !formData.image) {
      setError(" All fields are required, including plot number and image upload.");
      return;
    }
  
    setShowWaitMessage(true); // ✅ Show "Wait 10 seconds..." message
  
    setTimeout(() => {
      setShowWaitMessage(false); // ✅ Hide message after 10 seconds
    }, 10000);
  
    const formDataObj = new FormData();
  formDataObj.append("plotNo", formData.plotNo);
  formDataObj.append("name", formData.name);
  formDataObj.append("contact", formData.contact);
  formDataObj.append("image", formData.image);
  
  try {
    const response = await fetch("/api/verify-payment", {
      method: "POST",
      body: formDataObj,
    });
  
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
      setShowPaymentForm(false);

      console.log("✅ Payment Verified and Booking Successful!");
      router.push(`/property/${id}`);
    } catch (error) {
      console.error("❌ Payment verification error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-20 flex justify-center items-center bg-white">
      <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-lg border">
        <h2 className="text-2xl font-bold text-center mb-4">Plot Details</h2>
        <p className="text-lg"><strong>Plot No:</strong> {property?.plotNo}</p>
        <p className="text-lg"><strong>Size:</strong> {property?.size} SQ.YD</p>
        <p className="text-lg"><strong>Booking Price:</strong> ₹{property?.bookPrice}</p>
        <p className="text-lg"><strong>Total Price:</strong> ₹{parseInt(property?.size) * 16000}</p>

        <p className="text-gray-400 cursor-pointer" onClick={() => router.push("/termAndCondition")}>Terms & Conditions Apply</p>

        {(property?.availability === "booked" || property?.availability === "sold") ? (
          <p className="text-lg mt-4 text-red-500">
            <span className="bg-green-600 p-2 text-white rounded-sm px-7"> Your booking is confirmed.
            </span>
          <br />
          <br />
          <strong> Booked by:</strong> @{property?.bookedBy}@25 | {property?.plan} Plan
        </p>
        
        ) : (
          <>
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

            {showQR && (
              <div className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg text-center">
                <p>🔳 Scan the QR Code for Payment</p>
                <img src="/assets/Qr.jpg" alt="QR Code" className="mx-auto my-4" />
              </div>
            )}

            {!showQR && (
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg w-full" onClick={handleBooking}>
                Book Now
              </button>
            )}

            {showVerifyButton && !showPaymentForm && (
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full mt-4" onClick={() => setShowPaymentForm(true)}>
                Verify Your Payment
              </button>
            )}

            {showPaymentForm && (
              <form onSubmit={handleVerifyPayment} className="mt-4 space-y-4">
              <input 
                type="text" 
                name="plotNo" 
                placeholder="Enter Plot Number" 
                className="w-full p-2 border rounded text-black" 
                value={formData.plotNo} 
                onChange={handleInputChange} 
                required 
              />
            
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                className="w-full p-2 border rounded text-black" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
              />
            
              <input 
                type="text" 
                name="contact" 
                placeholder="Your Contact Number" 
                className="w-full p-2 border rounded text-black" 
                value={formData.contact} 
                onChange={handleInputChange} 
                required 
              />
            <p>Upload Your Payment ScreenShot</p>
              <input 
                type="file" 
                name="image" 
                className="w-full p-2 border rounded text-black" 

                onChange={handleFileChange} 
                required 
              />
            
              <button 
                type="submit" 
                className="px-4 py-2 bg-green-500 text-white rounded-lg w-full hover:bg-green-800"
              >
                Submit Payment
              </button>
            
              {showWaitMessage && <p className="mt-2 text-red-500 font-semibold">Wait 10 seconds...</p>}
            </form>
            
            
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
