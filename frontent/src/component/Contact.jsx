import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import API from "../api";

const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789abcdefghijklmnopqrstuvwxyz";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return captcha;
};

const Contact = ({ title = "Contact Us", style = "my-52" }) => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsSubmit(true);
    e.preventDefault();
    if (captchaInput !== captcha) {
      alert("❌ Invalid CAPTCHA. Please try again!");
      setCaptcha(generateCaptcha());
      return;
    }

    try {
      const res = await API.post("/contact", formData);
      alert("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", phone: "", message: "" });
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
    } catch (error) {
      alert("❌ Failed to send message!");
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div
      className={`flex justify-center items-center   ${style} h-[300px] bg-gray-50 px-4`}
    >
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border  border-neutral-500/50 rounded px-3 py-3 focus:ring focus:ring-blue-300 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-neutral-500/50 rounded px-3 py-3 focus:ring focus:ring-blue-300 outline-none"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-neutral-500/50 md:col-span-2 rounded px-3 py-3 focus:ring focus:ring-blue-300 outline-none"
              required
            />
            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone No"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-neutral-500/50 md:col-span-2 rounded px-3 py-3 focus:ring focus:ring-blue-300 outline-none"
            />
            {/* Message */}
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-neutral-500/50 md:col-span-2 rounded px-3 py-3 focus:ring focus:ring-blue-300 outline-none"
              required
            ></textarea>
            {/* CAPTCHA */}

            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 px-6 py-3 rounded font-bold text-2xl tracking-widest select-none">
                {captcha}
              </div>
              <button
                type="button"
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setCaptcha(generateCaptcha())}
              >
                <FiRefreshCw className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Type CAPTCHA Here"
              className="w-full border border-neutral-500/50 rounded px-3 py-3 focus:ring focus:ring-blue-300 outline-none"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              required
            />

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmit}
                className={`bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition ${
                  isSubmit ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
