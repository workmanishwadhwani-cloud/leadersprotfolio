import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 0,
        quote: "Dinesh's leadership and empathy make him a rare manager who motivates teams, resolves conflicts calmly, and builds a positive, high-trust work environment.",
        name: "Rajesh Dankh",
        role: "Senior Leader, NICE Ltd",
        imgSrc: "/rajesh.png",
    },
    {
        id: 1,
        quote: "Dinesh's technical expertise and supportive nature create a productive, positive atmosphere where teams feel confident and empowered to deliver their best.",
        name: "Rommel Sharma",
        role: "Engineering Lead",
        imgSrc: "/rommel.png",
    },
    {
        id: 2,
        quote: "Dinesh's encouraging and open approach helps team members grow, explore new technologies, and enjoy their work while performing at their highest potential.",
        name: "Seema Kamble Nadkarni",
        role: "Technology Specialist",
        imgSrc: "/seema.png",
    },
    {
        id: 3,
        quote: "Dinesh's disciplined planning, fairness, and sound judgment inspire confidence in his teams, even under pressure, enabling consistent and high-quality delivery.",
        name: "Sandeep Garud",
        role: "Senior Engineer",
        imgSrc: "/sandeep.png",
    },
    {
        id: 4,
        quote: "Dinesh's ability to lead multi-layered teams, solve complex problems, and communicate effectively across cultures makes him an invaluable asset to any organization.",
        name: "Anand Mitragotri",
        role: "Engineering Manager",
        imgSrc: "/anand.png",
    },
    {
        id: 5,
        quote: "Dinesh's disciplined yet cheerful leadership style drives projects smoothly while creating an environment where team members feel comfortable, motivated, and supported.",
        name: "Manisha Bathia",
        role: "Product Specialist",
        imgSrc: "https://ui-avatars.com/api/?name=Manisha+Bathia&background=d4af37&color=000&size=400",
    },
];

/* ─────────────────────────────────────────────
   All cards share IDENTICAL fixed dimensions:
   width: 260px  |  image height: 270px  |  text block: fixed
   Active card is distinguished by accent bg + scale + glow only
───────────────────────────────────────────── */
const CARD_W = 260;   // px — same for every card
const IMG_H = 270;   // px — same for every card

const TestimonialCard = ({ t, isActive, onClick }) => (
    <motion.div
        layout
        onClick={onClick}
        animate={{ scale: isActive ? 1 : 0.88, opacity: isActive ? 1 : 0.65 }}
        whileHover={!isActive ? { scale: 0.93, opacity: 0.85 } : {}}
        transition={{ type: "spring", stiffness: 340, damping: 30 }}
        className={`relative flex-shrink-0 flex flex-col rounded-2xl overflow-hidden cursor-pointer select-none
            ${isActive
                ? "ring-2 ring-accent shadow-[0_0_48px_rgba(212,175,55,0.3)] z-10"
                : ""
            }`}
        style={{ width: CARD_W }}
    >
        {/* ── Photo — FIXED 270px, never changes ── */}
        <div
            className="relative overflow-hidden flex-shrink-0"
            style={{ width: CARD_W, height: IMG_H }}
        >
            <img
                src={t.imgSrc}
                alt={t.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
                draggable={false}
            />
            {/* gradient fade into card body */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

            {/* Active dot indicator */}
            {isActive && (
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            )}
        </div>

        {/* ── Text body ── */}
        <div
            className={`flex-1 px-5 pt-5 pb-6 ${isActive ? "bg-accent" : "bg-[#111116]"}`}
        >
            <p className={`text-sm font-semibold leading-relaxed mb-5 line-clamp-4
                ${isActive ? "text-black" : "text-gray-200"}`}
            >
                "{t.quote}"
            </p>
            <p className={`text-[11px] font-black uppercase tracking-widest
                ${isActive ? "text-black/70" : "text-accent"}`}
            >
                — {t.name}
            </p>
            <p className={`text-[10px] mt-1 ${isActive ? "text-black/50" : "text-gray-500"}`}>
                {t.role}
            </p>
        </div>
    </motion.div>
);

export const TestimonialCards = () => {
    const [active, setActive] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef(null);

    const next = () => setActive((p) => (p + 1) % testimonials.length);
    const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

    useEffect(() => {
        if (isHovered) return;
        timerRef.current = setInterval(next, 4500);
        return () => clearInterval(timerRef.current);
    }, [isHovered, active]);

    // Always keep active in center; show ±2 neighbours (5 visible of 6)
    const visible = () => {
        const result = [];
        for (let i = -2; i <= 2; i++) {
            const idx = (active + i + testimonials.length) % testimonials.length;
            result.push({ ...testimonials[idx], offset: i });
        }
        return result;
    };

    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Cards row — bottom-aligned so taller active card rises upward */}
            <div className="flex items-end justify-center gap-3 px-4 py-8 overflow-hidden">
                {visible().map(({ offset, ...t }) => (
                    <TestimonialCard
                        key={t.id}
                        t={t}
                        isActive={offset === 0}
                        onClick={() => {
                            const target = (active + offset + testimonials.length) % testimonials.length;
                            setActive(target);
                        }}
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-2 pb-4">
                <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white
                        hover:bg-accent hover:text-black hover:border-accent transition-all duration-200
                        flex items-center justify-center"
                >
                    <ChevronLeft size={18} />
                </button>

                <div className="flex gap-2 items-center">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            className={`rounded-full transition-all duration-300 ${i === active
                                    ? "bg-accent w-6 h-2"
                                    : "bg-white/20 w-2 h-2 hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white
                        hover:bg-accent hover:text-black hover:border-accent transition-all duration-200
                        flex items-center justify-center"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};
