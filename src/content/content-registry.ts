export interface SoftwareEditorialContent {
  overview: string;
  features: string[];
  version: string;
  documentation: string;
  faqs: Array<{ question: string; answer: string }>;
}

export interface PublicationEditorialContent {
  journal?: string;
  abstract?: string;
  pdfUrl?: string;
}

export interface ResearchRelations {
  softwareSlugs: string[];
  courseCodes: string[];
}

export const pageDescriptions: Record<string, string> = {
  home: 'PS ChemLab provides chemistry lectures, academic software, publications, and computational chemistry research resources.',
  courses: 'Browse structured PS ChemLab chemistry courses and video lectures organized by chapter and topic.',
  videos: 'Search the PS ChemLab video library for lectures in physical and computational chemistry.',
  software: 'Download academic software developed for chemistry education, molecular exploration, and research.',
  research: 'Explore PS ChemLab research areas spanning structural biology, molecular simulation, membrane proteins, computational drug discovery, AI-assisted analysis, and chemistry education.',
  publications: 'Explore selected highly cited and recent scholarly contributions from PS ChemLab.',
  downloads: 'Download teaching materials and chemistry resources from PS ChemLab.',
  documentation: 'Read guides and reference documentation for PS ChemLab software and educational resources.',
  news: 'Read announcements and updates from PS ChemLab.',
  about: 'Learn about the PS ChemLab mission, educational philosophy, research, software, and academic leadership.',
};

const defaultSoftwareContent: SoftwareEditorialContent = {
  overview: 'This application is part of the PS ChemLab ecosystem of digital resources for chemistry education and research.',
  features: [
    'Supports chemistry education and research workflows',
    'Distributed through the maintained PS ChemLab software catalog',
    'Designed for use alongside PS ChemLab courses and documentation',
  ],
  version: 'Version information pending release verification',
  documentation: 'Installation, usage, and troubleshooting documentation is being prepared for publication.',
  faqs: [
    { question: 'How do I install this software?', answer: 'Download the application package and consult the documentation library for platform-specific installation guidance.' },
    { question: 'Where can I find system requirements?', answer: 'Verified system requirements will be included with the version and installation documentation.' },
    { question: 'How can I report a problem?', answer: 'Use the contact details on the About page and include the software name, platform, and a description of the issue.' },
  ],
};

export const softwareEditorial: Record<string, Partial<SoftwareEditorialContent>> = {
  'waste-track-explorer-android': {
    overview: 'Waste Track Explorer is a platform-specific PS ChemLab application distributed for Android devices.',
  },
  'waste-track-explorer-windows': {
    overview: 'Waste Track Explorer is a platform-specific PS ChemLab application distributed for Windows computers.',
  },
  'chemlearn-vsepr': {
    overview: 'ChemLearn VSEPR supports learning activities related to molecular geometry and VSEPR concepts.',
  },
  'chemlearnlab-geometry': {
    overview: 'ChemLearnLab Geometry supports interactive learning activities focused on molecular geometry.',
  },
  'chemlearnlab-crystal': {
    overview: 'ChemLearnLab Crystal supports chemistry learning activities involving crystal structures.',
  },
  'drug-molecule-explorer-windows': {
    overview: 'Drug Molecule Explorer is a Windows application for exploring molecular structures in a research context.',
  },
  'auto-protein-builder-2-0': {
    overview: 'AutoProteinBuilder prepares solvated protein systems for molecular dynamics simulations using guided desktop and browser interfaces around VMD, psfgen, CHARMM36 force-field data, and NAMD input generation.',
    version: 'Version 2.0.0 · Linux x86-64',
    features: [
      'Imports PDB structures, detects chains, and prepares monomer or multimer systems',
      'Centers, solvates, and ionizes systems with configurable padding, box geometry, salt concentration, and cation type',
      'Generates minimization, NVT, NPT, and segmented production inputs for NAMD',
    ],
    documentation: 'Requires 64-bit Linux, VMD available as “vmd” on PATH, and a separate NAMD installation. Debian/Ubuntu users can install the .deb package with “sudo apt install ./automd-protein-builder_2.0.0_amd64.deb”. The portable archive requires no administrator access: extract it, enter automd-protein-builder-2.0.0, then run ./bin/portable-desktop or ./bin/portable-web.',
    faqs: [
      { question: 'Which external programs are required?', answer: 'VMD must be installed and available as vmd on PATH. NAMD is installed separately to execute the generated simulation inputs.' },
      { question: 'How do I start the browser interface?', answer: 'Run automd-protein-builder-web from the installed package, or ./bin/portable-web from the extracted portable archive, then open http://127.0.0.1:8000.' },
      { question: 'Where are projects stored?', answer: 'The desktop defaults to ~/AutoMD-Projects. The installed web application defaults to ~/.local/share/automd-protein-builder/projects.' },
    ],
  },
  'autoagnpbuilder-1-1': {
    overview: 'AutoAgNPBuilder is a guided molecular-dynamics system preparation tool for building a silver nanoparticle, applying a ligand bond patch, conjugating and solvating the model, and producing NAMD input files.',
    version: 'Version 1.1.0 · Linux x86-64',
    features: [
      'Builds a validated icosahedral Ag147 nanoparticle model',
      'Guides ligand bond patching, conjugation, and solvation in a five-step workflow',
      'Produces NAMD inputs using bundled CHARMM-compatible force-field resources and an Ag147 + MAQ preset',
    ],
    documentation: 'Requires 64-bit Linux, Python 3.10 or newer, python3-venv, Tkinter for the desktop interface, and VMD on PATH for conjugation and solvation. After extracting the portable archive, run ./automd-agnp-builder for the browser interface at http://localhost:8501 or ./automd-agnp-desktop for the desktop interface. VMD and NAMD are not bundled.',
    faqs: [
      { question: 'How do I launch the interfaces?', answer: 'Run ./automd-agnp-builder for the browser interface or ./automd-agnp-desktop for the desktop interface from the extracted archive.' },
      { question: 'Does the package include VMD and NAMD?', answer: 'No. VMD must be available on PATH for conjugation and solvation, and NAMD must be installed separately.' },
      { question: 'Where are projects stored?', answer: 'Projects default to ~/.local/share/automd-agnp-builder/projects. Set AUTOMD_PROJECTS_DIR to override this location.' },
    ],
  },
};

export const getSoftwareEditorial = (slug: string): SoftwareEditorialContent => ({
  ...defaultSoftwareContent,
  ...softwareEditorial[slug],
  features: softwareEditorial[slug]?.features ?? defaultSoftwareContent.features,
  faqs: softwareEditorial[slug]?.faqs ?? defaultSoftwareContent.faqs,
});

export const publicationEditorial: Record<string, PublicationEditorialContent> = {};

export const researchRelations: Record<string, ResearchRelations> = {
  'molecular-modeling': {
    softwareSlugs: ['drug-molecule-explorer-windows'],
    courseCodes: ['2302338'],
  },
};

export const professorBiography =
  'Professor Pornthep Sompornpisut is the author and maintainer of PS ChemLab. The resources represented in this portal bring together chemistry education, computational tools, molecular modeling, and scholarly communication. A complete institutionally approved biography will be published before final public launch.';

export const collaborators: Array<{ name: string; affiliation: string; role: string }> = [];
