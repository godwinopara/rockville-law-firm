export type PracticeArea = {
  number: string;
  slug: string;
  title: string;
  description: string;
  summary: string;
  overview: string;
  matters: string[];
  approach: string;
  image: { src: string; alt: string; sourceUrl: string };
};
export type OnlineServiceGroup = { title: string; intro: string; services: string[] };

export const contactDetails = {
  phonePrimary: "+234(0)803 306 4300",
  phoneSecondary: "+234(0)803 461 6281",
  address: "77, AWOLOWO RD, IKOYI, LAGOS STATE",
  email: "info@rockvillelp.com",
};

export const primaryNavigation = [
  { label: "Home", href: "/" }, { label: "About", href: "/about" },
  { label: "Services", href: "/services" }, { label: "Our team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export const practiceAreas: PracticeArea[] = [
  {
    number: "01",
    slug: "company-secretary-compliance",
    title: "Company Secretary / Compliance",
    description: "Governance support and compliance guidance for organisations navigating evolving obligations.",
    summary: "Structured governance and compliance support that helps organisations maintain clear records, processes, and statutory responsibilities.",
    overview: "Company secretarial and compliance work supports the legal foundations on which organisations operate. It brings structure to governance, reporting, decision-making, and the records that demonstrate how corporate responsibilities are being managed.",
    matters: ["Governance frameworks", "Statutory filings", "Board and shareholder records", "Ongoing compliance support"],
    approach: "We approach governance work with close attention to accuracy, timing, and organisational context, helping clients understand their responsibilities and establish practical systems for meeting them.",
    image: { src: "/images/practice-areas/company-secretary-compliance.jpg", alt: "Modern business office interior", sourceUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72" },
  },
  {
    number: "02",
    slug: "intellectual-property-law",
    title: "Intellectual Property Law",
    description: "Protection, registration, and strategic management of ideas, brands, creative work, and innovation.",
    summary: "Practical legal guidance for identifying, protecting, registering, and managing the intellectual assets behind brands and innovation.",
    overview: "Intellectual property law helps individuals and organisations protect the value created through names, designs, inventions, and original work. Clear advice at the right stage can support registration, commercial use, enforcement, and informed decision-making.",
    matters: ["Trade mark applications", "Patent applications", "Industrial designs", "Copyright guidance"],
    approach: "We begin by understanding the asset, how it is used, and the client’s commercial priorities before identifying a proportionate path for protection, registration, management, or dispute prevention.",
    image: { src: "/images/practice-areas/intellectual-property-law.jpg", alt: "Technology hardware in a modern workspace", sourceUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
  },
  {
    number: "03",
    slug: "real-estate-property-law",
    title: "Real Estate / Property Law",
    description: "Clear legal guidance across property interests, transactions, documentation, and related matters.",
    summary: "Considered property counsel for transactions, ownership interests, leases, documentation, development concerns, and related disputes.",
    overview: "Property decisions often involve significant value, layered documentation, and competing interests. Legal review helps clarify title, obligations, transaction terms, and the practical consequences of acquiring, using, developing, leasing, or disposing of property.",
    matters: ["Property transactions", "Leases and tenancies", "Title review", "Property-related disputes"],
    approach: "We examine the documents, interests, and commercial context surrounding each property matter, explain material concerns plainly, and help clients move through each stage with a clearer understanding of risk.",
    image: { src: "/images/practice-areas/real-estate-property-law.jpg", alt: "Contemporary commercial building exterior", sourceUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
  },
  {
    number: "04",
    slug: "corporate-law",
    title: "Corporate Law",
    description: "Commercially aware advice for the structures, agreements, and decisions behind business activity.",
    summary: "Commercially grounded legal support for business structures, corporate relationships, transactions, governance, and continuing operations.",
    overview: "Corporate law shapes how a business is formed, governed, financed, reorganised, and brought into commercial relationships. Well-considered structures and agreements can create clearer responsibilities and support better-informed business decisions.",
    matters: ["Business structures", "Commercial agreements", "Corporate governance", "Transactions and reorganisations"],
    approach: "We consider both the legal position and the business objective, translating technical requirements into clear options and documentation that reflects the transaction, relationship, or decision under review.",
    image: { src: "/images/practice-areas/corporate-law.jpg", alt: "Colleagues collaborating in an office", sourceUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36" },
  },
  {
    number: "05",
    slug: "due-diligence",
    title: "Due Diligence",
    description: "Focused legal review that helps clients understand material risks before committing to a decision.",
    summary: "Focused investigation and legal review designed to identify material issues before a transaction, investment, or commercial commitment.",
    overview: "Due diligence brings relevant legal information into view before a significant decision is made. The process may examine ownership, obligations, contracts, approvals, disputes, and other records that could affect value, control, or future exposure.",
    matters: ["Corporate records", "Material contracts", "Property interests", "Legal risk review"],
    approach: "We define the scope around the proposed decision, review available information methodically, distinguish material concerns from background detail, and present findings in clear, decision-useful language.",
    image: { src: "/images/practice-areas/due-diligence.jpg", alt: "Documents and written notes on a desk", sourceUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85" },
  },
  {
    number: "06",
    slug: "litigation",
    title: "Litigation",
    description: "Strategic representation for disputes that require careful preparation and determined advocacy.",
    summary: "Structured dispute strategy and court representation for clients facing claims, enforcement questions, or contested legal positions.",
    overview: "Litigation requires a clear understanding of the facts, the applicable law, the available remedies, and the practical cost of each course. Early assessment can help clients evaluate exposure, preserve their position, and choose an appropriate strategy.",
    matters: ["Pre-action assessment", "Case strategy", "Court representation", "Settlement evaluation"],
    approach: "We prepare each matter carefully, communicate the available options and procedural realities directly, and align advocacy with the client’s wider priorities throughout the life of the dispute.",
    image: { src: "/images/practice-areas/litigation.jpg", alt: "Professional in a formal office setting", sourceUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a" },
  },
  {
    number: "07",
    slug: "legal-opinion",
    title: "Legal Opinion",
    description: "Considered analysis that translates complex legal questions into clear, usable direction.",
    summary: "Carefully reasoned legal analysis for organisations and individuals who need clarity on a specific question, risk, or proposed course.",
    overview: "A legal opinion examines a defined issue through the relevant facts, documents, and legal framework. It can support transactions, governance decisions, dispute strategy, regulatory understanding, and other situations where a defensible legal position is needed.",
    matters: ["Regulatory interpretation", "Contractual questions", "Transaction support", "Risk analysis"],
    approach: "We establish the precise question, review the relevant materials and authorities, identify qualifications, and present the reasoning and conclusions in language the intended decision-makers can use.",
    image: { src: "/images/practice-areas/legal-opinion.jpg", alt: "Handwriting a considered note", sourceUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a" },
  },
  {
    number: "08",
    slug: "general-counsel",
    title: "General Counsel",
    description: "Ongoing legal perspective for organisations that need dependable counsel close to the business.",
    summary: "Continuing legal support for organisations that benefit from accessible counsel familiar with their operations, priorities, and risk environment.",
    overview: "General counsel support gives a business an ongoing legal perspective across recurring decisions, contracts, governance, and emerging concerns. It can help legal questions be addressed earlier and with a stronger understanding of operational context.",
    matters: ["Day-to-day legal guidance", "Contract review", "Governance support", "Risk and compliance coordination"],
    approach: "We work to understand how the organisation operates, provide proportionate advice for the issue at hand, and maintain enough continuity to connect individual instructions with broader business priorities.",
    image: { src: "/images/practice-areas/general-counsel.jpg", alt: "Business meeting in a modern office", sourceUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72" },
  },
  {
    number: "09",
    slug: "debt-recovery-restructuring",
    title: "Debt Recovery / Restructuring Services",
    description: "Practical support for recovery, negotiation, and restructuring with commercial context in view.",
    summary: "Commercially considered support for assessing debt positions, pursuing recovery, negotiating repayment, and documenting restructuring arrangements.",
    overview: "Debt matters require an understanding of the underlying obligation, available security, the parties’ positions, and the realistic paths to recovery or reorganisation. A structured legal approach can clarify options and support informed negotiations.",
    matters: ["Debt assessment", "Recovery strategy", "Negotiated repayment", "Restructuring documentation"],
    approach: "We review the legal and commercial position, identify proportionate recovery or restructuring options, and support communication and documentation with attention to both enforceability and practical outcomes.",
    image: { src: "/images/practice-areas/debt-recovery-restructuring.jpg", alt: "Financial documents and calculation", sourceUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f" },
  },
  {
    number: "10",
    slug: "alternative-dispute-resolution",
    title: "Alternative Dispute Resolution",
    description: "Constructive approaches to resolving conflict through negotiation, mediation, and arbitration.",
    summary: "Strategic support for resolving disputes outside conventional court proceedings through negotiation, mediation, arbitration, and settlement.",
    overview: "Alternative dispute resolution offers structured ways to address conflict while considering privacy, time, cost, commercial relationships, and the need for a workable outcome. The appropriate process depends on the dispute and the parties involved.",
    matters: ["Negotiation", "Mediation", "Arbitration", "Settlement documentation"],
    approach: "We assess the dispute, the relationship between the parties, and the available forums before helping clients prepare a clear position and participate in a process suited to the circumstances.",
    image: { src: "/images/practice-areas/alternative-dispute-resolution.jpg", alt: "Colleagues reaching an agreement", sourceUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216" },
  },
];

export function getPracticeAreaBySlug(slug: string) {
  return practiceAreas.find((area) => area.slug === slug);
}

export function getRelatedPracticeAreas(slug: string, count = 3) {
  const index = practiceAreas.findIndex((area) => area.slug === slug);
  if (index < 0) return [];
  return Array.from({ length: Math.min(count, practiceAreas.length - 1) }, (_, offset) => practiceAreas[(index + offset + 1) % practiceAreas.length]);
}

export const coreValues = ["Professionalism", "Respect", "Efficiency", "Practicality", "Sincerity"];
export const homeAboutVisual = {
  src: "/images/home-about-legal-office.jpg",
  alt: "Legal professionals meeting in an office",
  sourceUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
} as const;

export const processSteps = [
  { number: "01", title: "Initial consultation", body: "We begin by listening carefully, reviewing the matter, and understanding the outcome you need to work toward." },
  { number: "02", title: "Matter assessment", body: "We consider the facts, documents, relevant legal framework, and practical context to clarify the position." },
  { number: "03", title: "Tailored strategy", body: "We identify clear options and develop a considered approach shaped around the matter and your priorities." },
  { number: "04", title: "Representation & resolution", body: "We provide focused guidance and representation through negotiation, alternative dispute resolution, or litigation where required." },
] as const;

export const teamMembers = [
  { name: "Rufus C. Okoli", role: "Founder & Principal Partner", summary: "An experienced legal practitioner with a practice spanning advocacy, commercial planning, negotiation, real estate, corporate, commercial, and maritime law." },
  { name: "Ngozi R. Okoli", role: "Partner", summary: "A seasoned legal practitioner whose work includes corporate and commercial law, intellectual property, property law, and company secretarial practice." },
  { name: "Dr. Nosike Agokei", role: "Consultant", summary: "A solicitor and advocate of the Supreme Court of Nigeria with experience across private and public sectors in Nigeria and the United Kingdom." },
] as const;

export const faqItems = [
  { question: "How do I begin a conversation with Rockville LP?", answer: "Contact the firm by phone or email to introduce your matter. The team can then discuss the next appropriate step for engaging counsel." },
  { question: "What areas of law does Rockville LP cover?", answer: "Rockville LP provides legal advisory, company secretarial, regulatory compliance, intellectual property, property, litigation, due diligence, corporate, and debt recovery or restructuring services." },
  { question: "Can Rockville LP assist with property matters?", answer: "Yes. The firm’s practice includes real estate and property law, including property transactions, documentation, title review, leases, and related disputes." },
  { question: "Does the firm support businesses with corporate and compliance matters?", answer: "Yes. Rockville LP supports corporate law, company secretarial work, governance, regulatory compliance, due diligence, and related commercial matters." },
  { question: "Can Rockville LP help resolve a dispute without going to court?", answer: "The firm supports negotiation, mediation, arbitration, settlement, and litigation. The appropriate route depends on the matter and the parties involved." },
  { question: "What should I expect when engaging the firm?", answer: "Rockville LP approaches each mandate with a careful assessment of the legal and business context, clear communication, and a considered strategy for the matter at hand." },
] as const;

export const onlineServiceGroups: OnlineServiceGroup[] = [
  { title: "Intellectual property", intro: "Protect and progress your ideas.", services: ["Trade Mark Applications", "Patent Applications", "Industrial Design", "Copyright"] },
  { title: "Simple legal documents", intro: "Start with the documents your arrangement needs.", services: ["Tenancy Agreement", "Hire Purchase Agreement", "Partnership Agreement"] },
];
