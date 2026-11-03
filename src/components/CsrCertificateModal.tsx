import React from 'react';
import { X, Printer, Award, ShieldCheck, Leaf } from 'lucide-react';
import { CSRPatron } from '../types/foodbridge';

interface CsrCertificateModalProps {
  patron: CSRPatron | null;
  onClose: () => void;
}

export const CsrCertificateModal: React.FC<CsrCertificateModalProps> = ({
  patron,
  onClose
}) => {
  if (!patron) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-2xl bg-white text-slate-900 shadow-2xl p-8 border border-slate-300 relative print:m-0 print:p-6 print:border-none print:shadow-none">
        
        {/* Controls (Hidden during print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <Award className="w-4 h-4" />
            <span>Corporate ESG Recognition Credential</span>
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
              aria-label="Close certificate"
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Frame */}
        <div className="border-4 border-double border-emerald-600/40 p-8 rounded-xl bg-gradient-to-b from-white to-emerald-50/20 text-center relative">
          
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
            <Leaf className="w-6 h-6" />
          </div>

          <div className="text-xs uppercase font-extrabold tracking-widest text-emerald-800 mb-1">
            FoodBridge Global Relief Initiative
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Corporate ESG Impact Award
          </h2>

          <div className="text-xs text-slate-500 mb-6">
            This certifies that
          </div>

          <div className="text-2xl font-bold text-slate-900 mb-2 border-b-2 border-emerald-600/30 pb-2 inline-block max-w-md">
            {patron.corporateName}
          </div>

          <div className="text-xs text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
            has demonstrated visionary leadership in zero-waste sustainability and community hunger alleviation as a verified <strong>{patron.tier} Partner</strong>.
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-3 gap-4 py-4 my-4 border-y border-slate-200 bg-white/80 rounded-lg text-xs">
            <div>
              <div className="text-slate-400 text-[10px] uppercase">Sponsored Meals</div>
              <div className="text-lg font-bold text-slate-900 tabular-nums">
                {patron.sponsoredMeals.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-slate-400 text-[10px] uppercase">Rescue Fleet Funded</div>
              <div className="text-lg font-bold text-slate-900">
                {patron.sponsoredVans} Electric Van
              </div>
            </div>

            <div>
              <div className="text-slate-400 text-[10px] uppercase">ESG Verification</div>
              <div className="text-lg font-bold text-emerald-700 tabular-nums">
                {patron.esgImpactScore} / 100
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 max-w-md mx-auto mb-8">
            Primary Beneficiary Partner: <strong>{patron.dedicatedNgoPartner}</strong>
            <br />
            Certified under the Global Reporting Initiative (GRI) Scope 3 Waste Standards.
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 text-xs text-left max-w-md mx-auto">
            <div>
              <div className="border-b border-slate-400 pb-1 font-mono text-[11px]">
                Dr. Marcus Thorne
              </div>
              <div className="text-[10px] text-slate-400 mt-1 uppercase">
                Chair, FoodBridge ESG Council
              </div>
            </div>

            <div className="text-right">
              <div className="border-b border-slate-400 pb-1 font-mono text-[11px]">
                {patron.datePledged}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 uppercase">
                Date of Ratification
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
