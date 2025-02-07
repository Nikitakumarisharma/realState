"use client";
import { useRouter } from "next/navigation";

const TermsAndConditions = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="text-lg text-gray-600 mb-6">There will be no refund of Booking Amount once booked.</p>
      
      <button
        onClick={() => router.back()} 
        className="px-6 py-2 bg-purple-500 text-white rounded-lg"
      >
        Go Back
      </button>
    </div>
  );
};

export default TermsAndConditions;
