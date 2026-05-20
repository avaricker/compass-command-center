import React from 'react';
import { mockListings } from '../mockData.ts';
import { TrendingUp, AlertTriangle, Image as ImageIcon, Users, ChevronRight } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export const ListingsIntelligence: React.FC = () => {
    const { openDrawer, closeDrawer, addToPlan, addCompletedAction, showToast } = useAppContext();

    const handleViewAnalysis = (listing: any) => {
        openDrawer({
            title: `Listing Intelligence`,
            subtitle: listing.address,
            content: (
                <div className="space-y-6">
                    {listing.aiSummary ? (
                        <>
                            <div className="space-y-4">
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-green-800 mb-1">What is working</h4>
                                    <p className="text-sm text-green-900">{listing.aiSummary.working}</p>
                                </div>
                                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 mb-1">What is not working</h4>
                                    <p className="text-sm text-red-900">{listing.aiSummary.notWorking}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2"><Users size={16}/> Audience & Matches</h4>
                                <p className="text-sm text-gray-700 mb-3"><strong>Likely Buyer:</strong> {listing.aiSummary.likelyBuyer}</p>
                                <div className="flex flex-wrap gap-2">
                                    {listing.aiSummary.matchedBuyers.map((buyer: string, i: number) => (
                                        <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium">{buyer}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2"><ImageIcon size={16}/> Marketing Gaps</h4>
                                <p className="text-sm text-gray-700">{listing.aiSummary.missingMarketing}</p>
                            </div>

                            <div className="bg-compass-beige p-4 rounded-xl border border-gray-200">
                                <h4 className="text-sm font-bold text-gray-900 mb-2">What to tell the seller</h4>
                                <p className="text-sm text-gray-800 italic">"{listing.aiSummary.sellerMessage}"</p>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <p>AI analysis not available for this listing yet.</p>
                        </div>
                    )}
                </div>
            ),
            actions: (
                <>
                    <button onClick={() => { addToPlan(`Draft seller update for ${listing.address}`); closeDrawer(); }} className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium">Save to Plan</button>
                    <button onClick={() => { addCompletedAction(`Reviewed analysis for ${listing.address}`); closeDrawer(); }} className="flex-1 bg-white border border-gray-300 text-black py-2 rounded-lg text-sm font-medium">Mark Complete</button>
                </>
            )
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-24 relative">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Listings Intelligence</h1>
                <p className="text-gray-500 mt-1">AI analysis of momentum, buyer demand, and marketing gaps.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockListings.map(listing => (
                    <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        <div className="h-48 bg-gray-100 relative">
                            <img src={listing.imageUrl} alt={listing.address} className="w-full h-full object-cover" />
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                {listing.status}
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{listing.address}</h3>
                            <p className="text-sm text-gray-500 mb-4">${listing.price.toLocaleString()}</p>
                            
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                    <p className="text-[10px] uppercase text-gray-500 font-semibold flex items-center gap-1"><TrendingUp size={10}/> Momentum</p>
                                    <p className={`font-bold ${listing.momentumScore > 70 ? 'text-green-600' : listing.momentumScore < 50 ? 'text-red-600' : 'text-yellow-600'}`}>{listing.momentumScore}/100</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                    <p className="text-[10px] uppercase text-gray-500 font-semibold flex items-center gap-1"><AlertTriangle size={10}/> Seller Risk</p>
                                    <p className={`font-bold ${listing.sellerConfidenceRisk === 'High' ? 'text-red-600' : listing.sellerConfidenceRisk === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>{listing.sellerConfidenceRisk}</p>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100">
                                <button 
                                    onClick={() => handleViewAnalysis(listing)}
                                    className="w-full flex items-center justify-between text-sm font-medium text-black hover:text-gray-600 transition-colors"
                                >
                                    View AI Analysis <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
