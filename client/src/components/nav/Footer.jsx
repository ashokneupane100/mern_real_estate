import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-black text-white flex flex-col items-center px-1">
      <div className="flex flex-col items-center space-y-2 mb-4">
        <h3 className="text-2xl font-bold">
          Phone:{" "}
          <a href="tel:+9779851331644" className="text-white-500 hover:underline">
            +977 9851 331644
          </a>
        </h3>
        <h5 className="text-base" style={{fontSize:"1.3rem"}}>Follow Us :</h5>
        <div className="flex justify-center space-x-10" style={{marginBottom:"-5%"}}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 bg-blue-500 hover:bg-blue-700"
          >
            <FaFacebookF size={30} className="text-white" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 bg-white hover:bg-gray-700"
          >
            <FaSquareXTwitter size={30} className="text-black" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 bg-purple-700 hover:bg-pink-700"
          >
            <FaInstagram size={30} className="text-white" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 bg-white hover:bg-gray-600"
          >
            <FaYoutube size={30} className="text-red-500" />
          </a>
        </div>

       <div style={{ marginBottom: "-5.5%", marginTop: "6%", fontSize: "1.2rem", backgroundColor: "blue", transition: "background-color 0.3s" }}>
  <h1>For Office Location Click below in Google Map:👇</h1>
</div>


      </div>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8912226055613!2d85.28234584627994!3d27.689756703466518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ed93a224d7%3A0x7872a22aac8a5006!2sNepal%20Home%2Land!5e0!3m2!1sen!2sus!4v1716887382506!5m2!1sen!2sus"
        frameBorder="0"
        style={{ border: 0, width: "100%", height: "95px" }}
        allowFullScreen
      ></iframe>
      <h4 className="text-lg text-center">© {new Date().getFullYear()} Realist App</h4>
    </div>
  );
}