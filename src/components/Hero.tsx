import React from 'react';
import { ArrowRight, ShieldCheck, HeartHandshake, Leaf, Building2 } from 'lucide-react';
import { ImpactStats } from '../types/foodbridge';

interface HeroProps {
  stats: ImpactStats;
  onOpenDonateModal: () => void;
  onExploreDispatch: () => void;
  onOpenSafetyGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  stats,
  onOpenDonateModal,
  onExploreDispatch,
  onOpenSafetyGuide
}) => {
  return (
    <section className="relative pt-6 pb-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-10">
          
          {/* Left Column: Proposition & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-3 tracking-wide">
              <span>B2B Food Waste Management & Redistribution Network</span>
              <span aria-hidden="true">·</span>
              <span>Zero-Waste Operations</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-4 text-balance">
              Connecting Commercial Food Surplus with Communities in Need
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-2xl">
              FoodBridge enables premier restaurants, banquet hotels, and event organizers to safely dispatch edible surplus to verified NGOs in under 45 minutes. Turn kitchen excess into meals, cut dumpster tipping fees, and claim verified tax deductions.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={onOpenDonateModal}
                className="px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <span>Dispatch Food Surplus</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDispatch}
                className="px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                View Live Dispatch Board
              </button>

              <button
                onClick={onOpenSafetyGuide}
                className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-1 whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Good Samaritan Safe Harbor & Temp Protocol</span>
              </button>
            </div>

            {/* Domain proof points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Restaurants & Hotels</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Verified 501(c)(3) NGOs</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Scope 3 ESG Credits</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm h-72 sm:h-96 lg:h-full bg-slate-100 dark:bg-slate-800">
              <img
                src="/src/assets/images/foodbridge_hero_logistics_1793684801702.jpg"
                alt="Temperature-controlled food rescue van loading surplus food from a fine dining restaurant kitchen"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs font-semibold text-emerald-300 mb-1">
                  Verified Cold-Chain Redistribution
                </div>
                <div className="text-sm font-medium leading-snug">
                  Temperature-logged custody from restaurant ovens directly to community dining tables.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column KPI / Impact Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Meals Delivered to Date</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {stats.totalMealsRescued.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
              Across 22 shelters & soup kitchens
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">CO2e Emissions Prevented</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {(stats.co2eAvoidedKg / 1000).toFixed(1)} <span className="text-base font-normal text-slate-500 dark:text-slate-400">Tons</span>
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
              Landfill methane diverted
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Active Donors & Kitchens</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {stats.activeDonorsCount} <span className="text-base font-normal text-slate-500 dark:text-slate-400">Kitchens</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Hotels, caterers & restaurants
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Food Value Donated</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              ${(stats.totalEconomicValueUsd / 1000).toFixed(0)}k <span className="text-base font-normal text-slate-500 dark:text-slate-400">USD</span>
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
              Eligible for tax write-offs
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
