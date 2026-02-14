"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";


export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Extended timer to 6500ms so all animations complete
    const timer = setTimeout(() => setShowIntro(false), 6500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Reduce particle counts on mobile
  const particleCount = isMobile ? 40 : 100;
  const lineCount = isMobile ? 8 : 20;
  const orbCount = isMobile ? 3 : 5;
  const floatingOrbCount = isMobile ? 8 : 15;

  return (
    <>
      
      <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0f]">
        {/* Animated mesh gradient background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent animate-gradient-shift" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent animate-gradient-shift-reverse" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent animate-pulse-slow" />

          {/* Animated grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <AnimatePresence>
          {showIntro && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
              style={{
                willChange: 'opacity',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Particle animation background */}
              <div className="absolute inset-0 bg-[#0a0a0f]">
                {/* Floating particles - reduced count on mobile */}
                {[...Array(particleCount)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 4 + 1,
                      height: Math.random() * 4 + 1,
                      background: `radial-gradient(circle, ${['#818cf8', '#a78bfa', '#c084fc', '#e879f9'][i % 4]
                        }, transparent)`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      willChange: 'transform, opacity'
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{
                      opacity: [0, 0.8, 0.4, 0.8, 0],
                      scale: [0, 1.5, 1, 1.2, 0],
                      y: [0, -50 - Math.random() * 100],
                      x: [0, (Math.random() - 0.5) * 100]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut"
                    }}
                  />
                ))}

                {/* Connecting lines between particles - reduced on mobile */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  {[...Array(lineCount)].map((_, i) => (
                    <motion.line
                      key={i}
                      x1={`${Math.random() * 100}%`}
                      y1={`${Math.random() * 100}%`}
                      x2={`${Math.random() * 100}%`}
                      y2={`${Math.random() * 100}%`}
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </svg>

                {/* Glowing orbs - reduced on mobile */}
                {[...Array(orbCount)].map((_, i) => (
                  <motion.div
                    key={`orb-${i}`}
                    className="absolute rounded-full blur-3xl"
                    style={{
                      width: isMobile ? 150 : 200 + Math.random() * 200,
                      height: isMobile ? 150 : 200 + Math.random() * 200,
                      background: `radial-gradient(circle, ${['#818cf8', '#a78bfa', '#c084fc'][i % 3]
                        }20, transparent)`,
                      left: `${20 + i * 15}%`,
                      top: `${10 + i * 20}%`,
                      willChange: 'transform, opacity'
                    }}
                    animate={{
                      x: [0, 50, -30, 0],
                      y: [0, -40, 60, 0],
                      scale: [1, 1.2, 0.9, 1],
                      opacity: [0.3, 0.6, 0.4, 0.3]
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Glitch overlay */}
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1 }}
                className="text-center relative px-6 z-[100]"
              >
                {/* Company name - Letter by letter reveal */}
                <motion.h1
                  className="relative text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 sm:mb-8"
                  style={{
                    fontFamily: '"Playwrite NZ Basic", cursive',
                    fontOpticalSizing: 'auto',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="mb-1 sm:mb-2">
                    {['F', 'O', 'R', 'G', 'E', 'S', 'T', 'A', 'C', 'K'].map((letter, i) => (
                      <motion.span
                        key={`first-${i}`}
                        initial={{ opacity: 0, y: 50, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + i * 0.08,
                          ease: "easeOut"
                        }}
                        style={{
                          fontFamily: "'Inter', -apple-system, sans-serif",
                          background: 'linear-gradient(135deg, #e8e8f0 0%, #b8b8d0 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          display: 'inline-block'
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                  <div>
                    {['L', 'A', 'B', 'S'].map((letter, i) => (
                      <motion.span
                        key={`second-${i}`}
                        initial={{ opacity: 0, y: 50, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 1.1 + i * 0.08,
                          ease: "easeOut"
                        }}
                        style={{
                          fontFamily: "'Inter', -apple-system, sans-serif",
                          background: 'linear-gradient(135deg, #e8e8f0 0%, #b8b8d0 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          display: 'inline-block'
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                </motion.h1>

                {/* Divider line that reveals */}
                <motion.div
                  className="mx-auto h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent mb-6 sm:mb-8"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: isMobile ? "200px" : "300px", opacity: 1 }}
                  transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
                />

                {/* Tagline - Appears after company name */}
                <motion.div
                  className="relative text-lg sm:text-2xl md:text-4xl font-light tracking-wide px-4"
                  style={{
                    fontFamily: "'Inter', -apple-system, sans-serif",
                    color: '#e8e8f0'
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.5 }}
                    className="overflow-hidden"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.8 }}
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #e8e8f0 0%, #b8b8d0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      When Vision
                    </motion.span>
                    {' '}
                    <motion.span
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 3.2 }}
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #818cf8 0%, #c084fc 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Meets Precision
                    </motion.span>
                  </motion.div>
                </motion.div>

                {/* Animated particles around text */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full hidden sm:block"
                    style={{
                      background: `radial-gradient(circle, ${['#818cf8', '#a78bfa', '#c084fc'][i % 3]}, transparent)`,
                      left: `${50 + Math.cos((i / 8) * Math.PI * 2) * 45}%`,
                      top: `${50 + Math.sin((i / 8) * Math.PI * 2) * 45}%`
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 2, 0],
                      opacity: [0, 1, 0],
                      x: Math.cos((i / 8) * Math.PI * 2) * 60,
                      y: Math.sin((i / 8) * Math.PI * 2) * 60
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 3.5 + i * 0.2
                    }}
                  />
                ))}

                {/* Digital loading bar */}
                <motion.div
                  className="mt-8 sm:mt-12 mx-auto max-w-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4 }}
                >
                  <div className="h-1 bg-indigo-900/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.2, delay: 4, ease: "easeInOut" }}
                    />
                  </div>
                  <motion.p
                    className="text-xs text-indigo-400/60 mt-2 font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, delay: 4, repeat: Infinity }}
                  >
                    INITIALIZING EXPERIENCE...
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Corner brackets */}
              {[
                { top: 20, left: 20, rotate: 0 },
                { top: 20, right: 20, rotate: 90 },
                { bottom: 20, right: 20, rotate: 180 },
                { bottom: 20, left: 20, rotate: 270 }
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-l-2 border-indigo-500/50"
                  style={{
                    ...pos,
                    transform: `rotate(${pos.rotate}deg)`
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 1, 0.6, 1, 0.6],
                    scale: [0.8, 1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0.5 + i * 0.3
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section with Scroll Animation */}
        <motion.section
          style={{ opacity, scale }}
          className="relative min-h-screen flex items-center justify-center px-6"
        >
          <div className="max-w-5xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="text-center"
            >
              <motion.div
                className="inline-block relative mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 blur-xl bg-indigo-500/20 rounded-full" />
                <p
                  className="relative text-[10px] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] font-light px-4 sm:px-6 py-2 rounded-full border border-indigo-500/30"
                  style={{ color: '#9d9db8' }}
                >
                  Founder-led technology studio
                </p>
              </motion.div>

              <h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[-0.03em] leading-[1.1] mb-6 sm:mb-8"
                style={{
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  background: 'linear-gradient(135deg, #e8e8f0 0%, #b8b8d0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Building products
                <br />
                <span className="font-light" style={{
                  background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #c084fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  that matter
                </span>
              </h1>

              <p
                className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 sm:mb-12 px-4"
                style={{ color: '#9d9db8' }}
              >
                FORGESTACK LABS exists to design and refine software systems that endure.
                We focus on clarity, restraint, and the craft of building quietly—so each
                system can serve its purpose with unwavering precision.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Link
                  href="/technology"
                  className="group inline-flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light transition-all duration-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-indigo-500/30 hover:border-indigo-400/60 hover:bg-indigo-500/10"
                  style={{ color: '#c8c8d8' }}
                >
                  <span>Explore Our Work</span>
                  <motion.span
                    className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-indigo-500 to-purple-500"
                    animate={{ width: isMobile ? [32, 40, 32] : [48, 56, 48] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden sm:block"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent" />
          </motion.div>
        </motion.section>

        {/* Values Section with Scroll Animations */}
        <section className="relative py-20 sm:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-20"
            >
              <h2
                className="text-2xl sm:text-3xl md:text-5xl font-extralight tracking-[-0.02em] mb-4"
                style={{ color: '#e8e8f0' }}
              >
                Built on Principles
              </h2>
              <div className="w-20 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto" />
            </motion.div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              {[
                {
                  title: "Precision",
                  copy: "Every system is engineered to feel deliberate—nothing is rushed, nothing is accidental.",
                  icon: "◆",
                  gradient: "from-indigo-500/10 to-indigo-500/5",
                  borderGradient: "from-indigo-500/30 to-transparent"
                },
                {
                  title: "Continuity",
                  copy: "We build for longevity, prioritizing resilience and quiet adaptability over noise.",
                  icon: "◇",
                  gradient: "from-purple-500/10 to-purple-500/5",
                  borderGradient: "from-purple-500/30 to-transparent"
                },
                {
                  title: "Discipline",
                  copy: "Our process favors restraint, measured decisions, and a commitment to long-term outcomes.",
                  icon: "◈",
                  gradient: "from-blue-500/10 to-blue-500/5",
                  borderGradient: "from-blue-500/30 to-transparent"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl blur-2xl`} />

                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-700 rounded-2xl p-6 sm:p-8 h-full">
                    <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${item.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <span className="text-2xl sm:text-3xl opacity-40 group-hover:opacity-70 transition-opacity" style={{ color: '#818cf8' }}>
                        {item.icon}
                      </span>
                      <h3
                        className="text-lg sm:text-xl md:text-2xl font-light tracking-tight"
                        style={{ color: '#e8e8f0' }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className="text-sm md:text-base font-light leading-relaxed"
                      style={{ color: '#9d9db8' }}
                    >
                      {item.copy}
                    </p>

                    <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-r border-b border-white/5 group-hover:border-white/10 transition-colors duration-500 rounded-br-2xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Information Section */}




        {/* Floating orbs - reduced on mobile */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
          {[...Array(floatingOrbCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                background: `radial-gradient(circle, ${['#818cf8', '#a78bfa', '#c084fc'][i % 3]
                  }40, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                willChange: 'transform, opacity'
              }}
              animate={{
                y: [0, Math.random() * -200 - 100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10%, 10%) scale(1.1); }
        }
        @keyframes gradient-shift-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10%, -10%) scale(1.1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-gradient-shift {
          animation: gradient-shift 20s ease-in-out infinite;
        }
        .animate-gradient-shift-reverse {
          animation: gradient-shift-reverse 25s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }
      `}</style>
      </div>
    </>
  );
}

// "use client";

// import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// import Link from "next/link";
// import { useEffect, useState, useRef } from "react";


// export default function HomePage() {
// const [showIntro, setShowIntro] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

// useEffect(() => {
//   // Check if mobile
//   const checkMobile = () => {
//     setIsMobile(window.innerWidth < 768);
//   };
//   checkMobile();
//   window.addEventListener('resize', checkMobile);

//   // Check if this is the first load ever (not just navigation to home)
//   const hasLoadedBefore = localStorage.getItem('hasLoadedWebsite');
  
//   if (!hasLoadedBefore) {
//     // First time ever loading the website
//     setShowIntro(true);
//     localStorage.setItem('hasLoadedWebsite', 'true');
//     const timer = setTimeout(() => setShowIntro(false), 6500);
//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener('resize', checkMobile);
//     };
//   } else {
//     // Already loaded before - skip intro
//     setShowIntro(false);
//   }

//   return () => {
//     window.removeEventListener('resize', checkMobile);
//   };
// }, []);

//   // Reduce particle counts on mobile
//   const particleCount = isMobile ? 40 : 100;
//   const lineCount = isMobile ? 8 : 20;
//   const orbCount = isMobile ? 3 : 5;
//   const floatingOrbCount = isMobile ? 8 : 15;

//   return (
//     <>
      
//       <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0f]">
//         {/* Animated mesh gradient background */}
//         <div className="fixed inset-0 -z-10 overflow-hidden">
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent animate-gradient-shift" />
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent animate-gradient-shift-reverse" />
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent animate-pulse-slow" />

//           {/* Animated grid lines */}
//           <svg className="absolute inset-0 w-full h-full opacity-20">
//             <defs>
//               <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
//                 <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(251, 146, 60, 0.1)" strokeWidth="0.5" />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         <AnimatePresence>
//           {showIntro && (
//             <motion.div
//               className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
//               style={{
//                 willChange: 'opacity',
//                 transform: 'translateZ(0)',
//                 backfaceVisibility: 'hidden'
//               }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               {/* Particle animation background */}
//               <div className="absolute inset-0 bg-[#0a0a0f]">
//                 {/* Floating particles - reduced count on mobile */}
//                 {[...Array(particleCount)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     className="absolute rounded-full"
//                     style={{
//                       width: Math.random() * 4 + 1,
//                       height: Math.random() * 4 + 1,
//                       background: `radial-gradient(circle, ${['#fb923c', '#f97316', '#ea580c', '#fdba74'][i % 4]
//                         }, transparent)`,
//                       left: `${Math.random() * 100}%`,
//                       top: `${Math.random() * 100}%`,
//                       willChange: 'transform, opacity'
//                     }}
//                     initial={{
//                       opacity: 0,
//                       scale: 0
//                     }}
//                     animate={{
//                       opacity: [0, 0.8, 0.4, 0.8, 0],
//                       scale: [0, 1.5, 1, 1.2, 0],
//                       y: [0, -50 - Math.random() * 100],
//                       x: [0, (Math.random() - 0.5) * 100]
//                     }}
//                     transition={{
//                       duration: 3 + Math.random() * 3,
//                       repeat: Infinity,
//                       delay: Math.random() * 2,
//                       ease: "easeInOut"
//                     }}
//                   />
//                 ))}

//                 {/* Connecting lines between particles - reduced on mobile */}
//                 <svg className="absolute inset-0 w-full h-full opacity-20">
//                   <defs>
//                     <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                       <stop offset="0%" stopColor="#fb923c" stopOpacity="0.6" />
//                       <stop offset="100%" stopColor="#fdba74" stopOpacity="0.1" />
//                     </linearGradient>
//                   </defs>
//                   {[...Array(lineCount)].map((_, i) => (
//                     <motion.line
//                       key={i}
//                       x1={`${Math.random() * 100}%`}
//                       y1={`${Math.random() * 100}%`}
//                       x2={`${Math.random() * 100}%`}
//                       y2={`${Math.random() * 100}%`}
//                       stroke="url(#lineGradient)"
//                       strokeWidth="1"
//                       initial={{ pathLength: 0, opacity: 0 }}
//                       animate={{
//                         pathLength: [0, 1, 0],
//                         opacity: [0, 0.5, 0]
//                       }}
//                       transition={{
//                         duration: 4,
//                         repeat: Infinity,
//                         delay: i * 0.2,
//                         ease: "easeInOut"
//                       }}
//                     />
//                   ))}
//                 </svg>

//                 {/* Glowing orbs - reduced on mobile */}
//                 {[...Array(orbCount)].map((_, i) => (
//                   <motion.div
//                     key={`orb-${i}`}
//                     className="absolute rounded-full blur-3xl"
//                     style={{
//                       width: isMobile ? 150 : 200 + Math.random() * 200,
//                       height: isMobile ? 150 : 200 + Math.random() * 200,
//                       background: `radial-gradient(circle, ${['#fb923c', '#f97316', '#fdba74'][i % 3]
//                         }20, transparent)`,
//                       left: `${20 + i * 15}%`,
//                       top: `${10 + i * 20}%`,
//                       willChange: 'transform, opacity'
//                     }}
//                     animate={{
//                       x: [0, 50, -30, 0],
//                       y: [0, -40, 60, 0],
//                       scale: [1, 1.2, 0.9, 1],
//                       opacity: [0.3, 0.6, 0.4, 0.3]
//                     }}
//                     transition={{
//                       duration: 8 + i * 2,
//                       repeat: Infinity,
//                       ease: "easeInOut"
//                     }}
//                   />
//                 ))}
//               </div>

//               {/* Glitch overlay */}
//               <motion.div
//                 className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5"
//                 animate={{
//                   opacity: [0.3, 0.7, 0.3],
//                   scale: [1, 1.02, 1]
//                 }}
//                 transition={{
//                   duration: 0.2,
//                   repeat: Infinity,
//                   repeatType: "reverse"
//                 }}
//               />

//               {/* Content */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0, scale: 1.05 }}
//                 transition={{ duration: 1 }}
//                 className="text-center relative px-6 z-[100]"
//               >
//                 {/* Company name - Letter by letter reveal */}
//                 <motion.h1
//                   className="relative text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 sm:mb-8"
//                   style={{
//                     fontFamily: '"Playwrite NZ Basic", cursive',
//                     fontOpticalSizing: 'auto',
//                     fontWeight: 400,
//                     fontStyle: 'normal',
//                     willChange: 'transform, opacity',
//                     transform: 'translateZ(0)',
//                     backfaceVisibility: 'hidden'
//                   }}
//                 >
//                   <div className="mb-1 sm:mb-2">
//                     {['F', 'O', 'R', 'G', 'E', 'S', 'T', 'A', 'C', 'K'].map((letter, i) => (
//                       <motion.span
//                         key={`first-${i}`}
//                         initial={{ opacity: 0, y: 50, rotateX: -90 }}
//                         animate={{ opacity: 1, y: 0, rotateX: 0 }}
//                         transition={{
//                           duration: 0.5,
//                           delay: 0.3 + i * 0.08,
//                           ease: "easeOut"
//                         }}
//                         style={{
//                           fontFamily: "'Inter', -apple-system, sans-serif",
//                           background: 'linear-gradient(135deg, #e8e8f0 0%, #b8b8d0 100%)',
//                           WebkitBackgroundClip: 'text',
//                           WebkitTextFillColor: 'transparent',
//                           backgroundClip: 'text',
//                           display: 'inline-block'
//                         }}
//                       >
//                         {letter}
//                       </motion.span>
//                     ))}
//                   </div>
//                   <div>
//                     {['L', 'A', 'B', 'S'].map((letter, i) => (
//                       <motion.span
//                         key={`second-${i}`}
//                         initial={{ opacity: 0, y: 50, rotateX: -90 }}
//                         animate={{ opacity: 1, y: 0, rotateX: 0 }}
//                         transition={{
//                           duration: 0.5,
//                           delay: 1.1 + i * 0.08,
//                           ease: "easeOut"
//                         }}
//                         style={{
//                           fontFamily: "'Inter', -apple-system, sans-serif",
//                           background: 'linear-gradient(135deg, #e8e8f0 0%, #b8b8d0 100%)',
//                           WebkitBackgroundClip: 'text',
//                           WebkitTextFillColor: 'transparent',
//                           backgroundClip: 'text',
//                           display: 'inline-block'
//                         }}
//                       >
//                         {letter}
//                       </motion.span>
//                     ))}
//                   </div>
//                 </motion.h1>

//                 {/* Divider line that reveals */}
//                 <motion.div
//                   className="mx-auto h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-6 sm:mb-8"
//                   initial={{ width: 0, opacity: 0 }}
//                   animate={{ width: isMobile ? "200px" : "300px", opacity: 1 }}
//                   transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
//                 />

//                 {/* Tagline - Appears after company name */}
//                 <motion.div
//                   className="relative text-lg sm:text-2xl md:text-4xl font-light tracking-wide px-4"
//                   style={{
//                     fontFamily: "'Inter', -apple-system, sans-serif",
//                     color: '#e8e8f0'
//                   }}
//                 >
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 2.5 }}
//                     className="overflow-hidden"
//                   >
//                     <motion.span
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.6, delay: 2.8 }}
//                       style={{
//                         display: 'inline-block',
//                         background: 'linear-gradient(90deg, #e8e8f0 0%, #b8b8d0 100%)',
//                         WebkitBackgroundClip: 'text',
//                         WebkitTextFillColor: 'transparent',
//                         backgroundClip: 'text'
//                       }}
//                     >
//                       When Vision
//                     </motion.span>
//                     {' '}
//                     <motion.span
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.6, delay: 3.2 }}
//                       style={{
//                         display: 'inline-block',
//                         background: 'linear-gradient(90deg, #fb923c 0%, #fdba74 100%)',
//                         WebkitBackgroundClip: 'text',
//                         WebkitTextFillColor: 'transparent',
//                         backgroundClip: 'text'
//                       }}
//                     >
//                       Meets Precision
//                     </motion.span>
//                   </motion.div>
//                 </motion.div>

//                 {/* Animated particles around text */}
//                 {[...Array(8)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     className="absolute w-1.5 h-1.5 rounded-full hidden sm:block"
//                     style={{
//                       background: `radial-gradient(circle, ${['#fb923c', '#f97316', '#fdba74'][i % 3]}, transparent)`,
//                       left: `${50 + Math.cos((i / 8) * Math.PI * 2) * 45}%`,
//                       top: `${50 + Math.sin((i / 8) * Math.PI * 2) * 45}%`
//                     }}
//                     initial={{ scale: 0, opacity: 0 }}
//                     animate={{
//                       scale: [0, 2, 0],
//                       opacity: [0, 1, 0],
//                       x: Math.cos((i / 8) * Math.PI * 2) * 60,
//                       y: Math.sin((i / 8) * Math.PI * 2) * 60
//                     }}
//                     transition={{
//                       duration: 3,
//                       repeat: Infinity,
//                       delay: 3.5 + i * 0.2
//                     }}
//                   />
//                 ))}

//                 {/* Digital loading bar */}
//                 <motion.div
//                   className="mt-8 sm:mt-12 mx-auto max-w-xs"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 4 }}
//                 >
//                   <div className="h-1 bg-orange-900/30 rounded-full overflow-hidden">
//                     <motion.div
//                       className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500"
//                       initial={{ width: '0%' }}
//                       animate={{ width: '100%' }}
//                       transition={{ duration: 1.2, delay: 4, ease: "easeInOut" }}
//                     />
//                   </div>
//                   <motion.p
//                     className="text-xs text-orange-400/60 mt-2 font-mono"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: [0, 1, 0.6, 1, 0.6] }}
//                     transition={{ duration: 2.5, delay: 4, repeat: Infinity }}
//                   >
//                     INITIALIZING EXPERIENCE...
//                   </motion.p>
//                 </motion.div>
//               </motion.div>

//               {/* Corner brackets */}
//               {[
//                 { top: 20, left: 20, rotate: 0 },
//                 { top: 20, right: 20, rotate: 90 },
//                 { bottom: 20, right: 20, rotate: 180 },
//                 { bottom: 20, left: 20, rotate: 270 }
//               ].map((pos, i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-l-2 border-orange-500/50"
//                   style={{
//                     ...pos,
//                     transform: `rotate(${pos.rotate}deg)`
//                   }}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{
//                     opacity: [0, 1, 0.6, 1, 0.6],
//                     scale: [0.8, 1, 1.05, 1]
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     delay: 0.5 + i * 0.3
//                   }}
//                 />
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Hero Section with Scroll Animation */}
//         <motion.section
//           style={{ opacity, scale }}
//           className="relative min-h-screen flex items-center justify-center px-6"
//         >
//           <div className="max-w-5xl w-full">
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1.2, delay: 0.3 }}
//               className="text-center"
//             >
//               <motion.div
//                 className="inline-block relative mb-6"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <div className="absolute inset-0 blur-xl bg-orange-500/20 rounded-full" />
//                 <p
//                   className="relative text-[10px] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] font-light px-4 sm:px-6 py-2 rounded-full border border-orange-500/30"
//                   style={{ color: '#9d9db8' }}
//                 >
//                   Founder-led technology studio
//                 </p>
//               </motion.div>

//               <h1
//                 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[-0.03em] leading-[1.1] mb-6 sm:mb-8"
//                 style={{
//                   fontFamily: "'Inter', -apple-system, sans-serif",
//                   background: 'linear-gradient(135deg, #e8e8f0 0%, #b8b8d0 100%)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   backgroundClip: 'text'
//                 }}
//               >
//                 Building products
//                 <br />
//                 <span className="font-light" style={{
//                   background: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #fdba74 100%)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   backgroundClip: 'text'
//                 }}>
//                   that matter
//                 </span>
//               </h1>

//               <p
//                 className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 sm:mb-12 px-4"
//                 style={{ color: '#9d9db8' }}
//               >
//                 FORGESTACK LABS exists to design and refine software systems that endure.
//                 We focus on clarity, restraint, and the craft of building quietly—so each
//                 system can serve its purpose with unwavering precision.
//               </p>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1 }}
//               >
//                 <Link
//                   href="/technology"
//                   className="group inline-flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light transition-all duration-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-orange-500/30 hover:border-orange-400/60 hover:bg-orange-500/10"
//                   style={{ color: '#c8c8d8' }}
//                 >
//                   <span>Explore Our Work</span>
//                   <motion.span
//                     className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-orange-500 to-amber-500"
//                     animate={{ width: isMobile ? [32, 40, 32] : [48, 56, 48] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   />
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Scroll indicator */}
//           <motion.div
//             className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden sm:block"
//             animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent" />
//           </motion.div>
//         </motion.section>

//         {/* Values Section with Scroll Animations */}
//         <section className="relative py-20 sm:py-32 px-6">
//           <div className="max-w-7xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 60 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.8 }}
//               className="text-center mb-12 sm:mb-20"
//             >
//               <h2
//                 className="text-2xl sm:text-3xl md:text-5xl font-extralight tracking-[-0.02em] mb-4"
//                 style={{ color: '#e8e8f0' }}
//               >
//                 Built on Principles
//               </h2>
//               <div className="w-20 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
//             </motion.div>

//             <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
//               {[
//                 {
//                   title: "Precision",
//                   copy: "Every system is engineered to feel deliberate—nothing is rushed, nothing is accidental.",
//                   icon: "◆",
//                   gradient: "from-orange-500/10 to-orange-500/5",
//                   borderGradient: "from-orange-500/30 to-transparent"
//                 },
//                 {
//                   title: "Continuity",
//                   copy: "We build for longevity, prioritizing resilience and quiet adaptability over noise.",
//                   icon: "◇",
//                   gradient: "from-amber-500/10 to-amber-500/5",
//                   borderGradient: "from-amber-500/30 to-transparent"
//                 },
//                 {
//                   title: "Discipline",
//                   copy: "Our process favors restraint, measured decisions, and a commitment to long-term outcomes.",
//                   icon: "◈",
//                   gradient: "from-orange-600/10 to-orange-600/5",
//                   borderGradient: "from-orange-600/30 to-transparent"
//                 }
//               ].map((item, index) => (
//                 <motion.div
//                   key={item.title}
//                   initial={{ opacity: 0, y: 60 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-50px" }}
//                   transition={{ duration: 0.8, delay: index * 0.2 }}
//                   whileHover={{ y: -8, transition: { duration: 0.3 } }}
//                   className="group relative"
//                 >
//                   <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl blur-2xl`} />

//                   <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-700 rounded-2xl p-6 sm:p-8 h-full">
//                     <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${item.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

//                     <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
//                       <span className="text-2xl sm:text-3xl opacity-40 group-hover:opacity-70 transition-opacity" style={{ color: '#fb923c' }}>
//                         {item.icon}
//                       </span>
//                       <h3
//                         className="text-lg sm:text-xl md:text-2xl font-light tracking-tight"
//                         style={{ color: '#e8e8f0' }}
//                       >
//                         {item.title}
//                       </h3>
//                     </div>

//                     <p
//                       className="text-sm md:text-base font-light leading-relaxed"
//                       style={{ color: '#9d9db8' }}
//                     >
//                       {item.copy}
//                     </p>

//                     <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-r border-b border-white/5 group-hover:border-white/10 transition-colors duration-500 rounded-br-2xl" />
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Company Information Section */}




//         {/* Floating orbs - reduced on mobile */}
//         <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
//           {[...Array(floatingOrbCount)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute rounded-full"
//               style={{
//                 width: Math.random() * 4 + 2,
//                 height: Math.random() * 4 + 2,
//                 background: `radial-gradient(circle, ${['#fb923c', '#f97316', '#fdba74'][i % 3]
//                   }40, transparent)`,
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 willChange: 'transform, opacity'
//               }}
//               animate={{
//                 y: [0, Math.random() * -200 - 100, 0],
//                 x: [0, Math.random() * 100 - 50, 0],
//                 opacity: [0, 0.6, 0],
//               }}
//               transition={{
//                 duration: Math.random() * 20 + 15,
//                 repeat: Infinity,
//                 delay: Math.random() * 5,
//                 ease: "easeInOut"
//               }}
//             />
//           ))}
//         </div>

//         <style jsx>{`
//         @keyframes gradient-shift {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           50% { transform: translate(10%, 10%) scale(1.1); }
//         }
//         @keyframes gradient-shift-reverse {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           50% { transform: translate(-10%, -10%) scale(1.1); }
//         }
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.1; }
//           50% { opacity: 0.2; }
//         }
//         .animate-gradient-shift {
//           animation: gradient-shift 20s ease-in-out infinite;
//         }
//         .animate-gradient-shift-reverse {
//           animation: gradient-shift-reverse 25s ease-in-out infinite;
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 15s ease-in-out infinite;
//         }
//       `}</style>
//       </div>
//     </>
//   );
// }
