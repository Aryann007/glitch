import React from "react";

const GlowingEffect = ({
  children,
  glowColor = "purple-500",
  intensity = 5,
  borderRadius = "rounded-xl",
}) => {
  const glowShadow = `0 0 ${
    intensity * 2
  }px ${intensity}px rgba(0, 0, 0, 0.1), 0 0 ${intensity * 4}px ${
    intensity * 2
  }px theme(colors.${glowColor}.500)`;

  return (
    <div
      className={`relative ${borderRadius}`}
      style={{
        boxShadow: glowShadow,
      }}
    >
      {children}
    </div>
  );
};

export default GlowingEffect;

// No changes needed in this file based on the last error.
// It exports 'GlowingEffect' as the default export.
