import { ProductInfo, LeaderInfo, DocumentItem, ExportRegion } from '../types';

export const COMPANY_DETAILS = {
  name: "Okhai Pharma Intermediates Pvt. Ltd.",
  shortName: "Okhai Pharma",
  tagline: "Pure Nicotine. Precisely Made.",
  foundedYear: 2022,
  address: "Sr No. 538, Ashapuri-Changa Road, Vill-Kasor, Ta-Sojitra, Dist-Anand, Gujarat 388460, India",
  phone: "+91 79900 82565",
  moqPhone: "+91 87583 23513",
  email: "info@okhaipharma.com",
  whatsappUrl: "https://wa.me/917990082565?text=Hello%20Okhai%20Pharma%2C%20I%20would%20like%20to%20enquire%20about%20your%20products.",
  complianceNotice: "Nicotine products are toxic and intended for licensed B2B, pharmaceutical and research use only. Handle strictly per the Safety Data Sheet and local regulations.",
  mission: "Manufacture and supply high-purity nicotine and derivatives with an uncompromising focus on quality, safety protocols, and environmental responsibility.",
  vision: "Become a globally trusted leader in nicotine manufacturing, recognised for precision engineering, technological innovation, and responsible manufacturing practices."
};

export const PRODUCTS: ProductInfo[] = [
  {
    id: "nicotine-sulfate-40",
    name: "Nicotine Sulfate 40%",
    chemicalName: "Nicotine Sulfate Solution",
    casNumber: "65-30-5",
    tagline: "High-purity, water-soluble, 40% active nicotine intermediate",
    grade: "Technical / Research Grade",
    activeContent: "40.0% w/w Active Nicotine",
    form: "Aqueous dark brown liquid solution",
    route: "/products/nicotine-sulfate-40",
    unNumber: "UN 1658",
    hazardClass: "Class 6.1 (Toxic Substance, Packing Group II)",
    description: "High-purity, water-soluble compound specifically formulated for pharmaceutical research, scientific study, and chemical intermediate manufacturing.",
    overview: "Okhai Pharma manufactures high-purity Nicotine Sulfate 40% as a versatile water-soluble compound for pharmaceutical and scientific research. It supports development of nicotine-based therapies such as smoking-cessation aids and transdermal formulations, and is utilised in research institutes to study pharmacological mechanisms, receptor kinetics, and behavioural impacts. Its verified batch consistency and solubility profile deliver dependable baseline data for toxicology and neurochemical research.",
    applications: [
      "Scientific research reagent for neuropharmacology and receptor kinetic assays",
      "Chemical manufacturing intermediate for synthesis of complex nicotine derivatives",
      "Starting material for high-purity nicotine refining up to 99% purity",
      "Formulation intermediate for controlled release research preparations"
    ],
    features: [
      { title: "Certified Tobacco Sourcing", desc: "Sourced directly from certified tobacco cultivators across monitored farming belts in India." },
      { title: "HPLC & GC Batch Testing", desc: "Every production batch undergoes analytical chromatography testing for active concentration and impurity profiles." },
      { title: "Aqueous Solubility", desc: "Easily miscible in aqueous matrices for streamlined chemical intermediate formulation." },
      { title: "Expert Handling Support", desc: "Comprehensive technical dossiers and regulatory handling guidance provided with every shipment." },
      { title: "Dedicated B2B Service", desc: "Direct manufacturer relationship with structured logistics and documentation support." }
    ],
    specifications: [
      { parameter: "Chemical Name", value: "Bis[3-(1-methylpyrrolidin-2-yl)pyridine] sulfate" },
      { parameter: "CAS Registry Number", value: "65-30-5" },
      { parameter: "Active Nicotine Content", value: "40.0% min w/w", method: "Titrimetric / GC" },
      { parameter: "Physical Appearance", value: "Dark amber to brownish liquid" },
      { parameter: "Solubility", value: "Miscible in water in all proportions" },
      { parameter: "pH Range", value: "[to be confirmed by Okhai]" },
      { parameter: "Specific Gravity (20°C)", value: "[to be confirmed by Okhai]" },
      { parameter: "Standard Packaging", value: "UN-certified 50L / 200L HDPE corrosion-resistant drums" },
      { parameter: "Shelf Life", value: "24 months in original sealed container stored as specified" },
      { parameter: "Harmonized System (HS) Code", value: "2939.79 / [to be confirmed by Okhai]" }
    ],
    storageHandling: [
      { title: "Temperature Control", instruction: "Store at ambient temperatures below 25°C in a climate-moderated hazardous storage area." },
      { title: "Ventilation & Dry Conditions", instruction: "Keep in a cool, strictly dry, well-ventilated facility equipped with mechanical air extractors." },
      { title: "Direct Sunlight Protection", instruction: "Protect from direct sunlight, thermal radiation, and heat sources to prevent thermal degradation." },
      { title: "Original Sealed Containers", instruction: "Maintain solely in original factory-sealed, corrosion-resistant fluorinated HDPE containers." },
      { title: "Clear Labelling Protocol", instruction: "Ensure intact toxic substance hazard placards (UN 1658, Class 6.1) are visible at all times." },
      { title: "Segregation Requirements", instruction: "Strictly segregate from foodstuffs, animal feed, beverages, and reactive oxidizing agents." },
      { title: "Controlled Access", instruction: "Keep in a dedicated locked storage vault accessible only by certified hazardous material handlers." },
      { title: "Spill Containment & Inspection", instruction: "Store on secondary chemical-resistant containment berms; conduct scheduled container seal audits." },
      { title: "Fire Safety Equipment", instruction: "Equip facility with dry chemical powder, alcohol-resistant foam, or carbon dioxide extinguishers." },
      { title: "Compliant Disposal", instruction: "Dispose of residues and rinse containers via accredited hazardous waste management services." }
    ],
    faqs: [
      { question: "What is the minimum order quantity (MOQ) for Nicotine Sulfate 40%?", answer: "MOQ depends on destination territory and regulatory export clearance. Please contact our commercial desk at +91 87583 23513 for batch schedules." },
      { question: "Can Okhai Pharma provide batch-specific Certificate of Analysis (CoA)?", answer: "Yes, every export batch is released with an authentic lot-specific CoA detailing HPLC assay, physical parameters, and release date." },
      { question: "Is this product suitable for consumer retail?", answer: "No. Our products are strictly restricted to licensed B2B pharmaceutical, academic research, and accredited chemical manufacturing entities." }
    ]
  },
  {
    id: "nicotine-alkaloid-90-95",
    name: "Nicotine Alkaloid 90% / 95%",
    chemicalName: "Natural Nicotine Alkaloid",
    casNumber: "54-11-5",
    tagline: "Pharma and specialized e-liquid grade naturally extracted nicotine",
    grade: "Pharmaceutical & High-Purity Grade",
    activeContent: "90.0% / 95.0% min w/w",
    form: "Clear to pale yellow viscous liquid",
    route: "/products/nicotine-alkaloid-90-95",
    unNumber: "UN 1654",
    hazardClass: "Class 6.1 (Toxic Liquid, Organic, Packing Group II)",
    description: "Extracted from carefully selected Nicotiana tabacum leaves, available in two highly purified grades serving as the fundamental API building block for pharmaceutical and precision formulations.",
    overview: "Extracted from Indian Nicotiana tabacum, Okhai Pharma's Nicotine Alkaloid is processed in two concentrated grades: 90% and 95%. The 95% grade is tailored for pharmaceutical active ingredient (API) pathways, transdermal therapeutic systems, and medical formulations. Produced in our purpose-built Gujarat plant under rigorous extraction parameters, proprietary molecular distillation achieves low residual fractions and verifiable batch homogeneity tested by high-performance liquid chromatography (HPLC) and gas chromatography (GC).",
    applications: [
      "Nicotine Replacement Therapy (NRT) formulations including medicated patches, gums, and oral lozenges",
      "Pharmaceutical API intermediate for controlled nicotine delivery systems",
      "E-liquid manufacturing requiring consistent alkaloid purity and neutral sensory profile",
      "Academic neuropharmacology and receptor ligand research studies"
    ],
    features: [
      { title: "Dual Purity Offerings", desc: "Available in calibrated 90% and 95% grades to match specialized regulatory and processing needs." },
      { title: "HPLC & GC Chromatographic Profiling", desc: "Batch verified on calibrated chromatographs for assay accuracy and impurity quantification." },
      { title: "Low Foreign Impurity Fractions", desc: "Multistage distillation and refining steps ensure exceptionally low non-nicotine alkaloid residuals." },
      { title: "Inert Nitrogen Blanketing", desc: "Packaged under high-purity nitrogen blanket to inhibit oxidative coloration during transport." },
      { title: "Global Regulatory Dossiers", desc: "Supported by technical data sheets, SDS, and compliance documentation for global transit." }
    ],
    specifications: [
      { parameter: "Chemical Name", value: "3-[(2S)-1-methylpyrrolidin-2-yl]pyridine" },
      { parameter: "CAS Registry Number", value: "54-11-5" },
      { parameter: "Assay (90% Grade)", value: "≥ 90.0% w/w by HPLC/GC" },
      { parameter: "Assay (95% Grade)", value: "≥ 95.0% w/w by HPLC/GC (EP/USP testing parameters to be confirmed)" },
      { parameter: "Physical Appearance", value: "Colorless to pale yellow oily liquid (darkens on oxidation)" },
      { parameter: "Total Related Alkaloids", value: "[to be confirmed by Okhai]" },
      { parameter: "Specific Optical Rotation", value: "[to be confirmed by Okhai]" },
      { parameter: "Boiling Point", value: "247°C (approx.)" },
      { parameter: "Packaging Format", value: "UN-rated fluorinated canisters and stainless steel containers with nitrogen purge" },
      { parameter: "Harmonized System (HS) Code", value: "2939.79.00 / [to be confirmed by Okhai]" }
    ],
    storageHandling: [
      { title: "Cold Storage Recommended", instruction: "Store between 2°C and 8°C (or controlled ambient under 20°C in certified hazardous cold room)." },
      { title: "Inert Gas Purge", instruction: "Maintain nitrogen blanket headspace whenever packaging is unsealed to prevent oxidation." },
      { title: "Light Shielding", instruction: "Protect strictly from UV light and thermal exposure in dark, amber or stainless vessels." },
      { title: "Corrosion Resistant Enclosures", instruction: "Use only approved fluorinated polyethylene or passivated stainless steel vessels." },
      { title: "Security Measures", instruction: "Store inside dual-custody locked hazardous containment with electronic access control." },
      { title: "Personal Protective Equipment", instruction: "Mandatory nitrile or butyl chemical-resistant gloves, organic vapor respirator, and face shield." },
      { title: "Spill Protocols", instruction: "Neutralize with appropriate absorbents per Safety Data Sheet guidelines; notify facility safety officer." }
    ],
    faqs: [
      { question: "What is the difference between 90% and 95% grades?", answer: "The 95% grade undergoes additional multi-stage molecular distillation for lower total alkaloid impurities, tailored for pharmaceutical synthesis and high-standard formulations." },
      { question: "How is oxidative degradation prevented during export?", answer: "All containers are sealed under an inert nitrogen blanket inside UN-rated barrier containers to preserve color and purity during ocean and air freight." },
      { question: "Are manufacturing facility audits allowed?", answer: "Qualified commercial buyers with active B2B licenses may schedule technical facility audits at our Gujarat plant subject to advance compliance clearance." }
    ]
  },
  {
    id: "pure-nicotine-usp-ep-99-5",
    name: "Pure Nicotine USP/EP 99.5%+",
    chemicalName: "(S)-3-(1-methylpyrrolidin-2-yl)pyridine (USP / EP Grade)",
    casNumber: "54-11-5",
    tagline: "Ultra-pure, colorless, odorless, and chemically stable pharmaceutical active ingredient",
    grade: "USP & EP Pharmacopoeia Grade",
    activeContent: "≥ 99.5% w/w Active Nicotine",
    form: "Colorless, clear oily liquid (virtually odorless)",
    route: "/products/pure-nicotine-usp-ep-99-5",
    unNumber: "UN 1654",
    hazardClass: "Class 6.1 (Toxic Liquid, Organic, Packing Group II)",
    description: "Colorless and odorless, delivering a neutral base for your formulations. Its unmatched stability guarantees long-term consistency and reliability in every use.",
    overview: "Manufactured using the finest tobacco leaves from trusted suppliers, Okhai Pharma's Pure Nicotine USP/EP 99.5%+ is colorless and odorless, delivering an exceptionally neutral active base for precision formulations. Its unmatched chemical stability guarantees long-term consistency, shelf-life integrity, and reliability across every use. Verified through high-resolution analytical chromatography (HPLC/GC), it complies strictly with United States Pharmacopeia (USP) and European Pharmacopoeia (EP) monographs.",
    applications: [
      "Nicotine Replacement Therapy (NRT) formulations: Transdermal patches, medical gums, and sublingual tablets",
      "Pharmaceutical Active Pharmaceutical Ingredient (API) for FDA & EMA compliant neurological and respiratory medicines",
      "Modern oral nicotine pouches requiring zero foreign odor and stringent heavy metal compliance",
      "Specialized e-liquid formulations requiring a completely neutral sensory canvas and crystal-clear transparency",
      "High-precision analytical chemistry, pharmaceutical bioequivalence testing, and certified reference standards"
    ],
    features: [
      { title: "Colorless & Odorless", desc: "Delivers an ultra-clean, neutral sensory base with virtually undetectable tobacco smell, preventing taste and color distortion." },
      { title: "Unmatched Chemical Stability", desc: "Proprietary refinement eliminates oxidation catalysts, guaranteeing superior shelf-life and chemical consistency in every batch." },
      { title: "USP & EP Dual Monograph Compliance", desc: "Fully certified against both United States and European Pharmacopoeia standards with total related alkaloids strictly < 0.5%." },
      { title: "HPLC & GC Analytical Verification", desc: "Every release is subjected to validated chromatographic profiling with an authentic lot-specific Certificate of Analysis (CoA)." },
      { title: "Inert Nitrogen Barrier Packaging", desc: "Dispatched under high-purity dry nitrogen blankets inside UN-certified fluorinated barrier containers to inhibit light and oxidative degradation." }
    ],
    specifications: [
      { parameter: "Chemical Name", value: "(S)-3-(1-methylpyrrolidin-2-yl)pyridine" },
      { parameter: "CAS Registry Number", value: "54-11-5" },
      { parameter: "Active Assay (HPLC)", value: "≥ 99.5% w/w (Anhydrous Basis)" },
      { parameter: "Pharmacopoeia Compliance", value: "USP (United States Pharmacopeia) & EP (European Pharmacopoeia)" },
      { parameter: "Physical Appearance", value: "Colorless, clear, transparent oily liquid" },
      { parameter: "Odor Profile", value: "Colorless & odorless, neutral sensory profile" },
      { parameter: "Specific Optical Rotation [α]D²⁰", value: "-140° to -152° (neat)" },
      { parameter: "Refractive Index (20°C)", value: "1.525 – 1.530" },
      { parameter: "Total Related Substances (Impurities)", value: "≤ 0.5% w/w" },
      { parameter: "Any Individual Impurity", value: "≤ 0.3% w/w" },
      { parameter: "Water Content (Karl Fischer)", value: "≤ 0.5% w/w" },
      { parameter: "Boiling Point", value: "247°C at 745 mmHg" },
      { parameter: "Standard Packaging", value: "UN-certified fluorinated canisters, aluminum bottles, or passivated stainless steel drums" },
      { parameter: "Harmonized System (HS) Code", value: "2939.79.00" }
    ],
    storageHandling: [
      { title: "Controlled Cold Storage", instruction: "Store at 2°C to 8°C in a certified hazardous cold room, protected from moisture and thermal spikes." },
      { title: "Dry Nitrogen Headspace Purge", instruction: "Always reseal under high-purity dry nitrogen gas blanket immediately following any sampling." },
      { title: "Light Shielding", instruction: "Store strictly inside light-resistant, opaque amber or stainless steel vessels protected from direct UV rays." },
      { title: "Dual-Custody Security", instruction: "Keep in a locked, ventilated toxic substance storage vault under strict electronic access control." },
      { title: "Certified Safety Handling", instruction: "Mandatory organic vapor respirators, chemical-resistant nitrile gloves, and splash goggles." }
    ],
    faqs: [
      { question: "What makes Pure Nicotine USP/EP 99.5%+ unique?", answer: "It is refined to achieve ≥ 99.5% assay purity while remaining completely colorless and odorless. This ensures an impeccably neutral base that will not discolor or introduce off-notes into delicate pharmaceutical or modern nicotine formulations." },
      { question: "How does this compare to 90% and 95% grades?", answer: "While the 90% and 95% grades are ideal for general technical and intermediate applications, the USP/EP 99.5%+ grade meets the stringent monograph specifications of global pharmacopoeias with total related substances under 0.5%." },
      { question: "What packaging sizes are available for export?", answer: "We offer UN-certified 1kg, 5kg, 25kg, and 200L fluorinated canisters and stainless steel drums sealed under inert nitrogen blankets for secure international transport." }
    ]
  }
];

