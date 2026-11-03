import React from 'react';
import { X, Printer, ShieldCheck, Download, Award, CheckCircle } from 'lucide-react';
import { SurplusDonation } from '../types/foodbridge';

interface DonationReceiptModalProps {
  donation: SurplusDonation | null;
  onClose: () => void;
}

export const DonationReceiptModal: React.FC<DonationReceiptModalProps> = ({
  donation,
  onClose
}) => {
  if (!donation) return null;

  const handlePrint = () => {
    window.print();
  };

  const receiptDate = new Date(donation.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-2xl bg-white text-slate-900 shadow-2xl p-8 border border-slate-300 relative print:m-0 print:p-6 print:border-none print:shadow-none">
        
        {/* Close Button (Hidden when printing) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            <span>IRS §170(e)(3) & 80G Compliant Tax Certificate</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close receipt"
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Body */}
        <div className="border-4 border-double border-slate-300 p-6 rounded-xl bg-slate-50/40">
          
          {/* Header */}
          <div className="text-center pb-6 border-b border-slate-200">
            <div className="text-xs uppercase font-extrabold tracking-widest text-emerald-800 mb-1">
              FoodBridge Food Waste Recovery Network
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Certificate of Charitable Food Donation
            </h1>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Receipt No: FB-TX-{donation.id} · Issued: {receiptDate}
            </div>
          </div>

          {/* Donor & Donee Two Columns */}
          <div className="grid grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
            <div>
              <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Donor Entity (Commercial Food Provider)
              </div>
              <div className="font-bold text-sm text-slate-900 mb-0.5">
                {donation.donorName}
              </div>
              <div className="text-slate-600">{donation.donorAddress}</div>
              <div className="text-slate-600">{donation.donorCity}</div>
              <div className="text-slate-500 mt-1 font-mono">Contact: {donation.contactPhone}</div>
            </div>

            <div>
              <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Donee Entity (Verified 501(c)(3) Charity)
              </div>
              <div className="font-bold text-sm text-slate-900 mb-0.5">
                {donation.claimedByNgoName || 'Regional Community Food Relief Network'}
              </div>
              <div className="text-slate-600">Tax-Exempt EIN: 84-9021892 / 501(c)(3)</div>
              <div className="text-slate-600">Central Food Distribution Center</div>
              <div className="text-emerald-700 font-semibold mt-1">Verified Relief Partner</div>
            </div>
          </div>

          {/* Itemized Surplus Inventory */}
          <div className="py-6 border-b border-slate-200 text-xs">
            <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-3">
              Itemized Surplus Inventory & Valuation
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] text-slate-500">
                  <th className="pb-2 font-semibold">Surplus Food Batch</th>
                  <th className="pb-2 font-semibold text-center">Meals</th>
                  <th className="pb-2 font-semibold text-center">Weight</th>
                  <th className="pb-2 font-semibold text-right">Fair Market Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-2.5 font-sans">
                    <div className="font-semibold text-slate-900">{donation.foodTitle}</div>
                    <div className="text-[11px] text-slate-500 font-sans">
                      Category: {donation.category} · Packaged at {donation.tempAtPackaging}°C
                    </div>
                  </td>
                  <td className="py-2.5 text-center text-slate-900 tabular-nums">
                    {donation.servingsCount}
                  </td>
                  <td className="py-2.5 text-center text-slate-900 tabular-nums">
                    {donation.weightKg} kg
                  </td>
                  <td className="py-2.5 text-right font-bold text-emerald-800 tabular-nums">
                    ${donation.estimatedValueUsd.toLocaleString()} USD
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legal Safe Harbor & Good Samaritan Declaration */}
          <div className="pt-5 text-[11px] text-slate-500 leading-relaxed space-y-2">
            <p>
              <strong>Bill Emerson Good Samaritan Food Donation Act (42 U.S. Code § 1791):</strong> Protects food donors from civil and criminal liability when donating wholesome food in good faith to non-profit organizations.
            </p>
            <p>
              <strong>Internal Revenue Code § 170(e)(3):</strong> Permits eligible C-corporations and pass-through commercial entities to claim an enhanced tax deduction for charitable contributions of inventory, equal to the lesser of twice the basis value or basis plus 50% of ordinary markup.
            </p>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-8 text-xs">
            <div>
              <div className="border-b border-slate-400 pb-1 font-mono text-[11px]">
                Elena Vance, Executive Food Safety Dir.
              </div>
              <div className="text-[10px] text-slate-400 mt-1 uppercase">
                Authorized FoodBridge Custody Officer
              </div>
            </div>

            <div>
              <div className="border-b border-slate-400 pb-1 font-mono text-[11px]">
                Amanda Sterling, Executive Director
              </div>
              <div className="text-[10px] text-slate-400 mt-1 uppercase">
                Authorized Non-Profit Receiving Officer
              </div>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-4 text-center text-[10px] text-slate-400 print:hidden">
          Keep this document for your annual corporate tax return filing with IRS Form 8283.
        </div>

      </div>
    </div>
  );
};
