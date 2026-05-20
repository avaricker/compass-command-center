import React, { useState } from 'react';
import { AppProvider, useAppContext } from './AppContext.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { Opportunities } from './components/Opportunities.tsx';
import { ListingsIntelligence } from './components/ListingsIntelligence.tsx';
import { ClientIntelligence } from './components/ClientIntelligence.tsx';
import { DigitalIntentMap } from './components/DigitalIntentMap.tsx';
import { MarketingStudio } from './components/MarketingStudio.tsx';
import { AIAgents } from './components/AIAgents.tsx';
import { NotesScanner } from './components/NotesScanner.tsx';
import { WorkspaceSignals } from './components/WorkspaceSignals.tsx';
import { LeadershipView } from './components/LeadershipView.tsx';
import { Presentation } from './components/Presentation.tsx';
import { ChatWidget } from './components/ChatWidget.tsx';
import { ActionDrawer } from './components/ActionDrawer.tsx';
import { Toast } from './components/Toast.tsx';

const AppContent: React.FC = () => {
    const { activeTab } = useAppContext();

    const renderContent = () => {
        switch (activeTab) {
            case 'command-center':
                return <Dashboard />;
            case 'opportunities':
                return <Opportunities />;
            case 'listings-intelligence':
                return <ListingsIntelligence />;
            case 'client-intelligence':
                return <ClientIntelligence />;
            case 'digital-intent':
                return <DigitalIntentMap />;
            case 'marketing-studio':
                return <MarketingStudio />;
            case 'ai-agents':
                return <AIAgents />;
            case 'notes-scanner':
                return <NotesScanner />;
            case 'workspace-signals':
                return <WorkspaceSignals />;
            case 'leadership-view':
                return <LeadershipView />;
            case 'demo-script':
                return <Presentation />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F7F7F7]">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                {renderContent()}
            </main>

            <ChatWidget />
            <ActionDrawer />
            <Toast />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;
