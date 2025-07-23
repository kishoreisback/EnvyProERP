import { KnowledgeItem, BotResponse, QuickReply } from "./types";

export const indianMarketKnowledge: KnowledgeItem[] = [
  // Real Estate Market
  {
    keywords: [
      "property prices",
      "real estate rates",
      "property market",
      "housing prices",
      "property investment",
    ],
    response:
      "Indian real estate market varies significantly by location. Metro cities like Mumbai, Delhi, Bangalore have higher rates (₹8,000-25,000 per sq ft), while Tier-2 cities range ₹3,000-8,000 per sq ft. Current trends show 5-8% annual appreciation in prime locations. RERA has improved transparency since 2016.",
    category: "real_estate",
    quickReplies: [
      { text: "Mumbai Property Rates", value: "mumbai_rates" },
      { text: "RERA Guidelines", value: "rera_info" },
      { text: "Investment Tips", value: "investment_tips" },
    ],
  },
  {
    keywords: [
      "rera",
      "real estate regulation",
      "property laws",
      "rera compliance",
    ],
    response:
      "RERA (Real Estate Regulation & Development Act) 2016 mandates: 1) Project registration before marketing 2) 70% funds in escrow account 3) Completion timeline disclosure 4) Standard carpet area measurement 5) Grievance redressal mechanism. All states have RERA authorities for complaint resolution.",
    category: "legal",
    quickReplies: [
      { text: "File RERA Complaint", value: "rera_complaint" },
      { text: "Project Verification", value: "project_verification" },
      { text: "Consumer Rights", value: "consumer_rights" },
    ],
  },
  {
    keywords: [
      "home loan",
      "housing finance",
      "property loan",
      "mortgage rates",
    ],
    response:
      "Current home loan rates in India: SBI 8.5-9.05%, HDFC 8.6-9.1%, ICICI 8.7-9.15%. Maximum loan: 80-90% of property value. Documents needed: Income proof, property papers, bank statements. Processing time: 15-30 days. Pradhan Mantri Awas Yojana offers subsidies for first-time buyers.",
    category: "finance",
    quickReplies: [
      { text: "EMI Calculator", value: "emi_calculator" },
      { text: "PMAY Scheme", value: "pmay_details" },
      { text: "Tax Benefits", value: "tax_benefits" },
    ],
  },

  // Business & CRM
  {
    keywords: [
      "crm implementation",
      "customer management",
      "lead generation",
      "sales process",
    ],
    response:
      "CRM implementation in Indian market should focus on: 1) Multi-language support (Hindi, regional languages) 2) WhatsApp/SMS integration 3) Local festival/holiday calendar 4) Regional payment methods 5) Relationship-based selling approach. ROI typically shows 15-25% improvement in sales conversion.",
    category: "business",
    quickReplies: [
      { text: "CRM Features", value: "crm_features" },
      { text: "Implementation Cost", value: "crm_cost" },
      { text: "Training Requirements", value: "crm_training" },
    ],
  },
  {
    keywords: [
      "digital marketing",
      "online marketing",
      "social media marketing",
      "lead generation",
    ],
    response:
      "Digital marketing in India: WhatsApp Business (2B+ users), Facebook (350M users), Instagram (180M users), YouTube most effective. Cost: Google Ads ₹20-50 per click, Facebook ₹10-30 per click. Local SEO crucial. Regional language content increases engagement by 40%.",
    category: "marketing",
    quickReplies: [
      { text: "WhatsApp Marketing", value: "whatsapp_marketing" },
      { text: "Local SEO Tips", value: "local_seo" },
      { text: "Content Strategy", value: "content_strategy" },
    ],
  },

  // Financial Markets
  {
    keywords: ["stock market", "share market", "sensex", "nifty", "investment"],
    response:
      "Indian stock market: BSE Sensex (30 companies), NSE Nifty 50 (50 companies). Trading hours: 9:15 AM - 3:30 PM. Demat account required. Long-term investments show 12-15% annual returns. SIP in mutual funds popular. SEBI regulates markets. Current market cap: ₹280+ trillion.",
    category: "finance",
    quickReplies: [
      { text: "How to Start Trading", value: "start_trading" },
      { text: "Mutual Funds", value: "mutual_funds" },
      { text: "Tax on Gains", value: "capital_gains_tax" },
    ],
  },

  // GST & Taxation
  {
    keywords: [
      "gst",
      "goods and services tax",
      "tax rates",
      "gst registration",
    ],
    response:
      "GST in India: 5% (essential items), 12% (processed foods), 18% (most goods/services), 28% (luxury items). Registration mandatory for ₹20L+ turnover (₹10L for NE states). Monthly returns required. Input tax credit available. Composition scheme for small businesses at 1-5% rates.",
    category: "taxation",
    quickReplies: [
      { text: "GST Calculator", value: "gst_calculator" },
      { text: "Filing Returns", value: "gst_returns" },
      { text: "Composition Scheme", value: "composition_scheme" },
    ],
  },

  // Technology & Startups
  {
    keywords: [
      "startup funding",
      "venture capital",
      "startup ecosystem",
      "funding rounds",
    ],
    response:
      "Indian startup ecosystem: $25B+ funding in 2023. Major VCs: Sequoia, Accel, Softbank. Stages: Pre-seed (₹25L-1Cr), Seed (₹1-10Cr), Series A (₹10-50Cr). Government schemes: Startup India, SIDBI loans. Bangalore, Delhi, Mumbai are major hubs. 90,000+ recognized startups.",
    category: "technology",
    quickReplies: [
      { text: "Startup Registration", value: "startup_registration" },
      { text: "Government Schemes", value: "govt_schemes" },
      { text: "Investor Connect", value: "investor_connect" },
    ],
  },

  // E-commerce & Digital Payments
  {
    keywords: [
      "ecommerce",
      "online business",
      "digital payments",
      "upi",
      "razorpay",
    ],
    response:
      "Indian e-commerce: $75B market, growing 25% annually. Payment methods: UPI (70% digital transactions), Cards, Wallets, BNPL. Key players: Amazon, Flipkart, Myntra. UPI transaction volume: 10B+ monthly. Digital payment acceptance increases sales by 30-40%.",
    category: "ecommerce",
    quickReplies: [
      { text: "Start E-commerce", value: "start_ecommerce" },
      { text: "Payment Integration", value: "payment_integration" },
      { text: "Logistics Partners", value: "logistics" },
    ],
  },

  // Agriculture & Rural Market
  {
    keywords: [
      "agriculture",
      "farming",
      "rural market",
      "agri business",
      "crop prices",
    ],
    response:
      "Indian agriculture: 50% workforce, 18% GDP. Major crops: Rice, wheat, sugarcane, cotton. MSP (Minimum Support Price) announced annually. PM-KISAN provides ₹6,000/year to farmers. FPOs (Farmer Producer Organizations) gaining momentum. Agri-tech startups growing rapidly.",
    category: "agriculture",
    quickReplies: [
      { text: "MSP Rates", value: "msp_rates" },
      { text: "PM-KISAN Scheme", value: "pm_kisan" },
      { text: "Agri Loans", value: "agri_loans" },
    ],
  },

  // General Greetings and Help
  {
    keywords: ["hello", "hi", "hey", "namaste", "good morning", "good evening"],
    response:
      "Namaste! 🙏 I'm Saathi, your intelligent business companion. I can help you with information about Indian markets, real estate, business processes, regulations, and much more. How can I assist you today?",
    category: "greeting",
    quickReplies: [
      { text: "Real Estate Info", value: "real_estate_help" },
      { text: "Business Guidance", value: "business_help" },
      { text: "Market Insights", value: "market_insights" },
      { text: "Legal & Compliance", value: "legal_help" },
    ],
  },
  {
    keywords: ["help", "what can you do", "features", "capabilities"],
    response:
      "I can help you with: 📊 Indian market insights, 🏠 Real estate information, 💼 Business guidance, 📋 CRM best practices, 💰 Financial advice, ⚖️ Legal compliance, 🚀 Startup ecosystem, 🌾 Agriculture sector, 💳 Digital payments, and much more!",
    category: "help",
    quickReplies: [
      { text: "Market Trends", value: "market_trends" },
      { text: "Investment Options", value: "investment_options" },
      { text: "Business Setup", value: "business_setup" },
      { text: "Regulatory Info", value: "regulatory_info" },
    ],
  },
];

