import React from 'react';
import { BrainCircuit, MessageSquare, Calendar, MapPin, DollarSign, Tag } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export const ClientIntelligence: React.FC = () => {
    const { contacts, openDrawer, closeDrawer, addToPlan, addCompletedAction, showToast } = useAppContext();
    const topClients = contacts.filter(c => c.clientMemory).slice(0, 4);

    const handleUseMessage = (client: any) => {
        showToast("Drafting message...");
        setTimeout(() => {
            openDrawer({
                title: `Draft Message for ${client.name}`,
                subtitle: "AI Generated Message",
                content: (
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 italic">
                            "{client.suggestedMessage}"
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-2">Client Memory Context:</h4>
                            <p className="text-sm text-gray-600">{client.clientMemory}</p>
                        </div>
                    </div>
                ),
                actions: (
                    <>
                        <button onClick={() => { addToPlan(`Send message to ${client.name}`); closeDrawer(); }} className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium">Save to Plan</button>
                        <button onClick={() => { addCompletedAction(`Drafted message for ${client.name}`); closeDrawer(); }} className="flex-1 bg-white border border-gray-300 text-black py-2 rounded-lg text-sm font-medium">Mark Complete</button>
                    </>
                )
            });
        }, 400);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-24">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Client Intelligence</h1>
                <p className="text-gray-500 mt-1">The AI understands people, not just CRM rows.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {topClients.map(client => (
                    <div key={client.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-bold text-gray-900">{client.name}</h3>
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-medium">{client.type}</span>
                                </div>
                                <p className="text-sm text-gray-500">{client.stage} • Last contact: {client.lastContactedDate}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                client.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                                client.sentiment === 'Anxious' ? 'bg-yellow-100 text-yellow-800' :
                                client.sentiment === 'Urgent' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                Sentiment: {client.sentiment}
                            </div>
                        </div>
                        
                        <div className="p-6 flex-1 space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase flex items-center gap-1 mb-1"><DollarSign size={12}/> Budget/Value</p>
                                    <p className="font-medium text-sm">{client.budgetOrValue}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase flex items-center gap-1 mb-1"><MapPin size={12}/> Locations</p>
                                    <p className="font-medium text-sm truncate">{client.preferredCities.join(', ')}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase flex items-center gap-1 mb-1"><Calendar size={12}/> Timeline</p>
                                    <p className="font-medium text-sm">{client.timeline}</p>
                                </div>
                            </div>

                            {client.tags && client.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {client.tags.map((tag, i) => (
                                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            <Tag size={12} /> {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="bg-compass-beige p-4 rounded-xl border border-gray-200 relative">
                                <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                                    <BrainCircuit size={12} /> Client Memory
                                </div>
                                <p className="text-sm text-gray-800 leading-relaxed mt-2">
                                    {client.clientMemory}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Suggested Message</p>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-700 italic">
                                    "{client.suggestedMessage}"
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button onClick={() => handleUseMessage(client)} className="bg-black text-white hover:bg-gray-800 rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2">
                                <MessageSquare size={16} /> Use Message
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
