import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Github, Linkedin, Instagram, Globe } from 'lucide-react';
import { translations } from '../data/translations';

const Navbar = ({ lang = 'en', onToggleLang }) => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isOpen, setIsOpen] = useState(false);
    const t = translations[lang] || translations.en;

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
            const ids = ['home', 'work', 'expertise', 'principles', 'about', 'faq', 'contact'];
            for (let i = ids.length - 1; i >= 0; i--) {
                const el = document.getElementById(ids[i]);
                if (el && el.getBoundingClientRect().top <= 200) {
                    setActiveSection(ids[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const links = [
        { id: 'work', label: t['nav.work'] },
        { id: 'expertise', label: t['nav.services'] },
        { id: 'principles', label: t['nav.principles'] },
        { id: 'about', label: t['nav.about'] },
        { id: 'faq', label: t['nav.faq'] },
        { id: 'contact', label: t['nav.contact'] },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile & Desktop Floating Navigation Bar */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
                <div
                    className={`
                        pointer-events-auto w-full max-w-7xl mx-4 mt-4
                        flex items-center justify-between
                        rounded-2xl px-5 py-3.5
                        transition-all duration-500
                        ${scrolled || isOpen
                            ? 'bg-[#0A0A0C]/85 backdrop-blur-xl border border-white/10 shadow-2xl'
                            : 'bg-[#0A0A0C]/40 backdrop-blur-md border border-white/5 shadow-lg'
                        }
                    `}
                >
                    {/* Logo */}
                    <a 
                        href="#home" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <img
                            src="/assets/images/logo_hatim.svg"
                            alt="Hatim Lamarti"
                            className="h-8 w-8 rounded-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="font-heading font-black text-xs tracking-tight uppercase text-white">
                            <span className="block text-white">Hatim</span>
                            <span className="block text-[#ECECEE]">Lamarti</span>
                        </div>
                    </a>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map((link) => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                className={`
                                    text-xs font-mono tracking-wider uppercase transition-colors duration-300
                                    ${activeSection === link.id
                                        ? 'text-white font-bold'
                                        : 'text-white/70 hover:text-white'
                                    }
                                `}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Language Switcher & Actions */}
                    <div className="flex items-center gap-3">
                        {/* Language Toggle Button */}
                        <button
                            onClick={onToggleLang}
                            aria-label={`Switch to ${lang === 'en' ? 'French' : 'English'}`}
                            className="px-3 py-1.5 rounded-xl bg-[#282828] border border-white/15 text-white font-mono text-xs font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-md"
                        >
                            <Globe size={13} className="text-white" />
                            <span>{lang === 'en' ? 'FR' : 'EN'}</span>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleMenu}
                            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                            className="md:hidden p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 shadow-lg"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Navigation Drawer / Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-[#0A0A0C]/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-28 md:hidden"
                    >
                        {/* Background Ambient Glow */}
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

                        {/* Navigation Links List */}
                        <div className="flex flex-col gap-3 relative z-10 my-auto">
                            <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.25em] mb-2 block">
                                NAVIGATION ({lang.toUpperCase()})
                            </span>
                            {links.map((link, index) => (
                                <motion.a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
                                    className={`
                                        flex items-center justify-between p-4 rounded-2xl
                                        border transition-all duration-300
                                        ${activeSection === link.id
                                            ? 'bg-white/10 border-white/25 text-white font-black shadow-lg'
                                            : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                                        }
                                    `}
                                >
                                    <span className="font-heading font-black text-2xl uppercase tracking-tight">
                                        {link.label}
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/50" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Bottom Social & Direct Contact Info */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.35 }}
                            className="pt-6 border-t border-white/10 relative z-10 flex flex-col gap-4"
                        >
                            <div className="flex items-center justify-between text-xs font-mono text-white/70">
                                <span>CASABLANCA, MA</span>
                                <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    AVAILABLE FOR ROLES
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <a
                                    href="https://github.com/hatim3310"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all"
                                >
                                    <Github size={16} />
                                    GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/lamartihatim/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all"
                                >
                                    <Linkedin size={16} />
                                    LinkedIn
                                </a>
                                <a
                                    href="https://www.instagram.com/laamarti_hatim/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all"
                                >
                                    <Instagram size={16} />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
