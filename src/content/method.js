// src/content/method.js
// Content for the three Investigation Method pages: /method, /method-examples, /worksheet
//
// FORMAT NOTES
// - Inline code uses `backticks`, bold uses **double asterisks**. Render every string through <RichText>.
// - The flags inside WORKED_EXAMPLES are SAMPLE flags for teaching. They are NOT workshop flags.
//   Never add them to src/utils/flags.js and never reuse the workshop's real demo files in the examples.
// - The five METHOD_STEPS are shared by the pages and by the interactive worksheet component.

// ---------------------------------------------------------------------------
// The five questions (shared everywhere)
// ---------------------------------------------------------------------------
export const METHOD_STEPS = [
  {
    id: "asking",
    num: 1,
    title: "What is the challenge asking?",
    short: "Understand the goal",
    question: "What is the challenge asking?",
    repeats: false,
    why: "Most wasted time comes from solving the wrong problem. If you cannot say the goal in one sentence, you are not ready to open a tool.",
    howTo: [
      "Rewrite the challenge in one sentence, in your own words.",
      "List what you were given: a file, a URL, a piece of text, or a server address.",
      "Write what the answer should look like. Usually it is a flag such as `flag{...}`.",
      "Guess the category: Crypto, Web, Forensics, Linux or Misc. A guess is fine, you can change it later."
    ],
    prompts: [
      "What exactly do I have to find or produce?",
      "What was I given, and what was I not given?",
      "Which category does this look like, and why?"
    ],
    weak: "Decode this thing.",
    strong: "I was given one line of text and nothing else. I must turn it into a readable flag that starts with `flag{`. There is no file and no website, so I think this is Crypto or encoding.",
    mistakes: [
      "Opening a tool before reading the description twice.",
      "Skipping the challenge title. Titles often name the technique."
    ]
  },
  {
    id: "clues",
    num: 2,
    title: "What clues do you have?",
    short: "Collect observations",
    question: "What clues do you have?",
    repeats: false,
    why: "A clue is any fact you can observe, before you guess anything. Good players list clues first and theories second. **Everything is a clue. Try the simple thing first.**",
    howTo: [
      "Write down every observation, even boring ones. Do not judge them yet.",
      "Read the title, the description and the hints again. Each word may be a clue.",
      "Look at the data itself: which characters appear, how long it is, how it starts and ends.",
      "For a file: its type, its size, its name. For a website: the page source, the cookies, the URL.",
      "Use quick, cheap tools to collect more clues. Do not change anything yet."
    ],
    prompts: [
      "What do I see that I have not written down yet?",
      "Which characters appear, how long is it, and how does it start and end?",
      "What looks odd, out of place, or too big, too small or too neat?"
    ],
    weak: "It is a weird string.",
    strong: "The string is 40 characters long. It uses only letters and digits. It ends with `=`. The title says 'Mystery Text'. There is no file.",
    mistakes: [
      "Collecting only the clues that support the theory you already like.",
      "Not writing clues down, then forgetting them ten minutes later."
    ]
  },
  {
    id: "hypothesis",
    num: 3,
    title: "What is your hypothesis?",
    short: "Make a testable guess",
    question: "What is your hypothesis?",
    repeats: true,
    why: "A hypothesis is a guess with a reason and a prediction. The prediction is what makes it testable. Without it you are only pressing buttons.",
    howTo: [
      "Use the template: **I think ___ because ___. If I am right, I will see ___.**",
      "The 'because' must point to a clue from step 2. If you cannot name a clue, you are guessing.",
      "Write the prediction before you run anything. Predict, then press Enter.",
      "Choose the simplest explanation first. Cheap and likely beats clever and rare."
    ],
    prompts: [
      "Which clue makes me believe this?",
      "What exactly will I see if I am right?",
      "What would I see if I am wrong?"
    ],
    weak: "Maybe it is encrypted.",
    strong: "I think it is Base64, because it uses only letters and digits, the length is a multiple of 4, and it ends with `=`. If I am right, `From Base64` will print readable text.",
    mistakes: [
      "A hypothesis with no 'because'. That is a guess, not a hypothesis.",
      "A prediction so vague that any result would 'match' it."
    ]
  },
  {
    id: "test",
    num: 4,
    title: "What did you test?",
    short: "Run it and record the result",
    question: "What did you test?",
    repeats: true,
    why: "A test is one action with one expected result. Write down what you did and what really happened, then mark the result. Failed tests are not wasted: they remove options and give new clues.",
    howTo: [
      "Run the exact command or tool from your hypothesis. Change **one thing at a time**.",
      "Write the command or the CyberChef recipe, so you can repeat it.",
      "Write what actually happened, even if it is nothing.",
      "Mark the result: **Supported**, **Refuted** or **Unclear** (see the guide below).",
      "If the result is Refuted or Unclear, add the new fact to your clues and go back to step 2 or 3."
    ],
    prompts: [
      "What exactly did I run or click?",
      "Did the result match my prediction?",
      "What new fact did this give me, even if the test failed?"
    ],
    weak: "I tried some tools. Nothing worked.",
    strong: "I ran `From Base64` in CyberChef. The output was unreadable symbols, so the prediction failed. Result: Refuted. New clue: it is not plain Base64.",
    mistakes: [
      "Trying five tools at once, so you cannot tell which one mattered.",
      "Not recording failed tests, then repeating them later."
    ]
  },
  {
    id: "learned",
    num: 5,
    title: "What did you learn?",
    short: "Turn it into a rule",
    question: "What did you learn?",
    repeats: false,
    why: "Solving one challenge is luck. Remembering the pattern is skill. This step is what makes the next challenge faster, and it is the base of a good write-up.",
    howTo: [
      "Write the pattern in one sentence: 'When I see ___, I should try ___.'",
      "Write what you would try first next time, and what you would skip.",
      "Note any wrong turn and what clue should have warned you.",
      "Copy the flag exactly, including `flag{` and `}`."
    ],
    prompts: [
      "What clue gave it away, and when did I first see it?",
      "What would I do first if I met this again?",
      "What can I teach a friend in one sentence?"
    ],
    weak: "I got the flag.",
    strong: "A string ending with `=` that uses only letters and digits is usually Base64. I should check the alphabet and length first. I lost 5 minutes trying ROT13 before looking at the characters.",
    mistakes: [
      "Closing the challenge the moment the flag is accepted.",
      "Writing 'I learned a lot' instead of a rule you could reuse."
    ]
  }
];

