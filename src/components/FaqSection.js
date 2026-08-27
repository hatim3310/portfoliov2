import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Network } from 'lucide-react';
import { translations } from '../data/translations';

const faqListEN = [
  {
    id: '01',
    category: 'AI & MCP Protocols',
    question: 'What is Model Context Protocol (MCP) & Client/Server Architecture?',
    answer: 'Model Context Protocol (MCP) is the open standard developed by Anthropic allowing Large Language Models (LLMs) to securely interface with local data, APIs, and external tools via Client/Server connections. As an Anthropic certified engineer, I build custom MCP servers connecting AI agents directly to databases and enterprise APIs.'
  },
  {
    id: '02',
    category: 'Integrations & AI Solutions',
    question: 'How do you integrate Artificial Intelligence into existing web apps?',
    answer: 'I integrate AI capabilities via modern APIs (Claude 3.7, OpenAI, Ollama) or self-hosted Open-Source models. Integration is executed via secure data pipelines, vector databases (RAG), and reactive interfaces ensuring smooth UX without perceptual latency.'
  },
  {
    id: '03',
    category: 'Engineering & Stack',
    question: 'What tech stack do you use for Full Stack web development?',
    answer: 'I leverage a high-performance modern stack: Next.js 15, React 19, and TypeScript on the frontend; Node.js, Python (FastAPI/Flask), PostgreSQL, and Supabase on the backend; and Docker, AWS, and Vercel for infrastructure and CI/CD.'
  },
  {
    id: '04',
    category: 'Leadership & Case Studies',
    question: 'What was your architectural role in the BDE EFET Hub project?',
    answer: 'As Lead Developer, I orchestrated the overall system architecture of the official EFET Student Portal. I designed the event management engine, ticketing modules, E-sports portal, and real-time analytics dashboard using Next.js, Supabase, and Framer Motion.'
  },
  {
    id: '05',
    category: 'Collaboration & Contact',
    question: 'How do we initiate a project or technical collaboration?',
    answer: 'You can contact me directly via email at hatimlamarti3@gmail.com or via LinkedIn. Following an initial architectural scoping session, I provide a detailed execution blueprint with rapid delivery milestones.'
  }
];

const faqListFR = [
  {
    id: '01',
    category: 'IA & Protocole MCP',
    question: 'Qu’est-ce que le Model Context Protocol (MCP) et l’architecture Client/Serveur ?',
    answer: 'Le Model Context Protocol (MCP) est le nouveau standard ouvert développé par Anthropic permettant aux modèles de langage (LLMs) de se connecter en toute sécurité aux données locales, APIs et outils externes via une architecture Client/Serveur robuste. En tant que développeur certifié Anthropic, je conçois des serveurs MCP personnalisés pour connecter vos agents IA directement à vos bases de données et services internes.'
  },
  {
    id: '02',
    category: 'Intégrations & Solutions IA',
    question: 'Comment intégrez-vous l’Intelligence Artificielle dans une application web existante ?',
    answer: 'J’intègre des fonctionnalités IA via des APIs modernes (Claude 3.7, OpenAI, Ollama) ou des modèles Open-Source auto-hébergés. L’intégration se fait via des pipelines de données sécurisés, des bases de données vectorielles (RAG) et des interfaces réactives permettant une expérience utilisateur fluide sans latence perceptibles.'
  },
  {
    id: '03',
    category: 'Ingénierie & Stack Technique',
    question: 'Quelles technologies utilisez-vous pour les projets Full Stack ?',
    answer: 'J’utilise une stack moderne haute performance : Next.js 15, React 19 et TypeScript pour le frontend, Node.js, Python (FastAPI/Flask) et PostgreSQL/Supabase pour le backend et la gestion des données, ainsi que Docker, AWS et Vercel pour l’infrastructure et le déploiement continu (CI/CD).'
  },
  {
    id: '04',
    category: 'Leadership & Études de Cas',
    question: 'Quel est votre rôle dans le projet BDE EFET Hub ?',
    answer: 'En tant que Lead Developer, j’ai orchestré l’architecture globale de la plateforme officielle du Bureau des Étudiants d’EFET. J’ai conçu le système de gestion d’événements, la billetterie sécurisée, le module E-sport, ainsi que le tableau de bord analytics avec Next.js, Supabase et Framer Motion.'
  },
  {
    id: '05',
    category: 'Collaboration & Contact',
    question: 'Comment démarrer un projet ou travailler avec vous ?',
    answer: 'Vous pouvez me contacter directement par e-mail à hatimlamarti3@gmail.com ou via LinkedIn. Après un premier échange technique pour définir les besoins et l’architecture requise, je propose un plan d’exécution détaillé avec jalons de livraison rapides.'
  }
];

const FaqSection = ({ lang = 'en' }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const t = translations[lang] || translations.en;
  const faqList = lang === 'fr' ? faqListFR : faqListEN;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-mono text-[#ECECEE] uppercase tracking-[0.2em] mb-2 block flex items-center gap-2">
              <HelpCircle size={14} className="text-white" />
              04 // {t['faq.label']}
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter uppercase text-white">
              {t['faq.title']}
            </h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121316] border border-white/10 backdrop-blur-md self-start md:self-auto">
            <Network size={14} className="text-white animate-pulse" />
            <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest">
              AEO & MCP READY
            </span>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
      </motion.div>

      {/* ACCORDION LIST */}
      <div className="flex flex-col gap-4">
        {faqList.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl bg-[#121316] border backdrop-blur-xl overflow-hidden transition-all duration-300 shadow-2xl ${
                isOpen ? 'border-white/30 bg-[#15161A]' : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Question Bar Header */}
              <button
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-3 p-4 text-left cursor-pointer sm:gap-4 sm:p-8"
              >
                <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4 md:gap-6">
                  <span className="shrink-0 rounded-lg border border-white/15 bg-white/10 px-2 py-1 font-mono text-[10px] font-bold text-white sm:px-2.5 sm:text-xs">
                    {item.id}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#78a4ff] uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-balance font-heading text-base font-bold leading-snug text-white transition-colors group-hover:text-[#b6cbff] sm:text-xl">
                      {item.question}
                    </h3>
                  </div>
                </div>

                <div className={`shrink-0 rounded-full border border-white/10 p-2 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-white/10' : ''}`}>
                  <ChevronDown size={18} className="text-white" />
                </div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 border-t border-white/5 text-white/80 leading-relaxed text-sm sm:text-base">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;
