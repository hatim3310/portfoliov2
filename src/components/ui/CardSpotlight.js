import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

export const CardSpotlight = ({
  children,
  radius = 350,
  color = 'rgba(255, 255, 255, 0.12)',
  className = '',
  ...props
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group/spotlight relative overflow-hidden rounded-3xl bg-[#121316]/90 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-white/30 shadow-2xl ${className}`}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Motion Radial Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
};

export default CardSpotlight;
