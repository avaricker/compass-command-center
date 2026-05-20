import React from 'react';
import { mockListings } from '../mockData.ts';
import { Megaphone, Smartphone, Mail, FileText, CheckCircle } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export const MarketingStudio: React.FC = () => {
    const { openDrawer, closeDrawer, addToPlan, addCompletedAction, setButtonClicked, clickedButtons, showToast } = useAppContext();
    const listingsWithGaps = mockListings.filter(l => l.marketingGapScore > 50);

    const handleGenerateIG = (listing: any) => {
        const btnId = `ig-${listing.id}`;
        setButtonClicked(btnId);
        showToast("Generating Instagram Carousel...");
        setTimeout(() => {
            openDrawer({
                title: `Instagram Carousel: ${listing.address}`,
                subtitle: "Generated Marketing Asset",
                content: (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Slide Copy</h4>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm"><strong>Slide 1:</strong> "Folsom living with space to breathe"</div>
                                <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm"><strong>Slide 2:</strong> "Updated interiors designed for everyday comfort"</div>
                                <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm"><strong>Slide 3:</strong> "A backyard made for weekend hosting"</div>
                                <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm"><strong>Slide 4:</strong> "Near trails, schools, and local favorites"</div>
                                <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm"><strong>Slide 5:</strong> "Private showings now available"</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Post Caption</h4>
                            <p className="text-sm text-gray-700 bg-compass-beige p-4 rounded-lg border border-gray-200">
                                "{listing.address} brings together updated living, outdoor space, and one of Folsom's most convenient locations. Message Ava for a private showing."
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Suggested Hashtags</h4>
                            <p className="text-sm text-blue-600">#FolsomRealEstate #LuxuryLiving #JustListed #CompassRealEstate</p>
                        </div>
                    </div>
                ),
                actions: (
                    <>
                        <button onClick={() => { addToPlan(`Post IG Carousel for ${listing.address}`); closeDrawer(); }} className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium">Save to Plan</button>
                        <button onClick={() => { addCompletedAction(`Generated IG Carousel for ${listing.address}`); closeDrawer(); }} className="flex-1 bg-white border border-gray-300 text-black py-2 rounded-lg text-sm font-medium">Mark Complete</button>
                    </>
                )
            });
        }, 600);
    };

    const handleGenerateEmail = (listing: any) => {
        const btnId = `email-${listing.id}`;
        setButtonClicked(btnId);
        showToast("Generating Targeted Email...");
        setTimeout(() => {
            openDrawer({
                title: `Targeted Email: ${listing.address}`,
                subtitle: `Drafted for ${listing.aiSummary?.matchedBuyers.length || 0} matching buyers`,
                content: (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Subject Line</h4>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">Off-Market Opportunity: Matches your Folsom search</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Preview Text</h4>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">Take a look at this updated property before the open house...</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Email Body</h4>
                            <div className="text-sm text-gray-700 bg-compass-beige p-4 rounded-lg border border-gray-200 space-y-3">
                                <p>Hi [Buyer Name],</p>
                                <p>I know you've been keeping an eye out for properties in Folsom with great outdoor space. We just listed {listing.address}, and it checks a lot of your boxes.</p>
                                <p>It features {listing.keyFeatures.join(', ').toLowerCase()}, and is priced at ${listing.price.toLocaleString()}.</p>
                                <p>I'm hosting a private tour for a few clients this Thursday before it hits the broader market. Would you like me to save you a spot?</p>
                                <p>Best,<br/>Ava</p>
                            </div>
                        </div>
                    </div>
                ),
                actions: (
                    <>
                        <button onClick={() => { addToPlan(`Send targeted email for ${listing.address}`); closeDrawer(); }} className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium">Save to Plan</button>
                        <button onClick={() => { addCompletedAction(`Generated Email for ${listing.address}`); closeDrawer(); }} className="flex-1 bg-white border border-gray-300 text-black py-2 rounded-lg text-sm font-medium">Mark Complete</button>
                    </>
                )
            });
        }, 600);
    };

    const handleGenerateReport = (listing: any) => {
        const btnId = `report-${listing.id}`;
        setButtonClicked(btnId);
        showToast("Generating Seller Report...");
        setTimeout(() => {
            openDrawer({
                title: `Seller Update: ${listing.address}`,
                subtitle: "Performance & Strategy Report",
                content: (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Seller-Friendly Summary</h4>
                            <p className="text-sm text-gray-700 bg-compass-beige p-4 rounded-lg border border-gray-200">
                                "{listing.aiSummary?.sellerMessage}"
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Performance Numbers</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                    <p className="text-xs text-gray-500 uppercase">Listing Views</p>
                                    <p className="font-bold text-lg">{listing.listingViews}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                    <p className="text-xs text-gray-500 uppercase">Saves</p>
                                    <p className="font-bold text-lg">{listing.saves}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Recommended Next Steps</h4>
                            <ul className="list-disc pl-4 text-sm text-gray-700 space-y-1">
                                {listing.aiSummary?.nextMoves.map((move: string, i: number) => <li key={i}>{move}</li>)}
                            </ul>
                        </div>
                    </div>
                ),
                actions: (
                    <>
                        <button onClick={() => { addToPlan(`Send seller report for ${listing.address}`); closeDrawer(); }} className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium">Save to Plan</button>
                        <button onClick={() => { addCompletedAction(`Generated Seller Report for ${listing.address}`); closeDrawer(); }} className="flex-1 bg-white border border-gray-300 text-black py-2 rounded-lg text-sm font-medium">Mark Complete</button>
                    </>
                )
            });
        }, 600);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-24">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Marketing Studio</h1>
                <p className="text-gray-500 mt-1">AI-identified marketing gaps and 1-click asset generation.</p>
            </header>

            <div className="space-y-6">
                {listingsWithGaps.map(listing => (
                    <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-64 shrink-0">
                            <div className="h-40 rounded-lg overflow-hidden mb-3">
                                <img src={listing.imageUrl} alt={listing.address} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-bold text-gray-900">{listing.address}</h3>
                            <p className="text-sm text-gray-500 mb-2">Gap Score: <span className="font-bold text-red-500">{listing.marketingGapScore}/100</span></p>
                            <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">{listing.aiSummary?.missingMarketing}</p>
                        </div>
                        
                        <div className="flex-1">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Recommended Assets</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border border-gray-200 rounded-xl p-4 hover:border-black transition-colors cursor-pointer group" onClick={() => handleGenerateIG(listing)}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center"><Smartphone size={16}/></div>
                                        <h5 className="font-semibold text-sm">Instagram Carousel</h5>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-3">Highlighting lifestyle and key features based on buyer demand.</p>
                                    <span className="text-xs font-bold text-black group-hover:underline">
                                        {clickedButtons[`ig-${listing.id}`] ? 'Asset Generated ✓' : 'Generate Asset →'}
                                    </span>
                                </div>
                                
                                <div className="border border-gray-200 rounded-xl p-4 hover:border-black transition-colors cursor-pointer group" onClick={() => handleGenerateEmail(listing)}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Mail size={16}/></div>
                                        <h5 className="font-semibold text-sm">Targeted Email</h5>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-3">Drafted for the {listing.aiSummary?.matchedBuyers.length || 0} matching buyers in your CRM.</p>
                                    <span className="text-xs font-bold text-black group-hover:underline">
                                        {clickedButtons[`email-${listing.id}`] ? 'Asset Generated ✓' : 'Generate Asset →'}
                                    </span>
                                </div>

                                <div className="border border-gray-200 rounded-xl p-4 hover:border-black transition-colors cursor-pointer group" onClick={() => handleGenerateReport(listing)}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><FileText size={16}/></div>
                                        <h5 className="font-semibold text-sm">Seller Update Report</h5>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-3">Explaining the current momentum and next marketing steps.</p>
                                    <span className="text-xs font-bold text-black group-hover:underline">
                                        {clickedButtons[`report-${listing.id}`] ? 'Asset Generated ✓' : 'Generate Asset →'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
