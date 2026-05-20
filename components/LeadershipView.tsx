import React from 'react';
import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

export const LeadershipView: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-24">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Leadership View</h1>
                <p className="text-gray-500 mt-1">Executive insights into platform adoption, productivity, and business impact.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Users size={16}/></div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Agent Adoption</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">84%</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><TrendingUp size={12}/> +12% this month</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><Clock size={16}/></div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Speed to Lead</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">4.2m</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><TrendingUp size={12}/> 42% faster</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><TrendingUp size={16}/></div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Task Completion</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">91%</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><TrendingUp size={12}/> +31% with AI</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center"><DollarSign size={16}/></div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Revenue Found</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">$14.2M</p>
                    <p className="text-xs text-gray-500 mt-1">In reactivated pipeline</p>
                </div>
            </div>

            <div className="bg-compass-beige p-8 rounded-xl border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Executive Summary</h2>
                <p className="text-gray-800 leading-relaxed mb-4">
                    "This week, agents using AI-generated follow-up completed 31% more CRM tasks and responded to active buyers 42% faster. The largest opportunity gap is seller update consistency. Listings with weekly seller updates had higher client satisfaction and fewer price objection escalations."
                </p>
                <div className="flex gap-4">
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">Export Full Report</button>
                    <button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium">View Missed Opportunities</button>
                </div>
            </div>
        </div>
    );
};
