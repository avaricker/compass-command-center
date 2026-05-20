import React from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export const ActionDrawer: React.FC = () => {
    const { drawer, closeDrawer } = useAppContext();

    if (!drawer.isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={closeDrawer} />
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-gray-200 transform transition-transform duration-300 translate-x-0">
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{drawer.title}</h2>
                        {drawer.subtitle && <p className="text-sm text-gray-500 mt-1">{drawer.subtitle}</p>}
                    </div>
                    <button onClick={closeDrawer} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                <div className="p-6 flex-1 overflow-y-auto">
                    {drawer.content}
                </div>
                {drawer.actions && (
                    <div className="p-6 border-t border-gray-100 bg-white flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        {drawer.actions}
                    </div>
                )}
            </div>
        </div>
    );
};