export const quickStartReplies: QuickReply[] = [
  { text: "🏠 Property Rates", value: "property_rates" },
  { text: "💼 CRM Solutions", value: "crm_solutions" },
  { text: "📈 Market Trends", value: "market_trends" },
  { text: "⚖️ Legal Compliance", value: "legal_compliance" },
  { text: "💰 Investment Guide", value: "investment_guide" },
  { text: "🚀 Business Setup", value: "business_setup" },
];

export class IndianMarketBot {
  private knowledge: KnowledgeItem[];

  constructor() {
    this.knowledge = indianMarketKnowledge;
  }

  generateResponse(userMessage: string, context?: any): BotResponse {
    const normalizedMessage = userMessage.toLowerCase();

    // Find matching knowledge items
    const matches = this.knowledge.filter((item) =>
      item.keywords.some((keyword) =>
        normalizedMessage.includes(keyword.toLowerCase()),
      ),
    );

    if (matches.length > 0) {
      // Return the best match (first one for now)
      const bestMatch = matches[0];
      return {
        text: bestMatch.response,
        quickReplies:
          bestMatch.quickReplies ||
          this.getContextualQuickReplies(bestMatch.category),
        type: "text",
      };
    }

    // Handle specific quick reply values
    return (
      this.handleQuickReplyResponse(userMessage) || this.getDefaultResponse()
    );
  }

