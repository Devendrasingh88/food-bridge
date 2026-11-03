import React, { useState } from 'react';
import { Search, Heart, Truck, CheckCircle2, Phone, MapPin, Building, AlertCircle } from 'lucide-react';
import { NGOProfile } from '../types/foodbridge';

interface NgoDirectoryProps {
  ngos: NGOProfile[];
  onOpenDonateModal: () => void;
}

export const NgoDirectory: React.FC<NgoDirectoryProps> = ({
  ngos,
  onOpenDonateModal
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNgos = ngos.filter((ngo) => {
    if (selectedCategory !== 'all' && ngo.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = ngo.name.toLowerCase().includes(q);
      const matchCity = ngo.city.toLowerCase().includes(q);
      const matchNeeds = ngo.urgentNeeds.some(n => n.toLowerCase().includes(q));
      if (!matchName && !matchCity && !matchNeeds) return false;
    }
    return true;
  });

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 min-h-[600px] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              Verified Distribution Partners
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Partner NGOs & Relief Kitchens
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Certified non-profit charities, food banks, and shelters equipped with food-safety certifications, refrigerated storage, and distribution volunteer networks.
            </p>
          </div>

          <button
            onClick={onOpenDonateModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Direct Surplus to Network
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 mb-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">
            {['all', 'Food Bank', 'Community Kitchen', 'Homeless Shelter'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Partner Organizations' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by NGO or food requirement..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

        </div>

        {/* NGO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredNgos.map((ngo) => {
            const usagePercent = Math.min(100, Math.round((ngo.currentIntakeKg / ngo.refrigeratedCapacityKg) * 100));

            return (
              <div
                key={ngo.id}
                className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  
                  {/* Top: Category & Tax Exemption */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">{ngo.category}</span>
                    <span className="font-mono text-[11px] text-slate-400">{ngo.taxExemptId}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {ngo.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ngo.address}</span>
                  </div>

                  {/* Cold Storage Capacity Meter */}
                  <div className="mb-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Cold Storage Capacity (Today)
                      </span>
                      <span className="font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                        {ngo.currentIntakeKg} / {ngo.refrigeratedCapacityKg} kg ({usagePercent}%)
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          usagePercent > 85 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Daily Service Capacity: {ngo.dailyCapacityMeals.toLocaleString()} meals</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {(ngo.refrigeratedCapacityKg - ngo.currentIntakeKg)} kg intake space available
                      </span>
                    </div>
                  </div>

                  {/* Urgent Needs */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Urgent Food Needs:
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {ngo.urgentNeeds.map((need, idx) => (
                        <span key={idx} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer Logistics & Contact Info */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{ngo.activeVehicles} Rescue Vans</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-mono">{ngo.phone}</span>
                    </div>
                  </div>

                  <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                    {ngo.mealsServedThisMonth.toLocaleString()} served this mo
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
