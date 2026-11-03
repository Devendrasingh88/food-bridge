import React, { useState } from 'react';
import { Check, Calculator, ArrowRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { SUBSCRIPTION_TIERS } from '../data/mockData';
import { SubscriptionTier } from '../types/foodbridge';

interface SubscriptionPlansProps {
  onSelectPlan: (tier: SubscriptionTier) => void;
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // ROI Calculator state
  const [monthlyFoodBudget, setMonthlyFoodBudget] = useState<number>(45000); // USD
  const [estimatedSurplusRate, setEstimatedSurplusRate] = useState<number>(6); // 6% average surplus
  const [wasteHaulingFeePerTon, setWasteHaulingFeePerTon] = useState<number>(140); // USD per ton

  // Calculations
  const monthlySurplusValue = (monthlyFoodBudget * estimatedSurplusRate) / 100;
  const annualSurplusValue = monthlySurplusValue * 12;
  // Estimated weight: ~$10/kg average food cost -> kg of surplus food
  const annualSurplusKg = annualSurplusValue / 10;
  const annualTons = annualSurplusKg / 1000;
  const annualDumpsterFeesSaved = annualTons * wasteHaulingFeePerTon;
  // IRS 170(e)(3) provides enhanced deduction equal to cost basis + half of markup, effectively ~1.4x - 1.8x tax offset
  const annualTaxSavings = annualSurplusValue * 0.28; // ~28% corporate tax write-off impact
  const totalAnnualSavings = annualDumpsterFeesSaved + annualTaxSavings;
  const proAnnualCost = 219 * 12; // Pro plan cost
  const netRoi = totalAnnualSavings - proAnnualCost;
  const roiMultiplier = ((totalAnnualSavings / proAnnualCost) * 100).toFixed(0);

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
            Commercial Subscription Platform
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Turn Waste Hauling Costs into Verified Tax Deductions
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-2">
            Automated food recovery logistics for commercial kitchens, hotels, and event convention centers. Certified chain-of-custody and turnkey ESG compliance.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className={`text-xs ${billingCycle === 'monthly' ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              Billed Monthly
            </span>
            <button
              onClick={() => setBillingCycle(b => b === 'monthly' ? 'annual' : 'monthly')}
              aria-label="Toggle annual or monthly billing"
              className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full p-1 transition-colors relative"
            >
              <div
                className={`w-4 h-4 bg-emerald-600 rounded-full transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs ${billingCycle === 'annual' ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              Billed Annually <span className="text-emerald-600 dark:text-emerald-400 font-semibold">(Save 15%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SUBSCRIPTION_TIERS.map((tier) => {
            const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;

            return (
              <div
                key={tier.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all relative ${
                  tier.popular
                    ? 'border-emerald-500 dark:border-emerald-500 bg-white dark:bg-slate-800 shadow-md ring-1 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[11px] font-bold text-white bg-emerald-600 rounded-full shadow-xs">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {tier.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 min-h-[32px]">
                    {tier.audience}
                  </div>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      / month
                    </span>
                  </div>

                  <div className="space-y-3 mb-6 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-100/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                      <div className="font-semibold text-slate-900 dark:text-white">Pickup SLA: {tier.pickupSla}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{tier.monthlyPickups}</div>
                    </div>

                    <div className="pt-2 text-slate-700 dark:text-slate-300 space-y-2.5">
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onSelectPlan(tier)}
                    className={`w-full py-2.5 text-xs font-semibold rounded-lg shadow-sm transition-colors ${
                      tier.popular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200'
                    }`}
                  >
                    Select {tier.name}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Interactive Waste ROI & Tax Deduction Calculator */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-6 sm:p-8 shadow-xs">
          
          <div className="flex items-center gap-2.5 mb-2">
            <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Restaurant Waste Avoidance & Tax Benefit Calculator
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 max-w-2xl">
            Simulate your financial returns under IRS §170(e)(3) / 80G tax deductions combined with avoided commercial dumpster hauling fees.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Control on Left */}
            <div className="lg:col-span-7 space-y-5 text-xs">
              
              <div>
                <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <span>Monthly Kitchen Food Purchasing Spend</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 tabular-nums text-sm font-bold">
                    ${monthlyFoodBudget.toLocaleString()} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="2500"
                  value={monthlyFoodBudget}
                  onChange={(e) => setMonthlyFoodBudget(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>$5,000 (Small Cafe)</span>
                  <span>$45,000 (Average Hotel/Banquet)</span>
                  <span>$150,000 (Resort / Multi-unit)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <span>Estimated Kitchen Surplus & Over-prep Rate</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 tabular-nums text-sm font-bold">
                    {estimatedSurplusRate}% of prep
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="0.5"
                  value={estimatedSurplusRate}
                  onChange={(e) => setEstimatedSurplusRate(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>2% (Tight Bistro)</span>
                  <span>6% (Standard Hospitality)</span>
                  <span>15% (High-volume buffets)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <span>Commercial Solid Waste Hauling Fee (Tipping per Ton)</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 tabular-nums font-bold">
                    ${wasteHaulingFeePerTon} / ton
                  </span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="250"
                  step="10"
                  value={wasteHaulingFeePerTon}
                  onChange={(e) => setWasteHaulingFeePerTon(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

            </div>

            {/* Calculated Impact Card on Right */}
            <div className="lg:col-span-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Projected Annual Financial Impact
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums mb-1">
                +${Math.round(totalAnnualSavings).toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                Total Annual Value Recovered
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">IRS Tax Deduction Offset:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white tabular-nums">
                    ${Math.round(annualTaxSavings).toLocaleString()} / yr
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Dumpster Tipping Fees Avoided:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white tabular-nums">
                    ${Math.round(annualDumpsterFeesSaved).toLocaleString()} / yr
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Landfill Waste Diverted:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white tabular-nums">
                    {annualTons.toFixed(1)} Metric Tons
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 font-bold">
                  <span className="text-emerald-700 dark:text-emerald-400">Estimated Subscription ROI:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {roiMultiplier}% Return
                  </span>
                </div>
              </div>

              <div className="mt-5 text-[11px] text-slate-400 leading-tight">
                *Calculated using standard federal enhanced tax deduction formulas for commercial food donors under the Good Samaritan and PATH Acts.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
