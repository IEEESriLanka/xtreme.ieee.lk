  
import registration from "../assets/Events/Registration";
import CodeX from "../assets/Events/CodeX";
import whatsapp from "../assets/Events/Whatsapp";



  const events = [
    {
      id: 4,
      type: "post",
      title: "Join Us On WhatsApp!",
      description: `
      🔰The official WhatsApp Q&A Group for 𝗜𝗘𝗘𝗘𝗫𝘁𝗿𝗲𝗺𝗲 𝗦𝗿𝗶 𝗟𝗮𝗻𝗸𝗮 𝗦𝗲𝗰𝘁𝗶𝗼𝗻 is now 𝗢𝗣𝗘𝗡!

All your questions and concerns about the competition can be answered here!💬

📍Join now and be part of the community.

               or

𝘚𝘤𝘢𝘯 𝘵𝘩𝘦 𝘘𝘙 𝘤𝘰𝘥𝘦 𝘵𝘰 𝘫𝘰𝘪𝘯.


    `,
      buttontext: "Join Now",
      buttonlink: "https://chat.whatsapp.com/IOcTf27KyXUGTk0R0pvNYW",
      date: "ongoing",
      time: "ongoing",
      location: "Virtual",
      status: "ongoing",
      image: whatsapp.image1,
      registrations: null,
      hashtags: ["IEEE ", "IEEESL ", "CODEX", "IEEEXtreme19"],
      maxCapacity: "",
      tags: [],
      timeline: [],
    },
    {
      id: 3,
      type: "post",
      title: "Get Your IEEE Student Membership Today",
      description: `
      Compete in IEEEXtreme for Just $7!

      Get Your IEEE Student Membership Today
      Join IEEE for only $7 and unlock your chance to participate in IEEEXtreme, the world’s biggest 24-hour programming competition.

      🌍 Connect with tech enthusiasts worldwide
      🏆 Compete for global rankings and prizes
      📚 Access exclusive IEEE resources

    `,
      buttontext: "Sign Up Now",
      buttonlink: "https://www.ieee.org/membership/join",
      buttontext2: "Watch Tutorial",
      buttonlink2: "https://www.youtube.com/watch?v=eVQFZ8b68Tg",
      date: "ongoing",
      time: "ongoing",
      location: "Virtual",
      status: "ongoing",
      image: registration.image2,
      registrations: null,
      hashtags: ["IEEE ", "IEEESL ", "CODEX", "IEEEXtreme19"],
      maxCapacity: "",
      tags: [],
      timeline: [],
    },
    {
      id: 2,
      type: "post",
      title: "CodeX Session Series",
      description: `𝗪𝗼𝗻𝗱𝗲𝗿𝗶𝗻𝗴 𝘄𝗵𝗮𝘁’𝘀 𝗮𝗵𝗲𝗮𝗱? 🧭

Here’s your complete roadmap to mastering the world of competitive programming with CodeX! 📍

From algorithms to advanced strategies, each week is carefully designed to sharpen your skills, challenge your thinking, and prepare you for the real battles ahead.

And yes, you’ll have TWO sessions every week to double the impact. 💥

Take a look. Lock in your journey. Let’s code our way to victory! 🚀
    `,
      buttontext: "Register Now",
      buttonlink: "https://lu.ma/owts25tf",
      date: "ongoing",
      time: "ongoing",
      location: "Virtual",
      status: "ongoing",
      image: CodeX.image1,
      registrations: 100,
      hashtags: ["IEEE ", "IEEESL ", "CODEX", "IEEEXtreme19", "ICPC2026"],
      maxCapacity: "",
      tags: ["Competitive Programming", "Algorithms"],
      timeline: [],
    },
    {
      id: 1,
      type: "post",
      title: " IEEEXtreme 19.0 is here!",
      description: `🌐 The Ultimate 24-Hour Global Coding Challenge

    📅 Date: 25 October 2025
    🕛 Starts at: 00:00 UTC (GMT+5:30)

    ⚡ Are you ready to code without limits?

    Team up. Compete. Conquer. From anywhere in the world.

    ✅ Open to all IEEE student members
    👨‍💻 Solve real-world challenges
    🏆 Compete globally and win exciting prizes

    🎯 Registrations are NOW OPEN!

    📢 Don’t miss your chance to be part of history.

    `,
      buttontext: "Register Now",
      buttonlink: "https://xtreme.vtools.ieee.org/",
      date: "2025-10-25",
      time: "00:00 UTC",
      location: "Virtual Global Event",
      status: "upcoming",
      image: registration.image1,
      registrations: 156,
      hashtags: [
        "IEEEXtreme19 ",
        "CodeTheXtreme ",
        "GlobalHackathon",
        "IEEEStudents",
        "RegisterNow",
        "24HourCodingChallenge",
      ],
      maxCapacity: "",
      tags: ["Problem Solving", "Competitive Programming", "Global"],
      timeline: [
        {
          time: "00:00 UTC",
          title: "Competition Starts",
          desc: "Teams begin working on programming challenges worldwide",
        },
        {
          time: "06:00 UTC",
          title: "First Checkpoint",
          desc: "Leaderboard updates and progress assessment",
        },
        {
          time: "12:00 UTC",
          title: "Midpoint Review",
          desc: "Halfway through the competition - time for strategy adjustments",
        },
        {
          time: "18:00 UTC",
          title: "Final Sprint",
          desc: "Last 6 hours - teams push for final solutions",
        },
        {
          time: "23:59 UTC",
          title: "Competition Ends",
          desc: "Submission deadline and final leaderboard calculations",
        },
      ],
    },
  ];

  export default events