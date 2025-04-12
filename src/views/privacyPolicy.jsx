import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 pt-50">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        This Privacy Policy explains how we collect, use, and protect your
        information when you use our Fee Management System. By accessing or
        using the platform, you agree to the terms of this policy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We collect information necessary to manage fee payments and student data.
        This may include:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Parent and student names</li>
        <li>Email addresses and phone numbers</li>
        <li>School details</li>
        <li>Transaction history</li>
        <li>Fee types and payment records</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">We use the information we collect to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Facilitate secure payment processing</li>
        <li>Track and manage student fees</li>
        <li>Communicate with parents or guardians</li>
        <li>Improve our services and platform</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We implement strict security measures to protect your data. Sensitive
        information, such as payment details, is encrypted and transmitted securely.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
      <p className="mb-4">
        We may integrate third-party services like Paystack for payment processing.
        These services have their own privacy policies which we encourage you to review.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Children's Privacy</h2>
      <p className="mb-4">
        Our platform is intended for use by schools and guardians. We do not knowingly collect personal information from children under 13 without parental consent.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Your Rights</h2>
      <p className="mb-4">
        You may request access, correction, or deletion of your personal data by contacting us.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy from time to time. We will notify users of any significant changes via email or platform notifications.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at: <br />
        <strong>Email:</strong> support@yourappdomain.com
      </p>
    </div>
  );
};

export default PrivacyPolicy;
