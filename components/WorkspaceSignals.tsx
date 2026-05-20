import React from 'react';
import { mockWorkspaceSignals } from '../mockData.ts';
import { Mail, Calendar, Globe, MessageCircle, FileSpreadsheet, Megaphone, TrendingUp, ArrowRight } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export const WorkspaceSignals: React.FC = () => {
    const { openDrawer, closeDrawer, addToPlan, addCompletedAction, showToast } = useAppContext();

    const getIcon = (platform: string) => {
        switch(platform) {
            case 'Gmail': case 'Outlook': return <Mail size={16} className="text-blue-500" />;
            case 'Google Calendar': return <Calendar size={16} className="text-green-500" />;
            case 'Chrome': return <Globe size={16} className="text-yellow-500" />;
            case 'Teams': return <MessageCircle size={16} className="text-purple-500" />;
            case 'Excel': return <FileSpreadsheet size={16} className="text-green-600" />;
            case 'Marketing Center': return <Megaphone size={16} className="text-red-500" />;
            case 'Buyer Demand': return <TrendingUp size={16} className="text-indigo-500" />;
            default: return <Globe size={16} className="text-gray-500" />;
        }
    };

    const handleWorkspaceAction = (signal: any) => {
        showToast(`Executing: ${signal.recommendedAction}...`);
        setTimeout(() => {
            openDrawer({
                title: signal.recommendedAction,
                subtitle: `Triggered by ${signal.platform} signal`,
                content: (
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Detected Signal</h4>
                            <p className="text-sm text-gray-800">{signal.signal}</p>
                        </div>
                        <div className="bg-compass-beige p-4 rounded-lg border border-gray-200">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">AI Generated Content</h4>
                            <p className="text-sm text-gray-800 italic">
                                {signal.platform === 'Gmail' ? '"Hi Trevor, I saw your note about showing activity. We had 14 saves this week, but showings are flat. I recommend we refresh the listing copy..."' :
                                 signal.platform === 'Google Calendar' ? '"Hi Madison, confirming our showing tomorrow at 10 AM. I have also attached comps for the neighborhood..."' :
                                 signal.platform === 'Chrome' ? 'Listing Appointment Packet Outline: 1. Folsom Market Trends, 2. Ridgeview Comps, 3. Marketing Strategy...' :
                                 signal.platform === 'Excel' ? 'Ranked Leads: 1. Lauren Evans (High Intent), 2. Mark Patel (Medium Intent)...' :
                                 'Generated content based on workspace context.'}
                            </p>
                        </div>
                    </div>
                ),
                actions: (
                    <>
                        <button onClick={() => { addToPlan(signal.recommendedAction); closeDrawer(); }} className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium">Save to Plan</button>
                        <button onClick={() => { addCompletedAction(signal.recommendedAction); closeDrawer(); }} className="flex-1 bg-white border border-gray-300 text-black py-2 rounded-lg text-sm font-medium">Mark Complete</button>
                    </>
                )
            });
        }, 500);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-24">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Workspace Signals</h1>
                <p className="text-gray-500 mt-1">How the AI connects across Google, Microsoft, files, and the Compass platform.</p>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                                <th className="p-4 font-semibold">Platform</th>
                                <th className="p-4 font-semibold">Detected Signal</th>
                                <th className="p-4 font-semibold">AI Meaning</th>
                                <th className="p-4 font-semibold">Recommended Action</th>
                                <th className="p-4 font-semibold text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockWorkspaceSignals.map(signal => (
                                <tr key={signal.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleWorkspaceAction(signal)}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {getIcon(signal.platform)}
                                            <span className="font-medium text-sm text-gray-900">{signal.platform}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-700">{signal.signal}</td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-compass-beige text-gray-800 border border-gray-200">
                                            {signal.aiMeaning}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm font-medium text-black">{signal.recommendedAction}</td>
                                    <td className="p-4 text-right">
                                        <button className="text-gray-400 hover:text-black transition-colors">
                                            <ArrowRight size={16} />
                                        </button>
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
