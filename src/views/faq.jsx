// File: components/Faq.tsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is the School Management System?",
    answer: "It's a digital platform that allows schools to manage students, fees, and other academic records efficiently.",
  },
  {
    question: "How do parents access their child’s fee details?",
    answer: "Parents can search for their child’s school in the app and verify their identity using a registered phone number.",
  },
  {
    question: "Can a school set custom fees for different classes?",
    answer: "Yes, schools can define fee types per class. Once set, these fees are automatically assigned to students in that class.",
  },
  {
    question: "Is payment through the app secure?",
    answer: "Absolutely. The platform integrates with Paystack for secure and reliable transactions.",
  },
  {
    question: "Can a school have multiple classes and students?",
    answer: "Yes, each school can manage multiple classes, with as many students as needed.",
  },
  {
    question: "How do we promote students to the next class?",
    answer: "Use the 'Promote Students' feature to select a class and batch-promote all students, with an option to exclude some.",
  },
  {
    question: "How does a school register on the platform?",
    answer: "Schools can sign up via the web dashboard by filling in their name, address, phone number, website, and a secure password.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-50">
      <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-2xl shadow-sm bg-white"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-slate-700 font-medium hover:bg-slate-50 rounded-2xl transition"
              onClick={() => toggle(index)}
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-slate-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
