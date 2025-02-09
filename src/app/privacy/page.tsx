"use client";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-2xl text-center border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 text-sm mb-6">Last Updated: [Insert Date]</p>

        <div className="text-left space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
            <p>
              Welcome to SmartHive. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data when using our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Information We Collect</h2>
            <h3 className="text-lg font-medium mt-2">2.1 Personal Information</h3>
            <p>When you interact with SmartHive, we may collect:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Name and contact details (email, phone number)</li>
              <li>Account credentials</li>
              <li>Payment information (processed securely via third-party providers)</li>
            </ul>

            <h3 className="text-lg font-medium mt-4">2.2 Non-Personal Information</h3>
            <p>We also collect non-identifiable data, including:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Browser type and device information</li>
              <li>IP address and location data</li>
              <li>Usage analytics and cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Provide and improve our services</li>
              <li>Personalize user experience</li>
              <li>Enhance security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Data Sharing & Third Parties</h2>
            <p>
              We do not sell your personal data. However, we may share data with:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Service providers (hosting, payments, analytics)</li>
              <li>Law enforcement if required by law</li>
              <li>Business partners (only with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. However, no online service can be completely secure, so we encourage strong passwords and two-factor authentication.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Your Rights</h2>
            <p>You may have the right to:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Access, correct, or delete your data</li>
              <li>Opt out of marketing communications</li>
              <li>Restrict or object to data processing</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at <strong>[Insert Contact Email]</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Cookies & Tracking</h2>
            <p>
              We use cookies for functionality, analytics, and marketing. You can manage cookie preferences in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Contact Us</h2>
            <p>
              If you have any questions, contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> [Insert Contact Email] <br />
              <strong>Address:</strong> [Insert Business Address]
            </p>
          </section>
        </div>

        {/* Back to Home Button */}
        <button
          className="mt-6 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
