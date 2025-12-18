import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

const CinematicRow = ({ title, subtitle, detail, index, isCert = false, setHoveredRow, hoveredRow, link }) => {

    const content = (
        <div
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
            className={`group relative py-12 md:py-16 border-t border-white/10 transition-all duration-700`}
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

                        <div className='relative'>
                            <h3 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-zinc-300 transition-all duration-500 group-hover:text-white group-hover:translate-x-4">
                                {title}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Meta Info (Right Side) & Action Button Container */}
                <div className="flex flex-col md:items-end gap-3 pr-2 md:min-w-[200px] text-left md:text-right mt-4 md:mt-0 relative min-h-[60px] justify-center">

                    {/* Default Content: Subtitle & Tags */}
                    <div className={`flex flex-col gap-3 transition-all duration-300 ${link ? 'md:group-hover:opacity-0 md:group-hover:-translate-y-2' : ''}`}>
                        <span className="font-display font-medium text-lg text-white flex items-center gap-2 md:justify-end">
                            {subtitle}
                            {/* Mobile-only Arrow Indicator (Only if link) */}
                            {link && <ArrowUpRight size={16} className="md:hidden text-zinc-500" />}
                        </span>
                        <div className="flex flex-wrap md:justify-end gap-2">
                            {detail && detail.split(',').map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-zinc-400 whitespace-nowrap">
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Hover Content: Action Button (Only if link exists) */}
                    {link && (
                        <div className="hidden md:flex absolute inset-0 items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
                            <div className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-sans font-medium text-sm tracking-wide shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                                {isCert ? "View Credential" : "View Project"}
                                <ArrowUpRight size={16} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Cert Icon (Static, no floating action needed for certs usually, but keeping Shield/Arrow logic minimal if needed elsewhere, though here button handles main interaction) */}
            <div className={`absolute right-4 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none`}>
                {/* Cleaned up old floating icon since we have the button now */}
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
