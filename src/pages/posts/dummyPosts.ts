export interface Post {
    id: number;
    username: string;
    timestamp: string;
    title: string;
    body: string;
    mode: 'academic' | 'extracurricular';
}

export const dummyPosts: Post[] = [
    // ── Academic ────────────────────────────────────────────────────────────
    {
        id: 1,
        username: 'alex_k',
        timestamp: '2 hours ago',
        title: 'Anyone want to form a study group for the Analysis II midterm?',
        body: "The midterm is in three weeks and I'm struggling with uniform convergence and metric spaces. Looking for 2-3 people to meet twice a week in the library. I have past papers and some good resources to share.",
        mode: 'academic',
    },
    {
        id: 2,
        username: 'priya_s',
        timestamp: '5 hours ago',
        title: 'Looking for teammates for the AI hackathon next month',
        body: 'The university AI hackathon is on the 18th. I have experience with PyTorch and NLP — looking for someone with backend/API skills and ideally someone who can handle the frontend. 24-hour event, in-person.',
        mode: 'academic',
    },
    {
        id: 3,
        username: 'david_m',
        timestamp: '1 day ago',
        title: 'Sharing my Algorithms notes — weeks 6 through 9 (dynamic programming, graphs)',
        body: "Uploaded a clean PDF of my notes covering DP, BFS/DFS, Dijkstra, and minimum spanning trees. Includes worked examples from the lectures and a few practice problems I wrote myself. Link in the comments.",
        mode: 'academic',
    },
    {
        id: 4,
        username: 'nour_a',
        timestamp: '2 days ago',
        title: 'CS capstone group needs one more backend developer',
        body: "We're building a real-time collaborative code editor for our capstone. Three of us already have the React frontend mostly done and need someone comfortable with WebSockets and Node.js or Spring Boot. Shoot me a message if interested.",
        mode: 'academic',
    },
    {
        id: 5,
        username: 'lena_p',
        timestamp: '3 days ago',
        title: 'Can someone explain Fourier transforms in plain English?',
        body: "I've watched three different YouTube videos and read the textbook chapter twice and I still feel like I'm missing the intuition. The math makes sense mechanically but I can't picture what's actually happening. Happy to meet up or chat here.",
        mode: 'academic',
    },
    {
        id: 6,
        username: 'alex_k',
        timestamp: '2 hours ago',
        title: 'Anyone want to form a study group for the Analysis II midterm?',
        body: "The midterm is in three weeks and I'm struggling with uniform convergence and metric spaces. Looking for 2-3 people to meet twice a week in the library. I have past papers and some good resources to share.",
        mode: 'academic',
    },
    {
        id: 7,
        username: 'priya_s',
        timestamp: '5 hours ago',
        title: 'Looking for teammates for the AI hackathon next month',
        body: 'The university AI hackathon is on the 18th. I have experience with PyTorch and NLP — looking for someone with backend/API skills and ideally someone who can handle the frontend. 24-hour event, in-person.',
        mode: 'academic',
    },
    {
        id: 8,
        username: 'david_m',
        timestamp: '1 day ago',
        title: 'Sharing my Algorithms notes — weeks 6 through 9 (dynamic programming, graphs)',
        body: "Uploaded a clean PDF of my notes covering DP, BFS/DFS, Dijkstra, and minimum spanning trees. Includes worked examples from the lectures and a few practice problems I wrote myself. Link in the comments.",
        mode: 'academic',
    },
    {
        id: 9,
        username: 'nour_a',
        timestamp: '2 days ago',
        title: 'CS capstone group needs one more backend developer',
        body: "We're building a real-time collaborative code editor for our capstone. Three of us already have the React frontend mostly done and need someone comfortable with WebSockets and Node.js or Spring Boot. Shoot me a message if interested.",
        mode: 'academic',
    },
    {
        id: 10,
        username: 'lena_p',
        timestamp: '3 days ago',
        title: 'Can someone explain Fourier transforms in plain English?',
        body: "I've watched three different YouTube videos and read the textbook chapter twice and I still feel like I'm missing the intuition. The math makes sense mechanically but I can't picture what's actually happening. Happy to meet up or chat here.",
        mode: 'academic',
    },
    // ── Extracurricular ─────────────────────────────────────────────────────
    {
        id: 6,
        username: 'jake_t',
        timestamp: '1 hour ago',
        title: 'Friday FIFA tournament in the dorms — who\'s in?',
        body: "Hosting a casual FIFA 25 tournament in room C214 this Friday at 8PM. Bring your own controller if you have one, I have two spares. Bracket of 8, losers get to watch and heckle. First come first served.",
        mode: 'extracurricular',
    },
    {
        id: 7,
        username: 'mira_c',
        timestamp: '4 hours ago',
        title: 'Starting a D&D campaign — looking for 3 or 4 players',
        body: "Running a homebrew campaign set in a post-magic-apocalypse world. Planning to meet every other Sunday afternoon, sessions around 3 hours. No experience required — I'll help new players with character creation. DM me if interested.",
        mode: 'extracurricular',
    },
    {
        id: 8,
        username: 'omar_b',
        timestamp: '1 day ago',
        title: 'Morning run club — 6AM every Saturday, all paces welcome',
        body: "We've been doing this for a month now and have about 6 regulars. We meet at the fountain near the main gate and do a 5K route around the park. Totally casual, no pressure on pace. Coffee after at the café across the street.",
        mode: 'extracurricular',
    },
    {
        id: 9,
        username: 'yuki_h',
        timestamp: '2 days ago',
        title: 'Competitive Valorant — looking to build a serious 5-stack',
        body: "Currently Diamond 2, aiming to climb to Immortal this act. Looking for people in the Diamond+ range who want to run structured practice a few nights per week. We use a strat doc and do VOD reviews. Serious inquiries only.",
        mode: 'extracurricular',
    },
    {
        id: 10,
        username: 'sofie_r',
        timestamp: '4 days ago',
        title: 'Photography walk around the old town this Sunday afternoon',
        body: "Organising a casual photography walk this Sunday starting at 2PM from the central square. Any camera welcome — phone, mirrorless, film, whatever. We'll wander for about 2 hours and maybe grab food after. I'll share a Google Maps pin on the morning.",
        mode: 'extracurricular',
    },
];