export const LEADERSHIP: LeaderInfo[] = [
  {
    name: "Mr. Parth Visana",
    role: "Director",
    qualification: "Graduate in Food Processing and Technology (A.D. Patel Institute of Technology)",
    initials: "PV",
    bio: "Experienced industrialist with an extensive operational background in bulk raw-material supply for the cement industry and the managed processing of treated hazardous chemical waste streams. Spearheads strategic planning, commercial expansion, and financial capital structure.",
    rolesHeld: [
      "Founder and Partner, Neja Associates",
      "Founder and Partner, Neja Healthcare Hospitals LLP",
      "Proprietor, Parth Roadways"
    ],
    strengths: "Strategic long-term planning, enterprise governance, and robust financial literacy."
  },
  {
    name: "Mr. Lakhaman Odedra",
    role: "Director",
    qualification: "Bachelor of Arts",
    initials: "LO",
    bio: "Seasoned commercial leader and authorized transporter for Saurashtra Cement. Brings extensive institutional and agricultural procurement governance as Chairman of the Agricultural Produce Market Committee (APMC), Porbandar district.",
    rolesHeld: [
      "Chairman, APMC (Porbandar District)",
      "Authorized Transporter, Saurashtra Cement",
      "Founder and Partner, Okhai Enterprise",
      "Founder and Partner, Divine Project & Subh Enterprise"
    ],
    strengths: "Deep-rooted regional agricultural planning, logistical network execution, and operational management."
  },
  {
    name: "Mr. Satyen Chudasama",
    role: "General Manager, Operations",
    qualification: "BSc Chemistry, Post-Diploma in Industrial Safety, Post-Diploma in Environment Technology & Management",
    initials: "SC",
    bio: "Accomplished chemical operations veteran with over 30 years of hands-on expertise in the chemical processing sector, specializing in dye intermediates, plant engineering, hazardous safety compliance, and greenfield industrial installations.",
    strengths: "Process engineering, occupational safety systems, environmental compliance, and plant scale-up."
  }
];

