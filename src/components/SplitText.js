import React from 'react';
import { motion } from 'framer-motion';

const SplitText = ({ children, className = "", delay = 0 }) => {
    const text = typeof children === 'string' ? children : '';
    const chars = text.split('');

    return (
        <span className={`inline-block ${className}`} aria-label={text}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: delay + i * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                    aria-hidden="true"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
};

export default SplitText;
