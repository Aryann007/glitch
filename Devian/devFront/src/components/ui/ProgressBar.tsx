// import React, { useState } from "react";

// const ProgressBar = () => {
//   const [progress, setProgress] = useState(40); // Set the initial progress (in percentage)
  
//   // Example list of checkpoints
//   const checkpoints = [
//     { name: "Step 1: Introduction", completed: progress >= 10 },
//     { name: "Step 2: Skill Assessment", completed: progress >= 30 },
//     { name: "Step 3: Roadmap Creation", completed: progress >= 50 },
//     { name: "Step 4: Learning Resources", completed: progress >= 70 },
//     { name: "Step 5: Final Review", completed: progress >= 100 },
//   ];

//   return (
//     <div className="progress-container mt-8">
//       <h2 className="text-xl font-semibold mb-4">Your Learning Roadmap Progress</h2>
//       <div className="relative w-full h-4 bg-gray-300 rounded-full">
//         <div
//           className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-300"
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div>
//       <div className="flex justify-between mt-2">
//         {checkpoints.map((checkpoint, index) => (
//           <div
//             key={index}
//             className={`checkpoint ${
//               checkpoint.completed ? "bg-purple-300" : "bg-gray-500"
//             } rounded-full w-6 h-6 flex items-center justify-center`}
//           >
//             <span className="text-xs text-white">{index + 1}</span>
//           </div>
//         ))}
//       </div>
//       <p className="mt-4 text-center text-gray-600">
//         {progress}% of your roadmap is complete! Keep going!
//       </p>
//     </div>
//   );
// };

// export default ProgressBar;

import React, { useState, useEffect } from 'react';
import { FaRocket } from 'react-icons/fa'; // Importing rocket icon

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100)); // Increment progress
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-12 bg-gray-300 rounded-full shadow-lg">
      {/* Progress bar background */}
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-orange-600 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>

      {/* Rocket icon */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2"
        style={{
          left: `calc(${progress}% - 20px)`, // Adjust rocket's position based on progress
          transition: 'left 0.2s ease-out',
        }}
      >
        <FaRocket size={35} className="text-white drop-shadow-xl" />
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"
          style={{
            animation: progress === 100 ? 'none' : 'rocketTrail 0.4s ease-out infinite',
          }}
        ></div>
      </div>

      {/* Progress bar label */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 left-1/2 transform -translate-x-1/2 text-white font-semibold"
        style={{
          fontSize: '1rem',
          zIndex: 1,
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;

