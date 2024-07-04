import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const handleJoinGroup = () => {
        window.open('https://api.whatsapp.com/send?phone=62895383107479&text=kerenn%20bang%20%F0%9F%91%8D%F0%9F%98%81.%0A%3E%20Saran%20atau%20Masukkan%3A%0A%3E%20Bug%3A', '_blank');
    };
    return (
        <motion.div
        initial={{ opacity: 0, scale: 0.0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "circIn" }}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center transform transition duration-500">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
          className="text-3xl font-bold text-blue-900 mb-4"
        >
          Selamat Datang di Syntax Community
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeInOut" }}
          className="text-gray-700 mb-6"
        >
          Terimakasih telah bergabung menjadi bagian dari kami.
        </motion.p>
        <motion.button
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 1.10, ease: "easeInOut" }}
          onClick={handleJoinGroup}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
        >
          Join Grup WhatsApp
        </motion.button>
      </motion.div>
    );
};

export default Dashboard;