import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TrueFocus = ({
  sentence = 'FULL STACK ENGINEER',
  sentences = null,
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = '#ECECEE',
  glowColor = 'rgba(236, 236, 238, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.2,
  sentenceInterval = 4.0
}) => {
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);

  const activeList = Array.isArray(sentences) && sentences.length > 0 ? sentences : [sentence];
  const currentSentence = activeList[activeSentenceIndex % activeList.length];

  const words = currentSentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Timer to rotate between sentences if an array is passed
  useEffect(() => {
    if (!Array.isArray(sentences) || sentences.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setActiveSentenceIndex(prev => (prev + 1) % sentences.length);
      setCurrentIndex(0);
    }, sentenceInterval * 1000);

    return () => clearInterval(timer);
  }, [sentences, sentenceInterval, isHovered]);

  // Timer for word focus within active sentence
  useEffect(() => {
    if (manualMode || isHovered) return;

    const interval = setInterval(
      () => {
        setCurrentIndex(prev => (prev + 1) % words.length);
      },
      (animationDuration + pauseBetweenAnimations) * 1000
    );

    return () => clearInterval(interval);
  }, [manualMode, isHovered, animationDuration, pauseBetweenAnimations, words.length, activeSentenceIndex]);

  // Recalculate bounding rectangle for focus frame
  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, words.length, activeSentenceIndex, currentSentence]);

  const handleMouseEnter = (index) => {
    const isDesktop = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (isDesktop) {
      setIsHovered(true);
      setCurrentIndex(index);
    }
  };

  const handleContainerMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSentenceIndex}
          initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex gap-2 md:gap-5 justify-center items-center flex-wrap"
          ref={containerRef}
          onMouseLeave={handleContainerMouseLeave}
          style={{ outline: 'none', userSelect: 'none' }}
        >
          {words.map((word, index) => {
            const isActive = index === currentIndex;
            return (
              <span
                key={`${word}-${index}`}
                ref={el => {
                  wordRefs.current[index] = el;
                }}
                className="relative font-heading font-black text-[clamp(2.0rem,6.5vw,6.5rem)] leading-[0.95] tracking-[-0.04em] uppercase text-white drop-shadow-2xl cursor-pointer"
                style={{
                  filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
                  transition: `filter ${animationDuration}s ease`,
                  outline: 'none',
                  userSelect: 'none'
                }}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                {word}
              </span>
            );
          })}

          <motion.div
            className="absolute top-0 left-0 pointer-events-none box-border border-0"
            animate={{
              x: focusRect.x,
              y: focusRect.y,
              width: focusRect.width,
              height: focusRect.height,
              opacity: currentIndex >= 0 ? 1 : 0
            }}
            transition={{
              duration: animationDuration,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{
              '--border-color': borderColor,
              '--glow-color': glowColor
            }}
          >
            <span
              className="absolute w-4 h-4 md:w-6 md:h-6 border-[3px] rounded-[3px] top-[-8px] left-[-8px] border-r-0 border-b-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 6px var(--border-color))'
              }}
            />
            <span
              className="absolute w-4 h-4 md:w-6 md:h-6 border-[3px] rounded-[3px] top-[-8px] right-[-8px] border-l-0 border-b-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 6px var(--border-color))'
              }}
            />
            <span
              className="absolute w-4 h-4 md:w-6 md:h-6 border-[3px] rounded-[3px] bottom-[-8px] left-[-8px] border-r-0 border-t-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 6px var(--border-color))'
              }}
            />
            <span
              className="absolute w-4 h-4 md:w-6 md:h-6 border-[3px] rounded-[3px] bottom-[-8px] right-[-8px] border-l-0 border-t-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 6px var(--border-color))'
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination indicators for rotating sentence lines */}
      {Array.isArray(sentences) && sentences.length > 1 && (
        <div className="flex items-center gap-2 mt-1">
          {sentences.map((_, idx) => {
            const active = idx === activeSentenceIndex;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveSentenceIndex(idx);
                  setCurrentIndex(0);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  active ? 'w-7 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrueFocus;