// ---------------------------------------------------------------------------
// Result guide for step 4
// ---------------------------------------------------------------------------
export const RESULT_GUIDE = [
  {
    result: "Supported",
    meaning: "What I predicted really happened.",
    next: "Keep going: use the output as a new clue and form the next hypothesis, or stop if you have the flag."
  },
  {
    result: "Refuted",
    meaning: "What I predicted did not happen.",
    next: "Good news. You removed one option. Write 'it is not X' as a new clue and go back to step 2."
  },
  {
    result: "Unclear",
    meaning: "The result could mean two things, or I may have made a mistake in the test.",
    next: "Repeat the test once, changing one thing, or confirm it with a second tool before you trust it."
  }
];

// ---------------------------------------------------------------------------
// Mindset and habits
// ---------------------------------------------------------------------------
export const MINDSET_RULES = [
  { rule: "Everything is a clue.", meaning: "Titles, file names, sizes, odd spacing and error messages all count." },
  { rule: "Try the simple thing first.", meaning: "Most beginner challenges use the cheapest trick: view source, `file`, `strings`, a common encoding." },
  { rule: "Predict before you press Enter.", meaning: "A prediction turns a click into a test, and it is how you notice surprises." },
  { rule: "Change one thing at a time.", meaning: "If you change three things and it works, you learned nothing." },
  { rule: "A refuted hypothesis is progress.", meaning: "Ruling something out is a result. Write it down." },
  { rule: "Write it down.", meaning: "Notes beat memory, and they become your write-up for free." }
];

