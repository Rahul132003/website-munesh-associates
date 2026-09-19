export const site = {
  name: "Munesh Associates",
  legalName: "Munesh Associates Private Limited",
  tagline: "Design Your Dream Spaces",
  promise: "Building with Integrity and Excellence",
  description:
    "Architecture, structural design and turnkey construction across Delhi NCR. Over 20 years of residential, commercial and industrial projects delivered on time and to specification.",
  phones: ["+91 99999 49286", "+91 98999 33096", "+91 99997 33096"],
  email: "muneshassociates@gmail.com",
  whatsapp: "919999949286",
  address: {
    line1: "House No. A3, BPTP Park District 1",
    line2: "Sector 81, Faridabad",
    line3: "Haryana 121004, India",
  },
  hours: "Monday – Saturday, 9:30 AM – 6:30 PM",
} as const;

export const hero = {
  categories: ["Architecture", "Interiors", "Landscape", "Construction"],
  line1: "Spaces Designed",
  line2: "for Better Living",
  script: "Thoughtful Designs, Lasting Spaces",
  body: "From dream homes to inspiring commercial spaces, we craft sustainable, functional and timeless designs across Delhi NCR — for over twenty years.",
  image: "/images/site/hero-villa.jpg",
  imageAlt: "Contemporary villa at golden hour with timber screens and lit landscaping",
  video: "/images/site/hero-villa.mp4",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/career", label: "Career" },
  { href: "/client", label: "Client" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { value: 20, suffix: "+", label: "Years in practice" },
  { value: 450, suffix: "+", label: "Projects delivered" },
  { value: 12, suffix: "M", label: "Sq. ft. built" },
  { value: 98, suffix: "%", label: "On-time handover" },
];

export const services = [
  {
    slug: "residential",
    icon: "home",
    title: "Residential Construction",
    summary:
      "Villas, independent floors and group housing built to last — from the first concept sketch through to handover of a finished home.",
    detail:
      "We take residential work from site study and vaastu-aware planning through structural design, MEP coordination, finishing and landscaping. Every project runs on a fixed drawing set, a costed bill of quantities and a weekly site report, so families always know exactly what is being built and what it costs.",
    capabilities: [
      "Architectural & structural design",
      "Vaastu-compliant planning",
      "Turnkey villa construction",
      "Group housing towers",
      "Interior fit-out & finishing",
      "Landscape & external works",
    ],
    image: "/images/site/about-img-1.jpg",
  },
  {
    slug: "commercial",
    icon: "building",
    title: "Commercial Construction",
    summary:
      "Offices, retail, hotels and hospitals engineered for footfall, compliance and a long service life.",
    detail:
      "Commercial buildings have to satisfy tenants, inspectors and a board of directors at the same time. We handle statutory approvals, fire and accessibility compliance, façade engineering and high-load structural systems, and we phase the programme so revenue-generating floors can open before the whole block completes.",
    capabilities: [
      "Corporate office buildings",
      "Retail & mixed-use complexes",
      "Hospitals & healthcare",
      "Educational campuses",
      "Hotels & recreational spaces",
      "Statutory approvals & liaison",
    ],
    image: "/images/site/intro-video-bg.jpg",
  },
  {
    slug: "industrial",
    icon: "factory",
    title: "Industrial Construction",
    summary:
      "Factories, warehouses and pre-engineered structures designed around your process flow, not the other way round.",
    detail:
      "Industrial work starts with the machine layout. We design clear-span structures, heavy-duty flooring and utility routing around your production line, then build fast using pre-engineered steel systems so plants reach commissioning in the shortest viable programme.",
    capabilities: [
      "Pre-engineered steel buildings",
      "Factory & plant construction",
      "Warehousing & logistics parks",
      "Heavy-duty industrial flooring",
      "Utility & services routing",
      "Plant expansion & retrofit",
    ],
    image: "/images/site/industrial.jpg",
  },
];

/** The capability row that sits directly under the home page hero. */
export const capabilityStrip = [
  { icon: "home", title: "Residential", tagline: "Homes that inspire" },
  { icon: "building", title: "Commercial", tagline: "Spaces for business growth" },
  { icon: "landscape", title: "Landscape & Outdoor", tagline: "Nature in perfect balance" },
  { icon: "institutional", title: "Institutional", tagline: "Built for a better tomorrow" },
  { icon: "renovation", title: "Renovation & Interiors", tagline: "New life for existing spaces" },
];

/** Three category tiles in the home page "Our Work Speaks" block. */
export const workTiles = [
  {
    label: "Residential",
    href: "/projects",
    image: "/images/site/about-img-1.jpg",
    alt: "Residential project by Munesh Associates",
  },
  {
    label: "Commercial",
    href: "/projects",
    image: "/images/site/intro-video-bg.jpg",
    alt: "Commercial development by Munesh Associates",
  },
  {
    label: "Interiors",
    href: "/projects",
    image: "/images/site/faqs-image.jpg",
    alt: "Interior fit-out by Munesh Associates",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Consult & Site Study",
    body: "We visit the site, understand your brief and budget, and check statutory constraints before a single line is drawn.",
  },
  {
    step: "02",
    title: "Design & Approvals",
    body: "Concept drawings, 3D views and structural design, followed by sanction drawings and liaison with local authorities.",
  },
  {
    step: "03",
    title: "Costing & Scheduling",
    body: "A transparent bill of quantities and a dated construction programme, so there are no surprises mid-project.",
  },
  {
    step: "04",
    title: "Build & Handover",
    body: "Supervised execution with weekly progress reporting, quality checks at every stage, and a snag-free handover.",
  },
];

export const projectCategories = [
  "Commercial",
  "Hospital",
  "Education",
  "Group Housing",
  "Hotels & Recreational",
  "Villas",
  "Interiors",
  "Town Planning",
  "Affordable Housing",
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  scope: string;
  image: string;
};

// The first five carry Munesh Associates' own renders, taken from their site.
// The rest are stock stand-ins pending real photography for those categories.
export const projects: Project[] = [
  {
    slug: "omaxe-corporate-tower",
    title: "Omaxe Corporate Tower",
    category: "Commercial",
    location: "Greater Noida, UP",
    year: "2023",
    scope: "G+12 mixed-use tower with illuminated retail podium",
    image: "/images/site/intro-video-bg.jpg",
  },
  {
    slug: "heritage-villa-interiors",
    title: "Heritage Villa Interiors",
    category: "Interiors",
    location: "Vasant Kunj, New Delhi",
    year: "2023",
    scope: "Full residential interior and joinery package",
    image: "/images/site/faqs-image.jpg",
  },
  {
    slug: "vashisth-villa",
    title: "The Vashisth Villa",
    category: "Villas",
    location: "Sector 81, Faridabad",
    year: "2024",
    scope: "Private residence, 6,200 sq. ft. built-up",
    image: "/images/site/testimonial-img.jpg",
  },
  {
    slug: "riverside-apartments",
    title: "Riverside Apartments",
    category: "Group Housing",
    location: "Noida Extension, UP",
    year: "2022",
    scope: "Two towers, 180 units with club house",
    image: "/images/site/about-img-1.jpg",
  },
  {
    slug: "meridian-office-interiors",
    title: "Meridian Residences Interiors",
    category: "Interiors",
    location: "Nehru Place, New Delhi",
    year: "2022",
    scope: "Show-apartment interior and furniture package",
    image: "/images/site/about-img-2.jpg",
  },
  {
    slug: "adore-multispeciality-hospital",
    title: "Adore Multispeciality Hospital",
    category: "Hospital",
    location: "Faridabad, Haryana",
    year: "2022",
    scope: "180-bed facility with modular OT complex",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "shikhar-public-school",
    title: "Shikhar Public School",
    category: "Education",
    location: "Ballabgarh, Haryana",
    year: "2021",
    scope: "Academic block, auditorium and sports campus",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "greenfield-heights",
    title: "Greenfield Heights",
    category: "Group Housing",
    location: "Sector 86, Faridabad",
    year: "2024",
    scope: "Four residential towers, 320 apartments",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "aravalli-resort",
    title: "Aravalli Resort & Club",
    category: "Hotels & Recreational",
    location: "Gurugram, Haryana",
    year: "2023",
    scope: "Boutique resort with banquet and spa wing",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "new-sector-masterplan",
    title: "Sector 91 Master Plan",
    category: "Town Planning",
    location: "Faridabad, Haryana",
    year: "2020",
    scope: "112-acre township layout and services plan",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "awas-yojana-housing",
    title: "Awas Yojana Housing",
    category: "Affordable Housing",
    location: "Palwal, Haryana",
    year: "2021",
    scope: "480 units under PMAY scheme",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "crown-plaza-retail",
    title: "Crown Plaza Retail Block",
    category: "Commercial",
    location: "Sector 12, Faridabad",
    year: "2019",
    scope: "Mixed-use retail and office podium",
    image:
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1200&q=80",
  },
];

/** Category icons lifted from the firm's own project page. */
export const categoryIcons: Record<string, string> = {
  Commercial: "/images/category/Commercial.png",
  Hospital: "/images/category/Hospitality.png",
  Education: "/images/category/education.png",
  "Group Housing": "/images/category/group-housing.png",
  "Hotels & Recreational": "/images/category/hotels-recreational.png",
  Villas: "/images/category/villas.png",
  Interiors: "/images/category/interiors.png",
  "Town Planning": "/images/category/urbanism.png",
  "Affordable Housing": "/images/category/affordable-housing.png",
};

/** Candid photographs of the Faridabad studio, from the firm's own site. */
export const studioPhotos = [
  { src: "/images/site/company-1.jpg", alt: "Munesh Associates team in the Faridabad studio" },
  { src: "/images/site/company-2.jpg", alt: "Design review at the Munesh Associates office" },
  { src: "/images/site/company-3.jpg", alt: "The Munesh Associates studio interior" },
  { src: "/images/site/company-4.jpg", alt: "Meeting space at the Munesh Associates office" },
];

export type Client = { name: string; logo: string };

/** The client roster published on muneshassociates.com, with their logos
 *  cut from that site onto transparent backgrounds. */
export const clients: Client[] = [
  { name: "Omaxe", logo: "/images/clients/omaxe.png" },
  { name: "Adore Group", logo: "/images/clients/adore.png" },
  { name: "Vashisth", logo: "/images/clients/vashisth.png" },
  { name: "Whirlpool", logo: "/images/clients/whirlpool.png" },
  { name: "Golden Tulip Hotels", logo: "/images/clients/golden-tulip.png" },
  { name: "Forteasia", logo: "/images/clients/forteasia.png" },
  { name: "Forteasia Flower Valley", logo: "/images/clients/forteasia-flower-valley.png" },
  { name: "Auric", logo: "/images/clients/auric.png" },
  { name: "Sakshi Group of Companies", logo: "/images/clients/sakshi-group.png" },
  { name: "Raj Properties", logo: "/images/clients/raj-properties.png" },
  { name: "Primly Enterprises", logo: "/images/clients/primly-enterprises.png" },
  { name: "B.D. Public School", logo: "/images/clients/bd-public-school.png" },
  { name: "All Saints International School", logo: "/images/clients/all-saints-international-school.png" },
];

export const testimonials = [
  {
    quote:
      "Munesh Associates handled our corporate tower from sanction drawings to handover without a single programme slip. Their site reporting is the most disciplined we have worked with in NCR.",
    name: "Rajeev Malhotra",
    role: "Project Director, Omaxe Group",
  },
  {
    quote:
      "They understood that a hospital is a machine before it is a building. The services coordination on our Faridabad facility saved us months of rework.",
    name: "Dr. Anita Sehgal",
    role: "Managing Trustee, Adore Healthcare",
  },
  {
    quote:
      "We have built four projects with this team over eleven years. The costing is honest, the quality checks are real, and they answer the phone when it matters.",
    name: "Suresh Vashisth",
    role: "Partner, Vashisth Builders",
  },
];

export const milestones = [
  {
    year: "2003",
    title: "Practice founded in Faridabad",
    body: "Started as a two-person architectural practice taking on independent houses and small commercial plots across Faridabad.",
  },
  {
    year: "2009",
    title: "First group housing commission",
    body: "Expanded into multi-storey residential work, adding in-house structural design and site supervision teams.",
  },
  {
    year: "2014",
    title: "Incorporated as a private limited company",
    body: "Formalised as Munesh Associates Private Limited and began turnkey contracting alongside design services.",
  },
  {
    year: "2018",
    title: "Institutional & healthcare portfolio",
    body: "Delivered our first multispeciality hospital and school campus, building specialist MEP and compliance capability.",
  },
  {
    year: "2024",
    title: "450+ projects across Delhi NCR",
    body: "Now operating across Delhi, Faridabad, Gurugram, Noida and Greater Noida with industrial and township work in hand.",
  },
];

export const values = [
  {
    title: "Integrity in costing",
    body: "A transparent bill of quantities before work starts, and no silent variations after. What we quote is what you pay.",
  },
  {
    title: "Engineering first",
    body: "Every design is checked by our own structural team. Aesthetics never get ahead of what the structure can honestly carry.",
  },
  {
    title: "Programme discipline",
    body: "Dated construction schedules with weekly progress reporting, so slippage is visible early enough to be corrected.",
  },
  {
    title: "Built to outlast us",
    body: "Specification choices are made for a thirty-year horizon, not for the handover photograph.",
  },
];

export type Job = {
  title: string;
  type: string;
  location: string;
  experience: string;
  summary: string;
};

export const jobs: Job[] = [
  {
    title: "Senior Architect",
    type: "Full-time",
    location: "Faridabad, Haryana",
    experience: "6–10 years",
    summary:
      "Lead design development on group housing and institutional projects, from concept through to good-for-construction drawings.",
  },
  {
    title: "Structural Engineer",
    type: "Full-time",
    location: "Faridabad, Haryana",
    experience: "3–6 years",
    summary:
      "Design and check RCC and steel structures, coordinate with the architectural team and review site execution against drawings.",
  },
  {
    title: "Site Supervisor",
    type: "Full-time",
    location: "Delhi NCR (multiple sites)",
    experience: "2–5 years",
    summary:
      "Run day-to-day execution on site, manage labour and material flow, and file weekly progress and quality reports.",
  },
  {
    title: "Quantity Surveyor",
    type: "Full-time",
    location: "Faridabad, Haryana",
    experience: "3–7 years",
    summary:
      "Prepare bills of quantities, rate analysis and client billing; track variations and certify subcontractor payments.",
  },
  {
    title: "Interior Designer",
    type: "Full-time",
    location: "Faridabad, Haryana",
    experience: "2–5 years",
    summary:
      "Develop interior packages for residential and corporate fit-outs, including detailing, material selection and vendor coordination.",
  },
  {
    title: "Architectural Intern",
    type: "Internship",
    location: "Faridabad, Haryana",
    experience: "Students & fresh graduates",
    summary:
      "Six-month internship working alongside project architects on live drawing sets and site visits across NCR.",
  },
];

export const perks = [
  "Live project exposure from week one",
  "Structured mentoring from senior architects",
  "Site visits across Delhi NCR",
  "Licensed software and CPD support",
  "Performance-linked annual review",
  "Provident fund and medical cover",
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "cost-of-building-a-house-in-delhi-ncr",
    title: "What it actually costs to build a house in Delhi NCR in 2026",
    excerpt:
      "A line-by-line breakdown of civil, finishing and statutory costs per square foot — and where most homeowners underestimate their budget.",
    category: "Cost Planning",
    date: "2026-08-14",
    readTime: "8 min read",
    author: "Munesh Associates",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Most homeowners arrive at their first meeting with a number in mind, and that number is almost always the civil cost alone. Structure, brickwork and plaster are the visible part of a build, but they rarely account for more than half of what a finished house actually costs.",
      "In Delhi NCR through 2026, a standard-specification independent house lands somewhere between ₹1,750 and ₹2,400 per square foot of built-up area for civil and basic finishing. Premium finishes, imported fittings and structural glazing can push this well past ₹3,500.",
      "The categories people forget are the expensive ones: sanction and approval fees, boundary and foundation work on poor soil, external development, water and sewer connections, and the gap between a builder-grade fitting and the one you saw in a showroom.",
      "Our advice is simple. Ask for a bill of quantities before you sign anything. A contractor who cannot give you a costed BOQ at drawing stage does not yet know what your house costs either, and that uncertainty eventually becomes your variation bill.",
    ],
  },
  {
    slug: "vaastu-and-modern-architecture",
    title: "Reconciling vaastu with modern structural design",
    excerpt:
      "Where traditional vaastu principles and contemporary engineering genuinely conflict, and the planning moves that satisfy both.",
    category: "Design",
    date: "2026-07-02",
    readTime: "6 min read",
    author: "Munesh Associates",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Roughly four in five residential clients across NCR ask for a vaastu-compliant plan. A smaller number arrive with a consultant's sketch that, taken literally, would put a column in the middle of a living room.",
      "The genuine conflicts are narrow. Most vaastu guidance concerns orientation, entrance placement and the zoning of wet areas — none of which constrain a structural grid in any serious way when they are considered at concept stage.",
      "Problems appear when vaastu corrections are applied after the structural drawings are frozen. Moving a kitchen across the plan late in design usually means re-routing plumbing stacks through beams, which is both expensive and structurally unhelpful.",
      "The workable approach is to bring the vaastu consultant into the first design meeting, not the fifth. Orientation and zoning get resolved on a blank sheet, and the structure is then designed around a plan that everybody has already agreed to.",
    ],
  },
  {
    slug: "pre-engineered-buildings-for-factories",
    title: "Why pre-engineered steel is winning industrial projects",
    excerpt:
      "Programme, clear spans and future expansion: three reasons PEB has displaced conventional RCC for most NCR factory work.",
    category: "Industrial",
    date: "2026-05-28",
    readTime: "7 min read",
    author: "Munesh Associates",
    image: "/images/site/industrial.jpg",
    body: [
      "A decade ago a new factory shed in Haryana was assumed to be RCC framed. Today most of our industrial enquiries specify pre-engineered steel before we have said anything, and the reasoning is usually sound.",
      "The first reason is programme. A PEB structure is fabricated off site while foundations are cast, which routinely removes three to four months from a plant's commissioning date. For a manufacturer, that is months of production, not months of construction.",
      "The second is clear span. Moving a column out of a production hall is worth more than the steel it costs. PEB portal frames comfortably span 30 to 40 metres, which lets the machine layout dictate the building rather than the reverse.",
      "The third is expansion. Extending a PEB bay is a bolted connection and a few weeks of work. Extending an RCC frame means breaking into existing structure, which nobody enjoys explaining to a production manager.",
      "RCC still wins where fire loading, vibration or heavy overhead cranes dominate. But for general manufacturing and warehousing across NCR, steel is now the default and the burden of proof has shifted.",
    ],
  },
  {
    slug: "choosing-a-contractor-checklist",
    title: "Nine questions to ask before you appoint a contractor",
    excerpt:
      "A practical vetting checklist covering licences, BOQ transparency, site reporting and what a good payment schedule looks like.",
    category: "Client Guide",
    date: "2026-04-11",
    readTime: "5 min read",
    author: "Munesh Associates",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Appointing a contractor is the single decision that most determines whether a project finishes on budget. It is also the decision most often made on the basis of a lump-sum quotation and a friendly first meeting.",
      "Ask to see the registration and GST details, and ask which of the projects in the portfolio the firm actually executed rather than merely designed. Ask for the contact details of a client from three years ago, not three months ago — problems surface late.",
      "On commercials, insist on a costed bill of quantities, an explicit list of exclusions, and a written variation procedure. A payment schedule should be tied to measurable stage completions, never to calendar dates alone.",
      "Finally, ask what reporting you will receive and how often. A contractor who commits in writing to weekly progress reporting with photographs is a contractor who expects to be on programme.",
    ],
  },
  {
    slug: "green-building-norms-ncr",
    title: "Green building norms every NCR developer should plan for",
    excerpt:
      "Rainwater harvesting, solar readiness and the ECBC requirements that increasingly decide whether a commercial project gets its occupancy certificate.",
    category: "Compliance",
    date: "2026-03-05",
    readTime: "6 min read",
    author: "Munesh Associates",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Sustainability requirements in NCR have quietly moved from aspiration to condition of approval. Rainwater harvesting, waste segregation provision and solar readiness now appear in sanction conditions for most commercial plots above a threshold size.",
      "The Energy Conservation Building Code matters most for envelope and lighting design. Glazing specification, wall assembly U-values and lighting power density all need to be settled at design stage, because retrofitting a façade to pass a compliance check is not realistic.",
      "The practical implication for developers is that a green consultant belongs in the design team from the concept stage, alongside the architect and services engineer. Treated as a certification exercise at the end, it becomes expensive.",
      "Treated as a design input at the start, most of it costs very little — and a building that uses less energy is easier to lease, which is usually the argument that carries a board.",
    ],
  },
  {
    slug: "monsoon-construction-planning",
    title: "Planning a construction programme around the monsoon",
    excerpt:
      "Which activities genuinely stop when it rains, which do not, and how to sequence a build so July does not cost you a quarter.",
    category: "Site Management",
    date: "2026-02-19",
    readTime: "5 min read",
    author: "Munesh Associates",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Every NCR programme has to absorb roughly ten to twelve weeks of monsoon. The firms that finish on time are not the ones that work through it — they are the ones that sequenced for it in February.",
      "Excavation, foundation work and external finishing are the activities genuinely disrupted by heavy rain. Concreting can continue with proper protection, and anything internal — blockwork, plumbing rough-in, electrical conduiting, plaster, joinery — is barely affected once the structure is weather-tight.",
      "The planning move is therefore straightforward: get the frame and roof slab up before June, and load the monsoon months with internal work. Sites that reach a weather-tight envelope by the end of May tend to keep their handover date.",
      "The sites that lose a quarter are the ones still excavating in July, and that is a scheduling decision made months earlier, not bad luck.",
    ],
  },
];

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
