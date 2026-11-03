import React from 'react';
import { Leaf, Droplets, Utensils, DollarSign, Download, Share2, Quote } from 'lucide-react';
import { ImpactStats } from '../types/foodbridge';

interface ImpactAnalyticsProps {
  stats: ImpactStats;
  onExportCsv: () => void;
}

export const ImpactAnalytics: React.FC<ImpactAnalyticsProps> = ({ stats, onExportCsv }) => {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
              Environmental & Social Governance
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Verifiable Environmental & Hunger Relief Metrics
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Every kilogram of surplus food rescued prevents methane release in local landfills and replaces virgin food production. All data conforms to the WRI Food Loss and Waste Accounting Standard.
            </p>
          </div>

          <button
            onClick={onExportCsv}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export ESG CSV Report</span>
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Carbon / CO2e avoidance */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Atmospheric Carbon Abatement
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums mb-2">
                {(stats.co2eAvoidedKg / 1000).toFixed(1)} <span className="text-lg font-normal text-slate-500">Metric Tons</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Equivalent to removing 34 passenger gasoline vehicles from the road for an entire year. Food decomposing in landfills produces methane, 28x more potent than CO2.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Factor: 2.5 kg CO2e avoided per 1.0 kg rescued food
            </div>
          </div>

          {/* Card 2: Embedded Water Conservation */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Virtual Water Preserved
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums mb-2">
                {(stats.waterSavedLiters / 1000).toFixed(0)}k <span className="text-lg font-normal text-slate-500">Liters</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Agriculture and livestock require massive freshwater irrigation. Rescuing prepared food safeguards the embedded water footprint from farm to kitchen.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Calculated via standard agricultural LCA metrics
            </div>
          </div>

          {/* Card 3: Economic Food Redistribution Value */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Charitable Food Equity Value
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums mb-2">
                ${stats.totalEconomicValueUsd.toLocaleString()} <span className="text-lg font-normal text-slate-500">USD</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct economic relief to community soup kitchens, youth homes, and emergency food pantries, allowing non-profits to redirect operating funds into housing and health.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              IRS 170(e)(3) certified valuation standard
            </div>
          </div>

        </div>

        {/* Photographic Evidence & Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-xs flex flex-col sm:flex-row items-stretch">
            <div className="sm:w-1/2 h-52 sm:h-auto relative">
              <img
                src="/src/assets/images/foodbridge_restaurant_kitchen_1793684802112.jpg"
                alt="Chef preparing fresh surplus food into clean stainless containers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:w-1/2 p-6 flex flex-col justify-between bg-white dark:bg-slate-900">
              <div>
                <Quote className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2 opacity-50" />
                <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-4 leading-relaxed">
                  "Before FoodBridge, throwing away unserved banquet trays broke my heart every Saturday night. Now my team packages them in 15 minutes, the electric van picks it up, and our tax deduction report is automatic."
                </p>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Chef Elena Vance
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Executive Banquet Chef, Luminaire Hotel
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-xs flex flex-col sm:flex-row items-stretch">
            <div className="sm:w-1/2 h-52 sm:h-auto relative">
              <img
                src="/src/assets/images/foodbridge_community_meal_1793684802701.jpg"
                alt="Volunteers serving warm nutritious meals in community hall"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:w-1/2 p-6 flex flex-col justify-between bg-white dark:bg-slate-900">
              <div>
                <Quote className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2 opacity-50" />
                <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-4 leading-relaxed">
                  "The quality of food arriving through FoodBridge is extraordinary. Instead of only canned beans, our shelter families receive gourmet, balanced meals full of high-grade proteins and fresh produce."
                </p>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Father Daniel Thorne
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Director, Hope Haven Community Kitchen
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
