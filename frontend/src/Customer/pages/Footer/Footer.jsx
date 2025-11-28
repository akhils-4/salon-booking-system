import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facbook.com" },
    { icon: <FaInstagram />, href: "https://insagram.com" },
    { icon: <FaTwitter />, href: "https://twiter.com" },
    { icon: <FaLinkedinIn />, href: "https://lnkedin.com" },
  ];

  return (
    <motion.footer
      className="bg-gray-900 text-gray-200"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-24 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold hover:scale-105 transition-transform duration-300">
              Your Salon Name
            </h3>
            <p className="text-sm text-gray-300">
              Beauty and wellness, thoughtfully delivered.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Home",
                "Services",
                "Book Appointment",
                "About Us",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white hover:underline hover:translate-x-1 transition-all duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-white hover:scale-105 transition-transform duration-300"
                >
                  +1 234 567 890
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@salon.com"
                  className="text-gray-300 hover:text-white hover:scale-105 transition-transform duration-300"
                >
                  support@salon.com
                </a>
              </li>
              <li className="text-gray-300">123 Salon Street, City, Country</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm text-gray-400">
          © {year} Your Salon Name. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
