import React from 'react';
import { motion } from 'framer-motion';

const AuroraBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030303]">
            {/* Orbes lumineux animés */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-blue-900/20 blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    x: [0, 100, 0],
                    opacity: [0.05, 0.1, 0.05]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-[20%] right-[0%] h-[600px] w-[600px] rounded-full bg-purple-900/10 blur-[120px]"
            />

            {/* Grain Texture (Film effect) */}
            <div className="absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>

            {/* Grid technique ultra-fine */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
    );
};

export default AuroraBackground;
