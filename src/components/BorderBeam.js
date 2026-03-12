import React from 'react';

const BorderBeam = ({ children, className = '' }) => (
    <div className={`relative group/beam ${className}`}>
        {/* Animated border beam */}
        <div className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none">
            <div className="border-beam-gradient absolute inset-0" />
        </div>
        {/* Inner content with solid bg to mask beam center */}
        <div className="relative">{children}</div>
    </div>
);

export default BorderBeam;
