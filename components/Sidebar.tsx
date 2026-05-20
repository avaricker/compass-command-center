import React from 'react';
import { 
    LayoutDashboard, Target, Home, BrainCircuit, 
    Megaphone, Cpu, Activity, BarChart2, PlayCircle, Globe, FileText 
} from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

const navItems = [
    { id: 'command-center', label: 'Command Center', icon: LayoutDashboard },
    { id: 'opportunities', label: 'Opportunities', icon: Target },
    { id: 'listings-intelligence', label: 'Listings Intelligence', icon: Home },
    { id: 'client-intelligence', label: 'Client Intelligence', icon: BrainCircuit },
    { id: 'digital-intent', label: 'Digital Intent Map', icon: Globe },
    { id: 'marketing-studio', label: 'Marketing Studio', icon: Megaphone },
    { id: 'ai-agents', label: 'AI Agents', icon: Cpu },
    { id: 'notes-scanner', label: 'Notes Scanner', icon: FileText },
    { id: 'workspace-signals', label: 'Workspace Signals', icon: Activity },
    { id: 'leadership-view', label: 'Leadership View', icon: BarChart2 },
    { id: 'demo-script', label: 'Demo Script', icon: PlayCircle },
];

export const Sidebar: React.FC = () => {
    const { activeTab, setActiveTab } = useAppContext();

    return (
        <div className="w-64 bg-white border-r border-compass-border h-screen flex flex-col fixed left-0 top-0 overflow-y-auto z-10">
            <div className="p-6 border-b border-compass-border">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                        <span className="text-white font-bold text-xl leading-none">C</span>
                    </div>
                    <div>
                        <h1 className="font-semibold text-sm tracking-tight">Compass</h1>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Command Center</p>
                    </div>
                </div>
            </div>
            
            <div className="p-4 flex-1">
                <div className="mb-4 px-3">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Intelligence Hubs</p>
                </div>
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    isActive 
                                    ? 'bg-gray-100 text-black' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                }`}
                            >
                                <Icon size={18} className={isActive ? 'text-black' : 'text-gray-400'} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-compass-border">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img src="https://i.pravatar.cc/150?u=ava" alt="Ava Ricker" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-black">Ava Ricker</p>
                        <p className="text-xs text-gray-500">Agent</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
