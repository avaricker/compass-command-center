import React from 'react';
import { MessageSquare, CheckSquare, User } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export const Opportunities: React.FC = () => {
    const { contacts, openDrawer, closeDrawer, addToPlan, addCompletedAction, showToast } = useAppContext();
    const sortedOpps = [...contacts].sort((a, b) => b.aiPriorityScore - a.aiPriorityScore);

    const handleDraftMessage = (opp: any) => {
        showToast("Drafting message...");
        setTimeout(() => {
            openDrawer({
                title: `Draft Message for ${opp.name}`,
                subtitle: "AI Generated Message",
                content: (
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 italic">
                            "{opp.suggestedMessage}"
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-2">Why AI recommended this:</h4>
                            <p className="text-sm text-gray-600">{opp.flagReason || opp.recentActivity[0]}</p>
                        </div>
                    </div>
                ),
                actions: (
                    <>
                        <button onClick={() => { addToPlan(`Send message to ${opp.name}`); closeDrawer(); }} className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium">Save to Plan</button>
                        <button onClick={() => { addCompletedAction(`Drafted message for ${opp.name}`); closeDrawer(); }} className="flex-1 bg-white border border-gray-300 text-black py-2 rounded-lg text-sm font-medium">Mark Complete</button>
                    </>
                )
            });
        }, 400);
    };

    const handleCreateTask = (opp: any) => {
        addToPlan(`Follow up with ${opp.name}`);
    };

    const handleViewProfile = (opp: any) => {
        openDrawer({
            title: `Client Profile: ${opp.name}`,
            subtitle: `${opp.type} • ${opp.stage}`,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase">Budget</p>
                            <p className="font-bold">{opp.budgetOrValue}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase">Timeline</p>
                            <p className="font-bold">{opp.timeline}</p>
                        </div>
                    </div>
                    <div className="bg-compass-beige p-4 rounded-lg border border-gray-200">
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-1">Client Memory</h4>
                        <p className="text-sm text-gray-800">{opp.clientMemory || opp.notes}</p>
                    </div>
                </div>
            ),
            actions: (
                <button onClick={closeDrawer} className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium">Close Profile</button>
            )
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-24">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
                <p className="text-gray-500 mt-1">Ranked by revenue probability and AI priority score.</p>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                                <th className="p-4 font-semibold">Opportunity</th>
                                <th className="p-4 font-semibold">Type</th>
                                <th className="p-4 font-semibold">Score</th>
                                <th className="p-4 font-semibold">Why AI Flagged It</th>
                                <th className="p-4 font-semibold">Revenue Pot.</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sortedOpps.map(opp => (
                                <tr key={opp.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <p className="font-bold text-gray-900">{opp.name}</p>
                                        <p className="text-xs text-gray-500">{opp.budgetOrValue}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {opp.type}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                                                {opp.aiPriorityScore}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 max-w-xs">
                                        <p className="text-sm text-gray-700 line-clamp-2">{opp.flagReason || opp.recentActivity[0]}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-sm font-semibold ${opp.revenuePotential === 'High' ? 'text-green-600' : opp.revenuePotential === 'Medium' ? 'text-yellow-600' : 'text-gray-500'}`}>
                                            {opp.revenuePotential || 'Medium'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleDraftMessage(opp)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors" title="Draft Message">
                                                <MessageSquare size={16} />
                                            </button>
                                            <button onClick={() => handleCreateTask(opp)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors" title="Create Task">
                                                <CheckSquare size={16} />
                                            </button>
                                            <button onClick={() => handleViewProfile(opp)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors" title="View Profile">
                                                <User size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
