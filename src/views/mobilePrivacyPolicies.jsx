import React from 'react';

const PrivacyPolicyMobile = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 pt-50">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        This Privacy Policy describes how your information is collected, used,
        and shared when you use our mobile app – the Fee Management System. By
        using the app, you agree to the practices described in this policy.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Parent Email addresses and contact Numbers</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Information</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>To manage and track school fee payments</li>
        <li>To communicate important updates</li>
        <li>To provide customer support</li>
        <li>To authenticate users</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
      <p className="mb-4">
        We implement strong security measures to protect your personal
        information. Payment-related data is handled through secure encryption
        and protected connections.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services like Paystack for secure payment
        processing. These providers have their own privacy policies regarding
        data handling.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Children’s Privacy</h2>
      <p className="mb-4">
        Our app is primarily intended for school administrators and parents. We
        do not knowingly collect information from children under 13.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
      <p className="mb-4">
        You have the right to access or request deletion of your data. Please
        contact us if you wish to exercise this right.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Updates to This Policy</h2>
      <p className="mb-4">
        We may update this policy from time to time. You will be notified of
        any major changes via the app or our official communication channels.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
      <p>
        For questions or support, contact us at:{' '}
        <span className="font-semibold">augustinelovestephens@gmail.com</span>
      </p>
    </div>
  );
};

export default PrivacyPolicyMobile;
