import React from 'react';
import { X, Clock, MapPin, Thermometer, ShieldCheck, Truck, CheckCircle2, FileText, Flame, Snowflake, AlertCircle } from 'lucide-react';
import { SurplusDonation, DonationStatus } from '../types/foodbridge';

interface DonationDetailsModalProps {
  donation: SurplusDonation | null;
  onClose: () => void;
  onAdvanceStatus: (donationId: string, nextStatus: DonationStatus, note: string) => void;
  onOpenTaxReceipt: (donation: SurplusDonation) => void;
}

export const DonationDetailsModal: React.FC<DonationDetailsModalProps> = ({
  donation,
  onClose,
  onAdvanceStatus,
  onOpenTaxReceipt
}) => {
  if (!donation) return null;

  const isHot = donation.storageCondition === 'hot_holding';
  const isCold = donation.storageCondition === 'refrigerated';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              <span className="font-mono">{donation.id}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{donation.category.replace('_', ' ')}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {donation.foodTitle}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{donation.donorName} ({donation.donorAddress})</span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close details"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-5 text-xs">
          
          {/* Description */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="font-semibold text-slate-900 dark:text-white mb-1">
              Culinary Description & Packaging
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {donation.description}
            </p>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              Container Type: {donation.packagingType}
            </div>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="text-[11px] text-slate-400">Total Portions</div>
              <div className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                {donation.servingsCount} Meals
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="text-[11px] text-slate-400">Gross Weight</div>
              <div className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                {donation.weightKg} kg
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="text-[11px] text-slate-400">Batch Temperature</div>
              <div className="text-base font-bold text-slate-900 dark:text-white tabular-nums flex items-center gap-1">
                {isHot && <Flame className="w-4 h-4 text-amber-500" />}
                {isCold && <Snowflake className="w-4 h-4 text-blue-500" />}
                <span>{donation.tempAtPackaging.toFixed(1)}°C</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="text-[11px] text-slate-400">Tax Valuation</div>
              <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                ${donation.estimatedValueUsd} USD
              </div>
            </div>
          </div>

          {/* Safety Compliance & Dietary */}
          <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <div className="font-semibold text-emerald-900 dark:text-emerald-300">
                  Food Safety Criteria Met & Verified
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Packaged in clean commercial kitchen under safe hot/cold holding protocols.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {donation.dietary.map((d, i) => (
                <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Chain-of-Custody Timeline */}
          <div>
            <div className="font-semibold text-slate-900 dark:text-white mb-2">
              Chain-of-Custody Audit Trail
            </div>

            <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 dark:border-slate-800 ml-1">
              {donation.timeline.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 absolute -left-[21px] top-1" />
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-0.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      {event.status.replace('_', ' ')}
                    </span>
                    <span className="font-mono tabular-nums">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{event.note}</p>
                  <div className="text-[10px] text-slate-400 mt-0.5">Verified by: {event.actor}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Summary if distributed */}
          {donation.distributionSummary && (
            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <div className="font-semibold text-purple-900 dark:text-purple-300 mb-1">
                Completed Distribution Summary
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Served <strong>{donation.distributionSummary.beneficiaryCount} individuals</strong> at {donation.distributionSummary.location}.
              </div>
              <div className="text-[11px] text-purple-700 dark:text-purple-400 mt-1">
                {donation.distributionSummary.notes}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800 mt-6">
          <button
            onClick={() => onOpenTaxReceipt(donation)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Generate Official Tax Receipt</span>
          </button>

          <div className="flex items-center gap-2">
            {donation.status === 'claimed' && (
              <button
                onClick={() => {
                  onAdvanceStatus(donation.id, 'in_transit', 'Rescue driver loaded containers into refrigerated van.');
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Advance to In-Transit
              </button>
            )}

            {donation.status === 'in_transit' && (
              <button
                onClick={() => {
                  onAdvanceStatus(donation.id, 'inspected', 'Arrived at receiving kitchen. Probe temp verified at 3.5°C.');
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Log Intake Inspection
              </button>
            )}

            {donation.status === 'inspected' && (
              <button
                onClick={() => {
                  onAdvanceStatus(donation.id, 'distributed', 'Plated and distributed across community soup kitchen dinner tables.');
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                Log Distribution Completed
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
