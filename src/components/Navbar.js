import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
            const ids = ['home', 'work', 'expertise', 'about', 'contact'];
            for (let i = ids.length - 1; i >= 0; i--) {
                const el = document.getElementById(ids[i]);
                if (el && el.getBoundingClientRect().top <= 180) {
                    setActiveSection(ids[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = [
        { id: 'work', label: 'Work' },
        { id: 'expertise', label: 'Expertise' },
        { id: 'about', label: 'About' },
    ];

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
            <div
                className={`
          pointer-events-auto w-full max-w-[1100px] mx-5 md:mx-8 mt-4 md:mt-5
          flex items-center justify-between
          rounded-2xl px-3 md:px-5 py-2
          transition-all duration-700
          ${scrolled
                        ? 'glass-panel'
                        : 'bg-transparent border border-transparent'
                    }
        `}
            >
                {/* Logo */}
                <a href="#home" className="flex items-center gap-2.5 cursor-pointer group">
                    <img
                        src="/assets/images/logo_hatim.svg"
                        alt="Hatim Lamarti"
                        className="h-7 w-7 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="hidden md:block text-[11px] font-heading font-semibold tracking-wide text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        Hatim Lamarti
                    </span>
                </a>

                {/* Center Links */}
                <div className="flex items-center gap-0.5">
                    {links.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className={`
                relative px-3.5 md:px-4 py-2 rounded-xl
                text-[11px] font-body font-medium
                transition-all duration-300 cursor-pointer
                ${activeSection === link.id
                                    ? 'text-white'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                }
              `}
                        >
                            {activeSection === link.id && (
                                <motion.div
                                    layoutId="nav-active"
                                    className="absolute inset-0 rounded-xl bg-white/[0.06]"
                                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                                />
                            )}
                            <span className="relative z-10">{link.label}</span>
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <a
                    href="#contact"
                    className="px-4 py-2 rounded-xl bg-accent text-white text-[11px] font-body font-semibold transition-all duration-300 hover:bg-accent-hover cursor-pointer"
                >
                    Contact
                </a>
            </div>
        </motion.nav>
    );
};

export default Navbar;
