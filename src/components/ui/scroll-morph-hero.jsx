import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Constants ---
const IMG_WIDTH = 100;
const IMG_HEIGHT = 100;
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;

// Coaching & leadership themed images
const IMAGES = [
    "/dinesh1.jpeg",
    "/dinesh2.jpeg",
    "/dinesh3.jpeg",
    "/dinesh4.jpeg",
    "/dinesh5.jpeg",
    "/dinesh6.jpeg",
    "/dinesh7.jpeg",
    "/dinesh8.jpeg",
    "/dinesh9.jpeg",
    "/dinesh10.jpeg",
    "/dinesh11.jpeg",
    "/dinesh13.jpeg",
    "/dinesh14.jpeg",
    "/dinesh15.jpeg",
    "/dinesh16.jpeg",
    "/dinesh17.jpeg",
    "/dinesh18.jpeg",
    "/dinesh1.jpeg",
    "/dinesh2.jpeg",
    "/dinesh3.jpeg",
];

const lerp = (start, end, t) => start * (1 - t) + end * t;

// --- FlipCard ---
function FlipCard({ src, index, target }) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img src={src} alt={`gallery-${index}`} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg flex flex-col items-center justify-center p-3 border border-[#d4af37]/30"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "rgba(10,10,10,0.95)",
                    }}
                >
                    <div className="text-center">
                        <p className="text-[7px] font-black text-[#d4af37] uppercase tracking-widest mb-1">Impact</p>
                        <p className="text-[9px] font-medium text-white leading-tight">Leadership<br />Moment</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Component ---
export default function ImpactGallery() {
    const [introPhase, setIntroPhase] = useState("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);

    // Container size observer
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });
        observer.observe(containerRef.current);
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });
        return () => observer.disconnect();
    }, []);

    // Virtual scroll
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        let touchStartY = 0;
        const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
        const handleTouchMove = (e) => {
            const delta = touchStartY - e.touches[0].clientY;
            touchStartY = e.touches[0].clientY;
            const newScroll = Math.min(Math.max(scrollRef.current + delta, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: true });
        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // Scroll transforms
    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // Mouse parallax
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 80);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // Intro sequence: scatter → line → circle
    useEffect(() => {
        const t1 = setTimeout(() => setIntroPhase("line"), 400);
        const t2 = setTimeout(() => setIntroPhase("circle"), 2200);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    // Random scatter positions (stable via useMemo)
    const scatterPositions = useMemo(() => IMAGES.map(() => ({
        x: (Math.random() - 0.5) * 1400,
        y: (Math.random() - 0.5) * 900,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.5,
        opacity: 0,
    })), []);

    // Live values for rendering
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const u1 = smoothMorph.on("change", setMorphValue);
        const u2 = smoothScrollRotate.on("change", setRotateValue);
        const u3 = smoothMouseX.on("change", setParallaxValue);
        return () => { u1(); u2(); u3(); };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div
            ref={containerRef}
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ height: "700px", background: "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)" }}
        >
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Section label */}
            <div className="absolute top-5 left-5 z-20 pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37]/60">
                    Impact Gallery
                </span>
            </div>

            {/* Scroll hint */}
            <motion.div
                animate={introPhase === "circle" && morphValue < 0.5
                    ? { opacity: 0.7 - morphValue }
                    : { opacity: 0 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]/50"
                >
                    ↕ Scroll to explore
                </motion.div>
            </motion.div>

            {/* Arc content label */}
            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="absolute top-8 z-10 w-full flex flex-col items-center text-center pointer-events-none px-4"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#d4af37] mb-2">
                    Two Decades of Leadership
                </span>
                <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight">
                    Scroll to browse milestones
                </h3>
            </motion.div>

            {/* Intro text */}
            <div className="absolute z-0 inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={introPhase === "circle" && morphValue < 0.4
                        ? { opacity: 0.8 - morphValue * 2, y: 0 }
                        : { opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-xs font-black uppercase tracking-[0.4em] text-[#d4af37]/50"
                >
                    A journey of impact
                </motion.p>
            </div>

            {/* Image gallery */}
            <div className="relative flex items-center justify-center w-full h-full">
                {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                    let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                    if (introPhase === "scatter") {
                        target = scatterPositions[i];
                    } else if (introPhase === "line") {
                        const spacing = 68;
                        const totalW = TOTAL_IMAGES * spacing;
                        target = { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
                    } else {
                        const isMobile = containerSize.width < 768;
                        const minDim = Math.min(containerSize.width, containerSize.height);

                        // Circle position
                        const circleRadius = Math.min(minDim * 0.3, 280);
                        const circleAngle = (i / TOTAL_IMAGES) * 360;
                        const circleRad = (circleAngle * Math.PI) / 180;
                        const circlePos = {
                            x: Math.cos(circleRad) * circleRadius,
                            y: Math.sin(circleRad) * circleRadius,
                            rotation: circleAngle + 90,
                        };

                        // Arc position
                        const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                        const arcRadius = baseRadius * (isMobile ? 1.3 : 1.0);
                        const arcApexY = containerSize.height * (isMobile ? 0.3 : 0.2);
                        const arcCenterY = arcApexY + arcRadius;
                        const spreadAngle = isMobile ? 95 : 125;
                        const startAngle = -90 - spreadAngle / 2;
                        const step = spreadAngle / (TOTAL_IMAGES - 1);
                        const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                        const boundedRotation = -scrollProgress * spreadAngle * 0.8;

                        const currentArcAngle = startAngle + i * step + boundedRotation;
                        const arcRad = (currentArcAngle * Math.PI) / 180;
                        const arcPos = {
                            x: Math.cos(arcRad) * arcRadius + parallaxValue,
                            y: Math.sin(arcRad) * arcRadius + arcCenterY,
                            rotation: currentArcAngle + 90,
                            scale: isMobile ? 1.3 : 1.7,
                        };

                        target = {
                            x: lerp(circlePos.x, arcPos.x, morphValue),
                            y: lerp(circlePos.y, arcPos.y, morphValue),
                            rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                            scale: lerp(1, arcPos.scale, morphValue),
                            opacity: 1,
                        };
                    }

                    return (
                        <FlipCard key={i} src={src} index={i} target={target} />
                    );
                })}
            </div>

            {/* Gold bottom gradient */}
            <div
                className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
                style={{ background: "linear-gradient(transparent, rgba(10,10,10,0.8))" }}
            />
        </div>
    );
}
