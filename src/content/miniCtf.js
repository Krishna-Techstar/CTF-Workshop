export const miniCtfContent = {
  title: "Mini CTF, wrap-up, cheat sheet and troubleshooting",
  time: "2:30 to 3:30",
  
  miniCtf: {
    title: "Mini CTF (2:30 to 3:15)",
    time: "2:30 to 3:15",
    steps: [
      { num: 1, text: "Form teams of 2 or 3. Mix experienced and new people. Each team needs at least one working terminal." },
      { num: 2, text: "Each team opens the picoCTF Practice list and picks easy challenges from the General Skills, Cryptography, Forensics and Web Exploitation categories, the same four areas as the demos. Sort by difficulty or points, lowest first." },
      { num: 3, text: "Scoring is yours to run: when a team solves one, they show you the accepted flag on screen. Write the team name and challenge on a whiteboard or shared sheet and give points (for example 10 per easy challenge, 20 per medium)." },
      { num: 4, text: "Hint rule: ask the neighbouring team first, then you. After 10 minutes stuck on one challenge, tell teams to switch to another." },
      { num: 5, text: "Walk around. Ask guiding questions instead of giving answers: \"What kind of file is it?\", \"Did you read the page source?\", \"Does that string look like Base64?\"" }
    ],
    fallbackNote: "If you want a guaranteed-solvable fallback, use the flags from the demos as a bonus round: ask teams to find all the web and forensics demo flags again without your help."
  },

  wrapUp: {
    title: "Wrap-up (3:15 to 3:30)",
    time: "3:15 to 3:30",
    steps: [
      { num: 1, text: "Walk through one solution from the room, whichever team volunteers. Make them narrate: what they saw, which tool they tried, what failed, what worked." },
      { 
        num: 2, 
        text: "Teach write-ups. A write-up is a short note explaining how you solved a challenge, and writing one is how the learning sticks. Use this template:",
        template: `# Challenge name
Category: Forensics | Points: 100 | Platform: picoCTF

## Description
(copy the challenge text)

## Approach
1. What I noticed first
2. Tool or command I ran, and what it showed
3. What I tried that did not work

## Flag
flag{...}

## What I learned`
      },
      { num: 3, text: "Next steps for them: finish Bandit levels 0 to 5, solve 10 picoCTF challenges across categories, try TryHackMe's beginner rooms, and look up upcoming events on CTFtime.org to play with a team." },
      { num: 4, text: "Close with the ethics reminder: only attack what you are authorized to attack." }
    ]
  },

  cheatSheet: [
    { symptom: "Text ending in = or ==", firstMove: "Base64: From Base64 in CyberChef" },
    { symptom: "Only 0-9 and a-f", firstMove: "Hex: From Hex" },
    { symptom: "Gibberish that starts like synt{", firstMove: "ROT13 or a Caesar shift" },
    { symptom: "Unknown encoding", firstMove: "CyberChef Magic" },
    { symptom: "A web page", firstMove: "View source, linked files, DevTools, /robots.txt , cookies" },
    { symptom: "A downloaded file", firstMove: "file , strings , exiftool , binwalk -e , xxd" },
    { symptom: "An image that may hide data", firstMove: "steghide extract -sf , then zsteg for PNG" },
    { symptom: "A big file or log", firstMove: "grep -i flag" },
    { symptom: "A server address and port", firstMove: "Connect with nc host port or ssh as the challenge says" }
  ],

  troubleshooting: [
    { problem: "command not found", fix: "The tool is not installed: run the sudo apt install line from Setup Part C" },
    { problem: "Permission denied", fix: "Wrong folder or file permissions. Check with ls -l , or use sudo only for installs" },
    { problem: "No such file or directory", fix: "Wrong folder. Run pwd and ls to see where you are, and check spelling and capitals" },
    { problem: "Browser cannot open localhost:8765", fix: "Check the server is still running in the Ubuntu window. Try 127.0.0.1:8765" },
    { problem: "CyberChef gives garbage", fix: "Wrong decoder. Look at the characters again, or try Magic" },
    { problem: "Pasted flag rejected", fix: "Copy the whole flag including flag{ and } , no trailing space" },
    { problem: "steghide cannot extract", fix: "Try an empty passphrase (press Enter). Real challenges give the password in a hint" },
    { problem: "Someone is far behind", fix: "Pair them with a neighbour. Never stop the room for one laptop" }
  ],

  sources: {
    title: "Sources and further reading",
    text: "The tools and sites named in this guide are free: picoCTF (picoctf.org), CyberChef (gchq.github.io/CyberChef), OverTheWire Bandit (overthewire.org/wargames/bandit), TryHackMe, PortSwigger Web Security Academy and CTFtime.org. Website button labels, challenge names and tool output formats change over time, so run through every step once yourself before the session."
  }
};
