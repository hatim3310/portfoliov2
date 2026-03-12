import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';


const ProjectCard = ({ title, subtitle, detail, link, image, index }) => {
    const tags = detail ? detail.split(',').map(t => t.trim()) : [];
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    /* ── 3D Tilt values (Pro Max: 2-3deg perspective) ── */
    const rotateXRaw = useMotionValue(0);
    const rotateYRaw = useMotionValue(0);
    const spotlightX = useMotionValue(50);
    const spotlightY = useMotionValue(50);

    const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 20 });
    const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        // Tilt: ±3deg max
        rotateXRaw.set((y - 0.5) * -6);
        rotateYRaw.set((x - 0.5) * 6);
        // Spotlight position (%)
        spotlightX.set(x * 100);
        spotlightY.set(y * 100);
    };

    const handleMouseLeave = () => {
        rotateXRaw.set(0);
        rotateYRaw.set(0);
        setIsHovered(false);
    };

    const Wrapper = link ? motion.a : motion.div;
    const wrapperProps = link
        ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
        : {};

    return (
        <Wrapper
            ref={cardRef}
            {...wrapperProps}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 600,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            className={`group block ${link ? 'cursor-pointer' : 'cursor-default'} outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl`}
        >
            <div className="relative overflow-hidden rounded-2xl bg-base-surface border border-white/[0.06] transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.1)]"
                style={{ transition: 'border-color 0.5s, box-shadow 0.5s' }}
            >
                {/* ── Spotlight overlay (follows cursor) ── */}
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
                        style={{
                            background: `radial-gradient(400px circle at ${spotlightX.get()}% ${spotlightY.get()}%, rgba(59,130,246,0.06), transparent 60%)`,
                        }}
                    />
                )}

                {/* Image area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-base-surface2">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            loading="lazy"
                        />
                    ) : (
                        /* Shimmer placeholder (Pro Max: animated shimmer sweep) */
                        <div className="w-full h-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-transparent to-indigo-500/[0.04]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-heading text-[clamp(2rem,4vw,4rem)] font-bold text-white/[0.04] select-none tracking-tight">
                                    {title}
                                </span>
                            </div>
                            {/* Decorative grid */}
                            <div
                                className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                                    backgroundSize: '30px 30px',
                                }}
                            />
                            {/* Shimmer sweep */}
                            <div className="shimmer-sweep absolute inset-0 pointer-events-none" />
                        </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-base-surface via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Index number */}
                    <div className="absolute top-4 left-5">
                        <span className="text-[11px] font-mono text-white/20 tracking-widest">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>


                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="font-heading font-semibold text-lg md:text-xl text-white tracking-tight group-hover:text-accent transition-colors duration-500">
                            {title}
                        </h3>
                        <span className="text-[12px] font-body text-zinc-600 mt-1 flex-shrink-0">
                            {subtitle}
                        </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium text-zinc-500 bg-white/[0.03] border border-white/[0.06] transition-all duration-300 group-hover:text-accent group-hover:border-accent/20 group-hover:bg-accent/[0.06]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {link && (
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 group-hover:text-accent transition-colors duration-300">
                                <span>Visit site</span>
                                <ArrowUpRight size={10} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default ProjectCard;
