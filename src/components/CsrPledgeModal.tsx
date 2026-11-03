import React, { useState } from 'react';
import { X, Award, Shield, CheckCircle2 } from 'lucide-react';
import { CSRPatron, NGOProfile } from '../types/foodbridge';

interface CsrPledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  ngos: NGOProfile[];
  onAddPatron: (patron: CSRPatron) => void;
}

export const CsrPledgeModal: React.FC<CsrPledgeModalProps> = ({
  isOpen,
  onClose,
  ngos,
  onAddPatron
}) => {
  const [corporateName, setCorporateName] = useState('');
  const [industry, setIndustry] = useState('Technology & Cloud Services');
  const [tier, setTier] = useState<'Silver Guardian' | 'Gold Champion' | 'Platinum Vanguard'>('Gold Champion');
  const [fundingUsd, setFundingUsd] = useState(15000);
  const [dedicatedNgo, setDedicatedNgo] = useState(ngos[0]?.name || 'City Harvest Relief Food Bank');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corporateName.trim()) return;

    // Approximate 1.5 meals per dollar of logistics grant
    const mealsSponsored = Math.round(fundingUsd * 1.6);
    const sponsoredVans = tier === 'Platinum Vanguard' ? 2 : 1;
    const esgScore = tier === 'Platinum Vanguard' ? 98 : tier === 'Gold Champion' ? 94 : 88;

    const newPatron: CSRPatron = {
      id: `csr-${Date.now()}`,
      corporateName,
      industry,
      tier,
      sponsoredMeals: mealsSponsored,
      fundingUsd,
      sponsoredVans,
      dedicatedNgoPartner: dedicatedNgo,
      esgImpactScore: esgScore,
      datePledged: new Date().toISOString().split('T')[0]
    };

    onAddPatron(newPatron);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-lg my-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Pledge Corporate CSR Sponsorship
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Co-sponsor cold-chain rescue fleets and fund community meals.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Corporation / Brand Name
            </label>
            <input
              type="text"
              placeholder="e.g. Apex Global Technologies"
              value={corporateName}
              onChange={(e) => setCorporateName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Industry Sector
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Technology & Software">Technology & Cloud</option>
                <option value="Financial Services & Banking">Finance & Banking</option>
                <option value="Healthcare & Life Sciences">Healthcare & Pharma</option>
                <option value="Retail & Consumer Goods">Retail & Logistics</option>
                <option value="Consulting & Legal">Professional Services</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Sponsorship Tier
              </label>
              <select
                value={tier}
                onChange={(e) => {
                  const t = e.target.value as any;
                  setTier(t);
                  if (t === 'Platinum Vanguard') setFundingUsd(25000);
                  else if (t === 'Gold Champion') setFundingUsd(15000);
                  else setFundingUsd(7500);
                }}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Silver Guardian">Silver Guardian ($7,500)</option>
                <option value="Gold Champion">Gold Champion ($15,000)</option>
                <option value="Platinum Vanguard">Platinum Vanguard ($25,000)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Grant Amount (USD)
            </label>
            <input
              type="number"
              min="2500"
              step="500"
              value={fundingUsd}
              onChange={(e) => setFundingUsd(Number(e.target.value))}
              required
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 tabular-nums font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Dedicated Partner NGO Allocation
            </label>
            <select
              value={dedicatedNgo}
              onChange={(e) => setDedicatedNgo(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {ngos.map((ngo) => (
                <option key={ngo.id} value={ngo.name}>
                  {ngo.name} ({ngo.category})
                </option>
              ))}
            </select>
          </div>

          {/* CSR Impact Preview */}
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-[11px] text-emerald-900 dark:text-emerald-300 space-y-1">
            <div className="font-bold">Estimated CSR Deliverables:</div>
            <div>• Funds approximately <strong>{Math.round(fundingUsd * 1.6).toLocaleString()} community meals</strong></div>
            <div>• Includes official SEC/GRI-compliant Scope 3 emissions audit certificate</div>
            <div>• Digital badge & verified sponsor listing</div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
            >
              Confirm CSR Pledge
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
