export interface Product {
  id: number;
  ft: number;
  category: string;
  spanishName: string;
  englishName: string;
  qty: number;
  specs: string;
}

export interface Competitor {
  category: number;
  categoryName: string;
  company: string;
  product: string;
  country: string;
  website: string;
  fdaCleared: boolean;
  fdaDetail: string;
  notes: string;
  isPrimaryMatch: boolean;
  isSingleSource: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    ft: 100570,
    category: "Collagen-Alginate Wound Dressing",
    spanishName: "Apósito a base de colágeno y alginato",
    englishName: "Collagen-Alginate Wound Dressing, 10.2cm x 11.1cm (4\" x 4⅜\")",
    qty: 115200,
    specs: "Sterile, non-adherent, soft and conformable. Absorbent and gelling properties. Maintains moist wound environment while controlling exudate. Provides structural support for cellular growth and tissue regeneration. ISO 13485 certified, FDA cleared.",
  },
  {
    id: 2,
    ft: 105295,
    category: "Nano Hemicellulose Membrane & Gel",
    spanishName: "Sistema de membrana y gel de hemicelulosa de nanoestructura",
    englishName: "Nano-structured Hemicellulose Membrane (8cm x 8cm) + Gel (90ml)",
    qty: 3600,
    specs: "Plant-derived stem cells in biological hemicellulose membrane (<2nm thick). Creates cellular signaling system mimicking extracellular matrix. Positively charged at physiological pH — removes bacteria electrostatically. 100% natural, biodegradable, antibiotic without silver. Manufactured with nanotechnology.",
  },
  {
    id: 3,
    ft: 105362,
    category: "Lyophilized 3D Collagen Matrix",
    spanishName: "Matriz tridimensional de colágeno liofilizada de poros abiertos",
    englishName: "Lyophilized 3D Open-Pore Collagen Matrix, 102 x 102 x 3mm",
    qty: 10800,
    specs: "100% bovine collagen types I, III, and V. Conforms to wound bed. Moldable. Local hemostatic effect. Biodegradable. Absorbs 20x its own weight. Latex-free. Sterile.",
  },
  {
    id: 4,
    ft: 107365,
    category: "Hydrogel with Ionic Silver & CMC",
    spanishName: "Hidrogel con plata iónica y carboximetilcelulosa",
    englishName: "Hydrogel with Ionic Silver (0.024%) and CMC (2.5%), 8oz tube",
    qty: 14400,
    specs: "Ionic silver at 0.024% concentration. 2.5% carboxymethylcellulose. Available in 0.25oz, 1.5oz, 3.0oz, and 8.0oz tube presentations.",
  },
  {
    id: 5,
    ft: 108611,
    category: "Hydrocellular Foam (Quadrilobed)",
    spanishName: "Apósito combinado espuma hidrocelular con adhesivo de silicona",
    englishName: "Hydrocellular Foam Dressing with Silicone Adhesive, Quadrilobed",
    qty: 34200,
    specs: "Combined dressing with hydrocellular foam base and silicone adhesive. Absorbent padded central core. Visual indicator for dressing change. Repositionable. Quadrilobed shape. Multiple sizes from 10.3cm to 25.5cm. Sterile, single use.",
  },
  {
    id: 6,
    ft: 109014,
    category: "Acellular Fish Skin Matrix",
    spanishName: "Matriz acelular con ácidos grasos y omega 3",
    englishName: "Acellular Intact Fish Skin Matrix (Gadus morhua), Fragmented 4cm²",
    qty: 18000,
    specs: "Atlantic cod (Gadus morhua) skin matrix. Contains fatty acids, omega-3, collagen. 3D structure with elastic properties. Available in fragmented, laminated, fenestrated, and mesh formats. Sterile, single-use, biodegradable.",
  },
  {
    id: 7,
    ft: 109011,
    category: "Hydrocolloid Dressing",
    spanishName: "Apósito hidrocoloide con efecto regulador",
    englishName: "Hydrocolloid Dressing with Regulating Effect, 15cm x 15cm",
    qty: 25200,
    specs: "Single-layer dressing with powdered components that absorb and regulate wound fluids. Semi-permeable polyurethane outer layer. Hydrocolloid contact layer (CMC, pectin, cellulose). Absorbent and breathable.",
  },
];

