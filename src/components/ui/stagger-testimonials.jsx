"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
    {
        tempId: 0,
        testimonial: "Dinesh's leadership and empathy make him a rare manager who motivates teams, resolves conflicts calmly, and builds a positive, high-trust work environment.",
        by: "Rajesh Dankh",
        imgSrc: "/rajesh.png "
    },
    {
        tempId: 1,
        testimonial: "Dinesh's technical expertise and supportive nature create a productive, positive atmosphere where teams feel confident and empowered to deliver their best.",
        by: "Rommel Sharma",
        imgSrc: "/rommel.png"
    },
    {
        tempId: 2,
        testimonial: "Dinesh's encouraging and open approach helps team members grow, explore new technologies, and enjoy their work while performing at their highest potential.",
        by: "Seema Kamble Nadkarni",
        imgSrc: "/seema.png"
    },
    {
        tempId: 3,
        testimonial: "Dinesh's disciplined planning, fairness, and sound judgment inspire confidence in his teams, even under pressure, enabling consistent and high-quality delivery.",
        by: "Sandeep Garud",
        imgSrc: "sandeep.png"
    },
    {
        tempId: 4,
        testimonial: "Dinesh's ability to lead multi-layered teams, solve complex problems, and communicate effectively across cultures makes him an invaluable asset to any organization.",
        by: "Anand Mitragotri",
        imgSrc: "anand.png"
    },
    {
        tempId: 5,
        testimonial: "Dinesh's disciplined yet cheerful leadership style drives projects smoothly while creating an environment where team members feel comfortable, motivated, and supported.",
        by: "Manisha Bathia",
        imgSrc: "https://ui-avatars.com/api/?name=Manisha+Bathia&background=d4af37&color=000"
    }
];

const TestimonialCard = ({
    position,
    testimonial,
    handleMove,
    cardSize
}) => {
    const isCenter = position === 0;

    return (
        <div
            onClick={() => handleMove(position)}
            className={cn(
                "absolute left-1/2 top-1/2 cursor-pointer border-2 p-4 sm:p-6 md:p-8 transition-all duration-500 ease-in-out",
                isCenter
                    ? "z-10 bg-accent text-black border-accent shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
                    : "z-0 bg-bg-secondary backdrop-blur-xl text-white border-white/5 hover:border-accent/50 shadow-2xl"
            )}
            style={{
                width: cardSize,
                height: cardSize,
                backgroundColor: isCenter ? 'var(--accent)' : 'rgb(18, 18, 22)',
                clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
                transform: `
          translate(-50%, -50%)
          translateX(${Math.min(cardSize / 1.5, window.innerWidth * 0.35) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
            }}
        >
            <span
                className="absolute block origin-top-right rotate-45 bg-white/5"
                style={{
                    right: -2,
                    top: 48,
                    width: SQRT_5000,
                    height: 2
                }}
            />
            <div className="mb-3 sm:mb-6 relative">
                <img
                    src={testimonial.imgSrc}
                    alt={testimonial.by}
                    className="h-10 w-9 sm:h-16 sm:w-14 grayscale group-hover:grayscale-0 object-cover object-top rounded-lg border-2 border-white/10"
                    style={{
                        boxShadow: isCenter ? "3px 3px 0px black" : "3px 3px 0px rgba(255,255,255,0.05)"
                    }}
                />
                {isCenter && <div className="absolute -top-2 -right-2 w-4 h-4 bg-black rounded-full border-2 border-accent" />}
            </div>
            <h3 className={cn(
                "text-sm sm:text-lg md:text-xl font-black leading-tight mb-2 sm:mb-4",
                isCenter ? "text-black" : "text-white"
            )}>
                "{testimonial.testimonial}"
            </h3>
            <p className={cn(
                "absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 mt-2 text-[8px] sm:text-xs font-bold uppercase tracking-widest",
                isCenter ? "text-black/70" : "text-gray-400"
            )}>
                — {testimonial.by}
            </p>
        </div>
    );
};

export const StaggerTestimonials = () => {
    const [cardSize, setCardSize] = useState(365);
    const [testimonialsList, setTestimonialsList] = useState(testimonials);

    const handleMove = (steps) => {
        const newList = [...testimonialsList];
        if (steps > 0) {
            for (let i = steps; i > 0; i--) {
                const item = newList.shift();
                if (!item) return;
                newList.push({ ...item, tempId: Math.random() });
            }
        } else {
            for (let i = steps; i < 0; i++) {
                const item = newList.pop();
                if (!item) return;
                newList.unshift({ ...item, tempId: Math.random() });
            }
        }
        setTestimonialsList(newList);
    };

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setTestimonialsList((prev) => {
                const newList = [...prev];
                const item = newList.shift();
                if (!item) return prev;
                newList.push({ ...item, tempId: Math.random() });
                return newList;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovered]);

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            if (width < 480) setCardSize(220);
            else if (width < 640) setCardSize(260);
            else if (width < 1024) setCardSize(320);
            else setCardSize(365);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <div
            className="relative w-full overflow-hidden py-12 sm:py-16 md:py-24 bg-bg-primary"
            style={{ height: typeof window !== 'undefined' && window.innerWidth < 640 ? 480 : 700 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {testimonialsList.map((testimonial, index) => {
                const position = testimonialsList.length % 2
                    ? index - (testimonialsList.length + 1) / 2
                    : index - testimonialsList.length / 2;
                return (
                    <TestimonialCard
                        key={testimonial.id || testimonial.tempId}
                        testimonial={testimonial}
                        handleMove={handleMove}
                        position={position}
                        cardSize={cardSize}
                    />
                );
            })}

            {/* Controls */}
            <div className="absolute bottom-6 sm:bottom-10 left-1/2 flex -translate-x-1/2 gap-4 sm:gap-6 z-20">
                <button
                    onClick={() => handleMove(-1)}
                    className={cn(
                        "flex h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center text-xl sm:text-2xl transition-all duration-300",
                        "bg-bg-secondary border-2 border-white/5 rounded-xl sm:rounded-2xl text-white hover:bg-accent hover:text-black hover:border-accent shadow-2xl",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    )}
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft size={18} className="sm:w-6 sm:h-6" />
                </button>
                <button
                    onClick={() => handleMove(1)}
                    className={cn(
                        "flex h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center text-xl sm:text-2xl transition-all duration-300",
                        "bg-bg-secondary border-2 border-white/5 rounded-xl sm:rounded-2xl text-white hover:bg-accent hover:text-black hover:border-accent shadow-2xl",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    )}
                    aria-label="Next testimonial"
                >
                    <ChevronRight size={18} className="sm:w-6 sm:h-6" />
                </button>
            </div>
        </div>
    );
};
