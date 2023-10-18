const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const categories: { [key: string]: Array<{ title: string }> } = {
  mindfulness: [
    { title: "What thoughts am I observing right now?" },
    {
      title:
        "Write down how you’re feeling right now. Close your eyes and breathe deeply. Write down what you're feeling now.",
    },
    {
      title:
        "What emotions am I feeling right now, and how can I practice acceptance and self-compassion towards them?",
    },
    {
      title:
        "What are three things I am looking forward to in the next hour, and how can I stay present and open to experiencing them fully?",
    },
    { title: "When do I feel most alive?" },
    { title: "What activities tend to anchor me in the present moment?" },
    {
      title:
        "Close your eyes and imagine a peaceful, calm place. Where is that place?",
    },
    {
      title:
        "What's one practice, place, or person that helps reduce stress in my life?",
    },
    { title: "What does mindful living mean to me?" },
  ],
  creativity: [
    {
      title:
        "What is one thing that I have always wanted to create, and what steps can I take to make it a reality?",
    },
    {
      title:
        "What is one place or environment that inspires my creativity, and how can I create more opportunities to be in that space?",
    },
    {
      title:
        "What is one fear or obstacle that is holding me back creatively, and what can I do to overcome it?",
    },
    {
      title:
        "How can I surround myself with people and environments that foster creativity and inspiration?",
    },
    {
      title:
        "How can I be more open-minded and receptive to new ideas and perspectives?",
    },
  ],
  goals: [
    {
      title:
        "What is one thing that I have always wanted to create, and what steps can I take to make it a reality?",
    },
    {
      title: "What is one new habit I would like to develop in the next month?",
    },
    {
      title:
        "What are my long-term career goals? What are some concrete steps I can take to move closer to achieving them?",
    },
    {
      title: "What are my personal values and how do they relate to my goals?",
    },
    {
      title:
        "What are your goals? What systems do you need to build in order to reach your goals?",
    },
    { title: "What habits have you successfully automated?" },
    { title: "What obstacles do you face in automating your habits?" },
  ],
  growth: [
    {
      title:
        "What are some areas of my life where I tend to have a fixed mindset?",
    },
    {
      title:
        "What is a limiting beliefs I hold about myself that may be holding me back?",
    },
    {
      title:
        "What are some new skills or knowledge areas that I want to develop?",
    },
    { title: "What book do you want to read next?" },
    { title: "What motivates me?" },
    { title: "What are my main coping mechanisms? Are they serving me well?" },
    { title: "What is your personal vision for yourself?" },
  ],
  "self-discovery": [
    { title: "When do you feel most connected to yourself?" },
    { title: "What is your favorite quote, word, or phrase?" },
    { title: "What do you like most about yourself?" },
    {
      title:
        "What have you been giving most of your energy to lately? What would you like to devote more energy to?",
    },
    { title: "What is your ideal day?" },
    { title: "What makes you feel powerful?" },
    {
      title:
        "What helps you feel safe, held, and supported? How can you include this in your life when you feel stressed? ",
    },
    {
      title:
        "Name someone else who inspires you? What makes you different from them?",
    },
    { title: "What's something new you want to try?" },
    {
      title:
        "What brings me the most joy and fulfillment, and how can I make time for those things in my life?",
    },
    { title: "How do I define success? What steps can I take to achieve it?" },
    {
      title:
        "What are my fears and insecurities? How can I work through them to become more confident and self-assured?",
    },
    {
      title:
        "How do I usually handle my emotions and feelings? Are there any emotions that I tend to avoid or suppress?",
    },
    { title: "Whend oyou feel in flow?" },
    {
      title:
        "What are some activities or habits that drain my energy or motivation?",
    },
    { title: "What are things that drain you? Can you set some boundaries?" },
    { title: "How can you cultivate space for deep self-honesty?" },
  ],
  inspiration: [
    { title: "When was the last time I felt inspired?" },
    {
      title:
        "Who is someone that inspires me, and what qualities do they possess that I admire?",
    },
    { title: "What is one book or movie that has inspired me, and why?" },
    {
      title:
        "When was the last time I felt completely in awe of something, and what was it that inspired that feeling?",
    },
    {
      title:
        "What is one small thing that I can do each day to cultivate a greater sense of inspiration and creativity in my life?",
    },
  ],
  intention: [
    { title: "What do I want to focus on this month/week/day?" },
    { title: "What are my intentions for the day?" },
    {
      title:
        "What is my biggest “why” (the deeper purpose or motivation behind my intentions)?",
    },
    { title: "How can I use my “why” to stay focused and committed?" },
    {
      title:
        "What are some distractions or time-wasters that I need to eliminate in order to focus on what’s truly important?",
    },
  ],
  confidence: [
    { title: "What are some things that make me feel confident?" },
    {
      title:
        "How can I take care of myself and practice self-compassion in moments when I feel uncertain or doubtful?",
    },
    {
      title:
        "What are my unique qualities and how can I use them to my advantage?",
    },
    {
      title:
        "What would I say to a friend who is struggling with self-confidence, and how can I apply that advice to my own life?",
    },
  ],
  relationship: [
    {
      title:
        "What is my love language? How do I communicate love and affection to my partner or loved ones?",
    },
    {
      title:
        "What are some areas where I need to work on boundaries in my relationships? How can I create healthier boundaries?",
    },
    { title: "What are my relationship goals?" },
    { title: "How do I express love and affection?" },
    {
      title:
        "What are my values and priorities when it comes to relationships?",
    },
    {
      title:
        "What communication patterns do I notice when things get difficult?",
    },
    { title: "How do I respond to conflict in my relationships?" },
    {
      title: "What are some ways I can deepen my connections with loved ones?",
    },
    {
      title:
        "How do I communicate my needs and boundaries in my relationships?",
    },
    {
      title:
        "What are the most important relationships in my life? How can I strengthen them?",
    },
  ],
  daily: [
    {
      title:
        "What themes, patterns, or symbols have I noticed in my life lately?",
    },
    { title: "Name three thoughts that made you smile today." },
    { title: "Name three actions that made you feel loved today." },
    { title: "Name three beautiful things that you saw today." },
    { title: "Name three things that you learned today." },
    { title: "Name three things that challenged you today." },
    { title: "What am I looking forward to today?" },
    { title: "What positive things happened today?" },
    { title: "What will I do differently tomorrow?" },
    {
      title:
        "What is one simple adjustment you can make to your morning routine to help you care for yourself as you prepare for the day?",
    },
    { title: "What made me happiest this week?" },
    { title: "What would make today great?" },
  ],
  gratitude: [
    { title: "List three things you’re grateful for about yourself today." },
    {
      title:
        "What are some of the things that I am most grateful for in my life? How can I cultivate more gratitude and appreciation?",
    },
    {
      title:
        "What is great in your life right now? What current situations are you thankful for?",
    },
  ],
  kindness: [
    { title: "What is one great way to show kindness to others?" },
    { title: "How do you define kindness? Why is kindness important?" },
    {
      title:
        "What are some ways that you can show more kindness to your parents and family?",
    },
    {
      title:
        "What are some ways that you can show more kindness to your friends?",
    },
    { title: "Describe an act of kindness you recently experienced." },
    { title: "What is something you can forgive yourself for?" },
    {
      title:
        "Did you recently make a mistake and get upset with yourself? What can you say to yourself now to replace beating yourself up with grace and self-compassion?",
    },
    {
      title:
        "What’s one thing that you feel scared to do, even though you know it’s important? How would a close friend encourage you to overcome that fear?",
    },
    {
      title:
        "In what ways can you be more gentle with yourself? Write down 3 of them.",
    },
    {
      title:
        "What would you say to a friend who’s feeling down about themselves? Would you say the same things to yourself?",
    },
    {
      title:
        "Write about a recent mistake or failure. How can you show yourself compassion regarding this event?",
    },
    { title: "What are three “flaws” you can reframe as strengths?" },
    {
      title:
        "What’s one part of your body you struggle to love? Write a thank-you note to that part for how it serves you.",
    },
    {
      title:
        "Write a love letter to yourself. What do you admire about yourself?",
    },
    {
      title:
        "List five accomplishments you’re proud of. How do these make you feel about yourself?",
    },
    {
      title:
        "What does self-care look like to you? How can you incorporate more self-care into your daily routine?",
    },
    {
      title:
        "Write about a time you showed yourself compassion. How did it make you feel?",
    },
    {
      title:
        "What’s one self-compassionate commitment you can make to yourself for this coming week?",
    },
    {
      title:
        "Where do you see your relationship with yourself in five years? What steps can you take to get there?",
    },
    {
      title:
        "What is one thing you can remove from your everyday schedule to create more space for rest and self-care?",
    },
  ],
};

async function main() {
  Object.keys(categories).forEach(async (category) => {
    const prompts = categories[category];
    await prisma.category.create({
      data: {
        title: category,
        prompts: {
          create: prompts,
        },
      },
    });
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
