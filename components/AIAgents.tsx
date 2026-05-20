import React from 'react';
import { mockAgents } from '../mockData.ts';
import { Cpu, Activity, Clock } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export const AIAgents: React.FC = () => {
    const { openDrawer, closeDrawer, setActiveTab } = useAppContext();

    const handleViewAgent = (agent: any) => {
        if (agent.name === "Notes-to-CRM Agent") {
            setActiveTab('notes-scanner');
            return;
        }

        openDrawer({
            title: agent.name,
            subtitle: `Status: ${agent.status}`,
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase">Signals Reviewed</p>
                            <p className="font-bold text-lg">{agent.signalsReviewed.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase">Confidence</p>
                            <p className="font-bold text-lg text-green-600">{agent.confidenceScore}%</p>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">What it is analyzing</h4>
                        <p className="text-sm text-gray-700">{agent.analyzing}</p>
                    </div>

                    <div className="bg-compass-beige p-4 rounded-xl border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Current Insight</h4>
                        <p className="text-sm text-gray-800 font-medium">{agent.lastInsight}</p>
                    </div>
                </div>
            ),
            actions: (
                <button onClick={closeDrawer} className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium">Close Details</button>
            )
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-24">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">AI Control Room</h1>
                <p className="text-gray-500 mt-1">Monitor the specialized agents analyzing your business in real-time.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAgents.map(agent => (
                    <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    agent.status === 'Active' ? 'bg-green-50 text-green-600' :
                                    agent.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                                    'bg-gray-100 text-gray-500'
                                }`}>
                                    <Cpu size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">{agent.name}</h3>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        {agent.status === 'Active' && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>}
                                        {agent.status === 'Processing' && <Activity size={10} className="text-blue-500 animate-spin" />}
                                        {agent.status === 'Idle' && <Clock size={10} className="text-gray-400" />}
                                        <span className="text-[10px] uppercase font-semibold text-gray-500">{agent.status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 flex-1">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Analyzing</p>
                                <p className="text-sm font-medium text-gray-800">{agent.analyzing}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                    <p className="text-[10px] text-gray-500 uppercase">Signals</p>
                                    <p className="font-bold text-gray-900">{agent.signalsReviewed.toLocaleString()}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                    <p className="text-[10px] text-gray-500 uppercase">Confidence</p>
                                    <p className="font-bold text-green-600">{agent.confidenceScore}%</p>
                                </div>
                            </div>

                            <div className="bg-compass-beige p-3 rounded-lg border border-gray-200">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Current Insight</p>
                                <p className="text-xs text-gray-800">{agent.lastInsight}</p>
                            </div>
                        </div>

                        <button onClick={() => handleViewAgent(agent)} className="mt-4 w-full py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                            {agent.name === "Notes-to-CRM Agent" ? "Open Scanner" : "View Agent Details"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
