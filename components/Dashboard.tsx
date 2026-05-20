import React, { useState, useEffect } from 'react';
import { mockOvernightChanges } from '../mockData.ts';
import { AlertCircle, MessageSquare, CheckSquare, User, Moon, Sun, Activity, ArrowRight, Cpu, Zap, ChevronDown, ChevronUp, Target, CheckCircle, FileText } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export const Dashboard: React.FC = () => {
    const { dailyPlan, completedActions, toggleTaskComplete, openDrawer, closeDrawer, addToPlan, addCompletedAction, setButtonClicked, clickedButtons, showToast, contacts, setActiveTab } = useAppContext();
    const topPriorityContact = contacts.find(c => c.id === 'C-101');
    const [liveSignalIndex, setLiveSignalIndex] = useState(0);
    const [showWhy, setShowWhy] = useState(false);

    const liveSignals = [
        "Scanning buyer intent changes...",
        "Matching active buyers to listings...",
        "Reviewing seller update gaps...",
        "Checking overdue follow-ups...",
        "Finding reactivated leads...",
        "Reviewing listing momentum...",
        "Detecting marketing gaps...",
        "Ranking next best actions...",
        "Reading open house conversion signals...",
        "Checking workspace activity from email and calendar..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveSignalIndex((prev) => (prev + 1) % liveSignals.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [liveSignals.length]);

    const handleDraftText = () => {
        setButtonClicked('dash-draft-text');
        showToast("Drafting message...");
        setTimeout(() => {
            openDrawer({
                title: `Draft Text for ${topPriorityContact?.name}`,
                subtitle: "AI Generated Message",
                content: (
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 italic">
                            "Hi Daniel, I noticed 1228 Willow Crest Lane lines up closely with what you've been viewing in Folsom. Since you looked at it a few times recently, I wanted to see if you'd like me to set up a private showing this weekend."
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-2">Why AI recommended this:</h4>
                            <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                                <li>Daniel viewed the listing 4 times in 48 hours</li>
                                <li>He saved 3 similar homes</li>
                                <li>His budget matches the property</li>
                                <li>He has not been contacted in 12 days</li>
                                <li>Buyer intent score is 94</li>
                            </ul>
                        </div>
                    </div>
                ),
                actions: (
                    <>
                        <button onClick={() => { addToPlan(`Send text to ${topPriorityContact?.name}`); closeDrawer(); }} className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium">Save to Plan</button>
                        <button onClick={() => { addCompletedAction(`Drafted text for ${topPriorityContact?.name}`); closeDrawer(); }} className="flex-1 bg-white border border-gray-300 text-black py-2 rounded-lg text-sm font-medium">Mark Complete</button>
                    </>
                )
            });
        }, 500);
    };

    const handleCreateTask = () => {
        setButtonClicked('dash-create-task');
        addToPlan(`Follow up with ${topPriorityContact?.name}`);
    };

    const handleViewClient = () => {
        setButtonClicked('dash-view-client');
        openDrawer({
            title: `Client Profile: ${topPriorityContact?.name}`,
            subtitle: `${topPriorityContact?.type} • ${topPriorityContact?.stage}`,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase">Budget</p>
                            <p className="font-bold">{topPriorityContact?.budgetOrValue}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase">Timeline</p>
                            <p className="font-bold">{topPriorityContact?.timeline}</p>
                        </div>
                    </div>
                    <div className="bg-compass-beige p-4 rounded-lg border border-gray-200">
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-1">Client Memory</h4>
                        <p className="text-sm text-gray-800">{topPriorityContact?.clientMemory}</p>
                    </div>
                </div>
            ),
            actions: (
                <button onClick={closeDrawer} className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium">Close Profile</button>
            )
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-24">
            {/* Live Intelligence Engine Bar */}
            <div className="bg-black text-white rounded-lg p-3 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Live Intelligence Engine</span>
                </div>
                <div className="text-sm font-medium text-gray-200 animate-pulse">
                    {liveSignals[liveSignalIndex]}
                </div>
                <div className="text-xs text-gray-400">
                    Analyzing 1,248 signals across platform
                </div>
            </div>

            <header>
                <h1 className="text-3xl font-bold text-gray-900">Command Center</h1>
                <p className="text-gray-500 mt-1">Good morning, Ava. Here is what the AI found while you were away.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Overnight & Top Priority */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* What Changed Overnight */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Moon size={16} className="text-indigo-500" />
                            What Changed Overnight
                        </h2>
                        <ul className="space-y-3">
                            {mockOvernightChanges.map((change, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></div>
                                    {change}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Today's Highest-Value Action */}
                    <section>
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <AlertCircle size={16} className="text-red-500" />
                            Today's Highest-Value Action
                        </h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Action Required</span>
                                    <h3 className="text-xl font-bold text-gray-900">Contact {topPriorityContact?.name} today.</h3>
                                </div>
                                <p className="text-gray-700 text-base leading-relaxed mb-6">
                                    He has viewed <strong>1228 Willow Crest Lane</strong> 4 times in 48 hours, saved 3 similar Folsom homes, and has not been contacted in 12 days.
                                </p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase">Buyer Intent</p>
                                        <p className="font-bold text-gray-900 text-lg">94/100</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase">Listing Match</p>
                                        <p className="font-bold text-gray-900 text-lg">High</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase">Follow-up Gap</p>
                                        <p className="font-bold text-red-600 text-lg">12 Days</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase">Revenue Pot.</p>
                                        <p className="font-bold text-green-600 text-lg">Strong</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button onClick={handleDraftText} className="bg-black text-white hover:bg-gray-800 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors flex items-center gap-2">
                                        <MessageSquare size={16} /> {clickedButtons['dash-draft-text'] ? 'Draft Created ✓' : 'Draft Text'}
                                    </button>
                                    <button onClick={handleCreateTask} className="bg-white text-black border border-gray-300 hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors flex items-center gap-2">
                                        <CheckSquare size={16} /> {clickedButtons['dash-create-task'] ? 'Task Created ✓' : 'Create Task'}
                                    </button>
                                    <button onClick={handleViewClient} className="bg-white text-black border border-gray-300 hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors flex items-center gap-2">
                                        <User size={16} /> View Client
                                    </button>
                                </div>
                            </div>
                            
                            {/* Why am I seeing this? */}
                            <div className="border-t border-gray-100 bg-gray-50">
                                <button 
                                    onClick={() => setShowWhy(!showWhy)}
                                    className="w-full px-6 py-3 flex items-center justify-between text-sm font-medium text-gray-600 hover:text-black transition-colors"
                                >
                                    Why am I seeing this?
                                    {showWhy ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {showWhy && (
                                    <div className="px-6 pb-4 text-sm text-gray-600">
                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                            <li>Daniel viewed the same listing 4 times</li>
                                            <li>He saved 3 similar homes</li>
                                            <li>His budget matches the listing</li>
                                            <li>He has a 30 to 60 day timeline</li>
                                            <li>He has not been contacted in 12 days</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Scan Notes into CRM */}
                    <section>
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <FileText size={16} className="text-purple-500" />
                            Scan Notes into CRM
                        </h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex-1">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Upload a screenshot, paste call notes, or drop in messy client details. The AI will identify the client, extract key preferences, suggest CRM updates, and create the next follow-up.
                                </p>
                            </div>
                            <button onClick={() => setActiveTab('notes-scanner')} className="shrink-0 bg-black text-white hover:bg-gray-800 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors flex items-center gap-2">
                                Open Notes Scanner <ArrowRight size={16} />
                            </button>
                        </div>
                    </section>

                    {/* Connected Intelligence Map */}
                    <section>
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Activity size={16} className="text-blue-500" />
                            Connected Intelligence Map
                        </h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex-1 grid grid-cols-2 gap-3">
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center"><span className="block font-bold text-lg">25</span><span className="text-[10px] uppercase text-gray-500">Contacts</span></div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center"><span className="block font-bold text-lg">10</span><span className="text-[10px] uppercase text-gray-500">Listings</span></div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center"><span className="block font-bold text-lg">86</span><span className="text-[10px] uppercase text-gray-500">Buyer Signals</span></div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center"><span className="block font-bold text-lg">7</span><span className="text-[10px] uppercase text-gray-500">Workspace</span></div>
                                </div>
                                <div className="flex items-center justify-center px-4">
                                    <ArrowRight size={24} className="text-gray-300 hidden md:block" />
                                    <Cpu size={32} className="text-black mx-4" />
                                    <ArrowRight size={24} className="text-gray-300 hidden md:block" />
                                </div>
                                <div className="flex-1 bg-compass-beige p-4 rounded-xl border border-gray-200">
                                    <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-800 flex items-center gap-1"><Zap size={14}/> AI Output</h4>
                                    <ul className="text-sm space-y-1 text-gray-700">
                                        <li><strong>5</strong> priority actions created</li>
                                        <li><strong>3</strong> listing risks detected</li>
                                        <li><strong>4</strong> hot buyers identified</li>
                                        <li><strong>2</strong> seller updates needed</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Right Column: Win the Day, Completed Actions & Opportunity Radar */}
                <div className="space-y-8">
                    
                    {/* Win the Day Plan */}
                    <section>
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Sun size={16} className="text-yellow-500" />
                            Ava's Win the Day Plan
                        </h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                            <div className="space-y-4">
                                {dailyPlan.map(task => (
                                    <div key={task.id} className="flex items-start gap-3 group">
                                        <button 
                                            onClick={() => toggleTaskComplete(task.id)}
                                            className={`mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.completed ? 'bg-black border-black text-white' : 'border-gray-300 text-transparent hover:border-black'}`}
                                        >
                                            <CheckSquare size={14} />
                                        </button>
                                        <div>
                                            <p className={`text-xs font-bold ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.time}</p>
                                            <p className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{task.action}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => showToast("Plan synced to Google Calendar.")} className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-black rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                                Sync to Calendar
                            </button>
                        </div>
                    </section>

                    {/* Completed Actions */}
                    <section>
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            Completed Actions
                        </h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                            {completedActions.length === 0 ? (
                                <p className="text-sm text-gray-500 italic">No actions completed yet today.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {completedActions.map((action, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                            {action}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>

                    {/* Opportunity Radar */}
                    <section>
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Target size={16} className="text-green-500" />
                            Opportunity Radar
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-black transition-colors" onClick={() => showToast("Opened Hot Buyer profile.")}>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Hot Buyer</p>
                                    <p className="font-medium text-gray-900">Lauren Evans</p>
                                </div>
                                <ArrowRight size={16} className="text-gray-400" />
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-black transition-colors" onClick={() => showToast("Opened Seller Risk profile.")}>
                                <div>
                                    <p className="text-xs text-red-500 uppercase font-semibold">Seller Risk</p>
                                    <p className="font-medium text-gray-900">Trevor & Elise Morgan</p>
                                </div>
                                <ArrowRight size={16} className="text-gray-400" />
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-black transition-colors" onClick={() => showToast("Opened Listing Momentum profile.")}>
                                <div>
                                    <p className="text-xs text-orange-500 uppercase font-semibold">Momentum Issue</p>
                                    <p className="font-medium text-gray-900">2457 Blackstone Dr</p>
                                </div>
                                <ArrowRight size={16} className="text-gray-400" />
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};
