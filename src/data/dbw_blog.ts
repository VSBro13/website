import { BlogPost } from "./blogPosts";

export const DBW_POSTS: BlogPost[] = [
  {
    id: "dbw-what-is-day-before-weekend",
    title: "DBW: What Is Day Before Weekend?",
    date: "2026-05-23",
    tag: "DBW",
    desc: "Every Friday, the OpenBox team drops a weekly update called DBW. Here is what it is, what it covers, and how to never miss one.",
    readingTime: "3 min read",
    author: {
      name: "OpenBox Team",
      role: "Community Team",
      avatar: "OB"
    },
    content: [
      {
        type: "paragraph",
        text: "Every Friday, the OpenBox admin team drops a post called DBW — Day Before Weekend. It is the official weekly update for the server. One post. Everything that changed, everything coming up, and everything you need to know before the weekend hits."
      },
      {
        type: "heading",
        text: "Where to Find It"
      },
      {
        type: "paragraph",
        text: "DBW lives in its own dedicated channel: #🇩🇧🇼-♾️. Every edition is archived there, starting from DBW #001. If you missed a week, you can scroll back and catch up anytime."
      },
      {
        type: "heading",
        text: "How to Get Notified"
      },
      {
        type: "paragraph",
        text: "We added a dedicated DBW ping role so you get notified the moment a new post drops. It replaces the old @Citizen ping, which means only members who actually want the update get tagged. Head to the Roles channel and opt in."
      },
      {
        type: "heading",
        text: "What Each DBW Covers"
      },
      {
        type: "paragraph",
        text: "Every DBW post is structured into clear sections so you can scan fast and find what is relevant to you:"
      },
      {
        type: "list",
        items: [
          "Role Updates — new roles added, existing roles changed, and anything affecting your access or tags.",
          "Channel Updates — new channels, removed channels, restructured categories, and what moved where.",
          "Announcements — big news from the team. Domain updates, Patreon, partnerships, and server milestones.",
          "From Last Week — a recap of what actually happened. Events that ran, discussions that fired off, things worth revisiting.",
          "Events Wrapup — recaps of any hackathons, AMAs, build nights, or stage sessions that happened during the week.",
          "Coming Up Next — what is in the pipeline. Upcoming events, features in progress, and open calls for suggestions."
        ]
      },
      {
        type: "heading",
        text: "Why We Started It"
      },
      {
        type: "paragraph",
        text: "Discord servers move fast. Channels get added, bots get swapped, events come and go. Without a weekly checkpoint most members miss things that matter to them. DBW is that checkpoint. One post, every Friday, so nobody is ever fully out of the loop."
      },
      {
        type: "heading",
        text: "The Sign-Off"
      },
      {
        type: "paragraph",
        text: "Every DBW ends the same way. No matter what shipped or what broke during the week, the last line is always the same: More updates coming next Friday. Because it's always DaY BeFoRe WeEkEnD around here."
      }
    ]
  }
];
