export interface LyricLine {
  time: number;  // seconds (float) — matches audioRef.current.currentTime
  text: string;  // lyrics text for this line (empty string = instrumental)
}

export interface TrackLyrics {
  trackId: number;       // matches playlist[].id (1-based)
  lines: LyricLine[];   // sorted by time ascending
}

// ─── LYRICS DATA ─────────────────────────────────────────────────────
// Timestamps calibrados via análise de energia (RMS per second).
// Durações reais: T1=118s T2=147s T3=155s T4=164s T5=270s T6=142s

export const lyricsData: Record<number, TrackLyrics> = {

  // ══════════════════════════════════════════════════════════════════════
  // Track 1: "I don't think, I just hit the keys" — XGH Band (1:58)
  // Energy: high from start, dip 44-49s, spike 89-90s, end 117s
  // ══════════════════════════════════════════════════════════════════════
  1: {
    trackId: 1,
    lines: [
      { time: 0, text: "" },

      // Verse 1
      { time: 4, text: "I don't think, I just hit the keys" },
      { time: 8, text: "The deadline is tight, I aim to please" },
      { time: 12, text: "I don't know what I wrote, I didn't read the log" },
      { time: 16, text: "If it compiles, we step out of the fog" },
      { time: 20, text: "No documentation, no time to waste" },
      { time: 24, text: "I built this whole app with copy and paste!" },

      // Chorus
      { time: 30, text: "Just ship it now! Don't look behind" },
      { time: 34, text: "We code with chaos, we code blindly" },
      { time: 38, text: "If it works, don't you dare to touch" },
      { time: 42, text: "Quality checks? We don't need that much!" },
      { time: 45, text: "(Go! Go! Go!)" },
      { time: 48, text: "Fix it in production, that's the way we roll!" },

      // Verse 2
      { time: 55, text: "Refactoring is a myth we don't believe" },
      { time: 59, text: "Tricking the client is what we achieve" },
      { time: 63, text: "If the server crashes, it's not on me" },
      { time: 67, text: "It's a feature, not a bug, can't you see?" },
      { time: 71, text: "Commit the mess and run out the door" },
      { time: 75, text: "Tomorrow we'll break it a little bit more!" },

      // Bridge (guitar solo → vocals)
      { time: 80, text: "" },
      { time: 89, text: "We don't plan..." },
      { time: 92, text: "We just do..." },
      { time: 95, text: "And if it breaks..." },
      { time: 98, text: "Bad luck for you!" },

      // Outro
      { time: 103, text: "" },
      { time: 106, text: "It works on my machine..." },
      { time: 111, text: "Yeah, it works on my machine!" },
      { time: 115, text: "Ship it!" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  // Track 2: "The Hallucination Honey (Indie)" — Green Robot (2:27)
  // Energy: quiet intro 0-10s, dip 45s, drop 80s, break 125s, end 147s
  // ══════════════════════════════════════════════════════════════════════
  2: {
    trackId: 2,
    lines: [
      { time: 0, text: "" },

      // Verse 1
      { time: 8, text: "She walked in with a resume of gold" },
      { time: 12, text: "Twenty-five, sharp eyes, and stories untold" },
      { time: 16, text: "She speaks in perfect syntax, she knows every stack" },
      { time: 20, text: "Quoting documentation like a paperback" },
      { time: 24, text: "\"I've optimized the kernel,\" she says with a grin" },
      { time: 28, text: "Open the door and let the chaos begin." },

      // Chorus
      { time: 34, text: "She's articulate, confident, smooth as silk" },
      { time: 38, text: "Buying every word while she spills the milk" },
      { time: 42, text: "She sounds so right, but she's fatally wrong" },
      { time: 46, text: "Singing a beautiful, broken song" },
      { time: 50, text: "If you follow her lead, you'll hit the wall" },
      { time: 54, text: "She's a perfect disaster, waiting to fall." },
      { time: 58, text: "(She's just a confident bug!)" },

      // Verse 2
      { time: 64, text: "She suggests a library that doesn't exist" },
      { time: 68, text: "With a smile so charming you can't resist" },
      { time: 72, text: "\"Delete the backup, trust the new flow\"" },
      { time: 76, text: "She says it with certainty, enjoying the show" },
      { time: 80, text: "The logic is twisted, the variables fake" },
      { time: 84, text: "But she looks so good making every mistake." },

      // Bridge (bass solo → vocals)
      { time: 90, text: "" },
      { time: 98, text: "It's a trap..." },
      { time: 101, text: "A beautiful trap." },
      { time: 105, text: "She's hallucinating code on a CEO's lap." },
      { time: 109, text: "Deployment is crashing." },
      { time: 113, text: "The servers are burning." },
      { time: 117, text: "And she's just standing there," },
      { time: 121, text: "Smiling and learning." },

      // Guitar Solo
      { time: 125, text: "" },

      // Outro
      { time: 132, text: "She's the intern from hell (but she speaks so well)." },
      { time: 136, text: "Don't merge that branch." },
      { time: 139, text: "Don't listen to her." },
      { time: 142, text: "(She's lying...)" },
      { time: 145, text: "Run away!" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  // Track 3: "Lawless Lines" — Morgan GPT (2:34)
  // Energy: acoustic intro 0-6s, band kicks ~30s, solo ~88s, end 154s
  // ══════════════════════════════════════════════════════════════════════
  3: {
    trackId: 3,
    lines: [
      { time: 0, text: "" },

      // Verse 1 (acoustic guitar + kick drum)
      { time: 7, text: "Sitting here staring at the midnight glow" },
      { time: 11, text: "Typing in questions, watching the answers flow" },
      { time: 15, text: "It feels like a highway with no speed limit signs" },
      { time: 19, text: "Just a billion parameters blurring the lines." },
      { time: 23, text: "This bot's got a swagger, it talks like a pro" },
      { time: 27, text: "But where it gets the truth? Man, I don't even know." },

      // Chorus (full band kicks in)
      { time: 33, text: "It's a Wild West show on a fiber-optic wire" },
      { time: 37, text: "Spitting out facts like a house on fire" },
      { time: 41, text: "No sheriff in the server, no rules in the code" },
      { time: 45, text: "Just a digital outlaw on an open road!" },
      { time: 49, text: "It'll look you in the eye and sell you a lie" },
      { time: 53, text: "Yeah, it's a lawless land, keep your powder dry." },
      { time: 57, text: "(Whoa-oh-oh)" },

      // Verse 2 (bass heavy)
      { time: 63, text: "It told me a story about a bridge in the sky" },
      { time: 67, text: "Sounded so damn perfect, I didn't ask \"why\"" },
      { time: 71, text: "But the bridge wasn't there when I went to look" },
      { time: 75, text: "Just a hallucination from a ghostly book." },
      { time: 79, text: "It's confident, crazy, and quick on the draw" },
      { time: 83, text: "Breaking every single logic law." },

      // Guitar Solo
      { time: 88, text: "" },

      // Bridge (drums + vocals)
      { time: 101, text: "You can ride the horse..." },
      { time: 105, text: "But don't drop the reins." },
      { time: 109, text: "'Cause there ain't no blood..." },
      { time: 113, text: "Running in these veins." },

      // Chorus 2 (explosive)
      { time: 118, text: "It's a Wild West show on a fiber-optic wire" },
      { time: 122, text: "Spitting out facts like a house on fire" },
      { time: 126, text: "No sheriff in the server, no rules in the code" },
      { time: 130, text: "Just a digital outlaw on an open road!" },
      { time: 134, text: "It'll look you in the eye and sell you a lie" },
      { time: 138, text: "Yeah, it's a lawless land, keep your powder dry." },

      // Outro
      { time: 144, text: "Yeah, keep your powder dry." },
      { time: 149, text: "Don't trust the machine, son." },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  // Track 4: "The Hallucination Honey (Upbeat)" — Dua IPA (2:44)
  // Energy: intro 0-7s, dip 65-70s, solo dip 100-110s, end 164s
  // ══════════════════════════════════════════════════════════════════════
  4: {
    trackId: 4,
    lines: [
      { time: 0, text: "" },

      // Verse 1
      { time: 8, text: "She walked in with a resume of gold" },
      { time: 12, text: "Twenty-five, sharp eyes, and stories untold" },
      { time: 16, text: "She speaks in perfect syntax, she knows every stack" },
      { time: 20, text: "Quoting documentation like a paperback" },
      { time: 24, text: "\"I've optimized the kernel,\" she says with a grin" },
      { time: 28, text: "Open the door and let the chaos begin." },

      // Chorus
      { time: 34, text: "She's articulate, confident, smooth as silk" },
      { time: 38, text: "Buying every word while she spills the milk" },
      { time: 42, text: "She sounds so right, but she's fatally wrong" },
      { time: 46, text: "Singing a beautiful, broken song" },
      { time: 50, text: "If you follow her lead, you'll hit the wall" },
      { time: 54, text: "She's a perfect disaster, waiting to fall." },
      { time: 58, text: "(She's just a confident bug!)" },

      // Verse 2
      { time: 64, text: "She suggests a library that doesn't exist" },
      { time: 68, text: "With a smile so charming you can't resist" },
      { time: 72, text: "\"Delete the backup, trust the new flow\"" },
      { time: 76, text: "She says it with certainty, enjoying the show" },
      { time: 80, text: "The logic is twisted, the variables fake" },
      { time: 84, text: "But she looks so good making every mistake." },

      // Bridge (bass solo → vocals)
      { time: 90, text: "" },
      { time: 98, text: "It's a trap..." },
      { time: 101, text: "A beautiful trap." },
      { time: 105, text: "She's hallucinating code on a CEO's lap." },
      { time: 109, text: "Deployment is crashing." },
      { time: 113, text: "The servers are burning." },
      { time: 117, text: "And she's just standing there," },
      { time: 121, text: "Smiling and learning." },

      // Guitar Solo (chaotic and fuzzy)
      { time: 126, text: "" },

      // Outro
      { time: 138, text: "She's the intern from hell (but she speaks so well)." },
      { time: 144, text: "Don't merge that branch." },
      { time: 149, text: "Don't listen to her." },
      { time: 154, text: "(She's lying...)" },
      { time: 159, text: "Run away!" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  // Track 5: "The silence is loud in the office tonigh" — Crazy Model (4:29)
  // Energy: 34s quiet intro!, band ~68s, dip 160-165s (solo), dip 197s, end 270s
  // ══════════════════════════════════════════════════════════════════════
  5: {
    trackId: 5,
    lines: [
      // Long quiet intro (34 seconds of ambient)
      { time: 0, text: "" },

      // Verse 1 (quiet, building slowly)
      { time: 35, text: "The silence is loud in the office tonight" },
      { time: 41, text: "Staring at functions that don't look right" },
      { time: 47, text: "Variables named \"x\", \"y\", and \"temp\"" },
      { time: 53, text: "Logic so twisted, stuck in a swamp" },
      { time: 59, text: "The one who built this has long since gone" },
      { time: 65, text: "Leaving me here to code until dawn." },

      // Chorus (band kicks in at ~68s)
      { time: 73, text: "It's a house of cards, waiting to fall" },
      { time: 79, text: "I touch a single line, and I break it all" },
      { time: 85, text: "No comments to guide me, no map for the pain" },
      { time: 91, text: "Just spaghetti logic inside of my brain" },
      { time: 97, text: "The Legacy... it haunts me." },
      { time: 103, text: "(Oh, the weight of the debt...)" },

      // Verse 2 (intense, energy spike at 105)
      { time: 112, text: "He said \"it works\", then he walked away" },
      { time: 118, text: "Now I am the one who has to pay" },
      { time: 124, text: "Dependencies broken, the server is slow" },
      { time: 130, text: "Where the data goes? Nobody knows." },
      { time: 136, text: "I try to refactor, but fear holds my hand" },
      { time: 142, text: "Building a castle on sinking sand." },

      // Bridge (slow heavy guitar solo — energy dips 160-165)
      { time: 150, text: "" },
      { time: 178, text: "Why did I take this?" },
      { time: 184, text: "Why am I here?" },
      { time: 190, text: "Every commit is a new layer of fear." },
      { time: 198, text: "The system is dying..." },
      { time: 206, text: "And so am I." },

      // Whisper (energy dip at 197)
      { time: 214, text: "" },

      // Outro (sustained energy, slow dramatic)
      { time: 228, text: "Don't touch it." },
      { time: 238, text: "Just let it run." },
      { time: 248, text: "Whatever you do..." },
      { time: 258, text: "Don't touch it." },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  // Track 6: "Silicon Tumbleweeds" — NullPointer Cowboys (2:21)
  // Energy: intro 0-12s, break 93-96s, break 109-111s, fade 135s, end 141s
  // ══════════════════════════════════════════════════════════════════════
  6: {
    trackId: 6,
    lines: [
      // Intro (whistling + acoustic guitar)
      { time: 0, text: "" },

      // Verse 1
      { time: 12, text: "There's a new frontier where the data flows" },
      { time: 16, text: "Like the dusty wind where the cactus grows" },
      { time: 20, text: "No sheriff in town, no badge in sight" },
      { time: 24, text: "Just billion parameters burning in the night." },
      { time: 28, text: "You draw your prompt like a loaded gun" },
      { time: 32, text: "But you never know if the model's gonna run." },

      // Chorus
      { time: 37, text: "It's the Wild West of the binary code" },
      { time: 41, text: "A lawless land on a silicon road" },
      { time: 45, text: "The bots are the bandits, quick on the draw" },
      { time: 49, text: "Making up facts, breaking every law." },
      { time: 53, text: "They talk so sweet, but it's all a lie" },
      { time: 57, text: "In this digital desert beneath the sky." },
      { time: 61, text: "(Yee-haw!)" },

      // Verse 2
      { time: 65, text: "Walked into the saloon, asked \"Claude\" for a drink" },
      { time: 69, text: "He poured me some whiskey that tasted like ink" },
      { time: 73, text: "He swore it was bourbon, aged ten years" },
      { time: 77, text: "But it was just hallucination and mathematical tears." },
      { time: 82, text: "It's a snake oil sale in a brand new form" },
      { time: 86, text: "Confident lies in the eye of the storm." },

      // Bridge (banjo + fiddle solo, break at 93-96)
      { time: 91, text: "" },
      { time: 97, text: "They hallucinate faster than a bullet can fly" },
      { time: 101, text: "They'll sell you a bridge or a piece of the sky" },
      { time: 105, text: "No judge, no jury, no jail specifically" },
      { time: 109, text: "Just a ghostly machine speaking statistically!" },

      // Verse 3 (break at 109-111, rebuilds)
      { time: 114, text: "So keep your hand steady on the \"Enter\" key" },
      { time: 118, text: "Don't trust the outlaw that you cannot see" },
      { time: 122, text: "He's got a silver tongue and a memory gap" },
      { time: 126, text: "And he'll lead you right into a logic trap." },

      // Outro (harmonica fade, ends ~141s)
      { time: 131, text: "" },
      { time: 133, text: "Watch your back, partner." },
      { time: 136, text: "The algorithm is loose." },
      { time: 139, text: "And the sheriff is sleeping." },
    ],
  },
};
