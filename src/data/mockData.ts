import { SurplusDonation, NGOProfile, SubscriptionTier, CSRPatron, ImpactStats } from '../types/foodbridge';

export const INITIAL_DONATIONS: SurplusDonation[] = [
  {
    id: 'DON-2026-081',
    donorId: 'rest-01',
    donorName: 'The Grand Luminaire Hotel & Banquet',
    donorType: 'hotel',
    donorAddress: '450 Grand Boulevard, Central District',
    donorCity: 'Metro City',
    contactPhone: '+1 (555) 234-8890',
    foodTitle: 'Executive Buffet Surplus: Roasted Medley & Herb Rice',
    description: 'Freshly prepared oven-roasted vegetable tagine, rosemary herb pilaf, steamed seasonal greens, and baked salmon fillets from the evening banquet service. Kept in heated stainless cambros.',
    category: 'cooked_hot',
    servingsCount: 140,
    weightKg: 58.5,
    dietary: ['Halal', 'Gluten-Free Options', 'Vegetarian Available'],
    storageCondition: 'hot_holding',
    tempAtPackaging: 68.5,
    packagingType: 'Insulated Cambro hot boxes & food-grade foil trays',
    preparedAt: '2026-11-02T19:30:00Z',
    pickupDeadline: '2026-11-02T23:30:00Z',
    status: 'available',
    estimatedValueUsd: 1120,
    taxDeductionEligible: true,
    safetyChecklistPassed: true,
    createdAt: '2026-11-02T20:15:00Z',
    timeline: [
      {
        status: 'available',
        timestamp: '2026-11-02T20:15:00Z',
        note: 'Quality inspection passed. Food batched at 68.5°C in tamper-evident sealed trays.',
        actor: 'Chef Julian Vance (Executive Chef)'
      }
    ]
  },
  {
    id: 'DON-2026-082',
    donorId: 'rest-02',
    donorName: 'Artisan Hearth Bakery & Patisserie',
    donorType: 'restaurant',
    donorAddress: '128 Willow Creek Street',
    donorCity: 'Metro City',
    contactPhone: '+1 (555) 492-1033',
    foodTitle: 'Artisanal Sourdough Batards & Brioche Surplus',
    description: 'Whole wheat sourdough boules, seeded multiseed baguettes, butter croissants, and morning rolls baked fresh today. Perfectly crisp crust and packaged in clean craft bread liners.',
    category: 'bakery',
    servingsCount: 85,
    weightKg: 34.0,
    dietary: ['Vegetarian', 'Vegan'],
    storageCondition: 'ambient',
    tempAtPackaging: 21.0,
    packagingType: 'Breathable unbleached kraft paper bakery bags',
    preparedAt: '2026-11-02T06:00:00Z',
    pickupDeadline: '2026-11-03T02:00:00Z',
    status: 'claimed',
    claimedByNgoId: 'ngo-01',
    claimedByNgoName: 'City Harvest Relief Food Bank',
    volunteerDriverName: 'Marcus Chen',
    volunteerPhone: '+1 (555) 839-2911',
    estimatedValueUsd: 480,
    taxDeductionEligible: true,
    safetyChecklistPassed: true,
    createdAt: '2026-11-02T18:00:00Z',
    timeline: [
      {
        status: 'available',
        timestamp: '2026-11-02T18:00:00Z',
        note: 'Surplus logged by pastry manager. Clean packaging verified.',
        actor: 'Elena Rostova (Lead Baker)'
      },
      {
        status: 'claimed',
        timestamp: '2026-11-02T18:45:00Z',
        note: 'Rescue run claimed. Dispatch assigned to Van 03.',
        actor: 'City Harvest Operations'
      }
    ]
  },
  {
    id: 'DON-2026-083',
    donorId: 'rest-03',
    donorName: 'Saffron & Bay Catering Co.',
    donorType: 'catering',
    donorAddress: '904 Industrial Pkwy, Suite 12',
    donorCity: 'Metro City',
    contactPhone: '+1 (555) 774-0012',
    foodTitle: 'Corporate Tech Summit Gala: Spiced Lentil Curry & Naan',
    description: 'Slow-simmered dal makhani, paneer tikka skewers, jeera basmati rice, and warm clay-oven tandoori naan. Chilled rapidly in accordance with the 2-hour chilling rule.',
    category: 'cooked_cold',
    servingsCount: 210,
    weightKg: 88.0,
    dietary: ['Vegetarian', 'Halal', 'Nut-Free'],
    storageCondition: 'refrigerated',
    tempAtPackaging: 3.4,
    packagingType: 'Sealed stainless gastronorm containers with security bands',
    preparedAt: '2026-11-02T16:00:00Z',
    pickupDeadline: '2026-11-03T04:00:00Z',
    status: 'in_transit',
    claimedByNgoId: 'ngo-02',
    claimedByNgoName: 'Hope Haven Community Kitchen',
    volunteerDriverName: 'Sarah Jenkins',
    volunteerPhone: '+1 (555) 301-4478',
    estimatedValueUsd: 1680,
    taxDeductionEligible: true,
    safetyChecklistPassed: true,
    createdAt: '2026-11-02T17:10:00Z',
    timeline: [
      {
        status: 'available',
        timestamp: '2026-11-02T17:10:00Z',
        note: 'Rapid-chill blast cooled to 3.4°C.',
        actor: 'Chef Kabir Mehta'
      },
      {
        status: 'claimed',
        timestamp: '2026-11-02T17:35:00Z',
        note: 'Claimed by Hope Haven Community Kitchen.',
        actor: 'Hope Haven Dispatch'
      },
      {
        status: 'in_transit',
        timestamp: '2026-11-02T18:50:00Z',
        note: 'Picked up in refrigerated transit van #02. Temp steady at 3.2°C.',
        actor: 'Sarah Jenkins (Driver)'
      }
    ]
  },
  {
    id: 'DON-2026-084',
    donorId: 'rest-04',
    donorName: 'Metropolis Corporate Dining Campus',
    donorType: 'corporate_cafeteria',
    donorAddress: '100 Innovation Way, Bldg 4',
    donorCity: 'Metro City',
    contactPhone: '+1 (555) 912-3490',
    foodTitle: 'Salad Bar & Fresh Cold Cuts Surplus',
    description: 'Pre-washed crisp organic romaine, baby spinach, cherry tomatoes, cucumbers, dressings, and packaged cold turkey and roast beef deli cuts. Stored continuously in cold wells.',
    category: 'fresh_produce',
    servingsCount: 95,
    weightKg: 42.0,
    dietary: ['Gluten-Free', 'Dairy-Free Options'],
    storageCondition: 'refrigerated',
    tempAtPackaging: 3.8,
    packagingType: 'Polypropylene food tubs with snap lids',
    preparedAt: '2026-11-02T14:30:00Z',
    pickupDeadline: '2026-11-02T22:00:00Z',
    status: 'distributed',
    claimedByNgoId: 'ngo-03',
    claimedByNgoName: 'St. Jude Center for Families',
    volunteerDriverName: 'David O’Connor',
    volunteerPhone: '+1 (555) 672-9901',
    estimatedValueUsd: 760,
    taxDeductionEligible: true,
    safetyChecklistPassed: true,
    createdAt: '2026-11-02T15:00:00Z',
    timeline: [
      {
        status: 'available',
        timestamp: '2026-11-02T15:00:00Z',
        note: 'End of lunch cafeteria surplus logged.',
        actor: 'Campus Food Services'
      },
      {
        status: 'claimed',
        timestamp: '2026-11-02T15:20:00Z',
        note: 'Claimed by St. Jude Center.',
        actor: 'Dispatcher Kevin'
      },
      {
        status: 'in_transit',
        timestamp: '2026-11-02T15:55:00Z',
        note: 'Van loaded and departed campus.',
        actor: 'David O’Connor'
      },
      {
        status: 'inspected',
        timestamp: '2026-11-02T16:40:00Z',
        note: 'Safety log verified at NGO receiving dock (temp 3.6°C).',
        actor: 'Nurse Martha Ray'
      },
      {
        status: 'distributed',
        timestamp: '2026-11-02T18:15:00Z',
        note: 'Served across 65 family dinner plates and 30 meal kits.',
        actor: 'St. Jude Volunteer Team'
      }
    ],
    distributionSummary: {
      beneficiaryCount: 95,
      distributedAt: '2026-11-02T18:15:00Z',
      location: 'St. Jude Center Family Shelter, West District',
      notes: 'Every plate was cleanly served with fresh dinner salad and protein portions.'
    }
  },
  {
    id: 'DON-2026-085',
    donorId: 'rest-05',
    donorName: 'The Sapphire Ballroom & Events',
    donorType: 'banquet',
    donorAddress: '88 Celebration Plaza',
    donorCity: 'Metro City',
    contactPhone: '+1 (555) 619-8800',
    foodTitle: 'Wedding Banquet Dinner: Grilled Chicken & Pasta Primavera',
    description: 'Unserved gourmet banquet trays of rosemary grilled chicken breast, penne pasta primavera in garlic olive oil, and warm garlic focaccia bread. Maintained above 65°C.',
    category: 'cooked_hot',
    servingsCount: 175,
    weightKg: 72.0,
    dietary: ['Halal Chicken', 'Dairy-Free Option'],
    storageCondition: 'hot_holding',
    tempAtPackaging: 66.8,
    packagingType: 'Deep foil chafing trays with crimped thermal covers',
    preparedAt: '2026-11-02T20:00:00Z',
    pickupDeadline: '2026-11-03T01:00:00Z',
    status: 'available',
    estimatedValueUsd: 1400,
    taxDeductionEligible: true,
    safetyChecklistPassed: true,
    createdAt: '2026-11-02T21:00:00Z',
    timeline: [
      {
        status: 'available',
        timestamp: '2026-11-02T21:00:00Z',
        note: 'Post-reception surplus packaged directly from clean hot holding units.',
        actor: 'Banquet Director Michael Ross'
      }
    ]
  }
];

