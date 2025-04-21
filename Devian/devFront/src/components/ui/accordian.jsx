"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
    {
        question: "What is Devians?",
        answer: "DEVIANS is a personalized roadmap generator designed to help students and learners navigate their career paths with clarity and confidence. Whether you're exploring new domains, switching fields, or just starting out, DEVIANS guides you with customized learning paths tailored to your interests, goals, and skill level — all in just a few clicks.",
    },
    {
        question: "How does Devians help in career guidance?",
        answer: "DEVIANS provides personalized learning roadmaps based on your interests and goals, helping you choose the right career path with clear steps and trusted resources — all in minutes.",
    },
    {
        question: "Can Devians help with resume building?",
        answer: "Yes! Devians offers AI-powered resume building tools to enhance your job applications.",
    },
    {
        question: "Where can I download the app?",
        answer: "​Currently, the DEVIANS app isn't available for download on app stores. However, you can access its features through the official website. For the most accurate and up-to-date information, please visit the Devains website or contact our support team.",
    },
];

export default function Accordion() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-5xl mx-auto p-7 space-y-1">

            {faqs.map((faq, index) => (
                <div key={index} className="mb-4 rounded-b-lg shadow-lg ">
                    <button
                        className="w-full flex justify-between items-center p-7 bg-purple-500 text-pink-100 text-2xl text-center font-bold rounded-t-lg focus:outline-none"
                        onClick={() => toggleAccordion(index)}
                    >
                        {faq.question}
                        <span>{openIndex === index ? "−" : "+"}</span>
                    </button>
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={openIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-purple-500 text-pink-100 px-4 text-xl rounded-b-lg"
                    >
                        <p className="py-4">{faq.answer}</p>
                    </motion.div>
                </div >
            ))
            }
        </div >
    );
}
