"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReactLenis } from "lenis/react";

const goalsList = [
  { label: "AI Concepts", icon: "🤖" },
  { label: "Machine Learning", icon: "📊" },
  { label: "NLP", icon: "🗣️" },
  { label: "Image Recognition", icon: "📸" },
  { label: "AI Development", icon: "💻" },
  { label: "App Development", icon: "📱" },
  { label: "Cybersecurity", icon: "🔐" },
  { label: "Blockchain & Web3", icon: "⛓️" },
  { label: "Game Development", icon: "🕹️" },
  { label: "UI/UX Designer", icon: "🎨" },
  { label: "Graphic Designing", icon: "🖼️" },
  { label: "3D Modeling & Animation", icon: "🧊" },
  { label: "Video Editing / VFX", icon: "✂️" },
  { label: "Content Creation", icon: "🎥" },
  { label: "Product Management", icon: "📦" },
  { label: "Government Exams", icon: "🏛️" },
  { label: "Communication & Soft Skills", icon: "🗣️" },
  { label: "DSA + System Design", icon: "🧠" },
];

const skillsList = [
  { label: "Python", icon: "🐍" },
  { label: "JavaScript", icon: "🟨" },
  { label: "Machine Learning", icon: "🧠" },
  { label: "Data Analysis", icon: "📊" },
  { label: "React", icon: "⚛️" },
  { label: "Cybersecurity", icon: "🔐" },
  { label: "Blockchain", icon: "⛓️" },
  { label: "Cloud Computing", icon: "☁️" },
  { label: "Git & GitHub", icon: "🐙" },
  { label: "App Development", icon: "📱" },
  { label: "C++", icon: "💠" },
  { label: "Node.js", icon: "🌿" },
  { label: "SQL & Databases", icon: "🗄️" },
  { label: "UI/UX Design", icon: "🎨" },
  { label: "Prompt Engineering", icon: "📝" },
];

const SelectionComponent = ({
  title,
  items,
  maxSelection,
  localStorageKey,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(localStorageKey));
    if (savedItems) setSelectedItems(savedItems);
  }, [localStorageKey]);

  const handleSelect = (item) => {
    let updatedItems = [...selectedItems];

    if (updatedItems.includes(item)) {
      updatedItems = updatedItems.filter((i) => i !== item);
    } else {
      if (updatedItems.length < maxSelection) {
        updatedItems.push(item);
      }
    }

    setSelectedItems(updatedItems);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
  };

  return (
    <ReactLenis root>
      <div className="w-full max-w-4xl mx-auto bg-purple-300 shadow-lg rounded-lg p-6 mt-20">
        <h2 className="text-xl font-bold text-gray-800 text-center">{title}</h2>
        <p className="text-gray-600 text-center mb-4">
          Select up to {maxSelection}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {items.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => handleSelect(label)}
              className={`flex items-center px-6 py-4 rounded-full text-xl font-semibold transition-all duration-300 cursor-pointer shadow-md gap-2
${
  selectedItems.includes(label)
    ? "bg-purple-500 text-white"
    : "bg-gray-100 border border-purple-400 text-gray-700"
}
`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>
    </ReactLenis>
  );
};

const UserSelections = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [generationError, setGenerationError] = useState(null);

  const handleContinue = async () => {
    const selectedGoals =
      JSON.parse(localStorage.getItem("userInterests")) || [];
    const selectedSkills = JSON.parse(localStorage.getItem("userSkills")) || [];

    console.log("Selected Goals:", selectedGoals);
    console.log("Selected Skills:", selectedSkills);

    setIsLoading(true);
    setGenerationError(null);

    try {
      const userId = "67e6e9a846db7a0f471f9c35";
      const title = "Personalized Learning Roadmap";

      const response = await fetch("http://localhost:5000/api/roadmaps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goals: selectedGoals,
          skills: selectedSkills,
          userId,
          title,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate roadmap");
      }

      const data = await response.json();
      console.log("Roadmap Data:", data);

      localStorage.setItem("generatedRoadmapId", data.roadmap._id);

      router.push(`/roadmap`);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      setGenerationError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ReactLenis root>
      <div className="flex flex-col items-center min-h-screen p-6 space-y-6">
        <SelectionComponent
          title="Select Your Goals"
          items={goalsList}
          maxSelection={6}
          localStorageKey="userInterests"
        />
        <SelectionComponent
          title="Select Your Skills"
          items={skillsList}
          maxSelection={6}
          localStorageKey="userSkills"
        />
        <button
          onClick={handleContinue}
          className={`cursor-pointer mt-10 animate-bounce bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Generating Roadmap..." : "Generate Roadmap"}
        </button>

        {generationError && <p className="text-red-500">{generationError}</p>}
      </div>
    </ReactLenis>
  );
};

export default UserSelections;
