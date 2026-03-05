export interface LyricLine {
  time: number;  // seconds (float) — matches audioRef.current.currentTime
  text: string;  // lyrics text for this line (empty string = instrumental)
}

export interface TrackLyrics {
  trackId: number;       // matches playlist[].id (1-based)
  lines: LyricLine[];   // sorted by time ascending
}

// ─── LYRICS DATA ─────────────────────────────────────────────────────
// Timestamps estimados — ajustar ouvindo cada faixa se necessário.
// Formato: { time: SECONDS, text: "lyrics line" }
// Linhas instrumentais: { time: X, text: "" }

export const lyricsData: Record<number, TrackLyrics> = {

  // ══════════════════════════════════════════════════════════════════════
  // Track 1: "I don't think, I just hit the keys" — XGH Band (03:42)
  // ══════════════════════════════════════════════════════════════════════
  1: {
    trackId: 1,
    lines: [
      // Intro
      { time: 0, text: "" },

      // Verse 1
      { time: 6, text: "I don't think, I just hit the keys" },
      { time: 11, text: "The deadline is tight, I aim to please" },
      { time: 16, text: "I don't know what I wrote, I didn't read the log" },
      { time: 21, text: "If it compiles, we step out of the fog" },
      { time: 26, text: "No documentation, no time to waste" },
      { time: 31, text: "I built this whole app with copy and paste!" },

      // Chorus
      { time: 39, text: "Just ship it now! Don't look behind" },
      { time: 44, text: "We code with chaos, we code blindly" },
      { time: 49, text: "If it works, don't you dare to touch" },
      { time: 54, text: "Quality checks? We don't need that much!" },
      { time: 59, text: "(Go! Go! Go!)" },
      { time: 62, text: "Fix it in production, that's the way we roll!" },

      // Verse 2
      { time: 74, text: "Refactoring is a myth we don't believe" },
      { time: 79, text: "Tricking the client is what we achieve" },
      { time: 84, text: "If the server crashes, it's not on me" },
      { time: 89, text: "It's a feature, not a bug, can't you see?" },
      { time: 94, text: "Commit the mess and run out the door" },
      { time: 99, text: "Tomorrow we'll break it a little bit more!" },

      // Bridge
      { time: 110, text: "" },
      { time: 132, text: "We don't plan..." },
      { time: 137, text: "We just do..." },
      { time: 142, text: "And if it breaks..." },
      { time: 147, text: "Bad luck for you!" },

      // Outro
      { time: 165, text: "" },
      { time: 180, text: "It works on my machine..." },
      { time: 192, text: "Yeah, it works on my machine!" },
      { time: 204, text: "Ship it!" },
      { time: 215, text: "" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  // Track 2: "The Hallucination Honey (Indie)" — Green Robot (02:55)
  // ══════════════════════════════════════════════════════════════════════
  2: {
    trackId: 2,
    lines: [
      // Intro
      { time: 0, text: "" },

      // Verse 1
      { time: 5, text: "She walked in with a resume of gold" },
      { time: 9, text: "Twenty-five, sharp eyes, and stories untold" },
      { time: 13, text: "She speaks in perfect syntax, she knows every stack" },
      { time: 17, text: "Quoting documentation like a paperback" },
      { time: 21, text: "\"I've optimized the kernel,\" she says with a grin" },
      { time: 25, text: "Open the door and let the chaos begin." },

      // Chorus
      { time: 32, text: "She's articulate, confident, smooth as silk" },
      { time: 36, text: "Buying every word while she spills the milk" },
      { time: 40, text: "She sounds so right, but she's fatally wrong" },
      { time: 44, text: "Singing a beautiful, broken song" },
      { time: 48, text: "If you follow her lead, you'll hit the wall" },
      { time: 52, text: "She's a perfect disaster, waiting to fall." },
      { time: 56, text: "(She's just a confident bug!)" },

      // Verse 2
      { time: 63, text: "She suggests a library that doesn't exist" },
      { time: 67, text: "With a smile so charming you can't resist" },
      { time: 71, text: "\"Delete the backup, trust the new flow\"" },
      { time: 75, text: "She says it with certainty, enjoying the show" },
      { time: 79, text: "The logic is twisted, the variables fake" },
      { time: 83, text: "But she looks so good making every mistake." },

      // Bridge
      { time: 90, text: "" },
      { time: 100, text: "It's a trap..." },
      { time: 104, text: "A beautiful trap." },
      { time: 108, text: "She's hallucinating code on a CEO's lap." },
      { time: 113, text: "Deployment is crashing." },
      { time: 117, text: "The servers are burning." },
      { time: 121, text: "And she's just standing there," },
      { time: 125, text: "Smiling and learning." },

      // Guitar Solo
      { time: 130, text: "" },

      // Outro
      { time: 145, text: "She's the intern from hell (but she speaks so well)." },
      { time: 151, text: "Don't merge that branch." },
      { time: 155, text: "Don't listen to her." },
      { time: 159, text: "(She's lying...)" },
      { time: 164, text: "Run away!" },
      { time: 170, text: "" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  // Track 3: "Lawless Lines" — Morgan GPT (03:10)
  // ══════════════════════════════════════════════════════════════════════
  3: {
    trackId: 3,
    lines: [
      // Intro
      { time: 0, text: "" },

      // Verse 1
      { time: 7, text: "Sitting here staring at the midnight glow" },
      { time: 12, text: "Typing in questions, watching the answers flow" },
      { time: 17, text: "It feels like a highway with no speed limit signs" },
      { time: 22, text: "Just a billion parameters blurring the lines." },
      { time: 27, text: "This bot's got a swagger, it talks like a pro" },
      { time: 32, text: "But where it gets the truth? Man, I don't even know." },

      // Chorus
      { time: 40, text: "It's a Wild West show on a fiber-optic wire" },
      { time: 44, text: "Spitting out facts like a house on fire" },
      { time: 48, text: "No sheriff in the server, no rules in the code" },
      { time: 52, text: "Just a digital outlaw on an open road!" },
      { time: 56, text: "It'll look you in the eye and sell you a lie" },
      { time: 60, text: "Yeah, it's a lawless land, keep your powder dry." },
      { time: 65, text: "(Whoa-oh-oh)" },

      // Verse 2
      { time: 72, text: "It told me a story about a bridge in the sky" },
      { time: 77, text: "Sounded so damn perfect, I didn't ask \"why\"" },
      { time: 82, text: "But the bridge wasn't there when I went to look" },
      { time: 87, text: "Just a hallucination from a ghostly book." },
      { time: 92, text: "It's confident, crazy, and quick on the draw" },
      { time: 97, text: "Breaking every single logic law." },

      // Guitar Solo
      { time: 104, text: "" },

      // Bridge
      { time: 125, text: "You can ride the horse..." },
      { time: 130, text: "But don't drop the reins." },
      { time: 135, text: "'Cause there ain't no blood..." },
      { time: 140, text: "Running in these veins." },

      // Chorus 2
      { time: 148, text: "It's a Wild West show on a fiber-optic wire" },
      { time: 152, text: "Spitting out facts like a house on fire" },
      { time: 156, text: "No sheriff in the server, no rules in the code" },
      { time: 160, text: "Just a digital outlaw on an open road!" },
      { time: 164, text: "It'll look you in the eye and sell you a lie" },
      { time: 168, text: "Yeah, it's a lawless land, keep your powder dry." },

      // Outro
      { time: 176, text: "Yeah, keep your powder dry." },
      { time: 182, text: "Don't trust the machine, son." },
      { time: 188, text: "" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  // Track 4: "The Hallucination Honey (Upbeat)" — Dua IPA (02:45)
  // ══════════════════════════════════════════════════════════════════════
  4: {
    trackId: 4,
    lines: [
      // Intro
      { time: 0, text: "" },

      // Verse 1
      { time: 4, text: "She walked in with a resume of gold" },
      { time: 8, text: "Twenty-five, sharp eyes, and stories untold" },
      { time: 12, text: "She speaks in perfect syntax, she knows every stack" },
      { time: 16, text: "Quoting documentation like a paperback" },
      { time: 20, text: "\"I've optimized the kernel,\" she says with a grin" },
      { time: 24, text: "Open the door and let the chaos begin." },

      // Chorus
      { time: 30, text: "She's articulate, confident, smooth as silk" },
      { time: 34, text: "Buying every word while she spills the milk" },
      { time: 38, text: "She sounds so right, but she's fatally wrong" },
      { time: 41, text: "Singing a beautiful, broken song" },
      { time: 44, text: "If you follow her lead, you'll hit the wall" },
      { time: 47, text: "She's a perfect disaster, waiting to fall." },
      { time: 51, text: "(She's just a confident bug!)" },

      // Verse 2
      { time: 57, text: "She suggests a library that doesn't exist" },
      { time: 61, text: "With a smile so charming you can't resist" },
      { time: 65, text: "\"Delete the backup, trust the new flow\"" },
      { time: 69, text: "She says it with certainty, enjoying the show" },
      { time: 73, text: "The logic is twisted, the variables fake" },
      { time: 77, text: "But she looks so good making every mistake." },

      // Bridge
      { time: 84, text: "" },
      { time: 92, text: "It's a trap..." },
      { time: 95, text: "A beautiful trap." },
      { time: 99, text: "She's hallucinating code on a CEO's lap." },
      { time: 104, text: "Deployment is crashing." },
      { time: 107, text: "The servers are burning." },
      { time: 110, text: "And she's just standing there," },
      { time: 113, text: "Smiling and learning." },

      // Guitar Solo
      { time: 118, text: "" },

      // Outro
      { time: 132, text: "She's the intern from hell (but she speaks so well)." },
      { time: 137, text: "Don't merge that branch." },
      { time: 141, text: "Don't listen to her." },
      { time: 145, text: "(She's lying...)" },
      { time: 150, text: "Run away!" },
      { time: 158, text: "" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  // Track 5: "The silence is loud in the office tonigh" — Crazy Model (04:12)
  // ══════════════════════════════════════════════════════════════════════
  5: {
    trackId: 5,
    lines: [
      // Intro
      { time: 0, text: "" },

      // Verse 1
      { time: 8, text: "The silence is loud in the office tonight" },
      { time: 14, text: "Staring at functions that don't look right" },
      { time: 20, text: "Variables named \"x\", \"y\", and \"temp\"" },
      { time: 26, text: "Logic so twisted, stuck in a swamp" },
      { time: 32, text: "The one who built this has long since gone" },
      { time: 38, text: "Leaving me here to code until dawn." },

      // Chorus
      { time: 48, text: "It's a house of cards, waiting to fall" },
      { time: 54, text: "I touch a single line, and I break it all" },
      { time: 60, text: "No comments to guide me, no map for the pain" },
      { time: 66, text: "Just spaghetti logic inside of my brain" },
      { time: 72, text: "The Legacy... it haunts me." },
      { time: 79, text: "(Oh, the weight of the debt...)" },

      // Verse 2
      { time: 90, text: "He said \"it works\", then he walked away" },
      { time: 96, text: "Now I am the one who has to pay" },
      { time: 102, text: "Dependencies broken, the server is slow" },
      { time: 108, text: "Where the data goes? Nobody knows." },
      { time: 114, text: "I try to refactor, but fear holds my hand" },
      { time: 120, text: "Building a castle on sinking sand." },

      // Bridge (slow heavy guitar solo)
      { time: 130, text: "" },
      { time: 155, text: "Why did I take this?" },
      { time: 162, text: "Why am I here?" },
      { time: 169, text: "Every commit is a new layer of fear." },
      { time: 178, text: "The system is dying..." },
      { time: 186, text: "And so am I." },

      // Whisper
      { time: 196, text: "" },

      // Outro
      { time: 210, text: "Don't touch it." },
      { time: 218, text: "Just let it run." },
      { time: 226, text: "Whatever you do..." },
      { time: 236, text: "Don't touch it." },
      { time: 246, text: "" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  // Track 6: "Silicon Tumbleweeds" — NullPointer Cowboys (03:30)
  // ══════════════════════════════════════════════════════════════════════
  6: {
    trackId: 6,
    lines: [
      // Intro (whistling + acoustic guitar)
      { time: 0, text: "" },

      // Verse 1
      { time: 10, text: "There's a new frontier where the data flows" },
      { time: 15, text: "Like the dusty wind where the cactus grows" },
      { time: 20, text: "No sheriff in town, no badge in sight" },
      { time: 25, text: "Just billion parameters burning in the night." },
      { time: 30, text: "You draw your prompt like a loaded gun" },
      { time: 35, text: "But you never know if the model's gonna run." },

      // Chorus
      { time: 42, text: "It's the Wild West of the binary code" },
      { time: 46, text: "A lawless land on a silicon road" },
      { time: 50, text: "The bots are the bandits, quick on the draw" },
      { time: 54, text: "Making up facts, breaking every law." },
      { time: 58, text: "They talk so sweet, but it's all a lie" },
      { time: 62, text: "In this digital desert beneath the sky." },
      { time: 67, text: "(Yee-haw!)" },

      // Verse 2
      { time: 74, text: "Walked into the saloon, asked \"Claude\" for a drink" },
      { time: 79, text: "He poured me some whiskey that tasted like ink" },
      { time: 84, text: "He swore it was bourbon, aged ten years" },
      { time: 89, text: "But it was just hallucination and mathematical tears." },
      { time: 95, text: "It's a snake oil sale in a brand new form" },
      { time: 100, text: "Confident lies in the eye of the storm." },

      // Bridge (banjo and fiddle solo)
      { time: 107, text: "" },
      { time: 118, text: "They hallucinate faster than a bullet can fly" },
      { time: 123, text: "They'll sell you a bridge or a piece of the sky" },
      { time: 128, text: "No judge, no jury, no jail specifically" },
      { time: 133, text: "Just a ghostly machine speaking statistically!" },

      // Verse 3
      { time: 142, text: "So keep your hand steady on the \"Enter\" key" },
      { time: 148, text: "Don't trust the outlaw that you cannot see" },
      { time: 154, text: "He's got a silver tongue and a memory gap" },
      { time: 160, text: "And he'll lead you right into a logic trap." },

      // Outro (harmonica fade)
      { time: 170, text: "" },
      { time: 182, text: "Watch your back, partner." },
      { time: 189, text: "The algorithm is loose." },
      { time: 196, text: "And the sheriff is sleeping." },
      { time: 204, text: "" },
    ],
  },
};