export const EXPORT_REGIONS: ExportRegion[] = [
  {
    name: "North America (USA)",
    coords: [22, 38],
    ports: "JFK / Newark / Los Angeles / Houston",
    notes: "Strict 21 CFR / FDA compliance import documentation, UN-certified air/sea packaging [markets served: to be confirmed by Okhai]"
  },
  {
    name: "European Union",
    coords: [50, 30],
    ports: "Rotterdam / Hamburg / Antwerp",
    notes: "EU REACH documentation support, Class 6.1 ADR certified packaging [markets served: to be confirmed by Okhai]"
  },
  {
    name: "Japan & East Asia",
    coords: [82, 37],
    ports: "Yokohama / Tokyo / Kobe",
    notes: "High purity analytical specifications, temperature monitored sea freight [markets served: to be confirmed by Okhai]"
  },
  {
    name: "Middle East",
    coords: [61, 44],
    ports: "Jebel Ali / Dubai / Dammam",
    notes: "Direct transit routes from Mundra / Kandla ports in Gujarat [markets served: to be confirmed by Okhai]"
  },
  {
    name: "Southeast Asia",
    coords: [74, 52],
    ports: "Singapore / Port Klang / Bangkok",
    notes: "Regional distribution and scheduled maritime logistics [markets served: to be confirmed by Okhai]"
  }
];

