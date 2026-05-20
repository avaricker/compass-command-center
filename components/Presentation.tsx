import React from 'react';

export const Presentation: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-24">
            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200">
                <h1 className="text-3xl font-bold mb-8">Why This Is Different</h1>
                <div className="prose prose-gray max-w-none text-gray-800 text-lg leading-relaxed">
                    <p className="mb-4">
                        Most AI tools wait for someone to ask a question. This system watches the work already happening around the agent and turns it into action.
                    </p>
                    <p className="mb-4">
                        It does not replace the agent. It makes the agent sharper.
                    </p>
                    <p className="mb-4">
                        It does not just write content. It connects CRM activity, buyer demand, listing performance, marketing gaps, client sentiment, calendar context, notes, and workspace behavior into one decision engine.
                    </p>
                    <p className="mb-4">The result is a platform that can say:</p>
                    <ul className="list-disc list-inside mb-6 space-y-2 font-medium text-black">
                        <li>"Here is what changed."</li>
                        <li>"Here is why it matters."</li>
                        <li>"Here is who needs attention."</li>
                        <li>"Here is what to do next."</li>
                        <li>"Here is the exact message, task, or marketing asset to create."</li>
                    </ul>
                    <p className="font-bold text-xl border-l-4 border-black pl-4">
                        That is the shift from a platform agents use to a platform that actively helps agents win.
                    </p>
                </div>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200">
                <h1 className="text-3xl font-bold mb-8">Demo Script</h1>
                <div className="prose prose-gray max-w-none">
                    <h3 className="text-xl font-semibold mt-6 mb-2">Opening</h3>
                    <p className="text-gray-700 italic border-l-4 border-gray-300 pl-4 mb-6">
                        "Today I wanted to show a concept for where Compass technology could go next. What stood out to me is that Compass already has so many powerful pieces inside the platform—CRM, listings, marketing, buyer demand, contacts, tasks, messages, and performance data. The opportunity is connecting those pieces through AI so the platform does not just hold information, it actively helps agents know what to do next."
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-2">Main Point</h3>
                    <p className="text-gray-700 italic border-l-4 border-gray-300 pl-4 mb-6">
                        "This is not meant to be just a chatbot. It is an intelligence layer. It watches the activity already happening inside the platform, finds patterns, identifies opportunities, and helps the agent take action faster."
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-2">Demo Walkthrough</h3>
                    <p className="text-gray-700 italic border-l-4 border-gray-300 pl-4 mb-6">
                        "Here, the agent starts in the AI Command Center. Instead of opening ten different sections to figure out what needs attention, the system gives the agent the highest-value actions first."
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-2">Listing Example</h3>
                    <p className="text-gray-700 italic border-l-4 border-gray-300 pl-4 mb-6">
                        "For this listing, the AI is not just rewriting copy. It is looking at buyer demand, listing views, saves, showings, photo engagement, price point, and CRM matches. Then it tells the agent what is working, what is not working, and what to do next."
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-2">CRM Example</h3>
                    <p className="text-gray-700 italic border-l-4 border-gray-300 pl-4 mb-6">
                        "This is where the system becomes really powerful. It can identify a buyer who is showing intent before the agent would normally notice. If someone has viewed the same listing multiple times, saved similar homes, and has not been contacted recently, the AI flags that as an opportunity."
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-2">Close</h3>
                    <p className="text-gray-700 italic border-l-4 border-gray-300 pl-4 mb-6">
                        "The real value is that this makes the platform proactive. It helps agents act faster, follow up better, market smarter, and use more of the technology already available to them. Compass already has the tools. This makes the tools work together."
                    </p>
                </div>
            </div>
        </div>
    );
};
