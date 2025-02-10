"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase_config";

const EMIDetails = () => {
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlotDetails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Property"));
        if (!querySnapshot.empty) {
          const firstDoc = querySnapshot.docs[0]; // Fetch first available plot
          setPlot(firstDoc.data());
        } else {
          setError("No plots available.");
        }
      } catch (err) {
        console.error("Error fetching plot:", err);
        setError("Failed to fetch plot details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlotDetails();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading plot details...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-500">{error}</div>;
  }

  const costPerSqYard = {
    "3-month": 16250,
    "6-month": 16500,
    "1-year": 17000,
  };

  const calculateMonthlyPayment = (duration, cost) => {
    const size = parseInt(plot.size.split(" ")[0]); // Extract numeric value from "100 sq. yard"
    return ((size / duration) * cost).toFixed(2);
  };



  return (
    <div className="flex flex-col items-center justify-center bg-white lg:p-20 px-10">
      <p className="mb-9 font-bold lg:text-3xl"> Check Out Our Plans.</p>

      {/* EMI Plan Cards */}
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 w-full max-w-5xl md:px-44 lg:px-0">
        {/* 3 Month Plan */}
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-xs text-center">
  <h3 className="text-lg font-bold text-purple-300">3 Month Plan</h3>
  <p className="text-4xl font-extrabold text-white mt-2">₹{costPerSqYard["3-month"]}</p>
  <p className="text-gray-400 mt-2">Cost per Sq Yard</p>
  <p className="text-md text-gray-300 mt-4">
    Secure your plot with our premium 3-month installment plan.
  </p>

  <ul className="mt-4 space-y-2 text-gray-300 text-start">
    <li className="flex text-start">
      ✅ Affordable EMI
    </li>
    <li className="flex text-start">
      ✅ Flexible Payments
    </li>
    <li className="flex text-start">
      ✅ Secure Transactions
    </li>
  </ul>

  <a 
    href="mailto:niku2003kumari@gmail.com" 
    className="mt-6 inline-block bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition"
  >
    Contact Us
  </a>
</div>


        {/* 6 Month Plan */}
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-xs text-center">
  <h3 className="text-lg font-bold text-purple-300">6 Month Plan</h3>
  <p className="text-4xl font-extrabold text-white mt-2">₹{costPerSqYard["6-month"]}</p>
  <p className="text-gray-400 mt-2">Cost per Sq Yard</p>
  <p className="text-md text-gray-300 mt-4">
    Secure your plot with our premium 6-month installment plan.
  </p>

  <ul className="mt-4 space-y-2 text-gray-300 text-start">
    <li className="flex text-start">
      ✅ Affordable EMI
    </li>
    <li className="flex text-start">
      ✅ Flexible Payments
    </li>
    <li className="flex text-start">
      ✅ Secure Transactions
    </li>
  </ul>

  <a 
    href="mailto:niku2003kumari@gmail.com" 
    className="mt-6 inline-block bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition"
  >
    Contact Us
  </a>
</div>


        {/* 1 Year Plan */}
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-xs text-center">
  <h3 className="text-lg font-bold text-purple-300">1 Year Plan</h3>
  <p className="text-4xl font-extrabold text-white mt-2">₹{costPerSqYard["1-year"]}</p>
  <p className="text-gray-400 mt-2">Cost per Sq Yard</p>
  <p className="text-md text-gray-300 mt-4">
    Secure your plot with our premium 1-year installment plan.
  </p>

  <ul className="mt-4 space-y-2 text-gray-300 text-start">
    <li className="flex text-start">
      ✅ Affordable EMI
    </li>
    <li className="flex text-start">
      ✅ Flexible Payments
    </li>
    <li className="flex text-start">
      ✅ Secure Transactions
    </li>
  </ul>

  <a 
    href="mailto:niku2003kumari@gmail.com" 
    className="mt-6 inline-block bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition"
  >
    Contact Us
  </a>
</div>


      </div>

      {/* Contact Us Button */}

    </div>
  );
};

export default EMIDetails;
