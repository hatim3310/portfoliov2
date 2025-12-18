import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

const CinematicRow = ({ title, subtitle, detail, index, isCert = false, setHoveredRow, hoveredRow, link }) => {
    const isDimmed = hoveredRow !== null && hoveredRow !== index;

    const content = (
        <div
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
            className={`group relative py-12 md:py-16 border-t border-white/10 transition-all duration-700 ${isDimmed ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}
        >
            {/* Background Hover Effect */}
            <div className="absolute inset-x-0 inset-y-4 bg-gradient-to-r from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg -z-10" />

            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 md:gap-0">
                {/* Number & Title */}
                <div className="flex-1">
                    <div className="flex items-baseline gap-4 md:gap-12 pl-2">
                        <span className="font-mono text-zinc-600 text-xs md:text-sm tracking-widest">
                            0{index + 1}
                        </span>

                        <div className='relative overflow-hidden'>
                            <h3 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-zinc-300 transition-all duration-500 group-hover:text-white group-hover:translate-x-4">
                                {title}
                            </h3>
                            {/* Shadow text for depth ?? Optional, kept clean for now */}
                        </div>
                    </div>
                </div>

                {/* Meta Info (Right Side) */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 pr-2 md:w-64 text-right">
                    <span className="font-sans text-sm md:text-base text-zinc-500 uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                        {subtitle}
                    </span>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                        {detail && detail.split(',').map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase font-mono tracking-widest text-zinc-600 group-hover:text-zinc-400">
                                {i > 0 && " • "}{tag.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Action Icon */}
            <div className={`absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:-translate-x-4`}>
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
                    {isCert ? <ShieldCheck className="text-black w-6 h-6" /> : <ArrowUpRight className="text-black w-6 h-6" />}
                </div>
            </div>
        </div>
    );

    return link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
            {content}
        </a>
    ) : (
        <div className="cursor-default">
            {content}
        </div>
    );
};

export default CinematicRow;
