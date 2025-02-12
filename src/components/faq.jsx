"use client"
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    question: "What types of plots does Expressway Builders offer?",
    answer:
      "Expressway Builders offers residential, commercial, and industrial plots in prime locations across various cities.",
  },
  {
    question: "How can I purchase a plot?",
    answer:
      "You can visit our website, explore available plots, and contact our sales team for booking and further assistance.",
  },
  {
    question: "Are the plots legally verified?",
    answer:
      "Yes, all our plots are legally verified with proper documentation and government approvals.",
  },
  {
    question: "Do you offer installment payment options?",
    answer:
      "Yes, we provide flexible installment plans to make purchasing easier for our customers.",
  },
  {
    question: "Can I visit the site before purchasing?",
    answer:
      "Absolutely! We encourage site visits, and our representatives will assist you in exploring the location and amenities.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blu">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-lg font-medium text-gray-800"
            >
              {faq.question}
              {openIndex === index ? (
                <FiChevronUp className="text-xl" />
              ) : (
                <FiChevronDown className="text-xl" />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
