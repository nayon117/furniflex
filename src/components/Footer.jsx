import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0E0E0E] ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
          <Link className="flex items-center gap-1" to="/">
          <p className="text-2xl text-white font-semibold flex items-center ">
            <img
              src="/F.png"
              alt="logo"
              className="bg-[#1E99F5] w-6 h-6 p-1 rounded-full mr-1"
            />
            Furni<span className="text-[#1E99F5]">Flex</span>
          </p>
        </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                About US
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-1">
                <li >
                  MasterClass
                </li>
                <li >
                  Jobs
                </li>
                <li>
                  Invest
                </li>
                <li>
                  Pressroom
                </li>
                <li>
                  Blog
                </li>
                <li>
                 Contact
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Explore EEVE
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-1">
                <li >
                Unlock my Robot Power
                </li>
                <li >
                Starlight
                </li>
                <li>
                Robot Platform
                </li>
                <li >
                EEVE Roadmap
                </li>
               
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Community & Support
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-1">
                <li >
                Willow X Community
                </li>
                <li>
                Developer & Maker Access
                </li>
                <li>
                Special Cases
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-3">
            <FaFacebook size={20} className="text-[#81859F]" />
            <FaInstagram size={20} className="text-[#81859F]" />
            <FaTwitter size={20} className="text-[#81859F]" />
            <FaLinkedin size={20} className="text-[#81859F]" />
          </div>
          <div className="flex items-center gap-4 text-[#81859F]">
            <p>Contact</p>
            <p>General Terms</p>
            <p>Privacy Policy</p>
            <p>Contact</p>
          </div>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
             <p className="text-[#81859F]">United States (English)</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
