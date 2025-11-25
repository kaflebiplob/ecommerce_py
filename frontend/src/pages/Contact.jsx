import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);

      setShowToast(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Navbar />
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-8">
        {showToast && (
          <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg shadow-lg p-4 max-w-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-check text-emerald-600 text-sm"></i>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-emerald-800">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-emerald-600 mt-1">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => setShowToast(false)}
                  className="ml-auto flex-shrink-0 text-emerald-400 hover:text-emerald-600 transition"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
          <h2 className="text-3xl font-bold text-white mb-2">Get In Touch</h2>
          <p className="text-emerald-100">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-user text-gray-400"></i>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="fa-solid fa-circle-exclamation mr-1"></i>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="fa-solid fa-circle-exclamation mr-1"></i>
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subject *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa-solid fa-tag text-gray-400"></i>
              </div>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="What is this regarding?"
              />
            </div>
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <i className="fa-solid fa-circle-exclamation mr-1"></i>
                {errors.subject}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message *
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <i className="fa-solid fa-message text-gray-400"></i>
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <i className="fa-solid fa-circle-exclamation mr-1"></i>
                {errors.message}
              </p>
            )}
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">
                Minimum 10 characters required
              </span>
              <span
                className={`text-xs ${
                  formData.message.length < 10
                    ? "text-gray-500"
                    : "text-emerald-600"
                }`}
              >
                {formData.message.length}/10
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Sending Message...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <i className="fa-solid fa-paper-plane mr-2"></i>
                Send Message
              </span>
            )}
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Alternatively, you can reach us at{" "}
              <a
                href="mailto:biplobkafle21@gmail.com"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                biplobkafle21@gmail.com
              </a>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactForm;