export const REGISTERED_NGOS: NGOProfile[] = [
  {
    id: 'ngo-01',
    name: 'City Harvest Relief Food Bank',
    category: 'Food Bank',
    city: 'Metro City',
    address: '220 Industrial Canal Way, Central',
    contactPerson: 'Amanda Sterling (Director)',
    phone: '+1 (555) 430-8801',
    activeVehicles: 4,
    refrigeratedCapacityKg: 850,
    currentIntakeKg: 340,
    dailyCapacityMeals: 1200,
    taxExemptId: '501(c)(3) #84-9021892',
    urgentNeeds: ['Cooked Hot Meals', 'Fresh Produce', 'Dairy & Eggs'],
    mealsServedThisMonth: 18450,
    ratingScore: 4.95
  },
  {
    id: 'ngo-02',
    name: 'Hope Haven Community Kitchen',
    category: 'Community Kitchen',
    city: 'Metro City',
    address: '740 Elm Street, East District',
    contactPerson: 'Father Daniel Thorne',
    phone: '+1 (555) 912-7744',
    activeVehicles: 2,
    refrigeratedCapacityKg: 400,
    currentIntakeKg: 210,
    dailyCapacityMeals: 650,
    taxExemptId: '501(c)(3) #76-1294801',
    urgentNeeds: ['Prepared Entrees', 'Rice & Staples', 'Warm Bakery'],
    mealsServedThisMonth: 9800,
    ratingScore: 4.90
  },
  {
    id: 'ngo-03',
    name: 'St. Jude Center for Families & Children',
    category: 'Homeless Shelter',
    city: 'Metro City',
    address: '315 Meadow Lane, Westside',
    contactPerson: 'Martha Ray (Operations Lead)',
    phone: '+1 (555) 883-9912',
    activeVehicles: 2,
    refrigeratedCapacityKg: 300,
    currentIntakeKg: 180,
    dailyCapacityMeals: 400,
    taxExemptId: '501(c)(3) #91-3849102',
    urgentNeeds: ['Kid-Friendly Meals', 'Fresh Fruits', 'Healthy Soups'],
    mealsServedThisMonth: 6200,
    ratingScore: 4.98
  },
  {
    id: 'ngo-04',
    name: 'Seva Meal Mission & Night Kitchen',
    category: 'Community Kitchen',
    city: 'Metro City',
    address: '509 Railway Road, South Hub',
    contactPerson: 'Tariq Al-Mansoor',
    phone: '+1 (555) 604-3321',
    activeVehicles: 3,
    refrigeratedCapacityKg: 550,
    currentIntakeKg: 195,
    dailyCapacityMeals: 800,
    taxExemptId: '501(c)(3) #58-4491029',
    urgentNeeds: ['High Protein Curries', 'Vegetarian Rice', 'Fresh Bread'],
    mealsServedThisMonth: 12100,
    ratingScore: 4.92
  }
];

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'tier-bistro',
    name: 'Bistro & Cafe Plan',
    audience: 'For standalone cafes, bakeries, and neighbourhood eateries',
    monthlyPrice: 79,
    annualPrice: 69,
    features: [
      'Up to 12 scheduled or on-demand pickups/month',
      'Automated 501(c)(3) / 80G tax deduction receipts',
      'Food safety compliance guarantee & liability safe harbor',
      'Monthly waste diversion audit summary',
      'Verified "Zero Waste Pioneer" digital window badge'
    ],
    taxFilingAssistance: 'Automated monthly IRS Form 8283 / 170(e)(3) statements',
    pickupSla: 'Under 90 minutes from listing',
    monthlyPickups: '12 Pickups included',
    esgReporting: 'Standard quarterly summary'
  },
  {
    id: 'tier-hotel-pro',
    name: 'Hotel & Banquet Pro',
    audience: 'For high-volume hotels, caterers, and event convention halls',
    monthlyPrice: 249,
    annualPrice: 219,
    popular: true,
    features: [
      'Unlimited on-demand rescue runs & event standby',
      'Priority rapid dispatch (<45 min response time)',
      'Dedicated refrigerated electric van route allocation',
      'Real-time temperature logging & chain-of-custody tracking',
      'Comprehensive ESG carbon & methane offset certificate',
      'Quarterly kitchen prep waste minimization consulting'
    ],
    taxFilingAssistance: 'Custom fair-market value batch documentation with CPA audit support',
    pickupSla: 'Under 45 minutes guaranteed',
    monthlyPickups: 'Unlimited pickups',
    esgReporting: 'Monthly full Scope 3 ESG report'
  },
  {
    id: 'tier-enterprise',
    name: 'Enterprise Hospitality Chain',
    audience: 'For multi-location restaurant chains, casino resorts, and campus cafeterias',
    monthlyPrice: 699,
    annualPrice: 599,
    features: [
      'Multi-site central management dashboard (up to 15 locations)',
      'Dedicated fleet dispatch manager & 24/7 hotline',
      'Custom ERP & POS integration for surplus prediction',
      'Automated corporate CSR impact co-branding',
      'Direct NGO pairing & corporate employee volunteer days',
      'Executive board-ready sustainability report (GRI / SEC compliant)'
    ],
    taxFilingAssistance: 'Enterprise tax ledger with automated multi-entity allocation',
    pickupSla: 'Immediate VIP dispatch with reserved van fleet',
    monthlyPickups: 'Unlimited multi-site pickups',
    esgReporting: 'Automated real-time API telemetry'
  }
];

