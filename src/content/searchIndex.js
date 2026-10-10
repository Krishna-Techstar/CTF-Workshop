import { beforeYouStartContent } from './beforeYouStart';
import { setupContent } from './setup';
import { demo1CryptoContent } from './demo1Crypto';
import { demo2WebContent } from './demo2Web';
import { demo3ForensicsContent } from './demo3Forensics';
import { linuxBasicsContent } from './linuxBasics';
import { miniCtfContent } from './miniCtf';

export const SEARCH_INDEX = [
  // Before you start
  {
    title: "Before you start - Overview & Ethics",
    path: "/before-you-start",
    section: "Before you start",
    content: "This guide covers every hands-on segment of your workshop in the order you will teach it: you show it, you do it together, they do it alone. Ethics under IT Act, 2000 (Sections 43 and 66). Only attack systems you have written permission to test."
  },
  {
    title: "Prep Checklists: Participants & Facilitator",
    path: "/before-you-start",
    section: "Before you start",
    content: "picoCTF account, WSL Ubuntu install, Chrome, Firefox, demo website, hidden-flag image, Linux practice folder, offline CyberChef backup."
  },
  {
    title: "Flag format: flag{...} vs picoCTF{...}",
    path: "/before-you-start",
    section: "Before you start",
    content: "Every demo flag looks like flag{...}. Real picoCTF flags look like picoCTF{...}. Always copy the full string including braces."
  },

  // Setup
  {
    title: "Setup Part A: picoCTF Account & Practice Arena",
    path: "/setup",
    section: "Setup",
    content: "picoctf.org login register username email Practice area play.picoctf.org/practice filters Category Difficulty General Skills Forensics webshell fallback."
  },
  {
    title: "Setup Part B: CyberChef (GCHQ) & Offline Backup",
    path: "/setup",
    section: "Setup",
    content: "gchq.github.io/CyberChef Operations Recipe Input Output To Base64 Auto Bake offline ZIP download."
  },
  {
    title: "Setup Part C: WSL (Windows Subsystem for Linux)",
    path: "/setup",
    section: "Setup",
    content: "wsl --install PowerShell administrator Ubuntu user sudo apt update sudo apt upgrade sudo apt install binutils file libimage-exiftool-perl binwalk steghide xxd zip unzip curl wget python3 python3-pip /mnt/c/ explorer.exe"
  },
  {
    title: "Setup: Mac and Linux alternative commands",
    path: "/setup",
    section: "Setup",
    content: "brew install exiftool binwalk binutils. Steghide webshell fallback. Ubuntu apt command."
  },
  {
    title: "Setup: Troubleshooting Table (WSL & Virtualization)",
    path: "/setup",
    section: "Setup",
    content: "wsl --install help list, BIOS virtualization Intel VT-x AMD SVM, no admin rights webshell, apt cannot download packages hotspot."
  },

  // Demo 1
  {
    title: "Demo 1: Encoding vs Encryption vs Hashing",
    path: "/demo-1",
    section: "Demo 1: Crypto",
    content: "Encoding needs no key and is reversible (Base64, hex, binary). Encryption needs secret key (AES, RSA, ROT13). Hashing is one-way (MD5, SHA-256). Base64 is not security."
  },
  {
    title: "Demo 1: Base64 Decoding & Terminal Commands",
    path: "/demo-1",
    section: "Demo 1: Crypto",
    content: "ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259 From Base64 flag{base64_is_not_encryption} echo -n 'Man' | base64 echo base64 -d python3 base64.b64decode."
  },
  {
    title: "Demo 1: ROT13 & Caesar Cipher",
    path: "/demo-1",
    section: "Demo 1: Crypto",
    content: "synt{ebg13_vf_whfg_n_fuvsg} flag{rot13_is_just_a_shift} ROT13 Brute Force tr 'A-Za-z' 'N-ZA-Mn-za-m'."
  },
  {
    title: "Demo 1: Hexadecimal Stream",
    path: "/demo-1",
    section: "Demo 1: Crypto",
    content: "666c61677b6865785f69735f6a7573745f62797465737d From Hex flag{hex_is_just_bytes} xxd -r -p xxd -p."
  },
  {
    title: "Demo 1: Layered Challenge & Magic Operation",
    path: "/demo-1",
    section: "Demo 1: Crypto",
    content: "63336c7564487435626d78795a575a66596e4e66636d4677596e463259585239 Hex to Base64 to ROT13 flag{layers_of_encoding} CyberChef Magic heuristic."
  },

  // Demo 2
  {
    title: "Demo 2: Web, HTTP and View Source",
    path: "/demo-2",
    section: "Demo 2: Web",
    content: "HTML comments, style.css, app.js, flag{view_source_and_devtools} Ctrl+U View page source."
  },
  {
    title: "Demo 2: DevTools Tour (Elements, Console, Sources, Network, Application)",
    path: "/demo-2",
    section: "Demo 2: Web",
    content: "F12 Inspect DOM live editing, document.cookie, document.title, pretty print code, Network HTTP status codes 200 302 403 404 500, Cookies."
  },
  {
    title: "Demo 2: Cookie Modification (Admin Escalation)",
    path: "/demo-2",
    section: "Demo 2: Web",
    content: "admin=false to admin=true document.cookie = 'admin=true; path=/'; flag{cookie_monster} Application tab."
  },
  {
    title: "Demo 2: robots.txt & Secret Directories",
    path: "/demo-2",
    section: "Demo 2: Web",
    content: "Disallow: /secret/ flag{robots_reveal_secrets} /sitemap.xml /admin /login /backup /.git/ curl terminal requests."
  },

  // Demo 3
  {
    title: "Demo 3: Why Files Can Hide Things & Magic Numbers",
    path: "/demo-3",
    section: "Demo 3: Forensics",
    content: "Magic numbers: JPEG FF D8 FF, PNG 89 50 4E 47, GIF 47 49 46 38, PDF 25 50 44 46, ZIP 50 4B 03 04. Forensics routine."
  },
  {
    title: "Demo 3: file, strings and ExifTool",
    path: "/demo-3",
    section: "Demo 3: Forensics",
    content: "file evidence.jpg, strings evidence.jpg | grep -i flag flag{strings_finds_text}, exiftool Comment base64 flag{exiftool_reads_metadata}."
  },
  {
    title: "Demo 3: Binwalk & Embedded Archives",
    path: "/demo-3",
    section: "Demo 3: Forensics",
    content: "binwalk evidence.jpg, binwalk -e evidence.jpg, secret.txt flag{binwalk_finds_hidden_files}, unzip evidence.jpg."
  },
  {
    title: "Demo 3: Hex View (xxd) and Steghide",
    path: "/demo-3",
    section: "Demo 3: Forensics",
    content: "xxd evidence.jpg | head -3, steghide info stego.jpg, steghide extract -sf stego.jpg flag{steghide_hides_data_inside}."
  },

  // Linux Basics
  {
    title: "Linux Basics: The Six Core Commands",
    path: "/linux-basics",
    section: "Linux basics",
    content: "pwd, ls -la, cd, cat, grep -rn, file. Reading the shell prompt user@laptop:~$."
  },
  {
    title: "Linux Basics: Guided Practice Walkthrough",
    path: "/linux-basics",
    section: "Linux basics",
    content: "~/ctf-lab .hidden/.secret.txt flag{ls_dash_a_shows_hidden}, logs/app.log flag{grep_finds_needles} find *.txt."
  },
  {
    title: "OverTheWire Bandit Wargame (Levels 0 to 5)",
    path: "/linux-basics",
    section: "Linux basics",
    content: "ssh bandit0@bandit.labs.overthewire.org -p 2220, password, readme, homework levels 0 to 5."
  },

  // Mini CTF
  {
    title: "Mini CTF: Rules, Team Scoring & Hint Policy",
    path: "/mini-ctf",
    section: "Mini CTF",
    content: "Teams of 2 or 3, picoCTF Practice list, 10 min stuck rule, facilitator guidance, scoring whiteboard."
  },
  {
    title: "Write-up Template & Next Learning Steps",
    path: "/mini-ctf",
    section: "Mini CTF",
    content: "Structured writeup template: Description, Approach, Flag, What I learned. TryHackMe, PortSwigger, CTFtime."
  },
  {
    title: "Cheat Sheet: If you see this, try that",
    path: "/mini-ctf",
    section: "Mini CTF",
    content: "Base64 =/==, Hex 0-9 a-f, ROT13 synt{, CyberChef Magic, robots.txt, strings, exiftool, binwalk, steghide, netcat."
  },
  {
    title: "Troubleshooting Guide (Workshop Fixes)",
    path: "/mini-ctf",
    section: "Mini CTF",
    content: "command not found, permission denied, localhost:8765 down, CyberChef garbage, pasted flag rejected, steghide empty passphrase."
  }
];
