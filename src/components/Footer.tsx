import React from 'react';
import { UtensilsCrossed, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenSafetyGuide: () => void;
  onOpenDonateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenSafetyGuide,
  onOpenDonateModal
}) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center text-white">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                FoodBridge
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Commercial food surplus redistribution startup connecting restaurants, luxury hotels, and banquet caterers with verified non-profits and hunger relief organizations.
            </p>
            <div className="text-[11px] text-slate-400">
              Operating under the Bill Emerson Good Samaritan Food Donation Act (42 U.S.C. § 1791).
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white mb-2">
              Platform
            </div>
            <div>
              <button
                onClick={() => onSelectTab('dispatch')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Live Dispatch Queue
              </button>
            </div>
            <div>
              <button
                onClick={() => onSelectTab('ngos')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Partner NGO Directory
              </button>
            </div>
            <div>
              <button
                onClick={() => onSelectTab('subscriptions')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Restaurant Subscriptions
              </button>
            </div>
            <div>
              <button
                onClick={() => onSelectTab('csr')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Corporate CSR Grants
              </button>
            </div>
          </div>

          {/* Compliance & Standards */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white mb-2">
              Compliance & Legal
            </div>
            <div>
              <button
                onClick={onOpenSafetyGuide}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left"
              >
                Good Samaritan Liability Safe Harbor
              </button>
            </div>
            <div>
              <span className="text-slate-600 dark:text-slate-400">
                IRS §170(e)(3) Enhanced Tax Deductions
              </span>
            </div>
            <div>
              <span className="text-slate-600 dark:text-slate-400">
                FDA Food Code Temperature Thresholds
              </span>
            </div>
            <div>
              <span className="text-slate-600 dark:text-slate-400">
                Scope 3 ESG Carbon Divergence Standard
              </span>
            </div>
          </div>

          {/* Action */}
          <div className="md:col-span-2 space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white mb-2">
              Take Action
            </div>
            <button
              onClick={onOpenDonateModal}
              className="w-full py-2 px-3 text-center font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
            >
              Log Surplus Batch
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} FoodBridge Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Food Safety Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
