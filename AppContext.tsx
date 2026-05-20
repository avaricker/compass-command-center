import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DailyTask, Contact } from './types.ts';
import { mockDailyTasks, mockContacts } from './mockData.ts';

interface DrawerConfig {
    isOpen: boolean;
    title: string;
    subtitle?: string;
    content: ReactNode;
    actions?: ReactNode;
}

interface AppContextType {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    dailyPlan: DailyTask[];
    completedActions: string[];
    toast: { message: string; isVisible: boolean };
    drawer: DrawerConfig;
    clickedButtons: Record<string, boolean>;
    contacts: Contact[];
    showToast: (msg: string) => void;
    openDrawer: (config: Omit<DrawerConfig, 'isOpen'>) => void;
    closeDrawer: () => void;
    addToPlan: (action: string) => void;
    toggleTaskComplete: (id: string) => void;
    addCompletedAction: (action: string) => void;
    setButtonClicked: (id: string) => void;
    updateContact: (id: string, updates: Partial<Contact>) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [activeTab, setActiveTab] = useState('command-center');
    const [dailyPlan, setDailyPlan] = useState<DailyTask[]>(mockDailyTasks);
    const [completedActions, setCompletedActions] = useState<string[]>([]);
    const [toast, setToast] = useState({ message: '', isVisible: false });
    const [drawer, setDrawer] = useState<DrawerConfig>({ isOpen: false, title: '', content: null });
    const [clickedButtons, setClickedButtons] = useState<Record<string, boolean>>({});
    const [contacts, setContacts] = useState<Contact[]>(mockContacts);

    const showToast = (message: string) => {
        setToast({ message, isVisible: true });
        setTimeout(() => setToast({ message: '', isVisible: false }), 3000);
    };

    const openDrawer = (config: Omit<DrawerConfig, 'isOpen'>) => {
        setDrawer({ ...config, isOpen: true });
    };

    const closeDrawer = () => {
        setDrawer(prev => ({ ...prev, isOpen: false }));
    };

    const addToPlan = (action: string) => {
        const newTask: DailyTask = {
            id: `T-NEW-${Date.now()}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            action,
            completed: false
        };
        setDailyPlan(prev => [...prev, newTask]);
        showToast("Added to Ava's Plan");
    };

    const toggleTaskComplete = (id: string) => {
        setDailyPlan(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const addCompletedAction = (action: string) => {
        setCompletedActions(prev => [action, ...prev]);
        showToast("Action marked complete");
    };

    const setButtonClicked = (id: string) => {
        setClickedButtons(prev => ({ ...prev, [id]: true }));
    };

    const updateContact = (id: string, updates: Partial<Contact>) => {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    return (
        <AppContext.Provider value={{
            activeTab, setActiveTab,
            dailyPlan, completedActions, toast, drawer, clickedButtons, contacts,
            showToast, openDrawer, closeDrawer, addToPlan, toggleTaskComplete, addCompletedAction, setButtonClicked, updateContact
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used within AppProvider");
    return context;
};
