import React, { useState } from 'react';
import {
  X,
  Calculator,
  Package,
  Globe2,
  Send,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Scale,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/companyData';

interface CommercialQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: 'Nicotine Sulfate 40%' | 'Nicotine Alkaloid 90%' | 'Nicotine Alkaloid 95%' | 'Pure Nicotine USP/EP 99.5%+';
}

export const CommercialQuoteModal: React.FC<CommercialQuoteModalProps> = ({
  isOpen,
  onClose,
  defaultProduct = 'Nicotine Sulfate 40%'
}) => {
  const [product, setProduct] = useState<string>(defaultProduct);
  const [packagingType, setPackagingType] = useState<'50kg' | '200kg' | 'custom'>('50kg');
  const [quantityKg, setQuantityKg] = useState<number>(500);
  const [destinationCountry, setDestinationCountry] = useState('United States');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Real-time batch metrics
  const drumCapacity = packagingType === '50kg' ? 50 : 200;
  const drumCount = Math.ceil(quantityKg / drumCapacity);
  const estimatedPallets = Math.ceil(drumCount / (packagingType === '50kg' ? 8 : 4));
  const estimatedGrossWeightKg = Math.round(quantityKg * 1.08); // tare allowance

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0E1F14]/75 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#5B9A3C]/30 text-[#1E3D2A] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="p-6 border-b border-[#1E3D2A]/10 bg-gradient-to-r from-[#FAFBF8] via-[#F4F8F1] to-[#EAF2E6] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1E3D2A] text-[#8CC63F] flex items-center justify-center shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B9A3C] font-bold">
                B2B Commercial Procurement Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#1E3D2A]">
                Instant Commercial Quote Estimator
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1E3D2A]/70 hover:text-[#1E3D2A] border border-[#1E3D2A]/15 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="py-12 px-4 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#EAF2E5] text-[#5B9A3C] mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-2xl font-serif font-medium text-[#1E3D2A]">
                Inquiry Successfully Logged!
              </h4>
              <p className="text-sm text-[#1E3D2A]/80 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold">{companyName || 'valued partner'}</span>. Our commercial export desk has received your request for <strong>{quantityKg} kg of {product}</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 max-w-sm mx-auto text-xs space-y-1 text-left">
                <div className="flex justify-between">
                  <span className="text-[#1E3D2A]/60">Estimated Drums:</span>
                  <span className="font-mono font-bold">{drumCount} Drums</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1E3D2A]/60">Destination:</span>
                  <span className="font-mono font-bold">{destinationCountry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1E3D2A]/60">Response Window:</span>
                  <span className="font-mono text-[#5B9A3C] font-bold">Within 4 Business Hours</span>
                </div>
              </div>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-full bg-[#F4F8F1] text-xs font-semibold text-[#1E3D2A] hover:bg-[#EAF2E5]"
                >
                  Calculate Another Batch
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#1E3D2A] text-white text-xs font-semibold hover:bg-[#2D5A3C]"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Product Selection */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#1E3D2A]/70 mb-2 font-semibold">
                  1. Select Target Intermediate
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    'Pure Nicotine USP/EP 99.5%+',
                    'Nicotine Sulfate 40%',
                    'Nicotine Alkaloid 90%',
                    'Nicotine Alkaloid 95%'
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setProduct(item as any)}
                      className={`p-3 rounded-2xl text-xs font-medium text-left border transition-all cursor-pointer ${
                        product === item
                          ? 'border-[#5B9A3C] bg-[#EAF2E5] text-[#1E3D2A] font-semibold shadow-xs ring-1 ring-[#5B9A3C]'
                          : 'border-[#1E3D2A]/10 bg-white hover:bg-[#F8F9F4] text-[#1E3D2A]/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-[#5B9A3C]">
                          {item.includes('95') ? 'Pharma API' : item.includes('40') ? 'Aqueous' : 'Technical'}
                        </span>
                        {product === item && <CheckCircle2 className="w-3.5 h-3.5 text-[#5B9A3C]" />}
                      </div>
                      <span className="block">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Volume & Packaging Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Quantity Input */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[#1E3D2A]/70 mb-2 font-semibold">
                    2. Batch Quantity (kg)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={50}
                      step={25}
                      value={quantityKg}
                      onChange={(e) => setQuantityKg(Math.max(25, Number(e.target.value)))}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-sm font-mono font-bold text-[#1E3D2A] focus:outline-none focus:ring-2 focus:ring-[#5B9A3C]"
                    />
                    <span className="absolute right-4 top-3.5 text-xs font-mono text-[#1E3D2A]/50 font-semibold">
                      KG NET
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {[100, 250, 500, 1000, 5000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setQuantityKg(preset)}
                        className="px-2 py-1 rounded-lg bg-white border border-[#1E3D2A]/10 text-[11px] font-mono hover:border-[#5B9A3C] cursor-pointer"
                      >
                        {preset >= 1000 ? `${preset / 1000} MT` : `${preset}kg`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Packaging Type */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[#1E3D2A]/70 mb-2 font-semibold">
                    3. UN Certified Packaging
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPackagingType('50kg')}
                      className={`p-3 rounded-2xl text-xs text-left border transition-all cursor-pointer ${
                        packagingType === '50kg'
                          ? 'border-[#5B9A3C] bg-[#EAF2E5] text-[#1E3D2A] font-semibold'
                          : 'border-[#1E3D2A]/10 bg-white hover:bg-[#F8F9F4]'
                      }`}
                    >
                      <Package className="w-4 h-4 text-[#5B9A3C] mb-1" />
                      <span className="block font-semibold">50 kg HDPE</span>
                      <span className="text-[10px] text-[#1E3D2A]/60 font-mono">Fluorinated UN Drum</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPackagingType('200kg')}
                      className={`p-3 rounded-2xl text-xs text-left border transition-all cursor-pointer ${
                        packagingType === '200kg'
                          ? 'border-[#5B9A3C] bg-[#EAF2E5] text-[#1E3D2A] font-semibold'
                          : 'border-[#1E3D2A]/10 bg-white hover:bg-[#F8F9F4]'
                      }`}
                    >
                      <Package className="w-4 h-4 text-[#5B9A3C] mb-1" />
                      <span className="block font-semibold">200 kg Steel</span>
                      <span className="text-[10px] text-[#1E3D2A]/60 font-mono">Epoxy-Lined UN Drum</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Dynamic Batch Metric Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAFBF8] to-[#EAF2E6] border border-[#5B9A3C]/30 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B9A3C] font-bold block mb-2">
                  Live Dispatch Logistics Calculation
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[#1E3D2A]/60 block text-[10px]">Drum Count</span>
                    <span className="font-mono font-bold text-[#1E3D2A] text-sm">
                      {drumCount} Drums
                    </span>
                  </div>
                  <div>
                    <span className="text-[#1E3D2A]/60 block text-[10px]">Estimated Gross Wt.</span>
                    <span className="font-mono font-bold text-[#1E3D2A] text-sm">
                      ~{estimatedGrossWeightKg.toLocaleString()} kg
                    </span>
                  </div>
                  <div>
                    <span className="text-[#1E3D2A]/60 block text-[10px]">Pallet Spaces</span>
                    <span className="font-mono font-bold text-[#1E3D2A] text-sm">
                      {estimatedPallets} Pallets (ISPM-15)
                    </span>
                  </div>
                  <div>
                    <span className="text-[#1E3D2A]/60 block text-[10px]">UN Classification</span>
                    <span className="font-mono font-bold text-[#2E683A] text-sm">
                      {product.includes('Sulfate') ? 'UN 1658 (PG II)' : 'UN 1654 (PG II)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-mono uppercase text-[#1E3D2A]/70 font-semibold">
                  4. Commercial Buyer Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Company / Institution Name *"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:ring-2 focus:ring-[#5B9A3C]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Corporate Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:ring-2 focus:ring-[#5B9A3C]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Contact Number (with Country Code)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:ring-2 focus:ring-[#5B9A3C]"
                  />
                  <select
                    value={destinationCountry}
                    onChange={(e) => setDestinationCountry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:ring-2 focus:ring-[#5B9A3C]"
                  >
                    <option value="United States">Destination: United States (CIF/FOB)</option>
                    <option value="Germany">Destination: Germany / European Union</option>
                    <option value="United Kingdom">Destination: United Kingdom</option>
                    <option value="Japan">Destination: Japan</option>
                    <option value="India">Destination: India Domestic (Ex-Kasor Plant)</option>
                    <option value="Other">Destination: Other International Seaport</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <a
                  href={`tel:${COMPANY_DETAILS.moqPhone}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#5B9A3C] hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Desk: {COMPANY_DETAILS.moqPhone}</span>
                </a>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2D5A3C] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md shadow-[#1E3D2A]/20 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#8CC63F]" />
                  <span>Generate Official Commercial Quote</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
