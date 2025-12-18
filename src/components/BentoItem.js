import React from 'react';
import { motion } from 'framer-motion';

const BentoItem = ({ children, className = "", colSpan = "col-span-1", rowSpan = "row-span-1", dark = false }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`relative overflow-hidden rounded-3xl p-8 backdrop-blur-3xl transition-all duration-500 ${dark ? 'bg-black border border-white/10' : 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15]'} ${colSpan} ${rowSpan} ${className}`}
    >
        {children}
    </motion.div>
);

export default BentoItem;
