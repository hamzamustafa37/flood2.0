import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export const Footer = () => {
  return (
    // <footer className="bg-[#0f111b] text-sm text-gray-400">
    <footer className="bg-blueThemeColor text-sm text-gray-400">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-4 lg:space-y-0">
          <ul className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 text-gray-300">
            {[
              "Join Us",
              "Investors",
              "Franchise with Us",
              "Water Damage Repair",
              "Basement Flooding",
              "Sewage Backup",
              "About Us",
              "Contact Us",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center">
                <Link href="#" className="hover:text-white">
                  {item}
                </Link>
                {idx < 7 && <span className="mx-2 text-gray-500">|</span>}
              </li>
            ))}
          </ul>

          <div className="flex space-x-4 text-gray-300">
            <Link href="#" className="hover:text-white">
              <FaFacebookF />
            </Link>
            <Link href="#" className="hover:text-white">
              <FaTwitter />
            </Link>
            <Link href="#" className="hover:text-white">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        <hr className="my-4 border-gray-700" />

        <div className="flex flex-col lg:flex-row justify-between items-center text-xs text-gray-500 space-y-2 lg:space-y-0">
          <p>© 2025 The Flood Team. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
