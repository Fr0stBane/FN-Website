/* All fixtures and editorial items in this starter site are illustrative demo content. */
window.FOOTBALL_DATA = {
    leagues: [
        "All competitions",
        "Premier League",
        "LaLiga",
        "Champions League",
        "Serie A",
        "Bundesliga",
        "Ligue 1"
    ],

    teams: [
        {
            id: "man-city",
            name: "Manchester City",
            short: "MCI",
            league: "Premier League",
            country: "England",
            color: "#70c9e8",
            founded: "1880",
            venue: "Etihad Stadium",
            about: "A possession-minded side known in this demo profile for patient build-up, positional rotations and attacking width.",
            form: ["W", "W", "D", "W", "L"],
            position: "2nd",
            played: 12,
            points: 27
        },
        {
            id: "arsenal",
            name: "Arsenal",
            short: "ARS",
            league: "Premier League",
            country: "England",
            color: "#ef6b70",
            founded: "1886",
            venue: "Emirates Stadium",
            about: "A young, energetic squad with a focus on coordinated pressing, quick combinations and structured defending.",
            form: ["W", "D", "W", "W", "W"],
            position: "1st",
            played: 12,
            points: 29
        },
        {
            id: "liverpool",
            name: "Liverpool",
            short: "LIV",
            league: "Premier League",
            country: "England",
            color: "#e34f59",
            founded: "1892",
            venue: "Anfield",
            about: "A high-tempo team built around intense pressing, quick transitions and a strong connection with its home crowd.",
            form: ["W", "W", "L", "W", "D"],
            position: "3rd",
            played: 12,
            points: 25
        },
        {
            id: "barcelona",
            name: "Barcelona",
            short: "BAR",
            league: "LaLiga",
            country: "Spain",
            color: "#5882d9",
            founded: "1899",
            venue: "Estadi Olímpic Lluís Companys",
            about: "A club with a long tradition of technical football, positional play and developing players through its academy.",
            form: ["W", "D", "W", "W", "W"],
            position: "1st",
            played: 13,
            points: 32
        },
        {
            id: "real-madrid",
            name: "Real Madrid",
            short: "RMA",
            league: "LaLiga",
            country: "Spain",
            color: "#d3c6a2",
            founded: "1902",
            venue: "Santiago Bernabéu",
            about: "A historic club associated with big European nights, individual quality and a strong winning culture.",
            form: ["W", "W", "W", "D", "W"],
            position: "2nd",
            played: 13,
            points: 30
        },
        {
            id: "atletico",
            name: "Atlético Madrid",
            short: "ATM",
            league: "LaLiga",
            country: "Spain",
            color: "#e76c6c",
            founded: "1903",
            venue: "Metropolitano Stadium",
            about: "A competitive side known for compact defensive organisation, discipline and direct transitions.",
            form: ["D", "W", "L", "W", "W"],
            position: "4th",
            played: 13,
            points: 24
        },
        {
            id: "bayern",
            name: "Bayern Munich",
            short: "BAY",
            league: "Bundesliga",
            country: "Germany",
            color: "#e85767",
            founded: "1900",
            venue: "Allianz Arena",
            about: "A leading German club with a history of dominant attacking football and strong domestic performances.",
            form: ["W", "W", "W", "D", "W"],
            position: "1st",
            played: 11,
            points: 28
        },
        {
            id: "dortmund",
            name: "Borussia Dortmund",
            short: "BVB",
            league: "Bundesliga",
            country: "Germany",
            color: "#f4d64a",
            founded: "1909",
            venue: "Signal Iduna Park",
            about: "A club celebrated for its atmosphere, youth development and fast, vertical attacking play.",
            form: ["W", "L", "W", "D", "W"],
            position: "3rd",
            played: 11,
            points: 22
        },
        {
            id: "psg",
            name: "Paris Saint-Germain",
            short: "PSG",
            league: "Ligue 1",
            country: "France",
            color: "#6295d8",
            founded: "1970",
            venue: "Parc des Princes",
            about: "A Paris club with a technical identity and a focus on attacking quality and control of possession.",
            form: ["W", "W", "D", "W", "W"],
            position: "1st",
            played: 12,
            points: 29
        },
        {
            id: "inter",
            name: "Inter Milan",
            short: "INT",
            league: "Serie A",
            country: "Italy",
            color: "#5e91d4",
            founded: "1908",
            venue: "San Siro",
            about: "A tactically flexible Italian club known for its structured shape, wing-back play and collective organisation.",
            form: ["W", "D", "W", "W", "L"],
            position: "2nd",
            played: 12,
            points: 26
        },
        {
            id: "ac-milan",
            name: "AC Milan",
            short: "MIL",
            league: "Serie A",
            country: "Italy",
            color: "#e66a6d",
            founded: "1899",
            venue: "San Siro",
            about: "One of Italy’s best-known clubs, with a rich European history and a tradition of technical players.",
            form: ["W", "L", "W", "D", "W"],
            position: "4th",
            played: 12,
            points: 23
        },
        {
            id: "juventus",
            name: "Juventus",
            short: "JUV",
            league: "Serie A",
            country: "Italy",
            color: "#cbd0d1",
            founded: "1897",
            venue: "Allianz Stadium",
            about: "A Turin club recognised for its long domestic history, tactical discipline and strong defensive traditions.",
            form: ["D", "W", "W", "W", "D"],
            position: "1st",
            played: 12,
            points: 28
        }
    ],

    matches: [
        {id: "m1", league: "Premier League", home: "man-city", away: "arsenal", status: "result", homeScore: 3, awayScore: 1, date: "2026-11-21T17:30:00", venue: "Etihad Stadium", note: "Illustrative final score"},
        {id: "m2", league: "LaLiga", home: "barcelona", away: "real-madrid", status: "live", homeScore: 2, awayScore: 1, date: "2026-11-23T20:00:00", venue: "Olympic Stadium", minute: "68'", note: "Illustrative in-play score"},
        {id: "m3", league: "Champions League", home: "bayern", away: "psg", status: "upcoming", date: "2026-11-25T20:00:00", venue: "Allianz Arena", note: "Illustrative fixture"},
        {id: "m4", league: "Serie A", home: "inter", away: "ac-milan", status: "upcoming", date: "2026-11-26T18:30:00", venue: "San Siro", note: "Illustrative fixture"},
        {id: "m5", league: "Premier League", home: "liverpool", away: "man-city", status: "upcoming", date: "2026-11-28T16:00:00", venue: "Anfield", note: "Illustrative fixture"},
        {id: "m6", league: "Bundesliga", home: "dortmund", away: "bayern", status: "upcoming", date: "2026-11-29T17:30:00", venue: "Signal Iduna Park", note: "Illustrative fixture"},
        {id: "m7", league: "LaLiga", home: "real-madrid", away: "atletico", status: "result", homeScore: 2, awayScore: 2, date: "2026-11-20T20:00:00", venue: "Santiago Bernabéu", note: "Illustrative final score"},
        {id: "m8", league: "Ligue 1", home: "psg", away: "barcelona", status: "result", homeScore: 1, awayScore: 0, date: "2026-11-18T20:00:00", venue: "Parc des Princes", note: "Illustrative final score"},
        {id: "m9", league: "Serie A", home: "juventus", away: "inter", status: "upcoming", date: "2026-11-30T19:45:00", venue: "Allianz Stadium", note: "Illustrative fixture"},
        {id: "m10", league: "Premier League", home: "arsenal", away: "liverpool", status: "upcoming", date: "2026-12-02T20:00:00", venue: "Emirates Stadium", note: "Illustrative fixture"}
    ],

    articles: [
        {
            id: "pressing",
            category: "Tactics",
            date: "Nov 23, 2026",
            read: "5 min read",
            title: "The first defender: why modern pressing starts up front",
            excerpt: "A coordinated press is more than a sprint towards the ball. It is a team-wide plan built on angles, timing and trust.",
            image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=85",
            body: [
                "Pressing is often described as an act of aggression, but the best pressing teams treat it as a carefully rehearsed structure. The forward line chooses the direction of the press, the midfield closes the nearest passing lanes and the defence squeezes the space behind.",
                "The first player does not always need to win the ball. Their job may simply be to make one pass unattractive and guide play towards a teammate who is ready to challenge. A press works when every player understands the next movement.",
                "That is why timing matters more than constant running. A team that jumps together can make the pitch feel small; a team that jumps alone can be played through with one pass."
            ]
        },
        {
            id: "midfield",
            category: "Analysis",
            date: "Nov 22, 2026",
            read: "4 min read",
            title: "How midfielders control the rhythm of a match",
            excerpt: "Tempo is not just about passing quickly. It is about knowing when to accelerate, when to pause and where the next space will appear.",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=85",
            body: [
                "A midfield can dictate a match without dominating every statistic. The most influential players constantly scan their surroundings, offer passing angles and decide whether the next action should speed the game up or calm it down.",
                "A short pass can be a defensive action if it helps a team keep the ball. A forward pass can be a controlling action if it moves the opposition and gives teammates time to reorganise. Good midfield play is a sequence of decisions, not a collection of spectacular touches.",
                "When a team loses control, the answer is not always to play faster. Sometimes the best solution is to regain spacing, circulate the ball and make the opponent move again."
            ]
        },
        {
            id: "academy",
            category: "Features",
            date: "Nov 20, 2026",
            read: "6 min read",
            title: "The academy pathway: building a club identity",
            excerpt: "Youth development is about more than finding talented players. It connects coaching, opportunity and a clear football philosophy.",
            image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=85",
            body: [
                "An academy gives young players a route into the first team, but its wider value is cultural. When age-group coaches share principles with senior coaches, a club can create a recognisable style that develops over time.",
                "The pathway is rarely a straight line. Players grow at different speeds, learn through setbacks and may need different environments before they are ready for senior football. Good development programmes recognise those differences.",
                "A successful academy is measured not only by first-team debuts, but also by the quality of the learning environment and the opportunities it creates."
            ]
        },
        {
            id: "fullbacks",
            category: "Tactics",
            date: "Nov 18, 2026",
            read: "5 min read",
            title: "From the touchline to midfield: the changing full-back role",
            excerpt: "Modern wide defenders are asked to defend the flank, support attacks and sometimes step into central areas.",
            image: "https://images.unsplash.com/photo-1434648957308-5e6a859697e8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            body: [
                "The full-back role has become one of the most varied positions on the pitch. Some players provide width and overlap, while others move into midfield to help their team build attacks through the centre.",
                "The choice depends on the players around them. A wide forward who moves inside may need an overlapping run; a winger who stays wide may create room for the full-back to move centrally.",
                "The modern full-back is therefore judged by decision-making as much as athletic ability. The best players understand when to hold their position and when to take a risk."
            ]
        },
        {
            id: "transitions",
            category: "Analysis",
            date: "Nov 16, 2026",
            read: "4 min read",
            title: "The few seconds that can change a football match",
            excerpt: "Transitions happen immediately after possession changes. The reaction in those moments can decide where the game is played.",
            image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1323&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            body: [
                "The moment a team wins or loses the ball is a moment of uncertainty. Players are often spread across the pitch, and both sides have to reorganise quickly.",
                "A team that has just lost possession may try to press immediately and prevent a counterattack. A team that has just won it may attack the space before the opposition can recover its shape.",
                "These decisions require shared understanding. Players need to recognise the situation and react together, whether that means counter-pressing or slowing the attack down."
            ]
        },
        {
            id: "setpieces",
            category: "Features",
            date: "Nov 14, 2026",
            read: "3 min read",
            title: "Why set pieces deserve their own game plan",
            excerpt: "Corners and free kicks are carefully prepared situations where delivery, movement and second balls all matter.",
            image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=85",
            body: [
                "Set pieces offer teams a chance to create a repeatable attacking or defensive situation. The delivery is important, but the runs that create space and the players attacking the second ball can be just as decisive.",
                "Defending teams also prepare detailed plans. They decide which areas to protect, how to track movement and who is responsible for clearing loose balls.",
                "The best routines are simple enough to execute under pressure and flexible enough to respond when the opponent changes its setup."
            ]
        }
    ]
};
