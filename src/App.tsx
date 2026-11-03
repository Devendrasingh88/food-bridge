import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveDispatch } from './components/LiveDispatch';
import { NgoDirectory } from './components/NgoDirectory';
import { SubscriptionPlans } from './components/SubscriptionPlans';
import { CsrPartnerships } from './components/CsrPartnerships';
import { ImpactAnalytics } from './components/ImpactAnalytics';
import { PostSurplusModal } from './components/PostSurplusModal';
import { DonationDetailsModal } from './components/DonationDetailsModal';
import { DonationReceiptModal } from './components/DonationReceiptModal';
import { CsrCertificateModal } from './components/CsrCertificateModal';
import { FoodSafetyGuideModal } from './components/FoodSafetyGuideModal';
import { CsrPledgeModal } from './components/CsrPledgeModal';
import { SubscriptionCheckoutModal } from './components/SubscriptionCheckoutModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_DONATIONS, 
  REGISTERED_NGOS, 
  CSR_PATRONS, 
  INITIAL_STATS 
} from './data/mockData';

import { 
  SurplusDonation, 
  DonationStatus, 
  NGOProfile, 
  CSRPatron, 
  SubscriptionTier, 
  ImpactStats 
} from './types/foodbridge';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('foodbridge_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('foodbridge_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('foodbridge_theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(prev => !prev);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('dispatch');

  // Core Data States with LocalStorage fallback
  const [donations, setDonations] = useState<SurplusDonation[]>(() => {
    const saved = localStorage.getItem('foodbridge_donations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_DONATIONS;
  });

  const [ngos] = useState<NGOProfile[]>(REGISTERED_NGOS);

  const [patrons, setPatrons] = useState<CSRPatron[]>(() => {
    const saved = localStorage.getItem('foodbridge_patrons');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return CSR_PATRONS;
  });

  const [stats, setStats] = useState<ImpactStats>(() => {
    const saved = localStorage.getItem('foodbridge_stats');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_STATS;
  });

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('foodbridge_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('foodbridge_patrons', JSON.stringify(patrons));
  }, [patrons]);

  useEffect(() => {
    localStorage.setItem('foodbridge_stats', JSON.stringify(stats));
  }, [stats]);

  // Modal visibility states
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedDonationDetails, setSelectedDonationDetails] = useState<SurplusDonation | null>(null);
  const [selectedDonationReceipt, setSelectedDonationReceipt] = useState<SurplusDonation | null>(null);
  const [selectedCsrPatronCert, setSelectedCsrPatronCert] = useState<CSRPatron | null>(null);
  const [isSafetyGuideOpen, setIsSafetyGuideOpen] = useState(false);
  const [isCsrPledgeModalOpen, setIsCsrPledgeModalOpen] = useState(false);
  const [selectedSubscriptionTier, setSelectedSubscriptionTier] = useState<SubscriptionTier | null>(null);

  // Toast alert banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 4500);
  };

  // Handlers for Donation Operations
  const handleAddDonation = (newDonation: SurplusDonation) => {
    setDonations(prev => [newDonation, ...prev]);
    
    // Update impact counters
    setStats(prev => ({
      ...prev,
      totalMealsRescued: prev.totalMealsRescued + newDonation.servingsCount,
      totalKgRescued: prev.totalKgRescued + newDonation.weightKg,
      co2eAvoidedKg: prev.co2eAvoidedKg + Math.round(newDonation.weightKg * 2.5),
      waterSavedLiters: prev.waterSavedLiters + Math.round(newDonation.weightKg * 30),
      totalEconomicValueUsd: prev.totalEconomicValueUsd + newDonation.estimatedValueUsd
    }));

    showToast(`Surplus Batch ${newDonation.id} registered! Broadcasted to regional food banks.`);
    setActiveTab('dispatch');
  };

  const handleClaimDonation = (donationId: string, ngoId: string, driverName: string, phone: string) => {
    const targetNgo = ngos.find(n => n.id === ngoId);
    const now = new Date().toISOString();

    setDonations(prev => prev.map(item => {
      if (item.id === donationId) {
        const updatedTimeline = [
          ...item.timeline,
          {
            status: 'claimed' as DonationStatus,
            timestamp: now,
            note: `Claimed by ${targetNgo?.name || 'NGO Partner'}. Driver ${driverName} assigned.`,
            actor: `${driverName} (${phone})`
          }
        ];
        return {
          ...item,
          status: 'claimed' as DonationStatus,
          claimedByNgoId: ngoId,
          claimedByNgoName: targetNgo?.name || 'Community Food Relief',
          volunteerDriverName: driverName,
          volunteerPhone: phone,
          timeline: updatedTimeline
        };
      }
      return item;
    }));

    showToast(`Rescue assigned to ${targetNgo?.name}! Transit team dispatched.`);
  };

  const handleAdvanceStatus = (donationId: string, nextStatus: DonationStatus, note: string) => {
    const now = new Date().toISOString();

    setDonations(prev => prev.map(item => {
      if (item.id === donationId) {
        const updatedTimeline = [
          ...item.timeline,
          {
            status: nextStatus,
            timestamp: now,
            note,
            actor: 'Authorized FoodBridge Officer'
          }
        ];

        let summary = item.distributionSummary;
        if (nextStatus === 'distributed' && !summary) {
          summary = {
            beneficiaryCount: item.servingsCount,
            distributedAt: now,
            location: item.claimedByNgoName ? `${item.claimedByNgoName} Community Dining Hall` : 'Central Relief Center',
            notes: 'Served directly to community members and shelter guests.'
          };
        }

        return {
          ...item,
          status: nextStatus,
          timeline: updatedTimeline,
          distributionSummary: summary
        };
      }
      return item;
    }));

    showToast(`Status updated to ${nextStatus.replace('_', ' ').toUpperCase()}! Audit logged.`);
  };

  const handleAddCsrPatron = (newPatron: CSRPatron) => {
    setPatrons(prev => [newPatron, ...prev]);
    setStats(prev => ({
      ...prev,
      totalMealsRescued: prev.totalMealsRescued + newPatron.sponsoredMeals
    }));
    showToast(`Welcome ${newPatron.corporateName}! CSR Grant of $${newPatron.fundingUsd.toLocaleString()} pledged.`);
  };

  const handleConfirmSubscription = (restaurantName: string, planName: string) => {
    showToast(`Subscription confirmed! ${restaurantName} is now on ${planName}.`);
  };

  // CSV Export for ESG Report
  const handleExportCsv = () => {
    const headers = ['Donation_ID', 'Establishment', 'Category', 'Meals', 'Weight_Kg', 'Status', 'CO2e_Avoided_Kg', 'Fair_Market_Value_USD', 'Recipient_NGO'];
    const rows = donations.map(d => [
      d.id,
      `"${d.donorName.replace(/"/g, '""')}"`,
      d.category,
      d.servingsCount,
      d.weightKg,
      d.status,
      (d.weightKg * 2.5).toFixed(1),
      d.estimatedValueUsd,
      `"${(d.claimedByNgoName || 'Unassigned').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FoodBridge_ESG_Impact_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('ESG Impact CSV Report successfully downloaded.');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-lg shadow-lg border border-slate-700 dark:border-slate-300 animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDonateModal={() => setIsPostModalOpen(true)}
        isDark={isDark}
        toggleDark={toggleDark}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section (Always visible on Dispatch & Main views) */}
        <Hero
          stats={stats}
          onOpenDonateModal={() => setIsPostModalOpen(true)}
          onExploreDispatch={() => {
            setActiveTab('dispatch');
            const el = document.getElementById('dispatch-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSafetyGuide={() => setIsSafetyGuideOpen(true)}
        />

        {/* Tab Specific Content Viewport */}
        {activeTab === 'dispatch' && (
          <div id="dispatch-section">
            <LiveDispatch
              donations={donations}
              ngos={ngos}
              onOpenDonateModal={() => setIsPostModalOpen(true)}
              onSelectDonationDetails={(donation) => setSelectedDonationDetails(donation)}
              onOpenTaxReceipt={(donation) => setSelectedDonationReceipt(donation)}
              onClaimDonation={handleClaimDonation}
              onAdvanceStatus={handleAdvanceStatus}
            />
            {/* Adjoining NGO Quick Strip */}
            <div className="border-t border-slate-200 dark:border-slate-800">
              <NgoDirectory
                ngos={ngos}
                onOpenDonateModal={() => setIsPostModalOpen(true)}
              />
            </div>
            {/* Revenue & Subscriptions */}
            <SubscriptionPlans
              onSelectPlan={(tier) => setSelectedSubscriptionTier(tier)}
            />
            {/* CSR Sponsorships */}
            <CsrPartnerships
              patrons={patrons}
              onOpenSponsorshipModal={() => setIsCsrPledgeModalOpen(true)}
              onOpenCsrCertificate={(patron) => setSelectedCsrPatronCert(patron)}
            />
            {/* Impact Metrics */}
            <ImpactAnalytics
              stats={stats}
              onExportCsv={handleExportCsv}
            />
          </div>
        )}

        {activeTab === 'ngos' && (
          <NgoDirectory
            ngos={ngos}
            onOpenDonateModal={() => setIsPostModalOpen(true)}
          />
        )}

        {activeTab === 'subscriptions' && (
          <div>
            <SubscriptionPlans
              onSelectPlan={(tier) => setSelectedSubscriptionTier(tier)}
            />
          </div>
        )}

        {activeTab === 'csr' && (
          <div>
            <CsrPartnerships
              patrons={patrons}
              onOpenSponsorshipModal={() => setIsCsrPledgeModalOpen(true)}
              onOpenCsrCertificate={(patron) => setSelectedCsrPatronCert(patron)}
            />
          </div>
        )}

        {activeTab === 'impact' && (
          <div>
            <ImpactAnalytics
              stats={stats}
              onExportCsv={handleExportCsv}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        onSelectTab={setActiveTab}
        onOpenSafetyGuide={() => setIsSafetyGuideOpen(true)}
        onOpenDonateModal={() => setIsPostModalOpen(true)}
      />

      {/* Modals */}
      <PostSurplusModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmitDonation={handleAddDonation}
      />

      <DonationDetailsModal
        donation={selectedDonationDetails}
        onClose={() => setSelectedDonationDetails(null)}
        onAdvanceStatus={handleAdvanceStatus}
        onOpenTaxReceipt={(donation) => {
          setSelectedDonationDetails(null);
          setSelectedDonationReceipt(donation);
        }}
      />

      <DonationReceiptModal
        donation={selectedDonationReceipt}
        onClose={() => setSelectedDonationReceipt(null)}
      />

      <CsrCertificateModal
        patron={selectedCsrPatronCert}
        onClose={() => setSelectedCsrPatronCert(null)}
      />

      <FoodSafetyGuideModal
        isOpen={isSafetyGuideOpen}
        onClose={() => setIsSafetyGuideOpen(false)}
      />

      <CsrPledgeModal
        isOpen={isCsrPledgeModalOpen}
        onClose={() => setIsCsrPledgeModalOpen(false)}
        ngos={ngos}
        onAddPatron={handleAddCsrPatron}
      />

      <SubscriptionCheckoutModal
        tier={selectedSubscriptionTier}
        onClose={() => setSelectedSubscriptionTier(null)}
        onConfirmSubscription={handleConfirmSubscription}
      />

    </div>
  );
}
