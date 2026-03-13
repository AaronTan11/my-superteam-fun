import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../../apps/web/.env") });

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { member } from "./schema/members";
import { event } from "./schema/events";
import { partner } from "./schema/partners";
import { testimonial } from "./schema/testimonials";
import { faqItem } from "./schema/faq";
import { stat } from "./schema/stats";
import { user, account } from "./schema/auth";
import { randomUUID } from "crypto";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle({ client: pool });

async function seed() {
  console.log("Seeding database...");

  // Seed members
  const membersData = [
    { id: "amir-razak", name: "Amir Razak", title: "Country Lead", company: "Superteam Malaysia", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=amir-razak", skills: ["Core Team", "Growth", "Community"], twitterHandle: "amirrazak_sol", isFeatured: true, achievements: ["Core Contributor", "Grants Recipient"], sortOrder: 0 },
    { id: "siti-nurhaliza", name: "Siti Aminah", title: "Community Lead", company: "Superteam Malaysia", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=siti-nurhaliza", skills: ["Core Team", "Community", "Content"], twitterHandle: "sitiaminah_web3", isFeatured: true, achievements: ["Core Contributor"], sortOrder: 1 },
    { id: "wei-jian", name: "Tan Wei Jian", title: "Senior Solana Developer", company: "Helius Labs", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=wei-jian", skills: ["Rust", "Backend", "Frontend"], twitterHandle: "weijian_dev", isFeatured: true, achievements: ["Hackathon Winner", "Grants Recipient"], sortOrder: 2 },
    { id: "priya-kumar", name: "Priya Kumar", title: "Product Designer", company: "Jupiter Exchange", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=priya-kumar", skills: ["Design", "Product", "Frontend"], twitterHandle: "priyakumar_ux", isFeatured: true, achievements: ["Hackathon Winner"], sortOrder: 3 },
    { id: "danish-hakim", name: "Danish Hakim", title: "Full Stack Developer", company: "Tensor", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=danish-hakim", skills: ["Frontend", "Backend", "Rust"], isFeatured: true, achievements: ["Grants Recipient"], sortOrder: 4 },
    { id: "farah-lim", name: "Farah Lim", title: "Growth Lead", company: "Superteam Malaysia", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=farah-lim", skills: ["Core Team", "Growth", "Content"], twitterHandle: "farahlim_sol", isFeatured: true, achievements: ["Core Contributor"], sortOrder: 5 },
    { id: "raj-venugopal", name: "Raj Venugopal", title: "Smart Contract Engineer", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=raj-venugopal", skills: ["Rust", "Backend"], twitterHandle: "raj_soldev", isFeatured: false, achievements: ["Hackathon Winner", "Grants Recipient"], sortOrder: 6 },
    { id: "nurul-izzah", name: "Nurul Izzah", title: "Content Strategist", company: "Superteam Malaysia", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=nurul-izzah", skills: ["Content", "Community", "Growth"], isFeatured: false, sortOrder: 7 },
    { id: "chen-li-wei", name: "Chen Li Wei", title: "DeFi Protocol Developer", company: "Drift Protocol", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=chen-li-wei", skills: ["Rust", "Backend", "Product"], twitterHandle: "liwei_defi", isFeatured: false, achievements: ["Core Contributor", "Hackathon Winner"], sortOrder: 8 },
    { id: "aisyah-rahman", name: "Aisyah Rahman", title: "Frontend Developer", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=aisyah-rahman", skills: ["Frontend", "Design"], isFeatured: false, sortOrder: 9 },
    { id: "harvin-singh", name: "Harvin Singh", title: "Product Manager", company: "Magic Eden", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=harvin-singh", skills: ["Product", "Growth", "Community"], twitterHandle: "harvin_pm", isFeatured: false, achievements: ["Grants Recipient"], sortOrder: 10 },
    { id: "joey-wong", name: "Joey Wong", title: "UI/UX Designer", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=joey-wong", skills: ["Design", "Frontend", "Product"], twitterHandle: "joeywong_design", isFeatured: false, sortOrder: 11 },
    { id: "haziq-ismail", name: "Haziq Ismail", title: "Rust Developer", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=haziq-ismail", skills: ["Rust", "Backend"], isFeatured: false, achievements: ["Hackathon Winner"], sortOrder: 12 },
    { id: "mei-ling-tan", name: "Mei Ling Tan", title: "Community Manager", company: "Superteam Malaysia", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=mei-ling-tan", skills: ["Community", "Content", "Growth"], twitterHandle: "meiling_stmy", isFeatured: false, sortOrder: 13 },
    { id: "arjun-nair", name: "Arjun Nair", title: "Backend Engineer", company: "Jito Labs", photo: "https://api.dicebear.com/9.x/notionists/svg?seed=arjun-nair", skills: ["Backend", "Rust", "Product"], isFeatured: false, achievements: ["Grants Recipient"], sortOrder: 14 },
  ];
  await db.insert(member).values(membersData).onConflictDoNothing();
  console.log(`  ✓ ${membersData.length} members`);

  // Seed events
  const eventsData = [
    { id: "solana-hacker-house-kl-2026", title: "Solana Hacker House KL 2026", date: new Date("2026-05-15T09:00:00+08:00"), location: "WORQ Coworking, Kuala Lumpur", description: "A week-long intensive hacker house bringing together the best Solana builders in Southeast Asia. Build, collaborate, and ship projects with mentorship from core ecosystem teams.", lumaUrl: "https://lu.ma/superteammy-hackerhouse-kl-2026", isPast: false, sortOrder: 0 },
    { id: "defi-workshop-cyberjaya", title: "DeFi on Solana: Hands-On Workshop", date: new Date("2026-04-12T14:00:00+08:00"), location: "Asia Pacific University, Cyberjaya", description: "Learn to build DeFi applications on Solana from scratch. This workshop covers token swaps, liquidity pools, and integrating with Jupiter and Raydium SDKs.", lumaUrl: "https://lu.ma/superteammy-defi-workshop", isPast: false, sortOrder: 1 },
    { id: "superteam-demo-day-q2", title: "Superteam MY Demo Day Q2 2026", date: new Date("2026-06-20T18:00:00+08:00"), location: "The Co., Kuala Lumpur", description: "Quarterly showcase of the best projects built by Superteam Malaysia members. Watch live demos, provide feedback, and connect with builders shipping real products on Solana.", lumaUrl: "https://lu.ma/superteammy-demoday-q2-2026", isPast: false, sortOrder: 2 },
    { id: "solana-penang-meetup", title: "Solana Builders Meetup Penang", date: new Date("2026-03-08T15:00:00+08:00"), location: "CAT Penang, George Town", description: "Monthly builder meetup in Penang. Network with local Solana developers, share project updates, and learn about the latest ecosystem developments.", lumaUrl: "https://lu.ma/superteammy-penang-mar2026", isPast: false, sortOrder: 3 },
    { id: "rust-bootcamp-feb-2026", title: "Rust for Solana Bootcamp", date: new Date("2026-02-22T10:00:00+08:00"), location: "MaGIC Cyberjaya", description: "A two-day intensive bootcamp covering Rust fundamentals for Solana smart contract development. Perfect for developers transitioning from JavaScript or Python.", lumaUrl: "https://lu.ma/superteammy-rust-bootcamp", isPast: false, sortOrder: 4 },
    { id: "superteam-meetup-jan-2026", title: "Superteam MY January Meetup", date: new Date("2026-01-18T14:00:00+08:00"), location: "Common Ground, Bukit Bintang, Kuala Lumpur", description: "Kicked off 2026 with our first community meetup of the year. Featured lightning talks on Solana Actions, Blinks, and token extensions by community members.", lumaUrl: "https://lu.ma/superteammy-jan2026", isPast: true, sortOrder: 5 },
    { id: "breakpoint-watchparty-2025", title: "Solana Breakpoint 2025 Watch Party", date: new Date("2025-11-22T20:00:00+08:00"), location: "WeWork Mercu 2, Kuala Lumpur", description: "Gathered as a community to watch the Solana Breakpoint 2025 keynotes and announcements live. Discussed the latest protocol upgrades and ecosystem roadmap.", lumaUrl: "https://lu.ma/superteammy-breakpoint-2025", isPast: true, sortOrder: 6 },
    { id: "jb-web3-workshop-2025", title: "Web3 Onboarding Workshop JB", date: new Date("2025-10-05T10:00:00+08:00"), location: "Iskandar Malaysia Studios, Johor Bahru", description: "Introductory workshop for newcomers to Web3 and the Solana ecosystem. Covered wallet setup, DeFi basics, and how to start contributing to Superteam bounties.", lumaUrl: "https://lu.ma/superteammy-jb-onboarding", isPast: true, sortOrder: 7 },
    { id: "grizzlython-local-2025", title: "Superteam MY x Colosseum Hackathon", date: new Date("2025-12-06T09:00:00+08:00"), location: "MRANTI Park, Kuala Lumpur", description: "Local hackathon in partnership with Colosseum. Over 60 builders participated across DeFi, NFT infrastructure, and public goods tracks. Three teams received ecosystem grants.", lumaUrl: "https://lu.ma/superteammy-hackathon-2025", isPast: true, sortOrder: 8 },
    { id: "nft-design-sprint-2025", title: "NFT Design Sprint: Art Meets Solana", date: new Date("2025-09-14T13:00:00+08:00"), location: "REXKL, Kuala Lumpur", description: "A creative design sprint exploring NFT art on Solana. Designers and artists collaborated to create collections using Metaplex, with talks on compressed NFTs and creator tools.", lumaUrl: "https://lu.ma/superteammy-nft-design", isPast: true, sortOrder: 9 },
  ];
  await db.insert(event).values(eventsData).onConflictDoNothing();
  console.log(`  ✓ ${eventsData.length} events`);

  // Seed partners
  const partnersData = [
    { id: "solana-foundation", name: "Solana Foundation", logoUrl: "", websiteUrl: "https://solana.org", sortOrder: 0 },
    { id: "phantom", name: "Phantom", logoUrl: "", websiteUrl: "https://phantom.app", sortOrder: 1 },
    { id: "jupiter", name: "Jupiter", logoUrl: "", websiteUrl: "https://jup.ag", sortOrder: 2 },
    { id: "marinade", name: "Marinade Finance", logoUrl: "", websiteUrl: "https://marinade.finance", sortOrder: 3 },
    { id: "helius", name: "Helius", logoUrl: "", websiteUrl: "https://helius.dev", sortOrder: 4 },
    { id: "magic-eden", name: "Magic Eden", logoUrl: "", websiteUrl: "https://magiceden.io", sortOrder: 5 },
    { id: "tensor", name: "Tensor", logoUrl: "", websiteUrl: "https://tensor.trade", sortOrder: 6 },
    { id: "jito", name: "Jito", logoUrl: "", websiteUrl: "https://jito.network", sortOrder: 7 },
    { id: "drift", name: "Drift Protocol", logoUrl: "", websiteUrl: "https://drift.trade", sortOrder: 8 },
    { id: "raydium", name: "Raydium", logoUrl: "", websiteUrl: "https://raydium.io", sortOrder: 9 },
    { id: "orca", name: "Orca", logoUrl: "", websiteUrl: "https://orca.so", sortOrder: 10 },
    { id: "metaplex", name: "Metaplex", logoUrl: "", websiteUrl: "https://metaplex.com", sortOrder: 11 },
  ];
  await db.insert(partner).values(partnersData).onConflictDoNothing();
  console.log(`  ✓ ${partnersData.length} partners`);

  // Seed testimonials
  const testimonialsData = [
    { id: "testimonial-1", text: "Superteam Malaysia gave me my first real opportunity in Web3. I went from knowing nothing about Solana to landing a full-time role as a smart contract developer within six months. The community support and mentorship here are unmatched.", author: "Haziq Ismail", role: "Rust Developer", twitterHandle: "haziq_rust", sortOrder: 0 },
    { id: "testimonial-2", text: "As a designer, I was skeptical about finding my place in a crypto community. Superteam MY proved me wrong. I have worked on bounties for top Solana projects and connected with builders who truly value design as a core part of the product.", author: "Joey Wong", role: "UI/UX Designer", twitterHandle: "joeywong_design", sortOrder: 1 },
    { id: "testimonial-3", text: "The hackathon organized by Superteam Malaysia was a turning point for our project. We got mentorship from ecosystem leaders, connected with potential investors, and ended up receiving a grant from the Solana Foundation. This community ships.", author: "Tan Wei Jian", role: "Senior Solana Developer, Helius Labs", twitterHandle: "weijian_dev", sortOrder: 2 },
    { id: "testimonial-4", text: "I have been part of several Web3 communities across Southeast Asia, and Superteam Malaysia stands out for its focus on real output. People here are not just talking about building \u2014 they are actually shipping products, completing bounties, and growing the ecosystem.", author: "Priya Kumar", role: "Product Designer, Jupiter Exchange", twitterHandle: "priyakumar_ux", sortOrder: 3 },
    { id: "testimonial-5", text: "Superteam MY is the reason I stayed in Web3. The welcoming community, regular meetups, and clear pathways to contribute made it easy to go from curious newcomer to active builder. If you are in Malaysia and interested in Solana, this is your tribe.", author: "Nurul Izzah", role: "Content Strategist", sortOrder: 4 },
    { id: "testimonial-6", text: "Collaborating with Superteam Malaysia on our developer workshop was incredible. The local team understands the Malaysian tech scene deeply and helped us reach talented builders we would never have found on our own. Highly recommend partnering with them.", author: "Daniel Lim", role: "DevRel Lead, Helius", twitterHandle: "daniellim_dev", sortOrder: 5 },
    { id: "testimonial-7", text: "The bounty system through Superteam Earn has been a game changer for me. I have completed over 15 bounties, built a strong portfolio of Solana projects, and earned meaningful income while learning cutting-edge technology. It is the best way to skill up in Web3.", author: "Arjun Nair", role: "Backend Engineer, Jito Labs", sortOrder: 6 },
    { id: "testimonial-8", text: "What I love about Superteam Malaysia is that it is not just a developer community. As a marketer, I found meaningful work helping Solana projects with growth strategy and content. The diversity of skills here makes it a truly complete ecosystem.", author: "Farah Lim", role: "Growth Lead, Superteam Malaysia", twitterHandle: "farahlim_sol", sortOrder: 7 },
  ];
  await db.insert(testimonial).values(testimonialsData).onConflictDoNothing();
  console.log(`  ✓ ${testimonialsData.length} testimonials`);

  // Seed FAQ
  const faqData = [
    { id: "what-is-superteam", question: "What is Superteam Malaysia?", answer: "Superteam Malaysia is the Malaysian chapter of the global Superteam network, a community of builders, creators, and operators working on the Solana ecosystem. We help talented individuals find opportunities, build projects, and grow their careers in Web3 through bounties, grants, events, and mentorship.", sortOrder: 0 },
    { id: "how-to-join", question: "How do I join Superteam Malaysia?", answer: "You can join by signing up on the Superteam Earn platform and selecting Malaysia as your region. From there, you can participate in bounties, attend our events, and engage with the community on Discord. There is no formal application process \u2014 everyone is welcome to contribute.", sortOrder: 1 },
    { id: "opportunities", question: "What opportunities are available?", answer: "Superteam Malaysia offers bounties for specific tasks like development, design, and content creation. You can also apply for ecosystem grants, participate in hackathons, and get connected with Solana projects looking for talent. We regularly post opportunities across technical and non-technical roles.", sortOrder: 2 },
    { id: "project-collaboration", question: "How can projects collaborate with Superteam Malaysia?", answer: "Projects building on Solana can collaborate with us by posting bounties, sponsoring events, or partnering on community initiatives. Reach out to our team through the contact form or connect with us on Twitter to discuss partnership opportunities tailored to your needs.", sortOrder: 3 },
    { id: "non-developer", question: "Do I need to be a developer to join?", answer: "Not at all. Superteam Malaysia welcomes designers, writers, marketers, product managers, community builders, and anyone passionate about the Solana ecosystem. Many of our most active contributors work in non-technical roles like content creation, growth marketing, and event organizing.", sortOrder: 4 },
    { id: "superteam-network", question: "What is the Superteam network?", answer: "Superteam is a global network of community chapters across countries like India, Germany, Turkey, Vietnam, Nigeria, and more. Each chapter supports the local Solana ecosystem through talent development, project support, and community building. Malaysia is one of the fastest-growing chapters in Southeast Asia.", sortOrder: 5 },
    { id: "how-to-contribute", question: "How can I contribute to the community?", answer: "There are many ways to contribute: complete bounties on Superteam Earn, help organize local meetups and events, create educational content about Solana, mentor newcomers, or build open-source tools. Start by joining our Discord and introducing yourself \u2014 the community will help you find the best fit.", sortOrder: 6 },
    { id: "events-free", question: "Are events free to attend?", answer: "Yes, the vast majority of our events are free and open to everyone. This includes meetups, workshops, demo days, and watch parties. Some intensive programs like multi-day hackathons or bootcamps may have limited spots and require registration, but we strive to keep everything accessible.", sortOrder: 7 },
  ];
  await db.insert(faqItem).values(faqData).onConflictDoNothing();
  console.log(`  ✓ ${faqData.length} FAQ items`);

  // Seed stats
  const statsData = [
    { id: "members", value: 500, suffix: "+", label: "Community Members", sortOrder: 0 },
    { id: "events", value: 30, suffix: "+", label: "Events Hosted", sortOrder: 1 },
    { id: "projects", value: 45, suffix: "", label: "Projects Built", sortOrder: 2 },
    { id: "bounties", value: 120, suffix: "+", label: "Bounties Completed", sortOrder: 3 },
    { id: "reach", value: 10, suffix: "K+", label: "Community Reach", sortOrder: 4 },
  ];
  await db.insert(stat).values(statsData).onConflictDoNothing();
  console.log(`  ✓ ${statsData.length} stats`);

  // Note: Admin user should be created via the signup API, then role set to "admin" in DB:
  //   curl -X POST http://localhost:3002/api/auth/sign-up/email -H "Content-Type: application/json" -d '{"name":"Admin","email":"admin@superteam.my","password":"admin123"}'
  //   UPDATE "user" SET role = 'admin' WHERE email = 'admin@superteam.my';
  console.log("  ℹ Create admin via signup API, then set role = 'admin' in DB");

  console.log("\nDone!");
  await pool.end();
  process.exit(0);
}

seed().catch(async (err) => {
  console.error("Seed failed:", err);
  await pool.end();
  process.exit(1);
});