export const BAD_HABITS = [
  {
    habit: "Tool spraying",
    whyItFails: "Running every tool you know hides which one mattered, and you learn nothing.",
    instead: "Pick one tool because of one clue. State what you expect."
  },
  {
    habit: "Skipping step 2",
    whyItFails: "You guess from the title alone and miss the clue that was on screen all along.",
    instead: "Write at least three observations before the first hypothesis."
  },
  {
    habit: "Falling in love with one theory",
    whyItFails: "After two failed tests you keep trying variations of the same idea.",
    instead: "After two Refuted results, return to step 2 and look for a different kind of clue."
  },
  {
    habit: "Searching for the answer",
    whyItFails: "Searching a challenge name teaches you nothing and breaks the spirit of the event.",
    instead: "Search the concept: 'how does Base64 padding work', not the challenge title."
  },
  {
    habit: "Not recording failures",
    whyItFails: "You repeat the same failed test later, or cannot explain your path in a write-up.",
    instead: "Log every test and mark it Supported, Refuted or Unclear."
  }
];

// ---------------------------------------------------------------------------
// Stuck ladder
// ---------------------------------------------------------------------------
export const STUCK_LADDER = [
  { rung: 1, minutes: "0 to 2 min", action: "Re-read the title and description.", detail: "Read every word slowly. Underline words you did not use yet." },
  { rung: 2, minutes: "2 to 5 min", action: "Find one new clue.", detail: "Look at the data again with a tool you have not tried: length, characters, file type, page source." },
  { rung: 3, minutes: "5 to 8 min", action: "Try a simpler hypothesis.", detail: "Ask: what is the dullest explanation? Test that first." },
  { rung: 4, minutes: "8 to 10 min", action: "Search the concept, not the answer.", detail: "Search for how a technique works, for example 'what does an equals sign at the end mean'." },
  { rung: 5, minutes: "10 to 12 min", action: "Explain it to a neighbour.", detail: "Say your clues and hypotheses out loud. Many people solve it halfway through the explanation." },
  { rung: 6, minutes: "After 12 min", action: "Take the hint, then write down what you missed.", detail: "Using a hint is fine. Writing down which clue you overlooked is what makes you faster next time." }
];

// ---------------------------------------------------------------------------
// Where to start by category
// ---------------------------------------------------------------------------
export const CATEGORY_STARTERS = [
  {
    category: "Crypto and encoding",
    firstClues: "Which characters appear, the length, an ending like `=`, a known start like `synt{`",
    firstTools: "CyberChef (`From Base64`, `From Hex`, `ROT13`, `Magic`), terminal `base64 -d`, `xxd -r -p`",
    typicalHypothesis: "Only 0-9 and a-f appear, so I think it is hex."
  },
  {
    category: "Web",
    firstClues: "Comments in the page source, linked CSS and JS files, cookies, `/robots.txt`, requests in the Network tab",
    firstTools: "View source, DevTools (Elements, Sources, Network, Application), `curl`",
    typicalHypothesis: "The page trusts a cookie, so changing its value will change what I see."
  },
  {
    category: "Forensics and stego",
    firstClues: "Real file type, size compared with what you expect, readable text, metadata, extra files inside",
    firstTools: "`file`, `strings`, `exiftool`, `binwalk -e`, `xxd`, `steghide`",
    typicalHypothesis: "A second file is glued to the end, because an unrelated file name shows up in the strings."
  },
  {
    category: "Linux",
    firstClues: "Hidden files, folder layout, very long log files",
    firstTools: "`ls -a`, `cd`, `cat`, `grep -rn`, `find`",
    typicalHypothesis: "The flag is in a hidden file, because normal `ls` shows nothing useful."
  }
];

