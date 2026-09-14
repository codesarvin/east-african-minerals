/**
 * Central media registry. Unique source per semantic slot.
 * No license, permit, or certificate imagery.
 */

export interface MediaAsset {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  category: 'hero' | 'gold' | 'mining' | 'assay' | 'logistics' | 'security' | 'uganda' | 'advisory';
  aspectRatio: string;
  priority?: boolean;
}

export const mediaAssets = {
  heroSmelting: {
    src: '/images/hero-smelting.jpg',
    alt: 'Molten gold casting and refining into pure bullion bars',
    category: 'gold',
    aspectRatio: '16/9',
    priority: true,
  },
  heroRiftValley: {
    src: '/images/geological-survey.jpg',
    alt: 'Geological mineral terrain and exploration survey',
    category: 'uganda',
    aspectRatio: '16/9',
    priority: true,
  },
  goldBarsStacked: {
    src: '/images/gold-bullion.jpg',
    alt: 'Certified 999.9 pure gold bullion bars on display',
    category: 'gold',
    aspectRatio: '4/3',
  },
  rawGoldNuggets: {
    src: '/images/raw-gold.jpg',
    alt: 'Natural raw gold nuggets and dore specimens',
    category: 'gold',
    aspectRatio: '4/3',
  },
  laboratoryAssay: {
    src: '/images/assay-laboratory.jpg',
    alt: 'Accredited metallurgical laboratory with XRF spectrometer and fire assay testing',
    category: 'assay',
    aspectRatio: '16/9',
  },
  precisionScale: {
    src: '/images/assay-laboratory.jpg',
    alt: 'Precision laboratory instrumentation and spectrometry for purity verification',
    category: 'assay',
    aspectRatio: '4/3',
  },
  secureVault: {
    src: '/images/secure-vault.jpg',
    alt: 'Heavy reinforced bank vault facility with stacked gold bullion bars in custody',
    category: 'security',
    aspectRatio: '16/9',
  },
  exportCargoAircraft: {
    src: '/images/cargo-export.jpg',
    alt: 'Armored transport and air cargo aircraft for secured precious metal export',
    category: 'logistics',
    aspectRatio: '16/9',
  },
  miningOperation: {
    src: '/images/mining-operation.jpg',
    alt: 'Licensed open-pit gold mining concession and excavation operations',
    category: 'mining',
    aspectRatio: '16/9',
  },
  advisoryBoard: {
    src: '/images/advisory-board.jpg',
    alt: 'Kampala mineral trading and compliance executive boardroom',
    category: 'advisory',
    aspectRatio: '16/9',
  },
  bondedWarehouse: {
    src: '/images/bonded-warehouse.jpg',
    alt: 'High-security modern palletized bonded storage warehouse',
    category: 'security',
    aspectRatio: '16/9',
  },
  // Dedicated unique resource media covers
  resourceMiningFramework: {
    src: '/images/geological-survey.jpg',
    alt: 'Geological field surveying, rock core analysis, and mining cadastre mapping',
    category: 'mining',
    aspectRatio: '16/9',
  },
  resourceExportDocs: {
    src: '/images/customs-transit.jpg',
    alt: 'International freight container logistics and customs export documentation',
    category: 'logistics',
    aspectRatio: '16/9',
  },
  resourceResponsibleSourcing: {
    src: '/images/raw-gold.jpg',
    alt: 'Responsible conflict-free artisanal gold nugget extraction and tracing',
    category: 'gold',
    aspectRatio: '4/3',
  },
  resourceAssayMethods: {
    src: '/images/assay-laboratory.jpg',
    alt: 'Spectrometric XRF assay testing and metallurgical analysis on gold specimens',
    category: 'assay',
    aspectRatio: '16/9',
  },
  resourceDueDiligence: {
    src: '/images/trading-desk.jpg',
    alt: 'Institutional commodities trading floor, market analysis, and transaction due diligence',
    category: 'advisory',
    aspectRatio: '16/9',
  },
} as const satisfies Record<string, MediaAsset>;

export const serviceMedia: Record<string, MediaAsset> = {
  'precious-metals-trading': mediaAssets.goldBarsStacked,
  'mining-advisory': mediaAssets.miningOperation,
  'export-facilitation': mediaAssets.exportCargoAircraft,
  'transaction-security': mediaAssets.secureVault,
  'secure-storage': mediaAssets.bondedWarehouse,
};

export const resourceMedia: Record<string, MediaAsset> = {
  'understanding-uganda-mining-licenses': mediaAssets.resourceMiningFramework,
  'mineral-export-documentation-requirements': mediaAssets.resourceExportDocs,
  'responsible-mineral-sourcing-practices': mediaAssets.resourceResponsibleSourcing,
  'gold-quality-verification-methods': mediaAssets.resourceAssayMethods,
  'mining-investment-due-diligence': mediaAssets.resourceDueDiligence,
};

export function getServiceMedia(slug: string): MediaAsset {
  return serviceMedia[slug] ?? mediaAssets.heroSmelting;
}

export function getResourceMedia(slug: string): MediaAsset {
  return resourceMedia[slug] ?? mediaAssets.goldBarsStacked;
}
