import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const Reveal = ({
    children,
    width = "fit-content",
    delay = 0.15,
    duration = 0.65,
    y = 40,
    className = ""
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} className={`${width === "full" ? "w-full" : "w-fit"} ${className} relative overflow-hidden`}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{
                    duration,
                    delay,
                    ease: [0.21, 0.47, 0.32, 0.98], // custom spring-like cubic bezier
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
