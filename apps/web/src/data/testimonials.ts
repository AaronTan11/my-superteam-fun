export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  twitterHandle?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    text: "Superteam Malaysia gave me my first real opportunity in Web3. I went from knowing nothing about Solana to landing a full-time role as a smart contract developer within six months. The community support and mentorship here are unmatched.",
    author: "Haziq Ismail",
    role: "Rust Developer",
    twitterHandle: "haziq_rust",
  },
  {
    id: "testimonial-2",
    text: "As a designer, I was skeptical about finding my place in a crypto community. Superteam MY proved me wrong. I have worked on bounties for top Solana projects and connected with builders who truly value design as a core part of the product.",
    author: "Joey Wong",
    role: "UI/UX Designer",
    twitterHandle: "joeywong_design",
  },
  {
    id: "testimonial-3",
    text: "The hackathon organized by Superteam Malaysia was a turning point for our project. We got mentorship from ecosystem leaders, connected with potential investors, and ended up receiving a grant from the Solana Foundation. This community ships.",
    author: "Tan Wei Jian",
    role: "Senior Solana Developer, Helius Labs",
    twitterHandle: "weijian_dev",
  },
  {
    id: "testimonial-4",
    text: "I have been part of several Web3 communities across Southeast Asia, and Superteam Malaysia stands out for its focus on real output. People here are not just talking about building \u2014 they are actually shipping products, completing bounties, and growing the ecosystem.",
    author: "Priya Kumar",
    role: "Product Designer, Jupiter Exchange",
    twitterHandle: "priyakumar_ux",
  },
  {
    id: "testimonial-5",
    text: "Superteam MY is the reason I stayed in Web3. The welcoming community, regular meetups, and clear pathways to contribute made it easy to go from curious newcomer to active builder. If you are in Malaysia and interested in Solana, this is your tribe.",
    author: "Nurul Izzah",
    role: "Content Strategist",
  },
  {
    id: "testimonial-6",
    text: "Collaborating with Superteam Malaysia on our developer workshop was incredible. The local team understands the Malaysian tech scene deeply and helped us reach talented builders we would never have found on our own. Highly recommend partnering with them.",
    author: "Daniel Lim",
    role: "DevRel Lead, Helius",
    twitterHandle: "daniellim_dev",
  },
  {
    id: "testimonial-7",
    text: "The bounty system through Superteam Earn has been a game changer for me. I have completed over 15 bounties, built a strong portfolio of Solana projects, and earned meaningful income while learning cutting-edge technology. It is the best way to skill up in Web3.",
    author: "Arjun Nair",
    role: "Backend Engineer, Jito Labs",
  },
  {
    id: "testimonial-8",
    text: "What I love about Superteam Malaysia is that it is not just a developer community. As a marketer, I found meaningful work helping Solana projects with growth strategy and content. The diversity of skills here makes it a truly complete ecosystem.",
    author: "Farah Lim",
    role: "Growth Lead, Superteam Malaysia",
    twitterHandle: "farahlim_sol",
  },
];
