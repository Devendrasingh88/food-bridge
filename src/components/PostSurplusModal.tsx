import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2, DollarSign, Thermometer, ShieldCheck } from 'lucide-react';
import { SurplusDonation, DonorType, FoodCategory, StorageCondition } from '../types/foodbridge';

interface PostSurplusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitDonation: (newDonation: SurplusDonation) => void;
}

export const PostSurplusModal: React.FC<PostSurplusModalProps> = ({
  isOpen,
  onClose,
  onSubmitDonation
}) => {
  const [donorName, setDonorName] = useState('The Metropolitan Grill & Terrace');
  const [donorType, setDonorType] = useState<DonorType>('restaurant');
  const [donorAddress, setDonorAddress] = useState('512 Riverside Avenue, City Center');
  const [donorPhone, setDonorPhone] = useState('+1 (555) 782-9930');
  const [foodTitle, setFoodTitle] = useState('Braised Beef Bourguignon & Garlic Mash');
  const [description, setDescription] = useState('Prepared in commercial steam kettles during dinner service. Kept above 65°C in covered stainless food pans. Unserved and clean.');
  const [category, setCategory] = useState<FoodCategory>('cooked_hot');
  const [servingsCount, setServingsCount] = useState<number>(110);
  const [weightKg, setWeightKg] = useState<number>(45);
  const [storageCondition, setStorageCondition] = useState<StorageCondition>('hot_holding');
  const [tempAtPackaging, setTempAtPackaging] = useState<number>(67.5);
  const [packagingType, setPackagingType] = useState('Heavy-duty thermal foil pans with sealed crimp lids');
  const [pickupHours, setPickupHours] = useState<number>(3);
  
  // Dietary checkboxes
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isHalal, setIsHalal] = useState(true);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isNutFree, setIsNutFree] = useState(true);

  if (!isOpen) return null;

  // Fair market value calculation: ~$8 per meal equivalent
  const estimatedValue = servingsCount * 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dietaryTags: string[] = [];
    if (isVegetarian) dietaryTags.push('Vegetarian');
    if (isHalal) dietaryTags.push('Halal');
    if (isGlutenFree) dietaryTags.push('Gluten-Free');
    if (isNutFree) dietaryTags.push('Nut-Free');

    const now = new Date();
    const deadline = new Date(now.getTime() + pickupHours * 60 * 60 * 1000);

    const newDonation: SurplusDonation = {
      id: `DON-2026-${Math.floor(100 + Math.random() * 900)}`,
      donorId: `donor-${Date.now()}`,
      donorName,
      donorType,
      donorAddress,
      donorCity: 'Metro City',
      contactPhone: donorPhone,
      foodTitle,
      description,
      category,
      servingsCount: Number(servingsCount),
      weightKg: Number(weightKg),
      dietary: dietaryTags,
      storageCondition,
      tempAtPackaging: Number(tempAtPackaging),
      packagingType,
      preparedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      pickupDeadline: deadline.toISOString(),
      status: 'available',
      estimatedValueUsd: estimatedValue,
      taxDeductionEligible: true,
      safetyChecklistPassed: true,
      createdAt: now.toISOString(),
      timeline: [
        {
          status: 'available',
          timestamp: now.toISOString(),
          note: `Batch registered by ${donorName}. Safety criteria verified at ${tempAtPackaging}°C.`,
          actor: 'Kitchen Duty Manager'
        }
      ]
    };

    onSubmitDonation(newDonation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Log Surplus Food for Rescue
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Instant notification to regional NGOs. Eligible for IRS 170(e)(3) / 80G tax deductions.
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

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Row 1: Donor Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Establishment Name
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Establishment Category
              </label>
              <select
                value={donorType}
                onChange={(e) => setDonorType(e.target.value as DonorType)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="restaurant">Restaurant / Bistro</option>
                <option value="hotel">Hotel / Resort Banquet</option>
                <option value="banquet">Wedding & Gala Hall</option>
                <option value="catering">Off-Premise Catering</option>
                <option value="corporate_cafeteria">Corporate Campus Dining</option>
              </select>
            </div>
          </div>

          {/* Row 2: Location & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Kitchen / Pickup Address
              </label>
              <input
                type="text"
                value={donorAddress}
                onChange={(e) => setDonorAddress(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Kitchen Expeditor Phone
              </label>
              <input
                type="text"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Row 3: Food Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Surplus Food Title
              </label>
              <input
                type="text"
                value={foodTitle}
                onChange={(e) => setFoodTitle(e.target.value)}
                placeholder="e.g. Roasted Chicken Breast & Pilaf Rice"
                required
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Food Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FoodCategory)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="cooked_hot">Cooked Hot Meals</option>
                <option value="cooked_cold">Chilled Entrees</option>
                <option value="bakery">Artisanal Bakery & Bread</option>
                <option value="fresh_produce">Fresh Produce</option>
                <option value="packaged_staples">Pantry Staples</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Food Description & Preparation Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Row 4: Servings, Weight, Temp, Pickup Window */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Estimated Meals
              </label>
              <input
                type="number"
                min="1"
                value={servingsCount}
                onChange={(e) => setServingsCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 tabular-nums"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Total Weight (kg)
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 tabular-nums"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Storage State
              </label>
              <select
                value={storageCondition}
                onChange={(e) => setStorageCondition(e.target.value as StorageCondition)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="hot_holding">Hot (≥60°C)</option>
                <option value="refrigerated">Cold (≤4°C)</option>
                <option value="ambient">Ambient (Bakery)</option>
                <option value="frozen">Frozen (≤-18°C)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Temp at Seal (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={tempAtPackaging}
                onChange={(e) => setTempAtPackaging(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 tabular-nums"
                required
              />
            </div>
          </div>

          {/* Row 5: Packaging Type & Pickup Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Packaging Material
              </label>
              <input
                type="text"
                value={packagingType}
                onChange={(e) => setPackagingType(e.target.value)}
                placeholder="e.g. Sealed foil pans / cambro hot-carriers"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Pickup Window Deadline
              </label>
              <select
                value={pickupHours}
                onChange={(e) => setPickupHours(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value={1}>Urgent: Within 1 hour</option>
                <option value={2}>Within 2 hours (Recommended for hot meals)</option>
                <option value={3}>Within 3 hours</option>
                <option value={6}>Within 6 hours (Refrigerated / Bakery)</option>
              </select>
            </div>
          </div>

          {/* Dietary Checkboxes */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Dietary & Allergen Declarations
            </label>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVegetarian}
                  onChange={(e) => setIsVegetarian(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Vegetarian</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isHalal}
                  onChange={(e) => setIsHalal(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Halal Certified</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGlutenFree}
                  onChange={(e) => setIsGlutenFree(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Gluten-Free</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNutFree}
                  onChange={(e) => setIsNutFree(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Nut-Free Facility</span>
              </label>
            </div>
          </div>

          {/* Value & Tax Benefit Preview Box */}
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <div className="font-semibold text-emerald-900 dark:text-emerald-300">
                  Estimated Tax Write-Off Value: ${estimatedValue.toLocaleString()} USD
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Based on fair-market valuation ($8/meal). Official 501(c)(3) tax receipt auto-generated upon distribution.
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                100% Tax Deductible
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              Broadcast Surplus Dispatch
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
