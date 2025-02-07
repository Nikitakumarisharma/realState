"use client";
import { useRouter } from "next/navigation";

const PrivacyPolicy = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-lg text-gray-600 mb-4">
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
      </p>

      <div className="max-w-2xl text-gray-700 text-left">
        <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
        <p className="mt-2">
          We collect personal information such as your name, email, and phone number when you use our services.
        </p>

        <h2 className="text-xl font-semibold mt-4">2. How We Use Your Information</h2>
        <p className="mt-2">
          Your data is used to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.
        </p>

        <h2 className="text-xl font-semibold mt-4">3. Data Protection</h2>
        <p className="mt-2">
          We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure.
        </p>

        <h2 className="text-xl font-semibold mt-4">4. Third-Party Services</h2>
        <p className="mt-2">
          We may use third-party services for analytics, advertising, and payment processing, but we ensure they comply with privacy regulations.
        </p>

        <h2 className="text-xl font-semibold mt-4">5. Your Rights</h2>
        <p className="mt-2">
          You have the right to access, modify, or delete your personal information. Contact us if you have any privacy concerns.
        </p>

        <h2 className="text-xl font-semibold mt-4">6. Updates to Privacy Policy</h2>
        <p className="mt-2">
          We may update this Privacy Policy periodically. Changes will be posted on this page.
        </p>
      </div>

      <button
        onClick={() => router.back()}
        className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-lg"
      >
        Go Back
      </button>
    </div>
  );
};

export default PrivacyPolicy;
