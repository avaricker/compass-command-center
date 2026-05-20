export interface Listing {
  id: string;
  address: string;
  city: string;
  neighborhood: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: string;
  propertyType: string;
  status: 'Active' | 'Pending' | 'Sold' | 'Coming Soon';
  daysOnMarket: number;
  description: string;
  sellerName: string;
  keyFeatures: string[];
  photoCategories: string[];
  photoGaps: string[];
  showingCount: number;
  listingViews: number;
  saves: number;
  shares: number;
  buyerDemandScore: number;
  momentumScore: number;
  sellerConfidenceRisk: 'Low' | 'Medium' | 'High';
  marketingGapScore: number;
  photoGapScore: number;
  marketingStatus: string;
  recommendedNextAction: string;
  imageUrl: string;
  aiInsight?: string;
  aiSummary?: {
    working: string;
    notWorking: string;
    likelyBuyer: string;
    missingMarketing: string;
    matchedBuyers: string[];
    sellerMessage: string;
    nextMoves: string[];
  };
}

export interface Contact {
  id: string;
  name: string;
  type: 'Buyer' | 'Seller' | 'Investor' | 'Past Client' | 'Referral' | 'Cold Lead';
  budgetOrValue: string;
  preferredCities: string[];
  timeline: string;
  leadSource: string;
  stage: string;
  assignedAgent: string;
  lastContactedDate: string;
  recentActivity: string[];
  savedSearches: string[];
  viewedListings: string[];
  favoriteProperties: string[];
  notes: string;
  relationshipStrength: 'High' | 'Medium' | 'Low';
  aiPriorityScore: number;
  sentiment: 'Positive' | 'Anxious' | 'Neutral' | 'Urgent';
  clientMemory: string;
  recommendedNextAction: string;
  suggestedMessage: string;
  revenuePotential: 'High' | 'Medium' | 'Low';
  flagReason: string;
  tags?: string[];
}

export interface ActivityEvent {
  id: string;
  type: 'view' | 'save' | 'alert' | 'message' | 'task';
  description: string;
  time: string;
  contactId?: string;
  listingId?: string;
}

export interface AIAgent {
  id: string;
  name: string;
  analyzing: string;
  status: 'Active' | 'Processing' | 'Idle';
  signalsReviewed: number;
  confidenceScore: number;
  lastInsight: string;
}

export interface WorkspaceSignal {
  id: string;
  platform: 'Gmail' | 'Google Calendar' | 'Chrome' | 'Outlook' | 'Teams' | 'Excel' | 'Marketing Center' | 'Buyer Demand';
  signal: string;
  aiMeaning: string;
  recommendedAction: string;
}

export interface DailyTask {
  id: string;
  time: string;
  action: string;
  completed: boolean;
}

export interface DigitalIntentSignal {
  id: string;
  platform: string;
  listingId?: string;
  address?: string;
  visitorType: 'Anonymous' | 'Known CRM Contact';
  knownContactId?: string;
  contactName?: string;
  city?: string;
  activity: string;
  frequency: number;
  source: string;
  timestamp: string;
  intentScore: number;
  aiInterpretation: string;
  recommendedAction: string;
}
