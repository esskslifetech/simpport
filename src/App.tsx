/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Volume2, VolumeX, Play, Disc3, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(new Date());
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update time every second for a subtle live feel
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Update trail position with delay
      setTimeout(() => {
        setTrailPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    const handleMouseDown = () => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) cursor.classList.add('click');
    };

    const handleMouseUp = () => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) cursor.classList.remove('click');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Handle hover states for interactive elements
  const handleMouseEnterInteractive = () => setIsHovering(true);
  const handleMouseLeaveInteractive = () => setIsHovering(false);

  // Daft Punk - Give Life Back to Music (Drumless Edition)
  const videoId = 'v9j_blPbiUk';

  const handleEnter = () => {
    setEntered(true);
    setMuted(false);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'unMute',
        args: []
      }), '*');
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'playVideo',
        args: []
      }), '*');
      // Set playback speed to 1.15x
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'setPlaybackRate',
        args: [1.15]
      }), '*');
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: nextMuted ? 'mute' : 'unMute',
        args: []
      }), '*');
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans selection:bg-white/30">
      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      />
      <div 
        className="cursor-trail"
        style={{ left: `${trailPosition.x}px`, top: `${trailPosition.y}px` }}
      />
      
      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black cursor-pointer"
            onClick={handleEnter}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-pulse" />
                <Play className="w-16 h-16 text-white relative z-10 ml-2" />
              </div>
              <p className="text-sm tracking-[0.3em] uppercase text-white/60 font-medium">
                Click anywhere to enter
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <iframe
          ref={iframeRef}
          className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] -translate-x-1/2 -translate-y-1/2 object-cover opacity-60"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&enablejsapi=1`}
          allow="autoplay; encrypted-media"
          title="Background Video"
          style={{ pointerEvents: 'none' }}
        />
        {/* Gradients to blend edges and create mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-12 lg:p-24">
        
        {/* Top Bar (Optional, maybe just a subtle logo or time) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : -20 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex justify-between items-center w-full"
        >
          <div className="text-xs font-mono text-white/40 tracking-widest">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <button 
            onClick={handleToggleMute}
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseLeaveInteractive}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-md"
          >
            {muted ? <VolumeX className="w-4 h-4 text-white/70" /> : <Volume2 className="w-4 h-4 text-white/70" />}
          </button>
        </motion.div>

        {/* Center Content: Card & Socials */}
        <div className="flex-1 flex items-center justify-start w-full max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: entered ? 1 : 0, x: entered ? 0 : -50 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="flex items-center gap-6 md:gap-8"
          >
            {/* Main Profile Card */}
            <div className="relative group">
              {/* Subtle glow behind card */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-white/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative flex flex-col w-[320px] sm:w-[380px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden">
                {/* Decorative top accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="flex items-center gap-4 mb-6">
                  {/* Avatar/Logo */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-zinc-800 to-black border border-white/20 flex items-center justify-center shadow-inner overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/daftpunk/200/200')] bg-cover bg-center opacity-50 mix-blend-overlay" />
                    <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 relative z-10">
                      KS
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-semibold tracking-tight text-white">K-S</h1>
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono uppercase tracking-wider text-white/70 border border-white/5">
                        Developer
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono uppercase tracking-wider text-white/70 border border-white/5">
                        Creator
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                <p className="text-sm text-white/60 leading-relaxed font-light italic text-center">
                  "Have a good tomorrow"
                  <br />
                  <span className="not-italic text-white/40 text-xs mt-2 block">~Living~</span>
                </p>
              </div>
            </div>

            {/* Social Icons Column */}
            <div className="flex flex-col gap-4">
              <SocialLink 
                href="https://github.com/esskslifetech" 
                icon={<Github className="w-5 h-5" />} 
                label="GitHub"
                delay={0.7}
                entered={entered}
                onMouseEnter={handleMouseEnterInteractive}
                onMouseLeave={handleMouseLeaveInteractive}
              />
              <SocialLink 
                href="https://www.linkedin.com/in/kanishk-soni-9a04b936a/" 
                icon={<Linkedin className="w-5 h-5" />} 
                label="LinkedIn"
                delay={0.8}
                entered={entered}
                onMouseEnter={handleMouseEnterInteractive}
                onMouseLeave={handleMouseLeaveInteractive}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Ticker / Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 20 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-full flex flex-col items-center justify-center gap-2"
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
            Stats
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/5">
            <Disc3 className="w-4 h-4 text-white/60 animate-[spin_4s_linear_infinite]" />
            <div className="overflow-hidden w-48 sm:w-64">
              <div className="whitespace-nowrap animate-marquee text-xs text-white/70 font-light">
                Playing: Daft Punk - Give Life Back To Music (Drumless) • All rights belong to the original creators •
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// Reusable Social Link Component
function SocialLink({ href, icon, label, delay, entered, onMouseEnter, onMouseLeave }: { 
  href: string, 
  icon: React.ReactNode, 
  label: string, 
  delay: number, 
  entered: boolean,
  onMouseEnter: () => void,
  onMouseLeave: () => void
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: entered ? 1 : 0, x: entered ? 0 : -20 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.1, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300"
      aria-label={label}
    >
      <div className="text-white/70 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      {/* Tooltip */}
      <div className="absolute left-full ml-4 px-2 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {label}
      </div>
    </motion.a>
  );
}
