import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const ServiceCardStack = ({ services, onServiceClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            paginate(1);
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex, isHovered]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = services.length - 1;
            if (nextIndex >= services.length) nextIndex = 0;
            return nextIndex;
        });
    };

    const currentService = services[currentIndex];

    return (
        <div
            className="relative w-full max-w-6xl mx-auto min-h-[480px] sm:min-h-[550px] md:min-h-[630px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Card Container */}
            <div className="relative h-[370px] sm:h-[430px] md:h-[530px] overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full h-full"
                    >
                        {/* Service Card */}
                        <div
                            style={{ backgroundColor: currentService.color || '#121216' }}
                            className="w-full h-full rounded-3xl sm:rounded-[40px] md:rounded-[48px] border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
                        >
                            {/* Content Side */}
                            <div className="flex-1 p-5 sm:p-8 md:p-12 flex flex-col justify-between">
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center bg-accent/10 rounded-xl sm:rounded-2xl text-accent border border-accent/20">
                                        {currentService.icon}
                                    </div>

                                    <div>
                                        <h3 className="text-xl sm:text-2xl md:text-4xl font-black uppercase text-white mb-2 sm:mb-4 leading-none tracking-tighter">
                                            {currentService.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none">
                                            {currentService.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {currentService.points.map((p, idx) => (
                                            <span key={idx} className="px-2.5 sm:px-4 py-1 sm:py-1.5 bg-white/5 border border-white/5 rounded-full text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Discuss Strategy Button */}
                                <div className="pt-3 sm:pt-6">
                                    <button
                                        onClick={() => onServiceClick && onServiceClick(currentService)}
                                        className="flex items-center gap-3 sm:gap-4 text-accent font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs hover:gap-6 transition-all"
                                    >
                                        Discuss Strategy <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Visual Side */}
                            <div className="hidden md:block w-[35%] relative border-l border-white/5 overflow-hidden bg-black">
                                {currentService.video ? (
                                    <video
                                        key={currentService.id}
                                        src={currentService.video}
                                        poster={currentService.image}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-500 pointer-events-none"
                                    />
                                ) : (
                                    <img
                                        src={currentService.image}
                                        alt={currentService.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-500 pointer-events-none"
                                        draggable={false}
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#121216] via-transparent to-transparent z-10" />

                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Section */}
            <div className="w-full flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-12">
                <p className="text-gray-500 text-xs sm:text-sm font-medium px-4 mb-5 sm:mb-8 text-center">
                    Swipe or use arrows to navigate
                </p>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-4 sm:gap-6">
                {/* Previous Button */}
                <button
                    onClick={() => paginate(-1)}
                    className="group flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent transition-all"
                >
                    <ChevronLeft className="text-white group-hover:text-black transition-colors" size={20} />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-2 sm:gap-3">
                    {services.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`h-2 rounded-full transition-all ${index === currentIndex
                                ? 'w-12 bg-accent'
                                : 'w-2 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => paginate(1)}
                    className="group flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent transition-all"
                >
                    <ChevronRight className="text-white group-hover:text-black transition-colors" size={20} />
                </button>
            </div>
        </div>
        </div>
    );
};
