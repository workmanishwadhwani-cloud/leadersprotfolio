import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Tools, { toolsItems } from './components/Tools';
import Contact from './components/Contact';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TexturedBackground } from './components/ui/textured-background';
import { Reveal } from './components/ui/reveal.jsx';
import ChatbotWidget from './components/ChatbotWidget';
import YouTubeInsights from './components/YouTubeInsights';
import { ExperienceHighlight } from './components/About';
import StackingCards from './components/ui/stacking-card';

function App() {
    const { scrollYProgress } = useScroll();
    const [activeAboutTab, setActiveAboutTab] = useState('My Vision');

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="App min-h-screen selection:bg-accent selection:text-black">
            {/* Global Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent z-[100] origin-left"
                style={{ scaleX }}
            />

            <Navbar setActiveAboutTab={setActiveAboutTab} />

            <Hero />

            <div className="section-divider" />

            <Reveal width="full">
                <About activeTab={activeAboutTab} setActiveTab={setActiveAboutTab} />
            </Reveal>

            {/*
             * Leadership Journey: About returns null (no empty header/gap).
             * We add a zero-height anchor so #about navbar link still works.
             * ExperienceHighlight is OUTSIDE Reveal — position:sticky requires no
             * overflow:hidden ancestor.
             */}
            {activeAboutTab === 'Leadership Journey' && <ExperienceHighlight />}

            <div className="section-divider" />

            <Reveal width="full">
                <Services />
            </Reveal>

            <div className="section-divider" />

            {/*
             * Tools section: header inside Reveal (safe), stacking cards OUTSIDE Reveal.
             * Stacking cards use position:sticky. overflow:hidden on any ancestor breaks sticky.
             */}
            <Reveal width="full">
                <Tools />
            </Reveal>
            <StackingCards items={toolsItems} />

            <div className="section-divider" />

            <Reveal width="full">
                <YouTubeInsights />
            </Reveal>

            <div className="section-divider" />

            <Reveal width="full">
                <Contact />
            </Reveal>

            <TexturedBackground />
            <ChatbotWidget />
        </div>
    );
}

export default App;
