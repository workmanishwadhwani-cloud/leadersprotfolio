import React from 'react';
import { motion } from 'framer-motion';

const WorldMapBackground = () => {
    // High-quality simplified SVG Path for World Map
    // Sourced from a standard simplified world map projection
    const worldPath = "M667.3,101.4c0,0,10.1,26,38.3,25.1c28.2-0.9,41.9-15.4,41.9-15.4s11,9.3,20.7,5.3c9.7-4,4-15.4,4-15.4s15.9-11.9,6.2-22.9c-9.7-11-28.2-12.8-28.2-12.8s-40.5,7.9-52.9,0.9c-12.3-7-15.4,15.9-15.4,15.9S662.9,92.6,667.3,101.4z M583.2,306.6c0,0,23.3-11.9,35.2,5.7c11.9,17.6-1.8,28.6-1.8,28.6s-15.9,7.5-23.8-3.1C584.9,327.3,583.2,306.6,583.2,306.6z M207.5,357.5c0,0,17.6-5.3,23.3,12.3c5.7,17.6-7.5,30.8-7.5,30.8s-17.6,4.4-24.2-7.5C192.5,381.3,207.5,357.5,207.5,357.5z M156.4,124.7c0,0-5.7-18.1-1.3-21.7s16.3-5.7,16.3-5.7s5.3,1.3,7.5,13.2s-2.6,22.5-2.6,22.5s-7.9,10.6-1.8,17.2s21.1,11.9,21.1,11.9s10.6-7.5,17.6-0.4s7.5,17.2,3.1,22c-4.4,4.8-19.8,11.9-19.8,11.9s-9.3,2.2-7.1,8.8s7.9,13.7,7.9,13.7s-10.1,5.3-15.4,3.1c-5.3-2.2-12.8-10.6-12.8-10.6s-16.3-11-20.3-22s0.9-22,0.9-22S156.4,124.7,156.4,124.7z M339.2,143.2c0,0,13.7-27.3,31.7-25.5c18.1,1.8,24.7,18.9,24.7,18.9s16.7-12.8,28.6,0.9c11.9,13.7-3.1,23.3-3.1,23.3l5.3,18.5c0,0,12.8,3.5,6.2,13.7c-6.6,10.1-23.8,17.6-23.8,17.6s-11.9,6.2-22.9-4.8c-11-11-0.9-23.3-0.9-23.3s-14.5,1.8-19.4-7c-4.8-8.8,3.5-17.6,3.5-17.6S358.1,155.1,339.2,143.2z M272.2,277.5c0,0,13.7,0.4,18.5,8.8s-3.5,18.1-3.5,18.1l-15,11.9c0,0-10.1,2.6-14.1-3.5s-3.5-16.7,0.4-23.3C262.6,282.8,272.2,277.5,272.2,277.5z";

    // Since I cannot fetch an external SVG easily, I'm using an overlay image strategy which is robost.
    // I will use a high-res PNG/SVG from a reliable CDN that matches the reference style (Solid Blue Map)
    // and overlay a CSS Hex Grid.

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none flex items-center justify-center bg-[#050A18]">

            {/* 1. Hexagonal Grid Background - CSS Generated */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' stroke='%233b82f6' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                    backgroundSize: '50px 50px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            />

            {/* 2. World Map Image from a reliable CDN (WikiMedia Simplified SVG) */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png"
                    alt="World Map"
                    className="w-full h-full object-cover opacity-40 mix-blend-screen"
                    style={{
                        filter: 'sepia(1) hue-rotate(190deg) saturate(3) brightness(0.6) drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))'
                    }}
                />
            </motion.div>

            {/* 3. Gradient Overlay to merge edges */}
            <div className="absolute inset-0 bg-radial-[circle_at_center_transparent_0%_#0a0a0a_100%] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

        </div>
    );
};

export default WorldMapBackground;
