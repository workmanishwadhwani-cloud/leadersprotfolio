import React, { useState } from 'react';
import { Mail, Linkedin, Twitter, ExternalLink, ChevronDown, CheckCircle, Loader2, Youtube, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { EMAILJS_CONFIG } from '../config/emailjs.config';
import WorldMapBackground from './ui/world-map-background';

const Contact = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const strategicQuestions = [
        "I'm looking for 1:1 Executive Coaching for a leader.",
        "We need a Strategic Alignment Offsite for our C-Suite.",
        "How do we evolve our culture during rapid growth?",
        "Can you facilitate a high-impact leadership workshop?",
        "How do I build a more authentic executive presence?",
        "Can we discuss a coaching roadmap for my management team?",
        "Other leadership advisory inquiry..."
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');

        // EmailJS configuration from config file
        const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;

        // Prepare template parameters
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            advisory_focus: selectedQuestion,
            message: formData.message,
            to_email: 'work.manishwadhwani@gmail.com'
        };

        // Send email using EmailJS
        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setStatus('success');
                // Reset form
                setFormData({ name: '', email: '', message: '' });
                setSelectedQuestion('');
                setTimeout(() => setStatus('idle'), 3000);
            })
            .catch((error) => {
                console.error('FAILED...', error);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            });
    };

    return (
        <>
            <section id="contact" className="min-h-screen flex items-center relative overflow-hidden py-10 lg:py-16 scroll-mt-32">
                <WorldMapBackground />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

                <div className="container max-w-6xl relative z-10">
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                        >
                            <span className="text-accent text-xs font-semibold tracking-wide uppercase">
                                Start the Conversation
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-tight text-white"
                        >
                            Ready to <span className="text-accent underline decoration-white/10 underline-offset-8">Evolve Together?</span>
                        </motion.h2>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                        {/* Social & Info Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 flex flex-col gap-6"
                        >
                            <div>
                                <h3 className="text-xl font-black uppercase text-white mb-3">Connect Directly</h3>
                                <p className="text-sm text-gray-400 leading-normal">
                                    I engage with leaders globally. Whether you're looking for deep coaching or just want to follow the leadership insights I share daily.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <SocialCard
                                    href="https://www.linkedin.com/in/dineshkwadhwani/"
                                    icon={<Linkedin size={20} />}
                                    label="LinkedIn"
                                    handle="/in/dineshkwadhwani"
                                    color="hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white"
                                />
                                <SocialCard
                                    href="https://www.youtube.com/@TheCoachDinesh"
                                    icon={<Youtube size={20} />}
                                    label="YouTube"
                                    handle="@TheCoachDinesh"
                                    color="hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white"
                                />
                                <SocialCard
                                    href="https://www.instagram.com/thecoachdinesh"
                                    icon={<Instagram size={20} />}
                                    label="Instagram"
                                    handle="@TheCoachDinesh"
                                    color="hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white"
                                />
                                <SocialCard
                                    href="mailto:contact@dinesh.com"
                                    icon={<Mail size={20} />}
                                    label="Email Inquiry"
                                    handle="contact@dinesh.com"
                                    color="hover:bg-white hover:border-white hover:text-black"
                                />
                            </div>
                        </motion.div>

                        {/* Form Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-3"
                        >
                            <div className="bg-black/60 backdrop-blur-xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden">
                                {/* Outer glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 to-transparent rounded-[34px] blur opacity-30 transition duration-1000"></div>

                                {/* Inner background gradient - Always visible and stronger */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 pointer-events-none" />

                                <form className="grid gap-5 relative z-10" onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-bg-primary border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-accent transition-all hover:bg-white/5 placeholder:text-white/20"
                                                placeholder="Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-bg-primary border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-accent transition-all hover:bg-white/5 placeholder:text-white/20"
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>

                                    {/* Custom Dropdown */}
                                    <div className="space-y-2 relative">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Advisory Focus</label>
                                        <div className="relative">
                                            <div
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className={`w-full bg-bg-primary border rounded-xl p-3.5 text-sm text-white flex justify-between items-center cursor-pointer transition-all hover:bg-white/5 ${isDropdownOpen ? 'border-accent ring-1 ring-accent' : 'border-white/10'}`}
                                            >
                                                <span className={selectedQuestion ? "text-white" : "text-gray-500"}>
                                                    {selectedQuestion || "Select a strategic interest..."}
                                                </span>
                                                <ChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-accent' : 'text-gray-500'}`} size={16} />
                                            </div>

                                            <AnimatePresence>
                                                {isDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a20] border border-white/10 rounded-xl overflow-hidden z-[60] shadow-3xl"
                                                    >
                                                        <div className="max-h-60 overflow-y-auto scrollbar-hide">
                                                            {strategicQuestions.map((q, i) => (
                                                                <div
                                                                    key={i}
                                                                    onClick={() => {
                                                                        setSelectedQuestion(q);
                                                                        setIsDropdownOpen(false);
                                                                    }}
                                                                    className="p-3.5 text-xs text-gray-300 hover:bg-accent hover:text-black transition-colors cursor-pointer border-b border-white/5 last:border-0"
                                                                >
                                                                    {q}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Context & Goals</label>
                                        <textarea
                                            rows="3"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-bg-primary border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-accent transition-all hover:bg-white/5 placeholder:text-white/20 resize-none"
                                            placeholder="Briefly describe your leadership context..."
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={status === 'loading'}
                                        type="submit"
                                        className={`btn w-full py-3.5 text-sm font-black uppercase tracking-widest justify-center mt-2 transition-all relative overflow-hidden ${status === 'success' ? 'bg-green-500 text-white' :
                                            status === 'error' ? 'bg-red-500 text-white' :
                                                'btn-primary'
                                            }`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {status === 'idle' && (
                                                <motion.div
                                                    key="idle"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-4"
                                                >
                                                    Send Message <ExternalLink size={20} />
                                                </motion.div>
                                            )}
                                            {status === 'loading' && (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-4"
                                                >
                                                    Sending... <Loader2 size={20} className="animate-spin" />
                                                </motion.div>
                                            )}
                                            {status === 'success' && (
                                                <motion.div
                                                    key="success"
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    exit={{ y: -20, opacity: 0 }}
                                                    className="flex items-center gap-4"
                                                >
                                                    Message Sent! <CheckCircle size={20} />
                                                </motion.div>
                                            )}
                                            {status === 'error' && (
                                                <motion.div
                                                    key="error"
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    exit={{ y: -20, opacity: 0 }}
                                                    className="flex items-center gap-4"
                                                >
                                                    Failed to Send. Try Again
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-16 border-t border-white/5">
                <div className="container flex flex-col items-center text-center">
                    <Logo size={60} className="mb-6 opacity-80" />
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Dinesh</h3>
                    <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-8">Executive Coach & Leadership Advisor</p>
                    <div className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                        &copy; {new Date().getFullYear()} Dinesh. Building exceptional leaders.
                    </div>
                </div>
            </footer>
        </>
    );
};

const SocialCard = ({ href, icon, label, handle, color }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-4 p-4 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 transition-all duration-300 group ${color}`}
    >
        <div className="p-2 bg-white/5 rounded-full text-white/70 group-hover:text-inherit group-hover:bg-white/20 transition-colors">
            {icon}
        </div>
        <div>
            <p className="text-[9px] font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100">{label}</p>
            <p className="text-base font-bold text-white group-hover:text-inherit">{handle}</p>
        </div>
        <div className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            <ExternalLink size={16} />
        </div>
    </a>
);


export default Contact;
