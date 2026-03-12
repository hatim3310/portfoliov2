import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticButton = ({ children, className = "", href = "#", onClick }) => {
    const ref = useRef(null);
    const xRaw = useMotionValue(0);
    const yRaw = useMotionValue(0);
    const x = useSpring(xRaw, { stiffness: 200, damping: 15 });
    const y = useSpring(yRaw, { stiffness: 200, damping: 15 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        xRaw.set((clientX - (left + width / 2)) * 0.12);
        yRaw.set((clientY - (top + height / 2)) * 0.12);
    };

    const reset = () => { xRaw.set(0); yRaw.set(0); };

    return (
        <motion.a
            href={href}
            onClick={onClick}
            ref={ref}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            whileTap={{ scale: 0.97 }}
            className={`relative z-10 inline-flex items-center justify-center cursor-pointer ${className}`}
        >
            {children}
        </motion.a>
    );
};

export default MagneticButton;
