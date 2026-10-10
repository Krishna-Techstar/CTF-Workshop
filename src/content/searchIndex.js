export const SEARCH_INDEX = [
  // Before you start
  {
    title: "Before you start - Overview & Ethics",
    path: "/before-you-start",
    anchor: "ethics-section",
    section: "Before you start",
    content: "This guide covers every hands-on segment of your workshop in the order you will teach it: you show it, you do it together, they do it alone. Ethics under IT Act, 2000 (Sections 43 and 66). Only attack systems you have written permission to test."
  },
  {
    title: "Prep Checklists: Participants & Facilitator",
    path: "/before-you-start",
    anchor: "participants-prep",
    section: "Before you start",
    content: "picoCTF account, WSL Ubuntu install, Chrome, Firefox, demo website, hidden-flag image, Linux practice folder, offline CyberChef backup."
  },
  {
    title: "Flag format: flag{...} vs picoCTF{...}",
    path: "/before-you-start",
    anchor: "flag-format-section",
    section: "Before you start",
    content: "Every demo flag looks like flag{...}. Real picoCTF flags look like picoCTF{...}. Always copy the full string including braces."
  },

  // Setup
  {
    title: "Setup Part A: picoCTF Account & Practice Arena",
    path: "/setup",
    anchor: "part-a-picoctf",
    section: "Setup",
    content: "picoctf.org login register username email Practice area play.picoctf.org/practice filters Category Difficulty General Skills Forensics webshell fallback."
  },
  {
    title: "Setup Part B: CyberChef (GCHQ) & Offline Backup",
    path: "/setup",
    anchor: "part-b-cyberchef",
    section: "Setup",
    content: "gchq.github.io/CyberChef Operations Recipe Input Output To Base64 Auto Bake offline ZIP download."
  },
  {
    title: "Setup Part C: WSL (Windows Subsystem for Linux)",
    path: "/setup",
    anchor: "part-c-terminal",
    section: "Setup",
    content: "wsl --install PowerShell administrator Ubuntu user sudo apt update sudo apt upgrade sudo apt install binutils file libimage-exiftool-perl binwalk steghide xxd zip unzip curl wget python3 python3-pip /mnt/c/ explorer.exe"
  },
  {
    title: "Setup: Mac and Linux alternative commands",
    path: "/setup",
    anchor: "part-c-terminal",
    section: "Setup",
    content: "brew install exiftool binwalk binutils. Steghide webshell fallback. Ubuntu apt command."
  },
  {
    title: "Setup: Troubleshooting Table (WSL & Virtualization)",
    path: "/setup",
    anchor: "troubleshooting-section",
    section: "Setup",
    content: "wsl --install help list, BIOS virtualization Intel VT-x AMD SVM, no admin rights webshell, apt cannot download packages hotspot."
  },

  // Demo 1
  {
    title: "Demo 1: Encoding vs Encryption vs Hashing",
    path: "/demo-1",
    anchor: "step-0-concepts",
    section: "Demo 1: Crypto",
    content: "Encoding needs no key and is reversible (Base64, hex, binary). Encryption needs secret key (AES, RSA, ROT13). Hashing is one-way (MD5, SHA-256). Base64 is not security."
  },
  {
    title: "Demo 1: Base64 Decoding & Terminal Commands",
    path: "/demo-1",
    anchor: "part-1-base64",
    section: "Demo 1: Crypto",
    content: "ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259 From Base64 flag{...} echo -n 'Man' | base64 echo base64 -d python3 base64.b64decode."
  },
  {
    title: "Demo 1: ROT13 & Caesar Cipher",
    path: "/demo-1",
    anchor: "part-2-rot13",
    section: "Demo 1: Crypto",
    content: "synt{ebg13_vf_whfg_n_fuvsg} flag{...} ROT13 Brute Force tr 'A-Za-z' 'N-ZA-Mn-za-m'."
  },
  {
    title: "Demo 1: Hexadecimal Stream",
    path: "/demo-1",
    anchor: "part-3-hex",
    section: "Demo 1: Crypto",
    content: "666c61677b6865785f69735f6a7573745f62797465737d From Hex flag{...} xxd -r -p xxd -p."
  },
  {
    title: "Demo 1: Layered Challenge & Magic Operation",
    path: "/demo-1",
    anchor: "part-4-layered",
    section: "Demo 1: Crypto",
    content: "63336c7564487435626d78795a575a66596e4e66636d4677596e463259585239 Hex to Base64 to ROT13 flag{...} CyberChef Magic heuristic."
  },

  // Demo 2
  {
    title: "Demo 2: Web, HTTP and View Source",
    path: "/demo-2",
    anchor: "step-2-view-source",
    section: "Demo 2: Web",
    content: "HTML comments, style.css, app.js, flag{...} Ctrl+U View page source."
  },
  {
    title: "Demo 2: DevTools Tour (Elements, Console, Sources, Network, Application)",
    path: "/demo-2",
    anchor: "step-3-devtools-tour",
    section: "Demo 2: Web",
    content: "F12 Inspect DOM live editing, document.cookie, document.title, pretty print code, Network HTTP status codes 200 302 403 404 500, Cookies."
  },
  {
    title: "Demo 2: Cookie Modification (Admin Escalation)",
    path: "/demo-2",
    anchor: "step-4-cookies",
    section: "Demo 2: Web",
    content: "admin=false to admin=true document.cookie = 'admin=true; path=/'; flag{...} Application tab."
  },
  {
    title: "Demo 2: robots.txt & Secret Directories",
    path: "/demo-2",
    anchor: "step-5-robots",
    section: "Demo 2: Web",
    content: "Disallow: /secret/ flag{...} /sitemap.xml /admin /login /backup /.git/ curl terminal requests."
  },

  // Demo 3
  {
    title: "Demo 3: Why Files Can Hide Things & Magic Numbers",
    path: "/break-and-demo-3",
    anchor: "step-0-file-basics",
    section: "Demo 3: Forensics",
    content: "Magic numbers: JPEG FF D8 FF, PNG 89 50 4E 47, GIF 47 49 46 38, PDF 25 50 44 46, ZIP 50 4B 03 04. Forensics routine."
  },
  {
    title: "Demo 3: file, strings and ExifTool",
    path: "/break-and-demo-3",
    anchor: "all-steps-detailed",
    section: "Demo 3: Forensics",
    content: "file evidence.jpg, strings evidence.jpg | grep -i flag flag{...}, exiftool Comment base64 flag{...}."
  },
  {
    title: "Demo 3: Binwalk & Embedded Archives",
    path: "/break-and-demo-3",
    anchor: "all-steps-detailed",
    section: "Demo 3: Forensics",
    content: "binwalk evidence.jpg, binwalk -e evidence.jpg, secret.txt flag{...}, unzip evidence.jpg."
  },
  {
    title: "Demo 3: Hex View (xxd) and Steghide",
    path: "/break-and-demo-3",
    anchor: "all-steps-detailed",
    section: "Demo 3: Forensics",
    content: "xxd evidence.jpg | head -3, steghide info stego.jpg, steghide extract -sf stego.jpg flag{...}."
  },

  // Linux Basics
  {
    title: "Linux Basics: The Six Core Commands",
    path: "/linux-basics",
    anchor: "six-commands",
    section: "Linux basics",
    content: "pwd, ls -la, cd, cat, grep -rn, file. Reading the shell prompt user@laptop:~$."
  },
  {
    title: "Linux Basics: Guided Practice Walkthrough",
    path: "/linux-basics",
    anchor: "step-2-walkthrough",
    section: "Linux basics",
    content: "~/ctf-lab .hidden/.secret.txt flag{...}, logs/app.log flag{...} find *.txt."
  },
  {
    title: "OverTheWire Bandit Wargame (Levels 0 to 5)",
    path: "/linux-basics",
    anchor: "bandit-wargame",
    section: "Linux basics",
    content: "ssh bandit0@bandit.labs.overthewire.org -p 2220, password, readme, homework levels 0 to 5."
  },

  // Mini CTF
  {
    title: "Mini CTF: Rules, Team Scoring & Hint Policy",
    path: "/mini-ctf",
    anchor: "mini-ctf-rules",
    section: "Mini CTF",
    content: "Teams of 2 or 3, picoCTF Practice list, 10 min stuck rule, facilitator guidance, scoring whiteboard."
  },
  {
    title: "Write-up Template & Next Learning Steps",
    path: "/mini-ctf",
    anchor: "wrap-up-section",
    section: "Mini CTF",
    content: "Structured writeup template: Description, Approach, Flag, What I learned. TryHackMe, PortSwigger, CTFtime."
  },
  {
    title: "Cheat Sheet: If you see this, try that",
    path: "/mini-ctf",
    anchor: "cheat-sheet-section",
    section: "Mini CTF",
    content: "Base64 =/==, Hex 0-9 a-f, ROT13 synt{, CyberChef Magic, robots.txt, strings, exiftool, binwalk, steghide, netcat."
  },
  {
    title: "Troubleshooting Guide (Workshop Fixes)",
    path: "/mini-ctf",
    anchor: "troubleshooting-section",
    section: "Mini CTF",
    content: "command not found, permission denied, localhost:8765 down, CyberChef garbage, pasted flag rejected, steghide empty passphrase."
  },

  // Thinking Process
  {
    title: "Investigation Method: The 5-Question Loop",
    path: "/method",
    anchor: "the-loop",
    section: "Thinking Process",
    content: "The loop: 1. Asking, 2. Clues, 3. Hypothesis, 4. Test, 5. Learned. Repeat as rounds. Cycle back from test to clues."
  },
  {
    title: "The Five Questions (Step by Step)",
    path: "/method",
    anchor: "five-steps",
    section: "Thinking Process",
    content: "Five steps: What is the challenge asking? What clues do you have? What is your hypothesis? What did you test? What did you learn?"
  },
  {
    title: "How to Write a Good Hypothesis",
    path: "/method",
    anchor: "hypothesis-rules",
    section: "Thinking Process",
    content: "I think ___ because ___. If I am right, I will see ___. Observation, belief, prediction, way out. Weak vs strong hypothesis."
  },
  {
    title: "Reading Your Test Results",
    path: "/method",
    anchor: "reading-results",
    section: "Thinking Process",
    content: "Supported (keep going), Refuted (ruled out, add new clue), Unclear (repeat with one change or second tool). Result badges."
  },
  {
    title: "Six Rules of Mindset",
    path: "/method",
    anchor: "mindset",
    section: "Thinking Process",
    content: "Everything is a clue, try the simple thing first, predict before Enter, change one thing at a time, refuted is progress, write it down."
  },
  {
    title: "Habits That Waste Time",
    path: "/method",
    anchor: "bad-habits",
    section: "Thinking Process",
    content: "Bad habits: tool spraying, skipping clues in step 2, falling in love with one theory, searching for the answer, not recording failures."
  },
  {
    title: "The Stuck Ladder",
    path: "/method",
    anchor: "stuck-ladder",
    section: "Thinking Process",
    content: "Climb one rung: 0-2m re-read description, 2-5m find one new clue, 5-8m simpler hypothesis, 8-10m search concept, 10-12m explain to neighbour, >12m hint."
  },
  {
    title: "Where to Start by Category",
    path: "/method",
    anchor: "by-category",
    section: "Thinking Process",
    content: "First clues and tools for Crypto, Web, Forensics, Linux. Encodings, page source, file headers, hidden files."
  },
  {
    title: "Facilitator 5-Minute Script & Coach Questions",
    path: "/method",
    anchor: "facilitator-script",
    section: "Thinking Process",
    content: "Live walkthrough script, stopwatch, board notes, guiding questions to ask participants while walking around."
  },
  {
    title: "Worked Examples: Step-by-Step Investigations",
    path: "/method-examples",
    section: "Thinking Process",
    content: "Full worked examples with wrong turns: Base64, layered challenge, cookie tampering, hidden photo zip archive. Rounds timeline."
  },
  {
    title: "Investigation Worksheet & Write-up Generator",
    path: "/worksheet",
    section: "Thinking Process",
    content: "Interactive 5-question worksheet, autosave, stuck ladder dialog, load worked example, copy Markdown write-up, printable blank sheet."
  }
];
