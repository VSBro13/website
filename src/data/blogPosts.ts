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
    date: "2026-05-20",
    tag: "Announcement",
    desc: "We're officially open. Here's what's inside, what's next, and how to plug in.",
    readingTime: "4 min read",
    author: {
      name: "Admin",
      role: "Core Organizer",
      avatar: "A"
    },
    content: [
      {
        type: "paragraph",
        text: "The wait is over. OpenBox is officially live. Over the past One months, a core group of two people been building the foundation of what we hope will become the premier space for tech builders worldwide."
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
        text: "Getting involved is simple. Head over to our Join page, jump into the Discord server, introduce yourself in #introductions, and share what you are working on in #showcase. We can't wait to see what you build."
      }
    ]
  },
  // {
  //   id: "featured-member-projects-01",
  //   title: "Featured: Member Projects #01",
  //   date: "2026-05-10",
  //   tag: "Community",
  //   desc: "A round-up of standout projects shipped by members in the first week.",
  //   readingTime: "5 min read",
  //   author: {
  //     name: "Sarah Chen",
  //     role: "Community Director",
  //     avatar: "SC"
  //   },
  //   content: [
  //     {
  //       type: "paragraph",
  //       text: "Our community members have been busy! In our very first week, over 25 projects were shared in the discord channel. Here are three projects that caught our eye for their technical depth, execution, and design quality."
  //     },
  //     {
  //       type: "heading",
  //       text: "1. KeebFlow — Open Keyboard Designer"
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Built by @cherry_mx, KeebFlow is a highly interactive React-based web app that allows you to design custom mechanical keyboard layouts, export them to QMK-compatible JSON configurations, and preview the physical key spacing in real-time isometric 3D views."
  //     },
  //     {
  //       type: "heading",
  //       text: "2. SysGlass — Terminal Monitor"
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Built by @gl_sys, SysGlass is a lightweight terminal dashboard that visualizes system performance metrics (CPU, RAM, GPU usage, network IO) in beautiful ASCII graphs. Written entirely in Go and utilizing custom TUI frameworks."
  //     },
  //     {
  //       type: "heading",
  //       text: "3. RoverOne — ESP32 Autonomous Robot"
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Built by @robotics_guy, RoverOne is a low-cost, open-source rover that navigates indoor environments autonomously. Powered by an ESP32 chip and structured using 3D-printed chassis files shared on our GitHub organization."
  //     },
  //     {
  //       type: "quote",
  //       text: "The energy in #projects is outstanding. Shipping code and hardware is the core currency of our community.",
  //       author: "Sarah Chen"
  //     }
  //   ]
  // },
  // {
  //   id: "hackathon-recap-build-night-00",
  //   title: "Hackathon Recap — Build Night #00",
  //   date: "2026-04-25",
  //   tag: "Events",
  //   desc: "Three hours, twelve teams, twelve shipped projects. Highlights inside.",
  //   readingTime: "5 min read",
  //   author: {
  //     name: "Alex River",
  //     role: "Core Organizer",
  //     avatar: "AR"
  //   },
  //   content: [
  //     {
  //       type: "paragraph",
  //       text: "We hosted our very first virtual Build Night. The rules were simple: teams of 1-3 people had exactly three hours to design, build, and deploy a functional project from scratch. No preparation, no pre-existing code repositories."
  //     },
  //     {
  //       type: "heading",
  //       text: "The Turnout"
  //     },
  //     {
  //       type: "paragraph",
  //       text: "We had 12 teams participate, ranging from front-end designers to hardware engineers. By midnight, every single team had submitted a functional deployment or build video demonstrating their project."
  //     },
  //     {
  //       type: "heading",
  //       text: "Winning Project: SynthWave Web Synthesizer"
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Using Web Audio APIs, the winning team built a responsive, interactive vintage synthesizer featuring custom filters, wave morphing, and recorded presets—all styled using retro glassmorphic controls in vanilla CSS. Outstanding work by team 'Oscillate'!"
  //     },
  //     {
  //       type: "heading",
  //       text: "Next Build Night"
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Due to the overwhelming success of Build Night #00, we are making this a bi-weekly event. The next event is scheduled for Saturday, June 6th at 8 PM UTC. Set your calendars, form your teams, and prepare to ship!"
  //     }
  //   ]
  // }
];
