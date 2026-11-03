export type DonorType = 'restaurant' | 'hotel' | 'banquet' | 'catering' | 'corporate_cafeteria';

export type FoodCategory = 
  | 'cooked_hot' 
  | 'cooked_cold' 
  | 'bakery' 
  | 'fresh_produce' 
  | 'packaged_staples' 
  | 'dairy_desserts';

export type StorageCondition = 'hot_holding' | 'refrigerated' | 'ambient' | 'frozen';

export type DonationStatus = 'available' | 'claimed' | 'in_transit' | 'inspected' | 'distributed' | 'cancelled';

export interface DonationTimelineEvent {
  status: DonationStatus;
  timestamp: string;
  note: string;
  actor: string;
}

export interface SurplusDonation {
  id: string;
  donorId: string;
  donorName: string;
  donorType: DonorType;
  donorAddress: string;
  donorCity: string;
  contactPhone: string;
  foodTitle: string;
  description: string;
  category: FoodCategory;
  servingsCount: number;
  weightKg: number;
  dietary: string[];
  storageCondition: StorageCondition;
  tempAtPackaging: number; // in Celsius
  packagingType: string;
  preparedAt: string;
  pickupDeadline: string;
  status: DonationStatus;
  claimedByNgoId?: string;
  claimedByNgoName?: string;
  volunteerDriverName?: string;
  volunteerPhone?: string;
  estimatedValueUsd: number;
  taxDeductionEligible: boolean;
  safetyChecklistPassed: boolean;
  createdAt: string;
  timeline: DonationTimelineEvent[];
  distributionSummary?: {
    beneficiaryCount: number;
    distributedAt: string;
    location: string;
    notes: string;
  };
}

export interface NGOProfile {
  id: string;
  name: string;
  category: 'Food Bank' | 'Homeless Shelter' | 'Community Kitchen' | 'Elderly Support' | 'Youth Home';
  city: string;
  address: string;
  contactPerson: string;
  phone: string;
  activeVehicles: number;
  refrigeratedCapacityKg: number;
  currentIntakeKg: number;
  dailyCapacityMeals: number;
  taxExemptId: string; // e.g. 501(c)(3) or 80G
  urgentNeeds: string[];
  mealsServedThisMonth: number;
  ratingScore: number;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  audience: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  taxFilingAssistance: string;
  pickupSla: string;
  monthlyPickups: string;
  esgReporting: string;
}

export interface CSRPatron {
  id: string;
  corporateName: string;
  industry: string;
  tier: 'Silver Guardian' | 'Gold Champion' | 'Platinum Vanguard';
  sponsoredMeals: number;
  fundingUsd: number;
  sponsoredVans: number;
  dedicatedNgoPartner: string;
  esgImpactScore: number;
  datePledged: string;
}

export interface ImpactStats {
  totalMealsRescued: number;
  totalKgRescued: number;
  co2eAvoidedKg: number;
  waterSavedLiters: number;
  activeDonorsCount: number;
  partnerNgoCount: number;
  totalEconomicValueUsd: number;
}