// ---------------------------------------------------------------------------
// Questions for the facilitator to ask while walking around
// ---------------------------------------------------------------------------
export const COACH_QUESTIONS = [
  "What are you trying to find, in your own words?",
  "What have you noticed so far? Show me your list.",
  "What did you expect to see before you ran that?",
  "What does that result tell you, even though it failed?",
  "What is the simplest explanation you have not tested yet?",
  "If your idea is wrong, what would you see instead?",
  "Have you written down what you tried?"
];

// ---------------------------------------------------------------------------
// PAGE 1: /method
// ---------------------------------------------------------------------------
export const methodPageContent = {
  title: "The Investigation Method: How to Think Like a CTF Player",
  time: "0:10 to 0:20 (inside Before You Start)",
  tag: "THINKING SKILLS",
  goal: "participants learn a repeatable way to approach any challenge: ask, collect clues, guess with a reason, test, and turn the result into a rule. Tools change from challenge to challenge, but this process does not.",
  intro: [
    "A CTF does not test what you already know. It tests how you behave when you meet something you do not know yet.",
    "Experienced players are not magically smarter. They follow a loop, write things down, and treat every result, even a failure, as information."
  ],
  quickCard: [
    "1. What is the challenge asking?",
    "2. What clues do you have?",
    "3. What is your hypothesis? (I think ___ because ___. If I am right, I will see ___.)",
    "4. What did you test? (Supported, Refuted or Unclear)",
    "5. What did you learn? (When I see ___, I try ___.)"
  ],
  loop: {
    anchor: "the-loop",
    title: "The loop",
    text: "Steps 1 and 2 happen once at the start. Steps 3 and 4 repeat as rounds. Every round, even a failed one, adds a clue, so you always return to step 2 with something new. Step 5 happens when you are done.",
    loopLabel: "Not solved? Add the new clue and go back to step 2.",
    note: "The five questions are also the headings of the Investigation Worksheet, so the same words appear on paper, on screen and in your write-up."
  },
  stepsAnchor: "five-steps",
  stepsTitle: "The five questions, one by one",
  hypothesis: {
    anchor: "hypothesis-rules",
    title: "How to write a good hypothesis",
    template: "I think ___ because ___. If I am right, I will see ___.",
    rules: [
      { rule: "Observation", text: "Start from a clue you really saw. 'Because the length is a multiple of 4.'" },
      { rule: "Belief", text: "Say what you think is going on. 'I think it is Base64.'" },
      { rule: "Prediction", text: "Say what you will see if you are right. 'From Base64 will output readable text.'" },
      { rule: "Way out", text: "Know what would prove you wrong. 'If I get unreadable bytes, it is not Base64.'" }
    ],
    pairs: [
      { weak: "Maybe it is encrypted.", strong: "I think it is hex, because only 0-9 and a-f appear. If I am right, `From Hex` will print readable characters." },
      { weak: "Try random tools.", strong: "I think extra data is glued after the image, because the file is much larger than similar photos. If I am right, `strings` will show readable text near the end." },
      { weak: "The cookie is hacked?", strong: "I think the page trusts the cookie value, because the script reads it on load. If I am right, changing the value and reloading will change the page." }
    ]
  },
  results: {
    anchor: "reading-results",
    title: "Reading your test results",
    guide: RESULT_GUIDE
  },
  mindset: {
    anchor: "mindset",
    title: "Six rules of mindset",
    rules: MINDSET_RULES
  },
  habits: {
    anchor: "bad-habits",
    title: "Habits that waste time",
    habits: BAD_HABITS
  },
  stuck: {
    anchor: "stuck-ladder",
    title: "The stuck ladder",
    intro: "Being stuck is normal. Climb one rung at a time. Do not jump to the hint, and do not stay on one rung for ten minutes.",
    rungs: STUCK_LADDER
  },
  byCategory: {
    anchor: "by-category",
    title: "Where to start, by category",
    intro: "The method is the same everywhere. Only the first clues and first tools change.",
    rows: CATEGORY_STARTERS
  },
  facilitator: {
    anchor: "facilitator-script",
    title: "Facilitator script: a 5-minute live walkthrough",
    intro: "Use this at the start of the workshop. Put the five questions on screen and keep notes on the board.",
    steps: [
      {
        time: "0:00 to 0:30",
        say: "Before you open any tool, answer five questions. Here they are.",
        doThis: "Show the quick card from the top of this page."
      },
      {
        time: "0:30 to 1:30",
        say: "Here is a challenge. What is it asking, and what clues do you see?",
        doThis: "Show the Base64 example string (Example 1). Ask for observations and write every one on the board, even boring ones."
      },
      {
        time: "1:30 to 2:30",
        say: "Give me a hypothesis. It must have a 'because'.",
        doThis: "Take three guesses. Reject any without a clue. Turn the best one into 'I think ___ because ___. If I am right, I will see ___.'"
      },
      {
        time: "2:30 to 3:30",
        say: "Predict the output, then I press Enter.",
        doThis: "Run the test in CyberChef. Mark the result Supported on the board."
      },
      {
        time: "3:30 to 4:30",
        say: "Now a trickier one. This string also looks like Base64. Let us see.",
        doThis: "Show Example 2 (layered). Let the room try Base64 first so it fails. Celebrate the Refuted result and move to the next round."
      },
      {
        time: "4:30 to 5:00",
        say: "What would you do first next time?",
        doThis: "Collect two rules from the room, then point to the Worksheet page for the demos."
      }
    ],
    coachTitle: "Questions to ask while walking around",
    coachQuestions: COACH_QUESTIONS
  },
  glossary: [
    { term: "Flag", meaning: "The secret text you are looking for, such as `flag{...}`." },
    { term: "Clue", meaning: "A fact you can observe, before you guess anything." },
    { term: "Hypothesis", meaning: "A guess with a reason and a prediction." },
    { term: "Recon", meaning: "Gathering clues with quick, harmless checks before trying anything clever." },
    { term: "Refuted", meaning: "Your prediction did not happen, so that idea is ruled out." },
    { term: "Write-up", meaning: "A short note explaining how you solved a challenge." }
  ],
  nextLinks: [
    { label: "See worked examples", path: "/method-examples" },
    { label: "Open the worksheet", path: "/worksheet" }
  ]
};

