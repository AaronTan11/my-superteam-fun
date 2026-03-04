export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  lumaUrl?: string;
  isPast: boolean;
}

export const events: Event[] = [
  {
    id: "solana-hacker-house-kl-2026",
    title: "Solana Hacker House KL 2026",
    date: "2026-05-15T09:00:00+08:00",
    location: "WORQ Coworking, Kuala Lumpur",
    description:
      "A week-long intensive hacker house bringing together the best Solana builders in Southeast Asia. Build, collaborate, and ship projects with mentorship from core ecosystem teams.",
    lumaUrl: "https://lu.ma/superteammy-hackerhouse-kl-2026",
    isPast: false,
  },
  {
    id: "defi-workshop-cyberjaya",
    title: "DeFi on Solana: Hands-On Workshop",
    date: "2026-04-12T14:00:00+08:00",
    location: "Asia Pacific University, Cyberjaya",
    description:
      "Learn to build DeFi applications on Solana from scratch. This workshop covers token swaps, liquidity pools, and integrating with Jupiter and Raydium SDKs.",
    lumaUrl: "https://lu.ma/superteammy-defi-workshop",
    isPast: false,
  },
  {
    id: "superteam-demo-day-q2",
    title: "Superteam MY Demo Day Q2 2026",
    date: "2026-06-20T18:00:00+08:00",
    location: "The Co., Kuala Lumpur",
    description:
      "Quarterly showcase of the best projects built by Superteam Malaysia members. Watch live demos, provide feedback, and connect with builders shipping real products on Solana.",
    lumaUrl: "https://lu.ma/superteammy-demoday-q2-2026",
    isPast: false,
  },
  {
    id: "solana-penang-meetup",
    title: "Solana Builders Meetup Penang",
    date: "2026-03-08T15:00:00+08:00",
    location: "CAT Penang, George Town",
    description:
      "Monthly builder meetup in Penang. Network with local Solana developers, share project updates, and learn about the latest ecosystem developments.",
    lumaUrl: "https://lu.ma/superteammy-penang-mar2026",
    isPast: false,
  },
  {
    id: "rust-bootcamp-feb-2026",
    title: "Rust for Solana Bootcamp",
    date: "2026-02-22T10:00:00+08:00",
    location: "MaGIC Cyberjaya",
    description:
      "A two-day intensive bootcamp covering Rust fundamentals for Solana smart contract development. Perfect for developers transitioning from JavaScript or Python.",
    lumaUrl: "https://lu.ma/superteammy-rust-bootcamp",
    isPast: false,
  },
  {
    id: "superteam-meetup-jan-2026",
    title: "Superteam MY January Meetup",
    date: "2026-01-18T14:00:00+08:00",
    location: "Common Ground, Bukit Bintang, Kuala Lumpur",
    description:
      "Kicked off 2026 with our first community meetup of the year. Featured lightning talks on Solana Actions, Blinks, and token extensions by community members.",
    lumaUrl: "https://lu.ma/superteammy-jan2026",
    isPast: true,
  },
  {
    id: "breakpoint-watchparty-2025",
    title: "Solana Breakpoint 2025 Watch Party",
    date: "2025-11-22T20:00:00+08:00",
    location: "WeWork Mercu 2, Kuala Lumpur",
    description:
      "Gathered as a community to watch the Solana Breakpoint 2025 keynotes and announcements live. Discussed the latest protocol upgrades and ecosystem roadmap.",
    lumaUrl: "https://lu.ma/superteammy-breakpoint-2025",
    isPast: true,
  },
  {
    id: "jb-web3-workshop-2025",
    title: "Web3 Onboarding Workshop JB",
    date: "2025-10-05T10:00:00+08:00",
    location: "Iskandar Malaysia Studios, Johor Bahru",
    description:
      "Introductory workshop for newcomers to Web3 and the Solana ecosystem. Covered wallet setup, DeFi basics, and how to start contributing to Superteam bounties.",
    lumaUrl: "https://lu.ma/superteammy-jb-onboarding",
    isPast: true,
  },
  {
    id: "grizzlython-local-2025",
    title: "Superteam MY x Colosseum Hackathon",
    date: "2025-12-06T09:00:00+08:00",
    location: "MRANTI Park, Kuala Lumpur",
    description:
      "Local hackathon in partnership with Colosseum. Over 60 builders participated across DeFi, NFT infrastructure, and public goods tracks. Three teams received ecosystem grants.",
    lumaUrl: "https://lu.ma/superteammy-hackathon-2025",
    isPast: true,
  },
  {
    id: "nft-design-sprint-2025",
    title: "NFT Design Sprint: Art Meets Solana",
    date: "2025-09-14T13:00:00+08:00",
    location: "REXKL, Kuala Lumpur",
    description:
      "A creative design sprint exploring NFT art on Solana. Designers and artists collaborated to create collections using Metaplex, with talks on compressed NFTs and creator tools.",
    lumaUrl: "https://lu.ma/superteammy-nft-design",
    isPast: true,
  },
];
