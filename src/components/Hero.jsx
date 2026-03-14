import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/hero-coach.png';
import { motion } from 'framer-motion';
import { ShaderBackground } from './ui/neural-background';

import { TypewriterEffect } from './ui/typewriter-effect';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const descriptionWords = [
        { text: "Building", className: "text-gray-400" },
        { text: "exceptional", className: "text-gray-400" },
        { text: "leaders", className: "text-gray-400" },
        { text: "through", className: "text-gray-400" },
        { text: "1:1", className: "text-gray-400" },
        { text: "coaching,", className: "text-gray-400" },
        { text: "group", className: "text-gray-400" },
        { text: "workshops,", className: "text-gray-400" },
        { text: "and", className: "text-gray-400" },
        { text: "transformational", className: "text-gray-400" },
        { text: "offsites", className: "text-gray-400" },
    ];

    return (
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden py-20 md:py-0">
            {/* Base shader background layer */}
            <ShaderBackground />

            <div className="container relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-left"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-block mb-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                        >
                            <span className="text-accent text-xs sm:text-sm font-semibold tracking-wide uppercase">
                                Hi, I am
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="mb-1 leading-tight text-white text-4xl sm:text-5xl md:text-6xl"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Dinesh
                        </motion.h1>

                        <motion.h2
                            variants={itemVariants}
                            className="text-xl sm:text-2xl md:text-3xl font-bold text-accent mb-2"
                        >
                            Executive Coach &amp; Leadership Advisor
                        </motion.h2>

                        <div className="mb-6 sm:mb-10 min-h-[50px] sm:min-h-[60px]">
                            <TypewriterEffect
                                words={descriptionWords}
                                className="max-w-xl text-base sm:text-lg md:text-xl text-gray-400 text-left"
                                cursorClassName="bg-accent h-4 md:h-5 hidden"
                            />
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-start gap-4"
                        >
                            <motion.a
                                whileHover={{ x: 5 }}
                                href="#about"
                                className="btn btn-primary text-sm px-5 py-2.5"
                            >
                                My Vision <ArrowRight size={15} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                href="#contact"
                                className="btn btn-outline text-sm px-5 py-2.5"
                            >
                                Book a Consultation
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        className="relative flex justify-center md:justify-end flex items-end self-end pt-10 md:pt-20"
                    >
                        <div className="relative w-full max-w-[300px] md:max-w-[450px] lg:max-w-[550px] group">
                            <motion.img
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                src={heroImage}
                                alt="Dinesh"
                                className="w-full h-auto max-h-[70vh] md:max-h-[85vh] object-contain object-bottom relative z-10 drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                            />

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
