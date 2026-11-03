import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Clock, 
  MapPin, 
  Thermometer, 
  Package, 
  Truck, 
  CheckCircle2, 
  FileText, 
  Eye, 
  AlertTriangle,
  Flame,
  Snowflake,
  Sparkles
} from 'lucide-react';
import { SurplusDonation, DonationStatus, FoodCategory, NGOProfile } from '../types/foodbridge';

interface LiveDispatchProps {
  donations: SurplusDonation[];
  ngos: NGOProfile[];
  onOpenDonateModal: () => void;
  onSelectDonationDetails: (donation: SurplusDonation) => void;
  onOpenTaxReceipt: (donation: SurplusDonation) => void;
  onClaimDonation: (donationId: string, ngoId: string, driverName: string, phone: string) => void;
  onAdvanceStatus: (donationId: string, nextStatus: DonationStatus, note: string) => void;
}

export const LiveDispatch: React.FC<LiveDispatchProps> = ({
  donations,
  ngos,
  onOpenDonateModal,
  onSelectDonationDetails,
  onOpenTaxReceipt,
  onClaimDonation,
  onAdvanceStatus
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Claim modal state
  const [claimingDonation, setClaimingDonation] = useState<SurplusDonation | null>(null);
  const [selectedNgoId, setSelectedNgoId] = useState<string>(ngos[0]?.id || '');
  const [driverName, setDriverName] = useState<string>('Driver Jordan Vance (Van 04)');
  const [driverPhone, setDriverPhone] = useState<string>('+1 (555) 492-8819');

  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.donorName.toLowerCase().includes(query);
        const matchesTitle = item.foodTitle.toLowerCase().includes(query);
        const matchesCity = item.donorCity.toLowerCase().includes(query);
        if (!matchesName && !matchesTitle && !matchesCity) return false;
      }
      return true;
    });
  }, [donations, statusFilter, categoryFilter, searchQuery]);

  const handleConfirmClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimingDonation || !selectedNgoId) return;
    onClaimDonation(claimingDonation.id, selectedNgoId, driverName, driverPhone);
    setClaimingDonation(null);
  };

  const getStatusLabel = (status: DonationStatus) => {
    switch (status) {
      case 'available':
        return { label: 'Available for Rescue', color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' };
      case 'claimed':
        return { label: 'Claimed · Driver Dispatched', color: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800' };
      case 'in_transit':
        return { label: 'In Cold-Chain Transit', color: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800' };
      case 'inspected':
        return { label: 'Quality & Temp Verified', color: 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800' };
      case 'distributed':
        return { label: 'Distributed to Meals', color: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700' };
      default:
        return { label: status, color: 'text-slate-700 dark:text-slate-300 bg-slate-100 border-slate-200' };
    }
  };

  const getCategoryName = (cat: FoodCategory) => {
    switch (cat) {
      case 'cooked_hot': return 'Cooked Hot Meals';
      case 'cooked_cold': return 'Chilled Prepared Foods';
      case 'bakery': return 'Artisanal Bakery & Bread';
      case 'fresh_produce': return 'Fresh Farm Produce';
      case 'packaged_staples': return 'Packaged Pantry Staples';
      case 'dairy_desserts': return 'Dairy & Desserts';
    }
  };

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 min-h-[600px] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              Active Rescue Operations
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Surplus Food Dispatch Queue
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Real-time edible surplus ready for pickup by verified food banks and community pantries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDonateModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              + Post New Surplus Batch
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-4 mb-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Interactive Status Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">
            {[
              { id: 'all', label: 'All Active' },
              { id: 'available', label: 'Available' },
              { id: 'claimed', label: 'Claimed' },
              { id: 'in_transit', label: 'In Transit' },
              { id: 'distributed', label: 'Distributed' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Dropdown & Search Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            <div className="relative">
              <select
                aria-label="Filter food category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">All Categories</option>
                <option value="cooked_hot">Cooked Hot Meals</option>
                <option value="cooked_cold">Chilled Entrees</option>
                <option value="bakery">Artisanal Bakery</option>
                <option value="fresh_produce">Fresh Produce</option>
              </select>
            </div>

            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search restaurant or food item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

          </div>

        </div>

        {/* Donations List / Grid */}
        {filteredDonations.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <Package className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
              No Surplus Dispatches Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              No active food rescues match your current filter parameters. Try resetting your search or log a new donation batch.
            </p>
            <button
              onClick={() => { setStatusFilter('all'); setCategoryFilter('all'); setSearchQuery(''); }}
              className="px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDonations.map((donation) => {
              const statusMeta = getStatusLabel(donation.status);
              const isHot = donation.storageCondition === 'hot_holding';
              const isCold = donation.storageCondition === 'refrigerated';

              return (
                <div
                  key={donation.id}
                  className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  {/* Card Content Top */}
                  <div className="p-5">
                    
                    {/* Header: Status & Category unboxed text */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{getCategoryName(donation.category)}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{donation.donorType}</span>
                      </div>

                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${statusMeta.color}`}>
                        {statusMeta.label}
                      </span>
                    </div>

                    {/* Food Title */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-1">
                      {donation.foodTitle}
                    </h3>

                    {/* Donor Name & Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">{donation.donorName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{donation.donorAddress}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {donation.description}
                    </p>

                    {/* Key Technical & Safety Specifications */}
                    <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs mb-3">
                      <div>
                        <div className="text-[11px] text-slate-400">Portions / Weight</div>
                        <div className="font-semibold text-slate-900 dark:text-white tabular-nums">
                          {donation.servingsCount} Meals ({donation.weightKg} kg)
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] text-slate-400">Packaging Temp</div>
                        <div className="font-semibold text-slate-900 dark:text-white tabular-nums flex items-center gap-1">
                          {isHot && <Flame className="w-3.5 h-3.5 text-amber-500" />}
                          {isCold && <Snowflake className="w-3.5 h-3.5 text-blue-500" />}
                          <span>{donation.tempAtPackaging.toFixed(1)}°C ({((donation.tempAtPackaging * 9) / 5 + 32).toFixed(1)}°F)</span>
                        </div>
                      </div>

                      <div className="col-span-2 pt-1 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="truncate">Contained in: {donation.packagingType}</span>
                      </div>
                    </div>

                    {/* Timeline / Logistics Status summary */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Pickup deadline:</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200 tabular-nums">
                          {new Date(donation.pickupDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">
                        ${donation.estimatedValueUsd} Value
                      </div>
                    </div>

                    {/* If claimed / assigned */}
                    {donation.claimedByNgoName && (
                      <div className="mt-2.5 p-2 rounded bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-300 flex items-center justify-between">
                        <div className="truncate">
                          <span className="font-semibold">Recipient:</span> {donation.claimedByNgoName}
                        </div>
                        {donation.volunteerDriverName && (
                          <div className="shrink-0 text-blue-700 dark:text-blue-400 font-mono">
                            {donation.volunteerDriverName.split(' ')[0]}
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                  {/* Card Bottom Interactive Actions */}
                  <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectDonationDetails(donation)}
                      className="px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {donation.status === 'available' && (
                        <button
                          onClick={() => setClaimingDonation(donation)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors whitespace-nowrap"
                        >
                          Claim for NGO
                        </button>
                      )}

                      {donation.status === 'claimed' && (
                        <button
                          onClick={() => onAdvanceStatus(donation.id, 'in_transit', 'Volunteer driver picked up food from kitchen loading bay.')}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors whitespace-nowrap flex items-center gap-1"
                        >
                          <Truck className="w-3 h-3" />
                          <span>Dispatch Van</span>
                        </button>
                      )}

                      {donation.status === 'in_transit' && (
                        <button
                          onClick={() => onAdvanceStatus(donation.id, 'inspected', 'Receiver verified temperature and seal integrity at intake.')}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors whitespace-nowrap flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verify Intake</span>
                        </button>
                      )}

                      {donation.status === 'inspected' && (
                        <button
                          onClick={() => onAdvanceStatus(donation.id, 'distributed', 'Meals served directly to shelter residents and community soup kitchen dinner.')}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors whitespace-nowrap flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Log Distribution</span>
                        </button>
                      )}

                      {donation.taxDeductionEligible && (
                        <button
                          onClick={() => onOpenTaxReceipt(donation)}
                          title="Generate official 501(c)(3) tax write-off receipt"
                          className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Claim Modal for NGO Dispatch */}
      {claimingDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Dispatch Rescue Vehicle
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Assign this food surplus to a certified partner NGO with refrigerated transport capacity.
            </p>

            <div className="p-3 mb-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs">
              <div className="font-semibold text-slate-800 dark:text-slate-200">{claimingDonation.foodTitle}</div>
              <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                From: {claimingDonation.donorName} · {claimingDonation.servingsCount} Meals ({claimingDonation.weightKg} kg)
              </div>
            </div>

            <form onSubmit={handleConfirmClaim} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Recipient NGO Partner
                </label>
                <select
                  value={selectedNgoId}
                  onChange={(e) => setSelectedNgoId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {ngos.map((ngo) => (
                    <option key={ngo.id} value={ngo.id}>
                      {ngo.name} ({ngo.category} · Cap: {ngo.refrigeratedCapacityKg}kg)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assigned Driver & Vehicle
                </label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Driver Mobile Contact
                </label>
                <input
                  type="text"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setClaimingDonation(null)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                >
                  Confirm Claim & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
