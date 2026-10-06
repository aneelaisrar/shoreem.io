export type Language = 'en' | 'ur' | 'ur-roman' | 'ar';

export type ToolType = 
  | 'captions' 
  | 'scripts' 
  | 'ideas' 
  | 'hashtags' 
  | 'planner' 
  | 'assistant';

export type SocialPlatform = 
  | 'instagram' 
  | 'tiktok' 
  | 'linkedin' 
  | 'twitter' 
  | 'youtube' 
  | 'facebook';

export type PlanTier = 'free' | 'starter' | 'pro' | 'business';

export type ExportFormat = 'txt' | 'csv' | 'pdf';

export interface ContentAnalysis {
  overallScore: number;
  hookScore: number;
  readabilityScore: number;
  ctaScore: number;
  seoScore: number;
  strengths: string[];
  suggestions: string[];
  readingTimeSec: number;
  wordCount: number;
  sentiment: 'High Excitement' | 'Authoritative' | 'Inspirational' | 'Urgent';
}

export interface HistoryItem {
  id: string;
  type: ToolType;
  title: string;
  content: string;
  platform?: SocialPlatform;
  createdAt: string;
  tags?: string[];
  analysis?: ContentAnalysis;
}

export interface SavedItem {
  id: string;
  type: ToolType;
  title: string;
  content: string;
  platform?: SocialPlatform;
  createdAt: string;
  tags?: string[];
}

export interface PlannerDay {
  day: number;
  week: number;
  theme: string;
  title: string;
  format: 'Reel' | 'Carousel' | 'Text' | 'Story' | 'Short';
  platform: SocialPlatform;
  hook: string;
  caption: string;
  hashtags: string[];
  status: 'Draft' | 'Scheduled' | 'Published';
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: string;
  actionItems?: string[];
}

export interface PricingPlan {
  id: PlanTier;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  credits: string;
}

export type PaymentState = 'idle' | 'checkout' | 'success' | 'cancelled';

export interface SubscriptionStatus {
  plan: PlanTier;
  billingCycle: 'monthly' | 'yearly';
  status: 'active' | 'pending_verification' | 'cancelled';
  renewsAt: string;
  transactionId?: string;
  customerEmail?: string;
  customerName?: string;
  amountPaid: number;
}

export interface PaymentProof {
  id: string;
  customerName: string;
  customerEmail: string;
  plan: PlanTier;
  billingCycle: 'monthly' | 'yearly';
  amount: number;
  transactionId: string;
  screenshotUrl?: string;
  notes?: string;
  submittedAt: string;
}
