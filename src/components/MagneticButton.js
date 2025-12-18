import React, { useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const MagneticButton = ({ children, className = "", href = "#", onClick }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.15);
        y.set(middleY * 0.15);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={href}
            onClick={onClick}
            ref={ref}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative z-10 inline-flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer ${className}`}
        >
            {children}
        </motion.a>
    );
};

export default MagneticButton;
