import React, { useState } from 'react';
import { Award, Briefcase, HeartHandshake, Shield, Sparkles, Building2, CheckCircle2, Download } from 'lucide-react';
import { CSR_PATRONS } from '../data/mockData';
import { CSRPatron } from '../types/foodbridge';

interface CsrPartnershipsProps {
  patrons: CSRPatron[];
  onOpenSponsorshipModal: () => void;
  onOpenCsrCertificate: (patron: CSRPatron) => void;
}

export const CsrPartnerships: React.FC<CsrPartnershipsProps> = ({
  patrons,
  onOpenSponsorshipModal,
  onOpenCsrCertificate
}) => {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
              Corporate Social Responsibility (CSR)
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Corporate CSR & ESG Impact Partnerships
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Corporations co-fund refrigerated food transport logistics and cold-chain van fleets, unlocking thousands of nutritious meals daily for underprivileged communities. Fulfill your corporate ESG mandates with audited impact reports and direct NGO pairings.
            </p>

            <div className="space-y-3 mb-8 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Turnkey Cold-Chain Logistics:</strong> Your CSR grant directly fuels refrigerated rescue vans and driver shifts.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Audited ESG Carbon Credits:</strong> Verified Scope 3 emission diversion metrics certified by third-party auditors.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Employee Volunteer Days:</strong> Direct volunteer distribution days with partnered shelter kitchens.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenSponsorshipModal}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                Pledge CSR Fleet Sponsorship
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-800 relative h-72 sm:h-80">
              <img
                src="/src/assets/images/foodbridge_csr_partnership_1793684802573.jpg"
                alt="Corporate CSR partners working directly with food pantry volunteers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs font-semibold text-emerald-300 mb-1">
                  Shared Community Impact
                </div>
                <div className="text-sm font-medium">
                  Leading enterprises partnering with grassroots hunger relief missions.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CSR Patrons Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Active Corporate CSR Sponsors
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Q4 Certified Partners
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {patrons.map((patron) => (
              <div
                key={patron.id}
                className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{patron.industry}</span>
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      {patron.tier}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {patron.corporateName}
                  </h4>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Meals Sponsored:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                        {patron.sponsoredMeals.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Funding Pledged:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                        ${patron.fundingUsd.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Dedicated Fleet:</span>
                      <span className="text-slate-900 dark:text-white font-medium">
                        {patron.sponsoredVans} Electric Van
                      </span>
                    </div>

                    <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      Partner: {patron.dedicatedNgoPartner}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-mono">
                    Score: {patron.esgImpactScore}/100
                  </div>

                  <button
                    onClick={() => onOpenCsrCertificate(patron)}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>View ESG Certificate</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