export const competitors: Competitor[] = [
  // Category 1 — Collagen-Alginate
  { category: 1, categoryName: "Collagen-Alginate Wound Dressing", company: "3M / Solventum", product: "FIBRACOL Plus", country: "USA", website: "solventum.com", fdaCleared: true, fdaDetail: "510(k) K982597", notes: "90% collagen / 10% calcium alginate. Original collagen-alginate combo. 4\"x4-3/8\" matches tender exactly.", isPrimaryMatch: true, isSingleSource: false },
  { category: 1, categoryName: "Collagen-Alginate Wound Dressing", company: "Human BioSciences", product: "Medifil II / SkinTemp II", country: "USA", website: "humanbiosciences.com", fdaCleared: true, fdaDetail: "Yes", notes: "Collagen wound dressings with alginate options.", isPrimaryMatch: false, isSingleSource: false },
  { category: 1, categoryName: "Collagen-Alginate Wound Dressing", company: "Safe n' Simple", product: "Simpurity Collagen Pad", country: "USA", website: "safensimple.com", fdaCleared: true, fdaDetail: "Yes", notes: "4\"x4\" collagen pad, cost-effective alternative.", isPrimaryMatch: false, isSingleSource: false },
  { category: 1, categoryName: "Collagen-Alginate Wound Dressing", company: "DermaRite Industries", product: "DermaCol/Ag Collagen", country: "USA", website: "dermarite.com", fdaCleared: true, fdaDetail: "Yes", notes: "Silver and non-silver collagen dressing options.", isPrimaryMatch: false, isSingleSource: false },
  { category: 1, categoryName: "Collagen-Alginate Wound Dressing", company: "Foryou Medical (LUOFUCON)", product: "Collagen Wound Dressing", country: "China", website: "foryoumedical.com", fdaCleared: true, fdaDetail: "510(k)", notes: "Lower-cost manufacturer with FDA clearance.", isPrimaryMatch: false, isSingleSource: false },

  // Category 2 — Nano Hemicellulose
  { category: 2, categoryName: "Nano Hemicellulose Membrane & Gel", company: "Genadyne Biotechnologies", product: "NanoGen Aktiv + Aktigel", country: "USA (NY)", website: "genadyne.com", fdaCleared: true, fdaDetail: "Yes", notes: "SOLE MANUFACTURER. Plant stem cells, nanotechnology, positively charged at physiological pH. Distributed in LatAm by Promedon & IGEA.", isPrimaryMatch: true, isSingleSource: true },

  // Category 3 — Collagen Matrix
  { category: 3, categoryName: "Lyophilized 3D Collagen Matrix", company: "MedSkin Solutions Dr. Suwelack", product: "MatriDerm", country: "Germany", website: "matriderm.com", fdaCleared: true, fdaDetail: "510(k) K201577", notes: "ONLY product with bovine collagen I, III, AND V in lyophilized 3D open-pore matrix. Used in 70+ countries.", isPrimaryMatch: true, isSingleSource: true },
  { category: 3, categoryName: "Lyophilized 3D Collagen Matrix", company: "Integra LifeSciences", product: "Integra Wound Matrix", country: "USA", website: "integralife.com", fdaCleared: true, fdaDetail: "Yes", notes: "Bovine collagen + GAG + silicone. Different composition — no types III/V. Market leader in skin substitutes.", isPrimaryMatch: false, isSingleSource: false },

  // Category 4 — Hydrogel Silver
  { category: 4, categoryName: "Hydrogel with Ionic Silver & CMC", company: "Medline Industries", product: "SilvaSorb Gel", country: "USA (IL)", website: "medline.com", fdaCleared: true, fdaDetail: "Yes", notes: "EXACT MATCH: ionic silver 0.024% + CMC 2.5%. All 4 tube sizes match. Microlattice silver technology.", isPrimaryMatch: true, isSingleSource: false },
  { category: 4, categoryName: "Hydrogel with Ionic Silver & CMC", company: "Cardinal Health", product: "Hydrogel Ag", country: "USA", website: "cardinalhealth.com", fdaCleared: true, fdaDetail: "Yes", notes: "Silver hydrogel alternative, different concentration.", isPrimaryMatch: false, isSingleSource: false },
  { category: 4, categoryName: "Hydrogel with Ionic Silver & CMC", company: "Integra LifeSciences", product: "MediHoney Ag Gel", country: "USA", website: "integralife.com", fdaCleared: true, fdaDetail: "Yes", notes: "Silver-based gel wound care options.", isPrimaryMatch: false, isSingleSource: false },

  // Category 5 — Foam Quadrilobe
  { category: 5, categoryName: "Hydrocellular Foam (Quadrilobed)", company: "Smith+Nephew", product: "ALLEVYN Life", country: "UK", website: "smith-nephew.com", fdaCleared: true, fdaDetail: "Yes", notes: "SOLE QUADRILOBE MANUFACTURER. 5-layer construction, visual change indicator, silicone adhesive.", isPrimaryMatch: true, isSingleSource: true },
  { category: 5, categoryName: "Hydrocellular Foam (Quadrilobed)", company: "Molnlycke Health Care", product: "Mepilex Border Flex", country: "Sweden", website: "molnlycke.com", fdaCleared: true, fdaDetail: "Yes", notes: "Flex-cut shape (not quadrilobe). Safetac silicone. Major competitor in foam category.", isPrimaryMatch: false, isSingleSource: false },
  { category: 5, categoryName: "Hydrocellular Foam (Quadrilobed)", company: "Coloplast", product: "Biatain Silicone", country: "Denmark", website: "coloplast.com", fdaCleared: true, fdaDetail: "Yes", notes: "Silicone foam dressing, square shape. 3DFit technology.", isPrimaryMatch: false, isSingleSource: false },
  { category: 5, categoryName: "Hydrocellular Foam (Quadrilobed)", company: "ConvaTec", product: "AQUACEL Foam Pro", country: "UK/USA", website: "convatec.com", fdaCleared: true, fdaDetail: "Yes", notes: "Hydrofiber + foam combo with silicone border. Not quadrilobe.", isPrimaryMatch: false, isSingleSource: false },

  // Category 6 — Fish Skin
  { category: 6, categoryName: "Acellular Fish Skin Matrix", company: "Kerecis (Coloplast)", product: "Kerecis Omega3 Wound", country: "Iceland / Denmark", website: "kerecis.com", fdaCleared: true, fdaDetail: "510(k) 2013", notes: "SOLE MANUFACTURER worldwide. Only acellular fish skin (Atlantic cod) matrix. Acquired by Coloplast for $1.3B in 2023.", isPrimaryMatch: true, isSingleSource: true },

  // Category 7 — Hydrocolloid
  { category: 7, categoryName: "Hydrocolloid Dressing", company: "ConvaTec", product: "DuoDERM Signal / Granuflex", country: "UK/USA", website: "convatec.com", fdaCleared: true, fdaDetail: "Yes", notes: "Invented hydrocolloid dressings. CGF technology. Visual change indicator. 15x15cm available.", isPrimaryMatch: true, isSingleSource: false },
  { category: 7, categoryName: "Hydrocolloid Dressing", company: "Coloplast", product: "Comfeel Plus", country: "Denmark", website: "coloplast.com", fdaCleared: true, fdaDetail: "Yes", notes: "CMC + alginate hydrocolloid. Multiple sizes.", isPrimaryMatch: false, isSingleSource: false },
  { category: 7, categoryName: "Hydrocolloid Dressing", company: "3M / Solventum", product: "Tegaderm Hydrocolloid", country: "USA", website: "solventum.com", fdaCleared: true, fdaDetail: "Yes", notes: "Thin and standard hydrocolloid options.", isPrimaryMatch: false, isSingleSource: false },
  { category: 7, categoryName: "Hydrocolloid Dressing", company: "Cardinal Health", product: "Kendall Hydrocolloid", country: "USA", website: "cardinalhealth.com", fdaCleared: true, fdaDetail: "Yes", notes: "Cost-effective hydrocolloid alternative.", isPrimaryMatch: false, isSingleSource: false },
];

export const categoryInsights: Record<number, { status: string; color: string; detail: string }> = {
  1: { status: "Competitive", color: "green", detail: "5+ manufacturers — most room for competitive bidding" },
  2: { status: "Single Source", color: "red", detail: "Genadyne is the ONLY manufacturer matching these specs" },
  3: { status: "Near Single Source", color: "orange", detail: "MatriDerm is the only collagen I/III/V matrix product" },
  4: { status: "Near Single Source", color: "orange", detail: "SilvaSorb exact match on silver %, CMC %, and all tube sizes" },
  5: { status: "Single Source", color: "red", detail: "ALLEVYN Life is the ONLY quadrilobe foam dressing" },
  6: { status: "Single Source", color: "red", detail: "Kerecis is the ONLY fish skin matrix manufacturer worldwide" },
  7: { status: "Competitive", color: "green", detail: "4+ manufacturers — standard hydrocolloid category" },
};
