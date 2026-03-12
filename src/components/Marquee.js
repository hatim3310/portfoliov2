import React from 'react';

const Marquee = ({ items = [], speed = 30 }) => {
    // Double the items for seamless looping
    const doubled = [...items, ...items];

    return (
        <div className="relative overflow-hidden group py-6 border-y border-white/[0.04]">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-base to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-base to-transparent z-10 pointer-events-none" />

            <div
                className="flex gap-8 md:gap-14 items-center whitespace-nowrap marquee-track group-hover:[animation-play-state:paused]"
                style={{ animationDuration: `${speed}s` }}
            >
                {doubled.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 flex-shrink-0 select-none"
                    >
                        <span className="text-[13px] md:text-[15px] font-heading font-medium text-zinc-500 tracking-tight transition-colors duration-300 group-hover:text-zinc-300">
                            {item}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-accent/40 flex-shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
