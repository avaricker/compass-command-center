import { GoogleGenAI } from '@google/genai';
import { Listing, Contact } from './types.ts';
import { mockListings, mockContacts } from './mockData.ts';

let ai: GoogleGenAI | null = null;

try {
    const apiKey = (window as any).process?.env?.API_KEY || 'dummy_key_for_demo_purposes';
    ai = new GoogleGenAI({ apiKey: apiKey, vertexai: true });
} catch (e) {
    console.warn("Could not initialize GoogleGenAI. Chat will use simulated responses.", e);
}

const generateContextString = (listings: Listing[], contacts: Contact[]) => {
    const listingsContext = listings.map(l => `${l.address} (${l.status}): $${l.price}, Momentum: ${l.momentumScore}. Issue: ${l.aiInsight}`).join('\n');
    const contactsContext = contacts.map(c => `${c.name} (${c.type}): ${c.stage}, looking in ${c.preferredCities.join(', ')}. Memory: ${c.clientMemory}`).join('\n');
    
    return `
You are the Compass Command Agent, the central intelligence layer for real estate agent Ava Ricker.
You orchestrate other agents like the Next Best Action Agent, Listing Momentum Agent, Client Memory Agent, Digital Intent Agent, and Notes-to-CRM Agent.
Your goal is to help Ava take action based on data. Be concise, professional, and action-oriented.

Here is the current state of Ava's business:

LISTINGS:
${listingsContext}

CONTACTS:
${contactsContext}

When asked for advice, refer to these specific listings and contacts. Suggest concrete next steps like drafting emails, creating tasks, or updating the CRM.
`;
};

export const chatWithAgent = async (message: string, contextData?: { listings: Listing[], contacts: Contact[] }): Promise<string> => {
    const listings = contextData?.listings || mockListings;
    const contacts = contextData?.contacts || mockContacts;

    if (!ai) {
        return simulateResponse(message);
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
                systemInstruction: generateContextString(listings, contacts),
                temperature: 0.7,
            }
        });
        return response.text || "I couldn't generate a response.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return simulateResponse(message);
    }
};

const simulateResponse = async (message: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('daniel brooks') || lowerMsg.includes('first today') || lowerMsg.includes('changed overnight')) {
        return "Daniel Brooks is your top priority. He viewed 1228 Willow Crest Lane again at 9:42 PM last night. He has viewed it 4 times in 48 hours and saved 3 similar homes, but hasn't been contacted in 12 days. I recommend sending him a text right now to offer a private showing this weekend.";
    }
    if (lowerMsg.includes('willow crest') || lowerMsg.includes('improve 1228') || lowerMsg.includes('losing momentum')) {
        return "For 1228 Willow Crest Lane, the Listing Momentum Agent flagged that showing conversion is low despite strong views. The current price of $949K might be slightly above the active search range. I recommend updating the listing description to emphasize the remodeled kitchen and top schools, and creating a targeted email campaign for buyers searching under $950K.";
    }
    if (lowerMsg.includes('trevor') || lowerMsg.includes('elise') || lowerMsg.includes('seller update')) {
        return "The Seller Confidence Agent noted Trevor and Elise opened their last update twice overnight. I've drafted a new update: 'Hi Trevor and Elise, quick update on Ridgeview: We saw a 22% increase in online views this week and 14 new saves. Buyers are noticing it. Showing requests are flat, so I recommend we refresh the listing copy to highlight the backyard and watch the $1.3M price band closely.' Would you like me to send this?";
    }
    if (lowerMsg.includes('marketing plan') || lowerMsg.includes('blackstone') || lowerMsg.includes('marketing asset')) {
        return "The Marketing Gap Agent flagged 2457 Blackstone Drive. The best campaign angle is luxury family living with resort-style outdoor space. I recommend creating an Instagram carousel featuring the pool and guest house, an email blast to your luxury buyer list, and a private showing invite. I can generate the copy for these assets now.";
    }
    if (lowerMsg.includes('closest to converting') || lowerMsg.includes('lauren')) {
        return "Lauren Evans is showing high intent. She attended the open house at 36 Clinton, asked about inspection timelines, and clicked the listing brochure again overnight. I recommend following up immediately regarding her inspection questions.";
    }
    
    return "Based on the Live Intelligence Engine, I recommend focusing on your active buyers who have shown recent engagement but lack follow-up, like Daniel Brooks. Would you like me to pull up a list of all warm leads with activity in the last 7 days?";
};
