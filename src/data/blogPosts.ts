export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tag: string;
  desc: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: Array<
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string }
    | { type: "code"; language: string; code: string }
    | { type: "list"; items: string[] }
    | { type: "quote"; text: string; author?: string }
  >;
}

export const POSTS: BlogPost[] = [
  {
    id: "openbox-v1-is-live",
    title: "OpenBox V1 Is Live",
    date: "2026-05-01",
    tag: "Announcement",
    desc: "We're officially open. Here's what's inside, what's next, and how to plug in.",
    readingTime: "4 min read",
    author: {
      name: "Alex River",
      role: "Core Organizer",
      avatar: "AR"
    },
    content: [
      {
        type: "paragraph",
        text: "The wait is over. OpenBox is officially live. Over the past three months, a core group of developers and hardware hackers have been building the foundation of what we hope will become the premier space for tech builders worldwide."
      },
      {
        type: "heading",
        text: "What is OpenBox?"
      },
      {
        type: "paragraph",
        text: "OpenBox is not another networking group. It is an active ecosystem designed exclusively for people who write code, build hardware, and design systems. We value rough consensus and running code over corporate slides and theoretical frameworks."
      },
      {
        type: "heading",
        text: "Features at Launch"
      },
      {
        type: "list",
        items: [
          "Integrated Discord Sync: Connect your builder profiles directly to roles.",
          "Interactive Build Logs: Share step-by-step progress on your current builds.",
          "Weekly Build Nights: Show up, collaborate, and launch something in 3 hours.",
          "Open Docs Directory: Access community-curated guides on advanced tooling."
        ]
      },
      {
        type: "quote",
        text: "The best way to predict the future is to build it. OpenBox is the place where builders meet to do exactly that.",
        author: "OpenBox Core Manifesto"
      },
      {
        type: "heading",
        text: "How to Get Started"
      },
      {
        type: "paragraph",
        text: "Getting involved is simple. Head over to our Join page, jump into the Discord server, introduce yourself in #introductions, and share what you are working on in #current-builds. We can't wait to see what you build."
      }
    ]
  },
  {
    id: "build-log-the-openbox-bot",
    title: "Build Log: The OpenBox Bot",
    date: "2026-05-08",
    tag: "Build Log",
    desc: "How we built the role-sync bot from scratch. Stack, gotchas, and what we'd do differently.",
    readingTime: "6 min read",
    author: {
      name: "Marcus Vance",
      role: "Backend Lead",
      avatar: "MV"
    },
    content: [
      {
        type: "paragraph",
        text: "To run a smooth, automated community, we needed a robust backend utility to manage roles, subscriptions, and profiles dynamically. We built 'OpenBox Bot'—a custom Discord automation utility tailored to our community infrastructure."
      },
      {
        type: "heading",
        text: "The Tech Stack"
      },
      {
        type: "paragraph",
        text: "We opted for a highly responsive, modern stack to ensure instant response times and easy maintenance:"
      },
      {
        type: "list",
        items: [
          "Runtime: Node.js with TypeScript for end-to-end type safety.",
          "Framework: Discord.js for rich gateway API interactions.",
          "Hosting: Deployed as a secure microservice using container images on Cloud Run.",
          "Database: PostgreSQL for reliable, transactional storage of linked metadata."
        ]
      },
      {
        type: "heading",
        text: "Inside the Code"
      },
      {
        type: "paragraph",
        text: "Here is a simplified snippet of our guild member update handler that synchronizes role assignments in response to Patreon webhook events:"
      },
      {
        type: "code",
        language: "typescript",
        code: `import { Client, GuildMember } from "discord.js";\n\nexport async function syncUserRoles(\n  client: Client,\n  userId: string,\n  tier: "Kernel" | "Compiler" | "Relay" | "Founder"\n) {\n  const guild = await client.guilds.fetch(process.env.GUILD_ID!);\n  const member = await guild.members.fetch(userId);\n\n  const roleMap: Record<string, string> = {\n    Kernel: process.env.ROLE_KERNEL_ID!,\n    Compiler: process.env.ROLE_COMPILER_ID!,\n    Relay: process.env.ROLE_RELAY_ID!,\n    Founder: process.env.ROLE_FOUNDER_ID!,\n  };\n\n  const targetRoleId = roleMap[tier];\n  if (targetRoleId && !member.roles.cache.has(targetRoleId)) {\n    await member.roles.add(targetRoleId);\n    console.log(\`Successfully assigned \${tier} role to user \${member.user.tag}\`);\n  }\n}`
      },
      {
        type: "heading",
        text: "Gotchas & Lessons Learned"
      },
      {
        type: "paragraph",
        text: "Handling Discord rate limits was a primary hurdle. When bulk synchronization requests are triggered simultaneously, API updates can back up. We resolved this by introducing a task queue with sliding window rate limit back-off logic."
      }
    ]
  },
  {
    id: "featured-member-projects-01",
    title: "Featured: Member Projects #01",
    date: "2026-05-10",
    tag: "Community",
    desc: "A round-up of standout projects shipped by members in the first week.",
    readingTime: "5 min read",
    author: {
      name: "Sarah Chen",
      role: "Community Director",
      avatar: "SC"
    },
    content: [
      {
        type: "paragraph",
        text: "Our community members have been busy! In our very first week, over 25 projects were shared in the discord channel. Here are three projects that caught our eye for their technical depth, execution, and design quality."
      },
      {
        type: "heading",
        text: "1. KeebFlow — Open Keyboard Designer"
      },
      {
        type: "paragraph",
        text: "Built by @cherry_mx, KeebFlow is a highly interactive React-based web app that allows you to design custom mechanical keyboard layouts, export them to QMK-compatible JSON configurations, and preview the physical key spacing in real-time isometric 3D views."
      },
      {
        type: "heading",
        text: "2. SysGlass — Terminal Monitor"
      },
      {
        type: "paragraph",
        text: "Built by @gl_sys, SysGlass is a lightweight terminal dashboard that visualizes system performance metrics (CPU, RAM, GPU usage, network IO) in beautiful ASCII graphs. Written entirely in Go and utilizing custom TUI frameworks."
      },
      {
        type: "heading",
        text: "3. RoverOne — ESP32 Autonomous Robot"
      },
      {
        type: "paragraph",
        text: "Built by @robotics_guy, RoverOne is a low-cost, open-source rover that navigates indoor environments autonomously. Powered by an ESP32 chip and structured using 3D-printed chassis files shared on our GitHub organization."
      },
      {
        type: "quote",
        text: "The energy in #projects is outstanding. Shipping code and hardware is the core currency of our community.",
        author: "Sarah Chen"
      }
    ]
  },
  {
    id: "hackathon-recap-build-night-00",
    title: "Hackathon Recap — Build Night #00",
    date: "2026-04-25",
    tag: "Events",
    desc: "Three hours, twelve teams, twelve shipped projects. Highlights inside.",
    readingTime: "5 min read",
    author: {
      name: "Alex River",
      role: "Core Organizer",
      avatar: "AR"
    },
    content: [
      {
        type: "paragraph",
        text: "We hosted our very first virtual Build Night. The rules were simple: teams of 1-3 people had exactly three hours to design, build, and deploy a functional project from scratch. No preparation, no pre-existing code repositories."
      },
      {
        type: "heading",
        text: "The Turnout"
      },
      {
        type: "paragraph",
        text: "We had 12 teams participate, ranging from front-end designers to hardware engineers. By midnight, every single team had submitted a functional deployment or build video demonstrating their project."
      },
      {
        type: "heading",
        text: "Winning Project: SynthWave Web Synthesizer"
      },
      {
        type: "paragraph",
        text: "Using Web Audio APIs, the winning team built a responsive, interactive vintage synthesizer featuring custom filters, wave morphing, and recorded presets—all styled using retro glassmorphic controls in vanilla CSS. Outstanding work by team 'Oscillate'!"
      },
      {
        type: "heading",
        text: "Next Build Night"
      },
      {
        type: "paragraph",
        text: "Due to the overwhelming success of Build Night #00, we are making this a bi-weekly event. The next event is scheduled for Saturday, June 6th at 8 PM UTC. Set your calendars, form your teams, and prepare to ship!"
      }
    ]
  }
];
