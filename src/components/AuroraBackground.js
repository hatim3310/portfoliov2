import React from 'react';

const AuroraBackground = () => (
    <div className="fixed inset-0 -z-10 bg-base overflow-hidden">
        {/* Animated gradient mesh — 3 slow-drifting orbs */}
        <div className="absolute -top-[30%] -right-[15%] w-[800px] h-[800px] rounded-full bg-accent/[0.04] blur-[180px] pointer-events-none mesh-orb-1" />
        <div className="absolute top-[40%] -left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-500/[0.03] blur-[160px] pointer-events-none mesh-orb-2" />
        <div className="absolute -bottom-[20%] right-[20%] w-[500px] h-[500px] rounded-full bg-zinc-500/[0.03] blur-[140px] pointer-events-none mesh-orb-3" />

        {/* Subtle noise grain */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
        />
    </div>
);

export default AuroraBackground;