  private handleQuickReplyResponse(value: string): BotResponse | null {
    const responses: { [key: string]: BotResponse } = {
      mumbai_rates: {
        text: "Mumbai Property Rates (2024): South Mumbai ₹25,000-45,000/sq ft, Western Suburbs ₹12,000-22,000/sq ft, Central Suburbs ₹8,000-15,000/sq ft, Eastern Suburbs ₹6,000-12,000/sq ft. Luxury projects can go up to ₹60,000+/sq ft.",
        quickReplies: [
          { text: "Bangalore Rates", value: "bangalore_rates" },
          { text: "Delhi NCR Rates", value: "delhi_rates" },
          { text: "Investment Analysis", value: "investment_analysis" },
        ],
      },
      rera_complaint: {
        text: "To file RERA complaint: 1) Visit your state RERA website 2) Register as complainant 3) Pay nominal fee (₹1,000-5,000) 4) Upload project/agreement documents 5) Submit complaint online 6) Track status. Maharashtra RERA most active with 15,000+ resolved cases.",
        quickReplies: [
          { text: "RERA Website Links", value: "rera_websites" },
          { text: "Document Checklist", value: "rera_documents" },
          { text: "Success Stories", value: "rera_success" },
        ],
      },
      pmay_details: {
        text: "PM Awas Yojana benefits: Interest subsidy 6.5% (EWS/LIG), 4% (MIG-I), 3% (MIG-II). Maximum subsidy: ₹2.67L (EWS/LIG), ₹2.35L (MIG-I), ₹2.30L (MIG-II). Carpet area limit: 30-60 sqm (EWS/LIG), 60-120 sqm (MIG). Apply through bank or PMAY website.",
        quickReplies: [
          { text: "Eligibility Check", value: "pmay_eligibility" },
          { text: "Application Process", value: "pmay_application" },
          { text: "Required Documents", value: "pmay_documents" },
        ],
      },
      start_trading: {
        text: "Start stock trading: 1) Open Demat+Trading account with broker 2) Complete KYC (Aadhaar, PAN, bank proof) 3) Initial deposit ₹5,000+ 4) Download trading app 5) Start with blue-chip stocks 6) Learn technical analysis. Popular brokers: Zerodha, Groww, Angel One.",
        quickReplies: [
          { text: "Best Brokers", value: "best_brokers" },
          { text: "Beginner Stocks", value: "beginner_stocks" },
          { text: "Trading Strategies", value: "trading_strategies" },
        ],
      },
    };

    return responses[value] || null;
  }

  private getContextualQuickReplies(category: string): QuickReply[] {
    const categoryReplies: { [key: string]: QuickReply[] } = {
      real_estate: [
        { text: "Property Laws", value: "property_laws" },
        { text: "Investment Tips", value: "investment_tips" },
        { text: "Market Trends", value: "market_trends" },
      ],
      business: [
        { text: "CRM Setup", value: "crm_setup" },
        { text: "Digital Marketing", value: "digital_marketing" },
        { text: "Business Registration", value: "business_registration" },
      ],
      finance: [
        { text: "Tax Saving", value: "tax_saving" },
        { text: "Investment Options", value: "investment_options" },
        { text: "Loan Information", value: "loan_info" },
      ],
    };

    return categoryReplies[category] || quickStartReplies.slice(0, 3);
  }

  private getDefaultResponse(): BotResponse {
    return {
      text: "I understand you're looking for information, but I couldn't find a specific match. I specialize in Indian market insights, real estate, business guidance, and regulatory information. Could you please rephrase your question or choose from the options below?",
      quickReplies: quickStartReplies.slice(0, 4),
      type: "text",
    };
  }

  getWelcomeMessage(): BotResponse {
    return {
      text: "🙏 Namaste! I'm Saathi, your intelligent business companion for the Indian market. I can help you with real estate insights, business guidance, market trends, legal compliance, and much more. What would you like to know?",
      quickReplies: quickStartReplies,
      type: "text",
    };
  }
}