// ---------------------------------------------------------------------------
// PAGE 2: /method-examples
// ---------------------------------------------------------------------------
export const examplesPageContent = {
  title: "Worked Examples: The Method in Action",
  time: "Use during Demo 1, 2 and 3",
  tag: "THINKING SKILLS",
  goal: "participants see complete, honest investigations, including the wrong turns. Each example uses different files and strings from the live demos, so nothing in the demos is spoiled.",
  howToRead: [
    "Read the challenge and cover the rest. Fill in your own clues and hypothesis first.",
    "Then uncover each round. Compare your prediction with the example's prediction.",
    "Notice the Refuted and Unclear rounds. They are where the learning happens."
  ],
  note: "The flags shown here are sample flags made for this page. They are not workshop flags and the Flag Checker will not accept them.",
  trySamePath: "/worksheet"
};

// ---------------------------------------------------------------------------
// PAGE 3: /worksheet
// ---------------------------------------------------------------------------
export const worksheetPageContent = {
  title: "CTF Investigation Worksheet",
  time: "Use in every demo and in the Mini CTF",
  tag: "THINKING SKILLS",
  goal: "participants practise the five questions on a real challenge and keep a record they can turn into a write-up.",
  intro: [
    "Fill in one worksheet for each challenge you work on. It saves automatically in your browser.",
    "When you finish, copy it as a Markdown write-up or print a blank copy to use on paper."
  ],
  howToUse: [
    "Type the challenge name, then answer step 1 and list your clues for step 2.",
    "Add a round for each hypothesis. Write your prediction BEFORE you run the test.",
    "Mark every test Supported, Refuted or Unclear. Failed rounds count.",
    "When you solve it, finish step 5 and paste the flag."
  ],
  tips: [
    "Aim for at least two rounds. One round usually means you skipped the clues.",
    "If you are stuck, open the stuck ladder instead of the hint.",
    "In the Mini CTF, fill in one worksheet per solved challenge and show it to a facilitator."
  ],
  printNote: "The printable copy contains only the five questions with space to write, so it works without a laptop.",
  writeupHeading: "Copy as write-up"
};

