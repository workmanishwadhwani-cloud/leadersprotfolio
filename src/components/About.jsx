import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase,
    Sprout,
    GraduationCap,
    Award,
    Target,
    ChevronDown,
    ChevronRight,
    Quote,
    CheckCircle2,
    Calendar,
    ArrowRight,
    X,
    Clock,
    Zap,
    Heart,
    Users,
    MessageSquare,
    Sparkles,
    Brain,
    Shield
} from 'lucide-react';
import { TestimonialCards } from './ui/testimonial';
import { ContainerScroll, ContainerSticky, ProcessCard, ProcessCardTitle, ProcessCardBody } from './ui/process-timeline';
import ImpactGallery from './ui/scroll-morph-hero';

const About = ({ activeTab, setActiveTab }) => {

    const tabs = [
        "My Vision",
        "Leadership Journey",
        "Impact Gallery"
    ];


    return (
        <>
            <section id="about" className="scroll-mt-32">
                <div className="container">

                    {/* Header — always visible */}
                    <div className="pt-24 mb-10">
                        <span className="section-label">
                            Empowering the next generation of leaders
                        </span>
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="text-3xl md:text-4xl font-black uppercase mt-3"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            About <span className="text-accent accent-underline">Dinesh</span>
                        </motion.h2>
                    </div>

                    {/* ── Tab Pills — ALWAYS visible ── */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <motion.button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`relative px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300 ${isActive
                                        ? 'text-black'
                                        : 'text-gray-400 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="about-active-tab"
                                            className="absolute inset-0 rounded-full bg-accent"
                                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab}</span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Tab Content — hidden on Leadership Journey (ExperienceHighlight renders in App.jsx) */}
                    {activeTab !== 'Leadership Journey' && (
                        <div className="relative min-h-[350px] pb-16">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 24, scale: 0.99 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.99 }}
                                    transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                                >
                                    {activeTab === 'My Vision' && <ProfessionalIdentity setActiveTab={setActiveTab} />}
                                    {activeTab === 'Impact Gallery' && <ImpactGallery />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}

                </div>
            </section>
        </>
    );
};

/* --- Section Components --- */

const ProfessionalIdentity = ({ setActiveTab }) => {
    const [topIndex, setTopIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const images = [
        "/dinesh1.jpeg",
        "/dinesh15.jpeg",
        "/dinesh4.jpeg"
    ];

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setTopIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length, isHovered]);

    return (
        <div className="relative p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[40px] lg:rounded-[60px] border border-white/5 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/dinesh9.jpeg"
                    alt=""
                    className="w-full h-full object-cover opacity-30 grayscale transition-opacity duration-700 hover:opacity-50"
                />
                <div className="absolute inset-0 bg-[#121216]/70 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
                {/* Visual Stack Column */}
                <div
                    className="relative h-[300px] sm:h-[400px] lg:h-[600px] group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {images.map((img, i) => {
                        const isTop = i === topIndex;
                        const order = (i - topIndex + images.length) % images.length;

                        return (
                            <motion.div
                                key={i}
                                animate={{
                                    zIndex: images.length - order,
                                    rotate: order === 0 ? 0 : order === 1 ? -5 : 5,
                                    scale: 1 - order * 0.05,
                                    y: order * 20,
                                    x: order * 20,
                                    opacity: 1
                                }}
                                className="absolute inset-0 rounded-2xl sm:rounded-3xl lg:rounded-[40px] overflow-hidden border-2 border-white/10 shadow-3xl"
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <img src={img} alt="" className={`w-full h-full object-cover object-top transition-all duration-700 ${isTop ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            </motion.div>
                        );
                    })}
                </div>

                {/* Content Column */}
                <div className="space-y-12">
                    <div>
                        <div className="text-3xl sm:text-4xl font-black uppercase leading-none mb-6 sm:mb-8">
                            The Leadership <br /> <span className="text-accent underline decoration-white/5">Architect</span>
                        </div>
                        <div className="space-y-4 sm:space-y-6 text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl">
                            <p>
                                I am an AI-driven engineering leader with over 27 years of experience in designing, building, and delivering enterprise-scale software products. My career has focused on shaping product strategy, technology direction, and execution to successfully ship complex platforms used at scale across global markets.
                            </p>
                            <p>
                                Currently, I serve as Senior Director of Engineering at NICE Ltd., where I lead the Workforce and Customer Experience (WCX) engineering organization, a 400+ member team responsible for delivering enhancements across eight enterprise product lines.
                            </p>
                            <p>
                                My expertise lies in operationalizing AI on multi-tenant cloud platforms (Azure and AWS), with a strong emphasis on governance, observability, scalability, and cost optimization.
                            </p>
                            <p>
                                As a strong advocate of Enterprise Agile, I have led large-scale agile transformations, enabling organizations to improve throughput, quality, and predictability.
                            </p>
                        </div>

                        {/* CTA — Explore My Journey */}
                        <div className="flex justify-start" style={{ paddingLeft: '160px' }}>
                            <motion.button
                                onClick={() => {
                                    setActiveTab('Leadership Journey');
                                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                whileHover={{ scale: 1.04, x: 6 }}
                                whileTap={{ scale: 0.97 }}
                                style={{ WebkitTapHighlightColor: 'transparent', color: 'var(--accent)', backgroundColor: 'rgba(212,175,55,0.1)' }}
                                className="group mt-4 inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-accent/40 font-semibold text-sm tracking-wide hover:bg-accent hover:text-black focus:outline-none focus:ring-0 transition-all duration-300 backdrop-blur-sm"
                            >
                                <span>Want to explore more about me?</span>
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <ArrowRight size={16} />
                                </motion.span>
                            </motion.button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};



const ExperienceHighlight = () => {
    const [selectedJob, setSelectedJob] = useState(null);

    const jobs = [
        {
            id: 1,
            role: "Senior Director of Engineering",
            co: "NICE Ltd",
            year: "2021-now",
            duration: "3+ Years",
            desc: "Championing a coaching culture for 500+ professionals across 8 global lines.",
            fullDesc: "Beyond operational leadership, I've institutionalized a mentorship framework that has scaled leadership capability across global R&D teams. I actively coach directors and VPs on executive presence, strategic alignment, and high-performance team culture.",
            skills: ["Executive Coaching", "Mentorship Programs", "Culture Building", "People Strategy"],
            logo: "/nice-logo.png",
            gradient: "from-amber-500/20 via-yellow-600/10 to-transparent"
        },
        {
            id: 2,
            role: "Head of Talent Development",
            co: "Capita Sims",
            year: "2016-2021",
            duration: "5 Years",
            desc: "Led transformation of leadership mindset for 300+ distributed resources.",
            fullDesc: "Transformed the India operations by shifting the focus from 'management' to 'coaching'. Developed and led immersive workshops for managers, significantly reducing turnover and increasing innovation throughput by empowering individuals.",
            skills: ["Workshops", "Leadership Offsites", "Team Alignment", "Emotional Intelligence"],
            logo: "/capita-logo.png",
            gradient: "from-blue-500/20 via-indigo-600/10 to-transparent"
        },
        {
            id: 3,
            role: "Managing Through Excellence",
            co: "IBM India",
            year: "2010-2016",
            duration: "6 Years",
            desc: "Pioneered collaborative leadership models within engineering acquisitions.",
            fullDesc: "During the Emptoris acquisition, I navigated the complex cultural integration by coaching leadership teams to find common ground. I focused on building psychological safety and clear communication channels during high-stress transition periods.",
            skills: ["Cultural Integration", "Strategic Facilitation", "Executive Alignment", "Performance Coaching"],
            logo: "/ibm_logo.jpg",
            gradient: "from-cyan-500/20 via-teal-600/10 to-transparent"
        },
        {
            id: 4,
            role: "Competency Head / Engineering Manager",
            co: "Core Objects",
            year: "2008-2010",
            duration: "1 Year 8 Months",
            desc: "Managing UI needs for various products and engineering aspects for Avery Dennison.",
            fullDesc: "As Competency Head, I was responsible for managing UI needs across various products. In my role as Engineering Manager, I led the engineering aspects of one of the key products for Avery Dennison, ensuring technical excellence and cross-functional collaboration.",
            skills: ["UI Management", "Engineering Leadership", "Product Development", "Cross-functional Teams"],
            logo: "/1631309967239.jpg",
            gradient: "from-purple-500/20 via-violet-600/10 to-transparent"
        },
        {
            id: 5,
            role: "Senior Program Manager",
            co: "Xpanxion",
            year: "2005-2008",
            duration: "2 Years 9 Months",
            desc: "Managing strategic programs for Turner Broadcasting, Atlanta.",
            fullDesc: "As a Senior Program Manager, I was involved in managing programs for Turner Broadcasting in Atlanta, overseeing a number of strategic projects. I coordinated cross-functional teams, managed stakeholder expectations, and delivered complex initiatives on time and within budget.",
            skills: ["Program Management", "Strategic Planning", "Stakeholder Management", "Project Delivery"],
            logo: "/xpanxion_logo.jpg",
            gradient: "from-emerald-500/20 via-green-600/10 to-transparent"
        },
        {
            id: 6,
            role: "Project Manager",
            co: "Zensar Technologies",
            year: "2002-2005",
            duration: "3 Years 10 Months",
            desc: "End-to-end project delivery for Zensar customers.",
            fullDesc: "As a Project Manager at Zensar Technologies, I was responsible for managing projects from inception to delivery for various Zensar customers. I led teams in delivering high-quality solutions, managing timelines, budgets, and ensuring customer satisfaction throughout the project lifecycle.",
            skills: ["Project Management", "End-to-End Delivery", "Client Relations", "Team Leadership"],
            logo: "/image.png",
            gradient: "from-rose-500/20 via-pink-600/10 to-transparent"
        }
    ];

    return (
        <>
            <div className="w-full" style={{ overflowX: 'clip' }}>
                <ContainerScroll className="h-[300vh]">


                    <ContainerSticky className="top-16 flex flex-nowrap h-[70vh] items-center pl-6 md:pl-12 ml-[50px]">
                        {jobs.map((job, index) => (
                            <ProcessCard
                                key={job.id}
                                itemsLength={jobs.length}
                                index={index}
                                variant="gold"
                                className="min-w-[75%] max-w-[75%] md:min-w-[60%] md:max-w-[60%] rounded-3xl min-h-[300px]"
                            >
                                <ProcessCardTitle className="border-r border-[#d4af37]/20 flex flex-col items-center justify-center gap-4 min-w-[100px]">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl bg-white/10 border border-white/10">
                                        <img src={job.logo} alt={job.co} className="w-full h-full object-cover" />
                                    </div>

                                </ProcessCardTitle>
                                <ProcessCardBody className="flex flex-col gap-6 justify-center">
                                    <div>
                                        <span className="text-[#d4af37] font-black text-[10px] uppercase tracking-widest border border-[#d4af37]/20 px-3 py-1 rounded-full bg-[#d4af37]/5 inline-block mb-3">
                                            {job.year} · {job.duration}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight tracking-tighter text-white">
                                            {job.role}
                                        </h3>
                                        <p className="text-[#d4af37] font-bold uppercase tracking-widest text-xs mt-1">{job.co}</p>
                                    </div>
                                    <p className="text-gray-300 opacity-80 leading-relaxed max-w-lg">{job.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.map((skill, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setSelectedJob(job)}
                                        className="self-start px-6 py-2.5 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-full text-[#d4af37] text-[10px] font-black uppercase tracking-widest hover:bg-[#d4af37]/20 transition-all cursor-pointer"
                                    >
                                        Read More
                                    </button>
                                </ProcessCardBody>
                            </ProcessCard>
                        ))}
                    </ContainerSticky>
                </ContainerScroll>
            </div>

            {/* Read More Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 pt-20 sm:pt-24">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedJob(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 100, rotateX: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 100, rotateX: 10 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl bg-[#121216] border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[40px] shadow-3xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
                        >
                            {/* Background color gradient */}
                            <div className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${selectedJob.gradient} opacity-20`} />

                            <button
                                onClick={() => setSelectedJob(null)}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:text-accent transition-colors z-20 border border-white/10"
                            >
                                <X size={20} />
                            </button>

                            {/* Left Column: Logo & Header info */}
                            <div className="md:w-[40%] bg-black/30 p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center relative z-10">
                                <div className="flex flex-col items-center text-center gap-6">
                                    <div className="w-24 h-24 bg-white rounded-3xl p-4 shadow-2xl">
                                        <img src={selectedJob.logo} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight mb-2 tracking-tight">{selectedJob.role}</h3>
                                        <p className="text-accent font-black uppercase tracking-widest text-sm">{selectedJob.co}</p>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Timeline</p>
                                            <p className="text-white font-bold text-sm tracking-wide">{selectedJob.year}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Experience</p>
                                            <p className="text-white font-bold text-sm tracking-wide">{selectedJob.duration}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Descriptions & Skills */}
                            <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain scrollbar-hide p-6 sm:p-8 md:p-10 relative z-10 flex flex-col justify-between">
                                <div className="space-y-8 mb-8">
                                    <div>
                                        <h5 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-4 flex items-center gap-2">
                                            <Target size={14} className="text-accent" /> Advisory Focus
                                        </h5>
                                        <p className="text-gray-300 leading-relaxed text-sm lg:text-base">{selectedJob.fullDesc}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-4 flex items-center gap-2">
                                            <Zap size={14} className="text-accent" /> Methods & Mastery
                                        </h5>
                                        <div className="flex flex-wrap gap-2 sm:gap-3">
                                            {selectedJob.skills.map((skill, i) => (
                                                <span key={i} className="px-3 sm:px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs font-bold text-gray-300 uppercase tracking-widest shadow-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="w-full py-4 mt-auto bg-[#d4af37] text-black font-black uppercase tracking-widest text-xs sm:text-sm rounded-xl hover:bg-white transition-colors border border-transparent hover:border-white shadow-lg shadow-accent/20"
                                >
                                    Close Journey Details
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="mt-12">
                <div className="text-center mb-8">
                    <h4 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4">Advisory Validation</h4>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white">Leader <span className="text-accent">Testimonials</span></h3>
                </div>
                <TestimonialCards />
            </div>
        </>
    );
};

const LearningCertifications = () => {
    return (
        <div className="grid lg:grid-cols-7 gap-6 sm:gap-8">
            <div className="lg:col-span-3 space-y-8">
                <div className="p-6 sm:p-8 md:p-10 bg-bg-secondary rounded-2xl sm:rounded-3xl md:rounded-[40px] border border-white/5">
                    <h4 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                        <GraduationCap size={20} /> Academic Base
                    </h4>
                    <div className="space-y-10">
                        <div>
                            <p className="text-white font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tighter mb-1">MBA (Psychology & Leadership)</p>
                            <p className="text-gray-500 font-bold">Strategic Focused Education</p>
                        </div>
                        <div className="pt-10 border-t border-white/5">
                            <p className="text-white font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tighter mb-1">Executive Leadership</p>
                            <p className="text-gray-400 font-bold">Organizational Mastery</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                    { c: "Certified Executive Coach", i: <Heart /> },
                    { c: "ICF Strategic Partner", i: <Sparkles /> },
                    { c: "Master Team Facilitator", i: <Users /> },
                    { c: "EQ-i 2.0 Practitioner", i: <Target /> },
                    { c: "Leadership Workshop Lead", i: <MessageSquare /> }
                ].map((item, i) => (
                    <div key={i} className="p-4 sm:p-6 md:p-8 bg-white/5 rounded-2xl sm:rounded-3xl md:rounded-[40px] border border-white/5 flex flex-col justify-between hover:border-accent transition-all group">
                        <div className="text-accent mb-3 sm:mb-6 group-hover:scale-110 transition-transform origin-left">{item.i}</div>
                        <p className="text-white font-bold uppercase tracking-widest text-[10px] leading-relaxed">{item.c}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StrategicExpertise = () => {
    const items = ["Executive Presence", "Team Alignment", "Cultural Transformation", "Conflict Mastery", "Scaling Leaders", "Authentic Branding"];
    return (
        <div className="bg-bg-secondary rounded-3xl sm:rounded-[40px] md:rounded-[60px] p-6 sm:p-10 md:p-20 border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                {items.map(item => (
                    <div key={item} className="flex items-center gap-6">
                        <div className="h-0.5 w-10 bg-accent" />
                        <span className="text-white font-black uppercase text-lg sm:text-xl md:text-2xl tracking-tighter">{item}</span>
                    </div>
                ))}
            </div>
            <div className="mt-12 sm:mt-16 md:mt-24 pt-10 sm:pt-14 md:pt-20 border-t border-white/10 flex flex-col items-center">
                <Quote className="text-accent mb-4 sm:mb-8" size={40} />
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-serif italic text-center max-w-3xl leading-relaxed">
                    "Exceptional leadership isn't about knowing all the answers; it's about asking the questions that unlock the answers in others."
                </p>
            </div>
        </div>
    );
};

export default About;
export { ExperienceHighlight };
