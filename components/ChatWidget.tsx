import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { chatWithAgent } from '../geminiService.ts';
import { useAppContext } from '../AppContext.tsx';
import { mockListings } from '../mockData.ts';

export const ChatWidget: React.FC = () => {
    const { contacts } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{role: 'user'|'agent', text: string}[]>([
        { role: 'agent', text: 'Hi Ava. I am your Compass Command Agent. How can I help you take action today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        const response = await chatWithAgent(userMsg, { listings: mockListings, contacts });
        
        setMessages(prev => [...prev, { role: 'agent', text: response }]);
        setIsLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const suggestedPrompts = [
        "What changed overnight?",
        "Which client is closest to converting?",
        "Which listing is losing momentum?"
    ];

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-transform hover:scale-105 z-50"
                >
                    <Sparkles size={24} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="bg-black text-white p-4 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                            <Sparkles size={18} />
                            <h3 className="font-semibold">Compass Command Agent</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                                    msg.role === 'user' 
                                    ? 'bg-black text-white rounded-br-sm' 
                                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                        {messages.length === 1 && (
                            <div className="mb-3 flex flex-wrap gap-2">
                                {suggestedPrompts.map((prompt, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setInput(prompt)}
                                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors text-left"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="relative">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask about listings, clients, or tasks..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none h-12"
                                rows={1}
                            />
                            <button 
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 top-2 w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:bg-gray-400 transition-colors"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
