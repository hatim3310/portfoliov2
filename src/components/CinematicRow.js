import React from 'react';
import { ArrowUpRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const CinematicRow = ({ title, subtitle, detail, index, isCert = false, setHoveredRow, hoveredRow, link }) => {
    const isOtherHovered = hoveredRow !== null && hoveredRow !== index;

    const content = (
        <motion.div
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
            className="group relative py-7 md:py-9 border-b border-white/[0.06] transition-all duration-500"
            animate={{ opacity: isOtherHovered ? 0.25 : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
                {/* Left: Index + Title */}
                <div className="flex items-center gap-6 md:gap-8 flex-1">
                    <span className="font-mono text-zinc-700 text-[11px] tracking-widest tabular-nums w-6">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-heading font-medium text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] tracking-tight text-zinc-400 transition-all duration-500 group-hover:text-white group-hover:translate-x-1.5">
                        {title}
                    </h3>
                </div>

                {/* Right: Subtitle + Tags + Arrow */}
                <div className="flex items-center gap-4 md:gap-5 pl-12 md:pl-0">
                    <span className="text-[13px] font-body text-zinc-600 md:min-w-[120px] md:text-right transition-colors group-hover:text-zinc-400">
                        {subtitle}
                    </span>

                    <div className="hidden md:flex gap-1.5">
                        {detail && detail.split(',').map((tag, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium text-zinc-500 bg-white/[0.03] border border-white/[0.06] transition-all duration-300 group-hover:text-accent group-hover:border-accent/20 group-hover:bg-accent-soft"
                            >
                                {tag.trim()}
                            </span>
                        ))}
                    </div>

                    {link && (
                        <div className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center transition-all duration-400 group-hover:border-accent/30 group-hover:bg-accent group-hover:text-white flex-shrink-0">
                            <ArrowUpRight size={14} className="text-zinc-700 group-hover:text-white transition-colors" />
                        </div>
                    )}

                    {isCert && !link && (
                        <div className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                            <Shield size={13} className="text-zinc-700" />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-xl cursor-pointer">
            {content}
        </a>
    ) : (
        <div className="cursor-default">{content}</div>
    );
};

export default CinematicRow;
