export const pipelineStages = [
  {
    step: '01',
    title: 'Check the Source',
    description: 'We inspect mining permits and make sure every mineral batch comes from legal, verified mines.',
  },
  {
    step: '02',
    title: 'Test the Quality',
    description: 'Independent labs test the metals using precision spectrometry and fire assays to certify exact purity.',
  },
  {
    step: '03',
    title: 'Get Export Permits',
    description: 'We handle all government paperwork with the mining ministry (MEMD) and tax authority (URA) for full customs clearance.',
  },
  {
    step: '04',
    title: 'Secure Transit & Storage',
    description: 'Your minerals move in insured armored transport and rest in secure, monitored vaults.',
  },
  {
    step: '05',
    title: 'Ship & Settle Payment',
    description: 'Safe air-freight shipping from Entebbe International Airport with secure bank escrow payments.',
  },
] as const;