// ---------------------------------------------------------------------------
// WORKED EXAMPLES (used by /method-examples and by the worksheet's example loader)
// Each round: hypothesis, prediction, test, observed, result ("Supported" | "Refuted" | "Unclear"), note (optional)
// ---------------------------------------------------------------------------
export const WORKED_EXAMPLES = [
  {
    id: "ex-base64",
    title: "Example 1: A string with an equals sign",
    category: "Crypto",
    difficulty: "Easy",
    tools: ["CyberChef"],
    challenge: {
      title: "Mystery Text",
      description: "Someone left this line on the whiteboard. Can you read it?",
      given: "ZmxhZ3t3b3Jrc2hlZXRfZXhhbXBsZX0=",
      givenType: "A text string, no file"
    },
    worksheet: {
      asking: "I was given one line of text. I must turn it into a readable flag that starts with `flag{`. There is no file or website, so I think it is encoding (Crypto).",
      clues: [
        "The string is 32 characters long.",
        "It uses only capital letters, small letters and digits.",
        "It ends with a single `=`.",
        "The title says 'Mystery Text' and the description says 'read it'."
      ],
      rounds: [
        {
          hypothesis: "I think it is Base64, because it uses only letters and digits, the length is a multiple of 4, and it ends with `=`, which is how Base64 pads its output.",
          prediction: "If I am right, `From Base64` will print readable text that starts with `flag{`.",
          test: "CyberChef: paste the string into Input, add the `From Base64` operation.",
          observed: "The Output shows `flag{worksheet_example}`.",
          result: "Supported",
          note: "One clean round. The clues (alphabet, length, `=`) all pointed to the same answer."
        }
      ],
      learned: "A string that uses only letters and digits, has a length that is a multiple of 4 and ends with `=` is very likely Base64. Next time I check the alphabet and the ending first, before trying other ideas.",
      flag: "flag{worksheet_example}"
    }
  },
  {
    id: "ex-layered",
    title: "Example 2: A string that fools you",
    category: "Crypto",
    difficulty: "Medium",
    tools: ["CyberChef"],
    challenge: {
      title: "Three Doors",
      description: "The message was wrapped more than once. Peel it open.",
      given: "63336c756448746e64585a686546396e64584a68583264795a6d6439",
      givenType: "A text string, no file"
    },
    worksheet: {
      asking: "I must turn this string into a flag. The description says 'wrapped more than once', so I expect several decoding steps, not one.",
      clues: [
        "The string is 56 characters long, and 56 is a multiple of 4.",
        "It uses only the characters 0-9 and a-f. There are no capital letters and no `=`.",
        "The description says 'wrapped more than once'."
      ],
      rounds: [
        {
          hypothesis: "I think it is Base64, because it uses only letters and digits and its length is a multiple of 4.",
          prediction: "If I am right, `From Base64` will print readable text.",
          test: "CyberChef: add `From Base64`.",
          observed: "The Output is unreadable symbols and broken characters.",
          result: "Refuted",
          note: "Refuted is progress. It is not plain Base64. The same clue (letters and digits, length 56) fits two ideas, and the test decided between them."
        },
        {
          hypothesis: "I think it is hex, because every character is 0-9 or a-f, which is a much smaller alphabet than Base64 normally shows, and the length is even.",
          prediction: "If I am right, `From Hex` will print readable characters.",
          test: "CyberChef: remove `From Base64`, add `From Hex`.",
          observed: "The Output is `c3ludHtndXZheF9ndXJhX2dyZmd9`. It is readable, but it looks like a new encoded string.",
          result: "Supported",
          note: "The output is not the flag, but it is readable, so the prediction held. A decoded result can be another layer."
        },
        {
          hypothesis: "I think the new string is Base64, because it has only letters and digits, and its length is 28, which is a multiple of 4. Unlike the first string, it also has capital letters, which hex would not have.",
          prediction: "If I am right, adding `From Base64` after `From Hex` will print words.",
          test: "CyberChef: add `From Base64` as the second step in the Recipe.",
          observed: "The Output is `synt{guvax_gura_grfg}`.",
          result: "Supported",
          note: "It looks like a flag, but the first letters are `synt`, not `flag`."
        },
        {
          hypothesis: "I think it is ROT13, because `synt{` is `flag{` with every letter moved 13 places, and the brackets and underscores did not change.",
          prediction: "If I am right, `ROT13` will print a flag that starts with `flag{`.",
          test: "CyberChef: add `ROT13` as the third step.",
          observed: "The Output is `flag{think_then_test}`.",
          result: "Supported",
          note: "The known start of a flag was the clue that revealed the last layer."
        }
      ],
      learned: "Decoded output can be another encoding, so repeat: identify, decode, check. Letters and digits with a length that is a multiple of 4 does not prove Base64, because hex passes that test too. I check which characters appear before I pick a decoder. A known start such as `synt{` is a strong clue for ROT13.",
      flag: "flag{think_then_test}"
    }
  },
  {
    id: "ex-cookie",
    title: "Example 3: The members-only page",
    category: "Web",
    difficulty: "Easy",
    tools: ["View source", "DevTools Application tab", "Console"],
    challenge: {
      title: "Members Only",
      description: "A shop page says 'Welcome, guest. Members see a secret banner.' Become a member.",
      given: "A practice website in the browser",
      givenType: "A URL"
    },
    worksheet: {
      asking: "I must make the page show the members-only banner, which should contain a flag. I was given a website, so this is a Web challenge.",
      clues: [
        "The page says 'Welcome, guest'.",
        "In the page source, a script calls `getCookie('role')` and shows the banner only if the value is not 'guest'.",
        "DevTools > Application > Cookies shows a cookie named `role` with the value `guest`.",
        "The title and description both use the word 'member'."
      ],
      rounds: [
        {
          hypothesis: "I think the page decides who I am from the `role` cookie, because the script reads that cookie and the page says 'guest', the same as the cookie value.",
          prediction: "If I am right, setting `role` to `member` will make the banner appear.",
          test: "Console: `document.cookie = \"role=member; path=/\"`",
          observed: "Nothing changed on screen.",
          result: "Unclear",
          note: "I cannot tell whether the idea is wrong or my test was incomplete. I check the Application tab: the cookie value is now `member`, so the change was saved."
        },
        {
          hypothesis: "I think the idea is right but the page only reads the cookie when it loads, because the script is at the top level of the file and not inside a button handler.",
          prediction: "If I am right, reloading the page will show the banner.",
          test: "Reload with `F5`.",
          observed: "The banner appears and shows the sample flag.",
          result: "Supported",
          note: "The first result was Unclear. Checking the cookie in the Application tab separated 'idea wrong' from 'forgot to reload'."
        }
      ],
      learned: "Cookies are values the browser stores and I am allowed to edit. When a script reads a cookie on load, I must reload after changing it. I confirm the saved value in the Application tab before deciding that an idea failed.",
      flag: "flag{sample_cookie_example}"
    }
  },
  {
    id: "ex-photo",
    title: "Example 4: The innocent photo",
    category: "Forensics",
    difficulty: "Medium",
    tools: ["file", "strings", "binwalk"],
    challenge: {
      title: "Holiday Photo",
      description: "A friend sent this photo. 'Look closer,' they said.",
      given: "A file named `holiday.jpg`",
      givenType: "A file"
    },
    worksheet: {
      asking: "I must find a flag hidden somewhere related to `holiday.jpg`. I was given a file, so I treat it as Forensics.",
      clues: [
        "The photo opens normally and looks like an ordinary holiday picture.",
        "The description says 'look closer', which suggests something that is not visible.",
        "The file is much larger than similar photos of the same size.",
        "The extension says `.jpg`, but extensions can lie."
      ],
      rounds: [
        {
          hypothesis: "I think the file may be disguised, because extensions are only names and this task says 'look closer'.",
          prediction: "If I am right, `file holiday.jpg` will report a type that is not JPEG.",
          test: "Terminal: `file holiday.jpg`",
          observed: "`JPEG image data`. The type is honest.",
          result: "Refuted",
          note: "Not disguised. That rules out one option, so I move on to hidden data inside a real JPEG."
        },
        {
          hypothesis: "I think readable text is stored inside the bytes, because the file is bigger than it should be.",
          prediction: "If I am right, `strings holiday.jpg | grep -i flag` will print a flag-like line.",
          test: "Terminal: `strings holiday.jpg | grep -i flag`, then `strings holiday.jpg | tail -20`.",
          observed: "No line with the word flag. But near the end I see a file name, `notes.txt`.",
          result: "Refuted",
          note: "The prediction failed, but the test gave a new clue: a file name that has nothing to do with a photo."
        },
        {
          hypothesis: "I think a second file is glued to the end of the photo, because a file name such as `notes.txt` appears inside an image file.",
          prediction: "If I am right, `binwalk holiday.jpg` will list an archive that contains `notes.txt`.",
          test: "Terminal: `binwalk holiday.jpg`",
          observed: "A row says `Zip archive data ... name: notes.txt`.",
          result: "Supported",
          note: "The new clue from the failed test led straight to the right tool."
        },
        {
          hypothesis: "I think extracting the archive will give me `notes.txt` with the flag inside.",
          prediction: "If I am right, `binwalk -e` will create a folder containing `notes.txt`.",
          test: "Terminal: `binwalk -e holiday.jpg`, then `ls`, then read the file with `cat`.",
          observed: "The file contains `flag{sample_photo_example}`.",
          result: "Supported",
          note: "Folder names differ between binwalk versions, so I used `ls` to find it."
        }
      ],
      learned: "Cheap tools first: `file`, then `strings`, then `binwalk`. A failed `strings` search can still reveal a clue, such as an unexpected file name. A photo that is much larger than it should be often has extra data after the image.",
      flag: "flag{sample_photo_example}"
    }
  }
];

// ---------------------------------------------------------------------------
// Write-up template (lines are joined so no backtick escaping is needed)
// ---------------------------------------------------------------------------
export const WRITEUP_TEMPLATE = [
  "# Challenge name",
  "Category: ___ | Points: ___ | Platform: ___",
  "",
  "## 1. What is the challenge asking?",
  "(your own words, and what you were given)",
  "",
  "## 2. Clues",
  "- clue 1",
  "- clue 2",
  "",
  "## 3 and 4. Hypotheses and tests",
  "### Round 1",
  "- Hypothesis: I think ___ because ___.",
  "- Prediction: If I am right, I will see ___.",
  "- Test: ___",
  "- Observed: ___",
  "- Result: Supported / Refuted / Unclear",
  "",
  "## 5. What I learned",
  "When I see ___, I should try ___.",
  "",
  "## Flag",
  "flag{...}"
].join("\n");
