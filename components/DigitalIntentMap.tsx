import React from 'react';
import { mockDigitalIntentSignals } from '../mockData.ts';
import { Globe, Search, Smartphone, Mail, QrCode, Map, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export const DigitalIntentMap: React.FC = () => {
    const { openDrawer, closeDrawer, addToPlan, addCompletedAction, showToast } = useAppContext();

    const getIcon = (platform: string) => {
        switch(platform) {
            case 'Listing Portal': return <Map size={20} className="text-blue-500" />;
            case 'Google Search': return <Search size={20} className="text-green-500" />;
            case 'Instagram': return <Smartphone size={20} className="text-pink-500" />;
            case 'Email Campaign': return <Mail size={20} className="text-purple-500" />;
            case 'Open House QR': return <QrCode size={20} className="text-gray-700" />;
            default: return <Globe size={20} className="text-gray-500" />;
        }
    };

    const handleSignalAction = (signal: any) => {
        showToast(`Analyzing ${signal.platform} signal...`);
        setTimeout(() => {
            openDrawer({
                title: `${signal.platform} Signal`,
                subtitle: signal.address || signal.city || "Digital Intent Analysis",
                content: (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Visitor Type</p>
                                <p className="font-bold text-gray-900">{signal.visitorType}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Intent Score</p>
                                <p className="font-bold text-lg text-green-600">{signal.intentScore}/100</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Detected Activity</h4>
                            <p className="text-sm text-gray-700">{signal.activity} (Frequency: {signal.frequency})</p>
                        </div>

                        <div className="bg-compass-beige p-4 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">AI Interpretation</h4>
                            <p className="text-sm text-gray-800 italic">"{signal.aiInterpretation}"</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Recommended Action</h4>
                            <p className="text-sm text-gray-700">{signal.recommendedAction}</p>
                        </div>
                    </div>
                ),
                actions: (
                    <>
                        <button onClick={() => { addToPlan(signal.recommendedAction); closeDrawer(); }} className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium">Save to Plan</button>
                        <button onClick={() => { addCompletedAction(`Executed: ${signal.recommendedAction}`); closeDrawer(); }} className="flex-1 bg-white border border-gray-300 text-black py-2 rounded-lg text-sm font-medium">Mark Complete</button>
                    </>
                )
            });
        }, 400);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-24">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Digital Intent Map</h1>
                <p className="text-gray-500 mt-1">AI analysis of buyer and seller activity across approved, permission-based platforms.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockDigitalIntentSignals.map(signal => (
                    <div key={signal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:border-black transition-colors cursor-pointer group" onClick={() => handleSignalAction(signal)}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                                {getIcon(signal.platform)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm">{signal.platform} Signal</h3>
                                <p className="text-xs text-gray-500">{signal.source}</p>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <p className="text-sm text-gray-800 font-medium leading-relaxed">
                                {signal.activity}
                            </p>
                            
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">AI Interpretation</p>
                                <p className="text-xs text-gray-700">{signal.aiInterpretation}</p>
                            </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-black group-hover:underline">View Recommendation</span>
                            <ArrowRight size={16} className="text-gray-400 group-hover:text-black" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Privacy and Compliance Section */}
            <div className="mt-12 bg-gray-50 p-8 rounded-xl border border-gray-200 flex gap-6 items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                    <ShieldCheck size={24} className="text-green-600" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy-Safe Signal Tracking</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                        This prototype does not rely on invasive tracking or unauthorized personal data. In a real production version, the system would use approved platform integrations, consent-based analytics, CRM activity, ad platform reporting, email engagement, and source attribution. Anonymous activity would stay anonymous unless a user voluntarily converts through a form, saved search, inquiry, or CRM-connected action.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">No unauthorized IP tracking</span>
                        <span className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">Consent-based analytics only</span>
                        <span className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">Platform-approved APIs only</span>
                        <span className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">Role-based access</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
