import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Tag, User, Calendar, DollarSign, MapPin, ArrowRight, MessageSquare, CheckSquare, Save, Copy, X } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export const NotesScanner: React.FC = () => {
    const { contacts, updateContact, addToPlan, addCompletedAction, showToast, openDrawer, closeDrawer } = useAppContext();
    const [inputText, setInputText] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [selectedUpdates, setSelectedUpdates] = useState<Record<string, boolean>>({});

    const sampleNotes = [
        { label: "Madison (Buyer)", text: "Madison wants Folsom, 3 bed minimum, under $950K, likes backyards, nervous about rates, wants to wait until summer but keeps checking homes near Empire Ranch." },
        { label: "Trevor & Elise (Seller)", text: "Trevor and Elise are getting nervous because the Ridgeview listing has views but not enough showings. They asked if the price is too high and want an update before Friday." },
        { label: "Lauren (Open House)", text: "Lauren came to the open house, loved the kitchen, asked about inspection timelines, and viewed the property again later that night. She said she is not ready but keeps checking homes in Roseville." }
    ];

    const handleAnalyze = () => {
        if (!inputText.trim()) return;
        setIsScanning(true);
        
        setTimeout(() => {
            setIsScanning(false);
            
            // Simple matching logic based on text
            let matchedContact = null;
            let extracted = {};
            
            if (inputText.toLowerCase().includes('madison')) {
                matchedContact = contacts.find(c => c.id === 'C-102');
                extracted = {
                    confidence: 94,
                    updates: [
                        { id: 'city', icon: MapPin, label: "Preferred City", value: "Folsom" },
                        { id: 'beds', icon: FileText, label: "Min Bedrooms", value: "3" },
                        { id: 'budget', icon: DollarSign, label: "Max Budget", value: "$950,000" },
                        { id: 'timeline', icon: Calendar, label: "Timeline", value: "Summer" }
                    ],
                    preferences: ["Backyard preference", "Rate concern", "Interested in Empire Ranch"],
                    tags: ["Warm Buyer", "Rate Sensitive", "Backyard Priority"],
                    task: "Send Madison 3 Folsom homes under $950K with backyard space by Friday.",
                    message: "Hi Madison, I found a few Folsom homes that match the backyard and 3-bedroom setup you mentioned. I also kept the price range in mind so we can stay realistic with monthly payment. Want me to send the strongest options?",
                    memoryUpdate: "Madison is focused on Folsom homes under $950K with at least 3 bedrooms and backyard space. She is interested in Empire Ranch but needs reassurance around rates and monthly payment."
                };
            } else if (inputText.toLowerCase().includes('trevor') || inputText.toLowerCase().includes('elise')) {
                matchedContact = contacts.find(c => c.id === 'C-103');
                extracted = {
                    confidence: 98,
                    updates: [
                        { id: 'sentiment', icon: User, label: "Sentiment", value: "Anxious" },
                        { id: 'timeline', icon: Calendar, label: "Action Needed", value: "Before Friday" }
                    ],
                    preferences: ["Concerned about showings", "Questioning price"],
                    tags: ["Price Sensitive", "Needs Update"],
                    task: "Call Trevor and Elise to discuss Ridgeview pricing strategy.",
                    message: "Hi Trevor and Elise, I'm putting together a full update on Ridgeview's traffic this week. Let's connect tomorrow to review the numbers and discuss our pricing strategy.",
                    memoryUpdate: "Trevor and Elise are getting anxious about showing volume vs views. They need proactive communication about pricing strategy before the weekend."
                };
            } else if (inputText.toLowerCase().includes('lauren')) {
                matchedContact = contacts.find(c => c.id === 'C-110');
                extracted = {
                    confidence: 91,
                    updates: [
                        { id: 'city', icon: MapPin, label: "Preferred City", value: "Roseville" },
                        { id: 'feature', icon: FileText, label: "Loved Feature", value: "Kitchen" }
                    ],
                    preferences: ["Asked about inspections", "Checking Roseville"],
                    tags: ["Open House Lead", "High Intent"],
                    task: "Send Lauren inspection timeline guide and Roseville comps.",
                    message: "Hi Lauren, great meeting you at the open house! Since you asked about inspection timelines, I put together a quick guide on how that works. I also noticed you're looking in Roseville—want me to send a few homes with great kitchens over there?",
                    memoryUpdate: "Lauren loved the kitchen at the open house and asked about inspection timelines. She claims she isn't ready but is actively checking Roseville listings."
                };
            } else {
                // Generic fallback
                matchedContact = contacts[0];
                extracted = {
                    confidence: 65,
                    updates: [
                        { id: 'note', icon: FileText, label: "New Note", value: "General update" }
                    ],
                    preferences: ["General interest"],
                    tags: ["Needs Follow-up"],
                    task: "Review new notes and follow up.",
                    message: "Hi, just checking in to see if you had any questions about the properties we discussed.",
                    memoryUpdate: "Added new unstructured notes to file."
                };
            }

            // Initialize all checkboxes to true
            const initialUpdates: Record<string, boolean> = {};
            (extracted as any).updates.forEach((u: any) => initialUpdates[u.id] = true);
            (extracted as any).tags.forEach((t: string) => initialUpdates[`tag-${t}`] = true);
            initialUpdates['task'] = true;
            initialUpdates['memory'] = true;
            
            setSelectedUpdates(initialUpdates);
            setResult({ contact: matchedContact, ...extracted });
        }, 1500);
    };

    const handleSimulateUpload = () => {
        setIsScanning(true);
        setTimeout(() => {
            setInputText("Madison wants Folsom, 3 bed minimum, under $950K, likes backyards, nervous about rates, wants to wait until summer but keeps checking homes near Empire Ranch.");
            handleAnalyze();
        }, 1000);
    };

    const handleSaveToCRM = () => {
        if (!result || !result.contact) return;
        
        const updates: any = {};
        if (selectedUpdates['memory']) {
            updates.clientMemory = result.memoryUpdate;
        }
        
        const tagsToAdd = result.tags.filter((t: string) => selectedUpdates[`tag-${t}`]);
        if (tagsToAdd.length > 0) {
            updates.tags = [...new Set([...(result.contact.tags || []), ...tagsToAdd])];
        }

        if (selectedUpdates['timeline']) updates.timeline = "Summer";
        if (selectedUpdates['budget']) updates.budgetOrValue = "$950,000";

        updateContact(result.contact.id, updates);
        
        if (selectedUpdates['task']) {
            addToPlan(result.task);
        }

        showToast(`${result.contact.name} updated in mock CRM.`);
        addCompletedAction(`Scanned notes for ${result.contact.name}`);
        setResult(null);
        setInputText('');
    };

    const handleDraftMessage = () => {
        openDrawer({
            title: `Draft Message for ${result.contact.name}`,
            subtitle: "Generated from Notes",
            content: (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 italic">
                    "{result.message}"
                </div>
            ),
            actions: (
                <>
                    <button onClick={() => { addToPlan(`Send message to ${result.contact.name}`); closeDrawer(); }} className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium">Save to Plan</button>
                    <button onClick={() => { showToast("Message copied!"); closeDrawer(); }} className="flex-1 bg-white border border-gray-300 text-black py-2 rounded-lg text-sm font-medium">Copy Message</button>
                </>
            )
        });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-24">
            {/* Mini Visual Flow */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider mb-8 overflow-x-auto whitespace-nowrap pb-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-black">Upload/Paste Note</span>
                <ArrowRight size={14} />
                <span>AI Extracts Details</span>
                <ArrowRight size={14} />
                <span>Matches Contact</span>
                <ArrowRight size={14} />
                <span>Suggests CRM Updates</span>
                <ArrowRight size={14} />
                <span>Creates Follow-Up</span>
            </div>

            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Notes-to-CRM Scanner</h1>
                <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Turn screenshots, messy notes, and client conversations into clean CRM updates.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Area */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Paste Notes</h3>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste a note, text message, call recap, open house note, or showing feedback here..."
                            className="w-full h-40 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none mb-4"
                        />
                        <button 
                            onClick={handleAnalyze}
                            disabled={!inputText.trim() || isScanning}
                            className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                        >
                            {isScanning ? 'Analyzing...' : 'Analyze Note'}
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Upload Screenshot</h3>
                        <div 
                            onClick={handleSimulateUpload}
                            className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <UploadCloud size={32} className="text-gray-400 mb-3" />
                            <p className="text-sm font-medium text-gray-900">Click to simulate upload</p>
                            <p className="text-xs text-gray-500 mt-1">Supports PNG, JPG, PDF</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Try Sample Notes</h3>
                        <div className="flex flex-wrap gap-2">
                            {sampleNotes.map((note, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setInputText(note.text)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
                                >
                                    {note.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Area */}
                <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-opacity duration-500 ${result ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <BrainCircuit size={20} className="text-black" />
                        AI Extraction Results
                    </h2>
                    
                    {isScanning ? (
                        <div className="h-64 flex flex-col items-center justify-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black mb-4"></div>
                            <p className="text-gray-600 font-medium">Extracting client details...</p>
                        </div>
                    ) : result ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Matched Contact</p>
                                        <p className="font-bold text-gray-900 text-lg">{result.contact.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Match Confidence</p>
                                    <p className="font-bold text-green-600 text-lg">{result.confidence}%</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Suggested CRM Updates</h3>
                                <div className="space-y-2">
                                    {result.updates.map((u: any, i: number) => (
                                        <label key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                            <input type="checkbox" checked={selectedUpdates[u.id] || false} onChange={() => setSelectedUpdates(prev => ({...prev, [u.id]: !prev[u.id]}))} className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black" />
                                            <span className="text-sm text-gray-700">Update <strong>{u.label}</strong> to "{u.value}"</span>
                                        </label>
                                    ))}
                                    {result.tags.map((t: string, i: number) => (
                                        <label key={`tag-${i}`} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                            <input type="checkbox" checked={selectedUpdates[`tag-${t}`] || false} onChange={() => setSelectedUpdates(prev => ({...prev, [`tag-${t}`]: !prev[`tag-${t}`]}))} className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black" />
                                            <span className="text-sm text-gray-700">Add tag: <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><Tag size={10}/> {t}</span></span>
                                        </label>
                                    ))}
                                    <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                        <input type="checkbox" checked={selectedUpdates['memory'] || false} onChange={() => setSelectedUpdates(prev => ({...prev, memory: !prev.memory}))} className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black" />
                                        <span className="text-sm text-gray-700">Update Client Memory</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                        <input type="checkbox" checked={selectedUpdates['task'] || false} onChange={() => setSelectedUpdates(prev => ({...prev, task: !prev.task}))} className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black" />
                                        <span className="text-sm text-gray-700">Create Follow-up Task</span>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">Suggested Task</h3>
                                <p className="text-sm text-blue-800">{result.task}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                                <button onClick={handleSaveToCRM} className="bg-black text-white hover:bg-gray-800 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                    <Save size={16} /> Save to CRM
                                </button>
                                <button onClick={handleDraftMessage} className="bg-white text-black border border-gray-300 hover:bg-gray-50 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                    <MessageSquare size={16} /> Draft Message
                                </button>
                                <button onClick={() => { addToPlan(result.task); showToast("Task added to plan."); }} className="bg-white text-black border border-gray-300 hover:bg-gray-50 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                    <CheckSquare size={16} /> Save to Plan
                                </button>
                                <button onClick={() => setResult(null)} className="bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                    <X size={16} /> Dismiss
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 py-20">
                            <FileText size={48} className="mb-4 opacity-20" />
                            <p>Upload or paste a note to see extracted intelligence.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Explanation Copy */}
            <div className="mt-12 bg-compass-beige p-8 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Why This Matters</h3>
                <p className="text-sm text-gray-800 leading-relaxed">
                    Agents capture important client details everywhere—in text threads, handwritten notes, call recaps, showing notes, open house conversations, and screenshots. Most of that information never makes it cleanly into the CRM. The Notes-to-CRM Scanner turns those scattered details into structured client intelligence, helping the agent remember what matters, follow up faster, and keep the CRM accurate without extra manual work.
                </p>
            </div>
        </div>
    );
};

// Dummy BrainCircuit icon since it wasn't imported in this file scope
const BrainCircuit = ({size, className}: any) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"/><path d="M16 8V5c0-1.1.9-2 2-2"/><path d="M12 13h4"/><path d="M12 17h6"/><path d="M19 13v4"/><path d="M22 13h-3"/><path d="M22 17h-3"/></svg>;
