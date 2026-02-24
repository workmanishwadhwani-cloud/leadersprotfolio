import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

export const StackingCard = ({
    i,
    title,
    tag,
    description,
    imageSrc,
    color,
    progress,
    range,
    targetScale,
}) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start'],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className="h-screen flex items-center justify-center sticky top-20"
        >
            <motion.div
                style={{
                    backgroundColor: color,
                    scale,
                    top: `calc(-5vh + ${i * 25}px)`,
                }}
                className="flex flex-col relative h-[520px] w-[85%] max-w-5xl rounded-3xl p-8 md:p-12 origin-top overflow-hidden border border-white/5"
            >
                {/* Tag */}
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/40 mb-2">
                    {tag}
                </span>

                {/* Title */}
                <h2
                    className="text-2xl md:text-4xl font-black uppercase text-white tracking-tight mb-8 leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    {title}
                </h2>

                <div className="flex h-full gap-8 md:gap-14 overflow-hidden">
                    {/* Left: description */}
                    <div className="w-[38%] flex flex-col justify-between">
                        <p className="text-sm md:text-base text-white/70 leading-relaxed">
                            {description}
                        </p>
                        <span className="flex items-center gap-2 mt-6">
                            <span className="text-white/40 text-[11px] font-bold uppercase tracking-widest underline underline-offset-4">
                                Expertise area
                            </span>
                            <svg width="18" height="11" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                                    fill="rgba(255,255,255,0.35)"
                                />
                            </svg>
                        </span>
                    </div>

                    {/* Right: image */}
                    <div className="relative flex-1 rounded-2xl overflow-hidden">
                        <motion.div className="w-full h-full" style={{ scale: imageScale }}>
                            <img
                                src={imageSrc}
                                alt={title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </motion.div>
                        {/* Gradient overlay on image */}
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
                    </div>
                </div>

                {/* Gold bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
            </motion.div>
        </div>
    );
};

const StackingCards = ({ items }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    return (
        <ReactLenis root options={{ lerp: 0.07, duration: 1.5 }}>
            <div ref={container}>
                {items.map((item, i) => {
                    const targetScale = 1 - (items.length - i) * 0.05;
                    return (
                        <StackingCard
                            key={item.id}
                            i={i}
                            title={item.title}
                            tag={item.tag}
                            description={item.description}
                            imageSrc={item.imageSrc}
                            color={item.color}
                            progress={scrollYProgress}
                            range={[i / items.length, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </ReactLenis>
    );
};

export default StackingCards;