export const DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-brochure",
    title: "Okhai Pharma Corporate Brochure 2026",
    category: "Brochure",
    format: "PDF",
    size: "3.4 MB",
    requiresRequest: false,
    description: "Complete overview of our manufacturing facility in Gujarat, extraction technology, product specifications, and global logistics capability."
  },
  {
    id: "doc-spec-sulfate",
    title: "Nicotine Sulfate 40% Technical Specification Sheet",
    category: "Spec Sheet",
    format: "PDF",
    size: "1.1 MB",
    requiresRequest: false,
    description: "Detailed assay parameters, physical properties, solubility benchmarks, UN 1658 transport details, and shelf-life protocols."
  },
  {
    id: "doc-spec-alkaloid",
    title: "Nicotine Alkaloid 90% / 95% Technical Specification Sheet",
    category: "Spec Sheet",
    format: "PDF",
    size: "1.2 MB",
    requiresRequest: false,
    description: "Dual-grade specifications, chromatographic testing limits, inert blanketing criteria, and pharmaceutical intermediate benchmarks."
  },
  {
    id: "doc-coa-sample",
    title: "Representative Certificate of Analysis (Sample Batch)",
    category: "CoA",
    format: "PDF",
    size: "820 KB",
    requiresRequest: false,
    description: "Demonstration format of lot-specific analytical findings including HPLC peak resolution, assay percentages, and release authorization."
  },
  {
    id: "doc-sds-sulfate",
    title: "Safety Data Sheet (SDS) - Nicotine Sulfate 40%",
    category: "SDS",
    format: "PDF",
    size: "1.8 MB",
    requiresRequest: true,
    description: "Comprehensive 16-section GHS safety document containing toxicological profiles, fire-fighting protocols, emergency response, and PPE directives."
  },
  {
    id: "doc-sds-alkaloid",
    title: "Safety Data Sheet (SDS) - Nicotine Alkaloid 90/95%",
    category: "SDS",
    format: "PDF",
    size: "1.9 MB",
    requiresRequest: true,
    description: "Official chemical hazard classification, first aid measures, spill neutralization, and controlled storage instructions."
  },
  {
    id: "doc-iec-cert",
    title: "Import Export Code (IEC) Registration Certificate",
    category: "Certificate",
    format: "PDF",
    size: "640 KB",
    requiresRequest: true,
    description: "Government of India Directorate General of Foreign Trade (DGFT) authorization for commercial global export shipments."
  },
  {
    id: "doc-gst-cert",
    title: "GST Registration Certificate",
    category: "Certificate",
    format: "PDF",
    size: "520 KB",
    requiresRequest: true,
    description: "Official goods and services tax registration verification issued by the Government of Gujarat."
  }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Certified Tobacco Sourcing",
    tagline: "High-grade Indian Nicotiana tabacum",
    desc: "Rigorous raw material selection from established tobacco cultivators across regulated farming belts in India, establishing traceable botanical origin."
  },
  {
    step: "02",
    title: "Controlled Botanical Extraction",
    tagline: "Solid-liquid extraction protocols",
    desc: "Modern extraction units isolate raw nicotine alkaloids under moderated temperature and pH conditions, preserving organic integrity."
  },
  {
    step: "03",
    title: "Proprietary Purification & Refining",
    tagline: "Molecular distillation & salt formation",
    desc: "Specialized fractional distillation and crystallization processes remove unwanted organic residues, targeting purity thresholds up to 95% and beyond."
  },
  {
    step: "04",
    title: "HPLC & GC Analytical Verification",
    tagline: "Every production batch verified",
    desc: "Analytical chemists evaluate each batch with calibrated High-Performance Liquid Chromatography and Gas Chromatography for purity and impurity profiles."
  },
  {
    step: "05",
    title: "Nitrogen-Purged Export Packaging",
    tagline: "UN-certified hazardous containment",
    desc: "Finished products are packaged in UN-rated corrosion-resistant fluorinated containers under dry nitrogen blankets for safe international transit."
  }
];
