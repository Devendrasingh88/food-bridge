import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { SubscriptionTier } from '../types/foodbridge';

interface SubscriptionCheckoutModalProps {
  tier: SubscriptionTier | null;
  onClose: () => void;
  onConfirmSubscription: (restaurantName: string, planName: string) => void;
}

export const SubscriptionCheckoutModal: React.FC<SubscriptionCheckoutModalProps> = ({
  tier,
  onClose,
  onConfirmSubscription
}) => {
  const [restaurantName, setRestaurantName] = useState('L’Aura Modern Bistro');
  const [contactEmail, setContactEmail] = useState('manager@laurabistro.com');
  const [kitchenUnits, setKitchenUnits] = useState('1');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!tier) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onConfirmSubscription(restaurantName, tier.name);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-md my-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Activate Restaurant Subscription
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              FoodBridge Zero-Waste Logistics Partner Network
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Subscription Successfully Activated!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              Welcome {restaurantName}! Your kitchen is now onboarded for priority cold-chain rescue dispatch and monthly IRS tax certificates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{tier.name}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{tier.monthlyPickups} · {tier.pickupSla}</div>
              </div>
              <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                ${tier.monthlyPrice}/mo
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Restaurant / Hospitality Business Name
              </label>
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Executive Chef / General Manager Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Active Kitchen Locations
              </label>
              <select
                value={kitchenUnits}
                onChange={(e) => setKitchenUnits(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="1">Single Location / Main Kitchen</option>
                <option value="2-3">2 - 3 Kitchen Outlets</option>
                <option value="4+">4+ Multi-Unit Enterprise</option>
              </select>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/80 text-[11px] text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Includes 30-day money-back guarantee. Automated tax deduction receipts issued at the end of each billing cycle.
              </span>
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
                Confirm & Start Plan
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
