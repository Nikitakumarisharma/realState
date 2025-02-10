"use client";
import { useRouter } from "next/navigation";

const TermsAndConditions = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <ul className="text-lg text-gray-600 mb-6 list-disc list-inside">
        <li>There will be no refund of Booking Amount once booked.</li>
        <li>The buyer must complete all pending payments within the agreed timeline.</li>
        <li>Ownership transfer will only be processed after full payment is received.</li>
        <li>In case of any disputes, the decision of the management will be final.</li>
        <li>Any modifications or requests for changes must be submitted in writing.</li>
        <li>Failure to make timely payments may result in cancellation of the booking.</li>
        <li>Taxes and additional charges, if applicable, must be borne by the buyer.</li>
        <li>The property developer reserves the right to make amendments to policies without prior notice.</li>
      </ul>
      
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
