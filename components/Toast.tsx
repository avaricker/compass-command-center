import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export const Toast: React.FC = () => {
    const { toast } = useAppContext();

    if (!toast.isVisible) return null;

    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-[60] transition-all duration-300">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm font-medium">{toast.message}</span>
        </div>
    );
};
