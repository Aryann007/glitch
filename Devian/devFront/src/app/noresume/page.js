"use client";

import React, { useState, useEffect } from "react";

const RoadmapDisplayPage = () => {
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      setError(null);
      try {
        const roadmapId = localStorage.getItem("generatedRoadmapId");

        if (!roadmapId) {
          setError("Roadmap ID not found.");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/roadmaps/${roadmapId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch roadmap.");
        }
        const data = await response.json();
        setRoadmapData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  if (loading) {
    return <div>Loading roadmap...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!roadmapData) {
    return <div>No roadmap data found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Your Roadmap
        </h2>
        {roadmapData && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {roadmapData.title}
            </h3>
            <p className="text-gray-700">{roadmapData.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapDisplayPage;