export const CSR_PATRONS: CSRPatron[] = [
  {
    id: 'csr-01',
    corporateName: 'Apex Financial Technologies',
    industry: 'Financial Services',
    tier: 'Platinum Vanguard',
    sponsoredMeals: 45000,
    fundingUsd: 25000,
    sponsoredVans: 2,
    dedicatedNgoPartner: 'City Harvest Relief Food Bank',
    esgImpactScore: 98,
    datePledged: '2026-09-15'
  },
  {
    id: 'csr-02',
    corporateName: 'Meridian Cloud Systems',
    industry: 'Enterprise Software',
    tier: 'Gold Champion',
    sponsoredMeals: 24000,
    fundingUsd: 15000,
    sponsoredVans: 1,
    dedicatedNgoPartner: 'Hope Haven Community Kitchen',
    esgImpactScore: 94,
    datePledged: '2026-10-01'
  },
  {
    id: 'csr-03',
    corporateName: 'Horizon Biopharma Group',
    industry: 'Healthcare & Life Sciences',
    tier: 'Gold Champion',
    sponsoredMeals: 20000,
    fundingUsd: 12500,
    sponsoredVans: 1,
    dedicatedNgoPartner: 'St. Jude Center for Families',
    esgImpactScore: 92,
    datePledged: '2026-10-18'
  },
  {
    id: 'csr-04',
    corporateName: 'Vanguard Retail Logistics',
    industry: 'Supply Chain & Cold Storage',
    tier: 'Silver Guardian',
    sponsoredMeals: 10000,
    fundingUsd: 7500,
    sponsoredVans: 1,
    dedicatedNgoPartner: 'Seva Meal Mission',
    esgImpactScore: 88,
    datePledged: '2026-10-28'
  }
];

export const INITIAL_STATS: ImpactStats = {
  totalMealsRescued: 148920,
  totalKgRescued: 62450,
  co2eAvoidedKg: 156125, // approx 2.5 kg CO2e per kg food saved from landfill
  waterSavedLiters: 1873500, // approx 30 L water per kg food
  activeDonorsCount: 84,
  partnerNgoCount: 22,
  totalEconomicValueUsd: 498300
};
