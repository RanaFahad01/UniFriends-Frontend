export interface Post {
  id: number;
  username: string;
  timestamp: string;
  title: string;
  body: string;
  tags?: string | null; // comma-separated, e.g. "chess,python,math" — split on "," to render pills
  mode: 'academics' | 'activities';
}

export const dummyPosts: Post[] = [
  // ── academics ────────────────────────────────────────────────────────────
  {
    id: 1,
    username: 'alex_k',
    timestamp: '2 hours ago',
    tags: 'study,analysis,metric-spaces,midterm,group',
    title: 'Anyone want to form a study group for the Analysis II midterm?',
    body: "The midterm is in three weeks and I'm struggling with uniform convergence and metric spaces. Looking for 2-3 people to meet twice a week in the library. I have past papers and some good resources to share.",
    mode: 'academics',
  },
  {
    id: 2,
    username: 'priya_s',
    timestamp: '5 hours ago',
    tags: 'hackathon,AI,PyTorch,frontend,backend',
    title: 'Looking for teammates for the AI hackathon next month',
    body: 'The university AI hackathon is on the 18th. I have experience with PyTorch and NLP — looking for someone with backend/API skills and ideally someone who can handle the frontend. 24-hour event, in-person.',
    mode: 'academics',
  },
  {
    id: 3,
    username: 'david_m',
    timestamp: '1 day ago',
    tags: 'algorithms,dp,graphs,notes,practice',
    title: 'Sharing my Algorithms notes — weeks 6 through 9 (dynamic programming, graphs)',
    body: 'Uploaded a clean PDF of my notes covering DP, BFS/DFS, Dijkstra, and minimum spanning trees. Includes worked examples from the lectures and a few practice problems I wrote myself. Link in the comments.',
    mode: 'academics',
  },
  {
    id: 4,
    username: 'nour_a',
    timestamp: '2 days ago',
    tags: 'capstone,backend,websockets,nodejs,spring',
    title: 'CS capstone group needs one more backend developer',
    body: "We're building a real-time collaborative code editor for our capstone. Three of us already have the React frontend mostly done and need someone comfortable with WebSockets and Node.js or Spring Boot. Shoot me a message if interested.",
    mode: 'academics',
  },
  {
    id: 5,
    username: 'lena_p',
    timestamp: '3 days ago',
    tags: 'fourier,signals,intuition,math,study',
    title: 'Can someone explain Fourier transforms in plain English?',
    body: "I've watched three different YouTube videos and read the textbook chapter twice and I still feel like I'm missing the intuition. The math makes sense mechanically but I can't picture what's actually happening. Happy to meet up or chat here.",
    mode: 'academics',
  },
  {
    id: 6,
    username: 'alex_k',
    timestamp: '2 hours ago',
    tags: 'study,analysis,metric-spaces,midterm,group',
    title: 'Anyone want to form a study group for the Analysis II midterm?',
    body: "The midterm is in three weeks and I'm struggling with uniform convergence and metric spaces. Looking for 2-3 people to meet twice a week in the library. I have past papers and some good resources to share.",
    mode: 'academics',
  },
  {
    id: 7,
    username: 'priya_s',
    timestamp: '5 hours ago',
    tags: 'hackathon,AI,PyTorch,frontend,backend',
    title: 'Looking for teammates for the AI hackathon next month',
    body: 'The university AI hackathon is on the 18th. I have experience with PyTorch and NLP — looking for someone with backend/API skills and ideally someone who can handle the frontend. 24-hour event, in-person.',
    mode: 'academics',
  },
  {
    id: 8,
    username: 'david_m',
    timestamp: '1 day ago',
    tags: 'algorithms,dp,graphs,notes,practice',
    title: 'Sharing my Algorithms notes — weeks 6 through 9 (dynamic programming, graphs)',
    body: 'Uploaded a clean PDF of my notes covering DP, BFS/DFS, Dijkstra, and minimum spanning trees. Includes worked examples from the lectures and a few practice problems I wrote myself. Link in the comments.',
    mode: 'academics',
  },
  {
    id: 9,
    username: 'nour_a',
    timestamp: '2 days ago',
    tags: 'capstone,backend,websockets,nodejs,spring',
    title: 'CS capstone group needs one more backend developer',
    body: "We're building a real-time collaborative code editor for our capstone. Three of us already have the React frontend mostly done and need someone comfortable with WebSockets and Node.js or Spring Boot. Shoot me a message if interested.",
    mode: 'academics',
  },
  {
    id: 10,
    username: 'lena_p',
    timestamp: '3 days ago',
    tags: 'fourier,signals,intuition,math,study',
    title: 'Can someone explain Fourier transforms in plain English?',
    body: "I've watched three different YouTube videos and read the textbook chapter twice and I still feel like I'm missing the intuition. The math makes sense mechanically but I can't picture what's actually happening. Happy to meet up or chat here.",
    mode: 'academics',
  },
  // ── activities ─────────────────────────────────────────────────────
  {
    id: 6,
    username: 'jake_t',
    timestamp: '1 hour ago',
    tags: 'fifa,gaming,tournament,dorms,casual',
    title: "Friday FIFA tournament in the dorms — who's in?",
    body: 'Hosting a casual FIFA 25 tournament in room C214 this Friday at 8PM. Bring your own controller if you have one, I have two spares. Bracket of 8, losers get to watch and heckle. First come first served.',
    mode: 'activities',
  },
  {
    id: 7,
    username: 'mira_c',
    timestamp: '4 hours ago',
    tags: 'dnd,tabletop,roleplay,campaign,players',
    title: 'Starting a D&D campaign — looking for 3 or 4 players',
    body: "Running a homebrew campaign set in a post-magic-apocalypse world. Planning to meet every other Sunday afternoon, sessions around 3 hours. No experience required — I'll help new players with character creation. DM me if interested.",
    mode: 'activities',
  },
  {
    id: 8,
    username: 'omar_b',
    timestamp: '1 day ago',
    tags: 'running,5k,fitness,club,morning',
    title: 'Morning run club — 6AM every Saturday, all paces welcome',
    body: "We've been doing this for a month now and have about 6 regulars. We meet at the fountain near the main gate and do a 5K route around the park. Totally casual, no pressure on pace. Coffee after at the café across the street.",
    mode: 'activities',
  },
  {
    id: 9,
    username: 'yuki_h',
    timestamp: '2 days ago',
    tags: 'valorant,competitive,esports,ranked,team',
    title: 'Competitive Valorant — looking to build a serious 5-stack',
    body: 'Currently Diamond 2, aiming to climb to Immortal this act. Looking for people in the Diamond+ range who want to run structured practice a few nights per week. We use a strat doc and do VOD reviews. Serious inquiries only.',
    mode: 'activities',
  },
  {
    id: 10,
    username: 'sofie_r',
    timestamp: '4 days ago',
    tags: 'photography,walk,street,film,meetup',
    title: 'Photography walk around the old town this Sunday afternoon',
    body: "Organising a casual photography walk this Sunday starting at 2PM from the central square. Any camera welcome — phone, mirrorless, film, whatever. We'll wander for about 2 hours and maybe grab food after. I'll share a Google Maps pin on the morning.",
    mode: 'activities',
  },
];
