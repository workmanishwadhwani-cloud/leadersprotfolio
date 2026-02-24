import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, ArrowRight } from 'lucide-react';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: "Hi! I'm Dinesh.ai 👋 I can answer basic questions about Dinesh's coaching services, experience, and approach. How can I help you today?",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // AI Response Logic - Basic Q&A
    const getAIResponse = (userMessage) => {
        const message = userMessage.toLowerCase();

        // Services related
        if (message.includes('service') || message.includes('offer') || message.includes('do')) {
            return "Dinesh offers four core services:\n\n1. **Executive 1:1 Coaching** - Personalized strategic partnership for senior leaders\n2. **Leadership Team Offsites** - High-impact alignment sessions for C-Suite teams\n3. **Cultural Transformation** - Scaling leadership culture across organizations\n4. **High-Impact Workshops** - EQ, conflict resolution, and performance training\n\nWould you like to know more about any specific service?";
        }

        // Experience
        if (message.includes('experience') || message.includes('background') || message.includes('worked')) {
            return "Dinesh brings nearly **27 years of global R&D leadership** experience, including:\n\n• **NICE Ltd** - Executive Mentor & Director (2021-present)\n• **Capita Sims** - Head of Talent Development (2016-2021)\n• **IBM India** - Managing Through Excellence (2010-2016)\n\nHe's coached 500+ professionals across 8 global lines and led transformational leadership programs.";
        }

        // Coaching philosophy
        if (message.includes('philosophy') || message.includes('approach') || message.includes('style')) {
            return "Dinesh's coaching philosophy centers on:\n\n✨ **Human-Centric Strategy** - Understanding neural and emotional drivers\n🛡️ **Radical Transparency** - Extreme candor meets psychological safety\n💬 **Strategic Silence** - Mastering the power of listening\n⚡ **Scalable Mentorship** - Building frameworks that institutionalize wisdom\n\nHis approach transforms managers into mentors and leaders into visionaries.";
        }

        // Pricing/Cost
        if (message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('charge')) {
            return "For detailed pricing and custom engagement packages, I'd recommend connecting directly with Dinesh. Each engagement is tailored to your specific context and goals.\n\n**[Book a Consultation](#contact)** to discuss your needs and receive a personalized proposal.";
        }

        // Certifications
        if (message.includes('certification') || message.includes('qualified') || message.includes('credential')) {
            return "Dinesh holds:\n\n🎓 **MBA** (Psychology & Leadership)\n❤️ **Certified Executive Coach**\n✨ **ICF Strategic Partner**\n👥 **Master Team Facilitator**\n🎯 **EQ-i 2.0 Practitioner**\n💬 **Leadership Workshop Lead**\n\nHis academic foundation combined with decades of practical experience creates a unique coaching approach.";
        }

        // Booking/Contact
        if (message.includes('book') || message.includes('schedule') || message.includes('meet') || message.includes('contact')) {
            return "I'd love to help you connect with Dinesh! For scheduling a consultation or discussing your specific leadership challenges:\n\n**[Visit the Contact Page](#contact)** to:\n• Book a consultation\n• Discuss your strategic needs\n• Get a custom engagement proposal\n\nDinesh personally responds to all inquiries within 24 hours.";
        }

        // Who is Dinesh
        if (message.includes('who') || message.includes('about')) {
            return "Dinesh is an **Executive Coach & Leadership Advisor** who transforms managers into mentors and leaders into visionaries.\n\nWith nearly 3 decades of high-level global R&D experience, he now focuses on the human element of excellence - coaching executives, facilitating offsites, and building scalable leadership cultures.\n\nHis unique blend of technical mastery and emotional intelligence makes him a trusted advisor to C-Suite leaders globally.";
        }

        // Results/Success
        if (message.includes('result') || message.includes('success') || message.includes('outcome')) {
            return "Dinesh's clients typically experience:\n\n📈 **Enhanced Executive Presence** - Authentic leadership that inspires\n🤝 **Stronger Team Alignment** - Reduced silos, increased collaboration\n💡 **Strategic Clarity** - Better decision-making at all levels\n🎯 **Cultural Transformation** - Sustainable high-performance behaviors\n\nFor specific case studies and testimonials, I recommend scheduling a consultation where Dinesh can share relevant success stories.";
        }

        // Default response for complex questions
        return "That's a great question! For a detailed discussion about this topic, I'd recommend **connecting directly with Dinesh**.\n\n**[Book a Consultation](#contact)** to:\n• Get personalized answers to your specific questions\n• Discuss your leadership context in depth\n• Explore how Dinesh can support your goals\n\nDinesh engages with leaders globally and responds personally to all inquiries.";
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            type: 'user',
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const aiResponse = {
                type: 'bot',
                text: getAIResponse(inputValue),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickQuestions = [
        "What services do you offer?",
        "Tell me about your experience",
        "What's your coaching philosophy?",
        "How can I book a consultation?"
    ];

    return (
        <>
            {/* Floating Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[999] w-14 h-14 md:w-16 md:h-16 bg-[#1a1a1f] border-2 border-accent rounded-full shadow-2xl flex items-center justify-center group hover:shadow-accent/50 transition-all overflow-hidden"
                        style={{ boxShadow: '0 10px 40px rgba(212, 175, 55, 0.5)' }}
                    >
                        <img
                            src="/bot-avatar.png"
                            alt="AI Bot"
                            className="w-full h-full object-cover"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-2 right-2 w-2.5 h-2.5 bg-green-500 rounded-full border border-black z-10"
                        />
                        <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl group-hover:bg-accent/40 transition-all" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop to close on click outside */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[997] bg-transparent"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.8 }}
                            className="fixed bottom-0 right-0 left-0 md:bottom-6 md:right-6 md:left-auto z-[998] w-full md:w-[400px] h-[100vh] md:h-[600px] md:max-h-[calc(100vh-125px)] bg-[#0a0a0c] border-t md:border border-accent/30 md:rounded-[32px] shadow-2xl flex flex-col overflow-hidden"
                            style={{
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(212, 175, 55, 0.3)',
                                backdropFilter: 'blur(20px)'
                            }}
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-accent/20 to-accent/10 border-b border-accent/20 p-4 md:p-6 flex items-center justify-between backdrop-blur-xl">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1a1a1f] border border-accent/30 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                            <img
                                                src="/bot-avatar.png"
                                                alt="AI Bot"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-[#0a0a0c] z-10" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-black text-xs md:text-sm uppercase tracking-tight">Talk to Dinesh.ai</h3>
                                        <p className="text-gray-400 text-[10px] md:text-xs">AI Assistant • Always Online</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div
                                className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 custom-scrollbar bg-[#0a0a0c] scroll-smooth"
                                data-lenis-prevent="true"
                                style={{
                                    overscrollBehavior: 'contain',
                                    WebkitOverflowScrolling: 'touch',
                                    pointerEvents: 'auto'
                                }}
                            >
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === 'user'
                                                ? 'bg-accent text-black shadow-lg'
                                                : 'bg-[#1a1a1f] text-gray-200 border border-accent/20'
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                                            <p className={`text-[10px] mt-1 ${message.type === 'user' ? 'text-black/60' : 'text-gray-500'}`}>
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-[#1a1a1f] border border-accent/20 rounded-2xl px-4 py-3">
                                            <div className="flex gap-1">
                                                <motion.div
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                                    className="w-2 h-2 bg-accent rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                                    className="w-2 h-2 bg-accent rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                                    className="w-2 h-2 bg-accent rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Quick Questions */}
                            {messages.length === 1 && (
                                <div className="px-3 md:px-4 pb-2 bg-[#0a0a0c]">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Quick Questions</p>
                                    <div className="flex flex-wrap gap-2">
                                        {quickQuestions.map((question, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setInputValue(question);
                                                    setTimeout(() => handleSendMessage(), 100);
                                                }}
                                                className="text-[10px] md:text-xs px-2 md:px-3 py-1.5 bg-[#1a1a1f] hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-full text-gray-400 hover:text-accent transition-all"
                                            >
                                                {question}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input */}
                            <div className="border-t border-accent/20 p-3 md:p-4 bg-[#0a0a0c] pb-safe">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask me anything..."
                                        className="flex-1 bg-[#1a1a1f] border border-accent/20 rounded-full px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-accent transition-all"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim()}
                                        className="w-10 h-10 md:w-12 md:h-12 bg-accent hover:bg-accent/80 disabled:bg-[#1a1a1f] disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all shadow-lg flex-shrink-0"
                                    >
                                        <Send className="w-4 h-4 md:w-5 md:h-5 text-black" />
                                    </button>
                                </div>
                                <p className="text-[9px] md:text-[10px] text-gray-600 mt-2 text-center">
                                    AI responses are for general info. <a href="#contact" className="text-accent hover:underline">Contact Dinesh</a> for detailed discussions.
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatbotWidget;
