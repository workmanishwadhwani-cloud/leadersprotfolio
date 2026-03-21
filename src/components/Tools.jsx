import React from 'react';
import { motion } from 'framer-motion';

// The data for the stacking cards — exported so App.jsx can pass it to StackingCards
// which must live OUTSIDE the <Reveal> wrapper to preserve position:sticky
export const toolsItems = [
    {
        id: 1,
        title: "Technology Landscape",
        tag: "Engineering DNA",
        description: "Deep technical mastery across Java, C++, C#, and modern web architectures like Microservices, React, and Angular. Bridging legacy systems with future-ready stacks.",
        imageSrc: "/dinesh9.jpeg",
        color: "#1a1a2e",
    },
    {
        id: 2,
        title: "Cloud & Infrastructure",
        tag: "Platform Scale",
        description: "Architecting multi-tenant SaaS ecosystems on Azure, AWS, and IBM Cloud. Ensuring 99.9x availability and high-performance throughput for enterprise-scale platforms.",
        imageSrc: "/dinesh2.jpeg",
        color: "#0f2027",
    },
    {
        id: 3,
        title: "Leadership & Agile",
        tag: "Strategic Growth",
        description: "Pioneering Agile transformations using SAFe and Scrum. Institutionalizing cultures of mentoring, continuous improvement, and high-performance delivery models.",
        imageSrc: "/dinesh3.jpeg",
        color: "#d22727ff",
    },
    {
        id: 4,
        title: "AI Integration",
        tag: "Future Architecture",
        description: "Operationalizing AI across enterprise workflows. Optimizing R&D operations through intelligent forecasting and automated quality institutionalization.",
        imageSrc: "/dinesh4.jpeg",
        color: "#16213e",
    },
    {
        id: 5,
        title: "Global Operations",
        tag: "Enterprise Impact",
        description: "Driving multi-million dollar business objectives by leading 500+ professionals across global R&D lines, focusing on measurable productivity and strategic alignment.",
        imageSrc: "/dinesh14.jpeg",
        color: "#0d0d0d",
    }
];

// The Tools section — renders only the header. Stacking cards are rendered in App.jsx
// outside <Reveal> so position:sticky works correctly.
const Tools = () => {
    return (
        <section id="tools" className="pt-24 pb-8 scroll-mt-32">
            <div className="container">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                        <span className="section-label">Strategic DNA</span>
                        <h2
                            className="text-3xl md:text-4xl font-black uppercase mt-3 mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            The <span className="text-accent accent-underline">Technology Landscape</span>
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                            Mastering the intersection of architectural engineering and high-leverage organizational leadership.
                            Scroll to explore each domain.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Tools;
