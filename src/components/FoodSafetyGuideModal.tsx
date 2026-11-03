import React from 'react';
import { X, ShieldCheck, Thermometer, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

interface FoodSafetyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoodSafetyGuideModal: React.FC<FoodSafetyGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Food Safety & Good Samaritan Legal Protection
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official compliance protocol for commercial kitchens and recipient charities.
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

        {/* Content */}
        <div className="space-y-4 text-xs">
          
          {/* Legal Safe Harbor Callout */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80">
            <div className="font-bold text-emerald-950 dark:text-emerald-300 text-sm mb-1 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Full Legal Liability Immunity</span>
            </div>
            <p className="text-emerald-900 dark:text-emerald-300/90 leading-relaxed">
              Under the <strong>Bill Emerson Good Samaritan Food Donation Act (42 U.S.C. § 1791)</strong>, commercial restaurants, hotels, and caterers are 100% protected from civil and criminal liability when donating food in good faith. You cannot be sued or penalized for surplus food donations that meet basic wholesome standards.
            </p>
          </div>

          {/* Temperature Holding Rules */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-amber-500" />
              <span>Critical Temperature Thresholds (FDA Food Code)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-semibold text-amber-700 dark:text-amber-400">Hot Holding Entrees</div>
                <div className="text-base font-bold text-slate-900 dark:text-white tabular-nums">≥ 60°C (140°F)</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Keep in heated cambro units or insulated chafing pans until pickup.
                </div>
              </div>

              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-semibold text-blue-700 dark:text-blue-400">Cold Holding & Salads</div>
                <div className="text-base font-bold text-slate-900 dark:text-white tabular-nums">≤ 4°C (40°F)</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Keep in commercial walk-in refrigeration or rapid blast chillers.
                </div>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
              <strong>The 2-Hour Chilling Rule:</strong> Cooked food left between 5°C and 59°C must be cooled to below 4°C within two hours or kept above 60°C.
            </div>
          </div>

          {/* Acceptable vs Non-Acceptable Donations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-white dark:bg-slate-900">
              <div className="font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Accepted Food Donations</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>• Unserved buffet and banquet surplus</li>
                <li>• Prepared kitchen batch entrees & sides</li>
                <li>• Whole fresh produce & farm surplus</li>
                <li>• Artisanal breads, rolls & pastries</li>
                <li>• Sealed dairy products and beverages</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl border border-red-200 dark:border-red-800/60 bg-white dark:bg-slate-900">
              <div className="font-bold text-red-800 dark:text-red-400 mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Cannot Be Accepted</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>• Plate waste / half-eaten patron food</li>
                <li>• Food kept in the danger zone &gt;2 hours</li>
                <li>• Swollen or severely dented cans</li>
                <li>• Re-frozen defrosted seafood</li>
                <li>• Products with missing allergen labels</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-5 border-t border-slate-100 dark:border-slate-800 mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            I Understand the Protocol
          </button>
        </div>

      </div>
    </div>
  );
};
