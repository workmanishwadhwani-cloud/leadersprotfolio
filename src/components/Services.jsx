import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Target,
    Sparkles,
    Brain,
    X,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import { ServiceCardStack } from './ui/service-card-stack';

const services = [
    {
        id: 1,
        title: "Executive 1:1 Coaching",
        description: "Personalized strategic partnership for senior leaders seeking to amplify their executive presence, decision-making clarity, and leadership impact across the organization.",
        icon: <Brain className="w-6 h-6" />,
        image: "/coaching1.jpg",
        color: "#1a1a2e",
        // video: "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4",
        points: ["Executive Presence", "Strategic Thinking", "Stakeholder Management", "Decision Clarity"],
        details: [
            "Deep-dive assessments to identify growth levers",
            "Customized coaching roadmap aligned with business goals",
            "Bi-weekly sessions with accountability frameworks",
            "360° feedback integration for holistic development",
            "Real-time support for critical leadership moments"
        ]
    },
    {
        id: 2,
        title: "Leadership Team Offsites",
        description: "High-impact alignment sessions designed for C-Suite and senior leadership teams to build cohesion, align strategy, and unlock collective intelligence.",
        icon: <Users className="w-6 h-6" />,
        image: "/coaching3.jpg",
        color: "#2a1b18",
        video: "https://cdn.pixabay.com/video/2019/06/21/24634-343750098_large.mp4",
        points: ["Team Alignment", "Strategy Mapping", "Conflict Resolution", "Vision Building"],
        details: [
            "Pre-offsite stakeholder interviews and diagnostics",
            "Facilitated sessions using proven frameworks",
            "Team dynamics and trust-building exercises",
            "Action planning with measurable outcomes",
            "Post-offsite follow-up and progress tracking"
        ]
    },
    {
        id: 3,
        title: "Cultural Transformation",
        description: "Scaling leadership culture across organizations by embedding coaching mindsets, psychological safety, and high-performance behaviors into the DNA of teams.",
        icon: <Sparkles className="w-6 h-6" />,
        image: "/dinesh16.jpeg",
        color: "#12222a",
        video: "https://cdn.pixabay.com/video/2020/02/04/31777-389843219_large.mp4",
        points: ["Culture Design", "Change Management", "Behavioral Shifts", "Scalable Frameworks"],
        details: [
            "Cultural pulse assessment and gap analysis",
            "Leadership behavior model design",
            "Train-the-trainer programs for internal champions",
            "Embedding coaching into performance systems",
            "Longitudinal impact measurement and reporting"
        ]
    },
    {
        id: 4,
        title: "High-Impact Workshops",
        description: "Intensive, immersive workshops on Emotional Intelligence, conflict resolution, and high-performance leadership, designed for lasting behavioral transformation.",
        icon: <Target className="w-6 h-6" />,
        image: "/dinesh17.jpeg",
        color: "#261a29",
        video: "https://cdn.pixabay.com/video/2016/09/02/4913-181759256_large.mp4",
        points: ["EQ Training", "Conflict Mastery", "Performance Labs", "Team Dynamics"],
        details: [
            "Interactive, experience-based learning modules",
            "Real-world scenario simulations and role-plays",
            "EQ-i 2.0 assessment integration",
            "Personalized development action plans",
            "Follow-up micro-learning reinforcement"
        ]
    }
];

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);

    return (
        <section id="services" className="py-24 scroll-mt-32">
            <div className="container">
                {/* Header */}
                <div className="mb-14">
                    <span className="section-label">What I offer</span>
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="text-3xl md:text-4xl font-black uppercase mt-3"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Advisory <span className="text-accent accent-underline">Services</span>
                    </motion.h2>
                </div>

                {/* Card Stack */}
                <ServiceCardStack
                    services={services}
                    onServiceClick={(service) => setSelectedService(service)}
                />

                {/* Service Detail Modal */}
                <AnimatePresence>
                    {selectedService && (
                        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 pt-20 sm:pt-24">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedService(null)}
                                className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 100, rotateX: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 100, rotateX: 10 }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{ backgroundColor: selectedService.color || '#121216' }}
                                className="relative w-full max-w-5xl border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[40px] shadow-3xl max-h-[80vh] flex flex-col md:flex-row"
                            >
                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedService(null)}
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:text-accent transition-colors z-20 border border-white/10"
                                >
                                    <X size={20} />
                                </button>

                                {/* Left: Full-height Image */}
                                <div className="hidden md:block md:w-[45%] relative overflow-hidden">
                                    <img
                                        src={selectedService.image}
                                        alt={selectedService.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    {/* Subtle right-edge gradient for blending */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#121216]/40" />
                                </div>

                                {/* Mobile: Top image strip */}
                                <div className="md:hidden relative w-full h-48 sm:h-56 overflow-hidden">
                                    <img
                                        src={selectedService.image}
                                        alt={selectedService.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent" />
                                </div>

                                {/* Right: Content */}
                                <div
                                    data-lenis-prevent
                                    className="flex-1 overflow-y-auto overscroll-contain scrollbar-hide p-6 sm:p-8 md:p-10 lg:p-12"
                                >
                                    {/* Icon */}
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-accent/10 rounded-xl sm:rounded-2xl border border-accent/20 text-accent mb-6 sm:mb-8">
                                        {selectedService.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white leading-tight tracking-tighter mb-8 sm:mb-10">
                                        {selectedService.title}
                                    </h3>

                                    {/* Details list */}
                                    <div className="space-y-5 sm:space-y-6 mb-10 sm:mb-12">
                                        {selectedService.details.map((detail, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-3 sm:gap-4"
                                            >
                                                <CheckCircle2 size={18} className="text-accent mt-0.5 shrink-0" />
                                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{detail}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Discuss Strategy Button (gold) */}
                                    <a
                                        href="#contact"
                                        onClick={() => setSelectedService(null)}
                                        className="block w-full py-4 sm:py-5 bg-[#d4af37] text-black text-center font-black uppercase tracking-widest text-xs sm:text-sm rounded-xl sm:rounded-2xl hover:bg-white transition-colors mb-3 sm:mb-4"
                                    >
                                        Discuss This Strategic Intervention
                                    </a>

                                    {/* Back to Overview */}
                                    <button
                                        onClick={() => setSelectedService(null)}
                                        className="w-full py-3 sm:py-4 bg-white/5 border border-white/10 text-gray-400 text-center font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs rounded-xl sm:rounded-2xl hover:bg-white/10 hover:text-white transition-colors"
                                    >
                                        Back to Overview
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Services;
