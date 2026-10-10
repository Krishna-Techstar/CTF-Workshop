export const SCHEDULE = [
  {
    id: 'intro',
    timeRange: '0:00 to 0:20',
    title: 'Before You Start & Ethics',
    description: 'Pre-workshop checks, equipment verification, legal ethics under IT Act 2000, and flag format standards. Includes the 5-question Investigation Method.',
    route: '/before-you-start',
    durationMinutes: 20,
    accent: '#FFD93D', // Yellow
    colorName: 'yellow',
  },
  {
    id: 'setup',
    timeRange: '0:20 to 0:40',
    title: 'Setup: picoCTF, CyberChef & WSL',
    description: 'Create picoCTF account, open CyberChef offline/online, install WSL Ubuntu, packages and verification commands.',
    route: '/setup',
    durationMinutes: 20,
    accent: '#4D9DE0', // Blue
    colorName: 'blue',
  },
  {
    id: 'demo-1',
    timeRange: '0:40 to 1:10',
    title: 'Demo 1: Crypto & Encoding',
    description: 'Identify encodings: Base64 bit grouping, ROT13 Caesar cipher, Hexadecimal byte streams, layered recipe, and Magic operation.',
    route: '/demo-1',
    durationMinutes: 30,
    accent: '#FF6B9D', // Pink
    colorName: 'pink',
  },
  {
    id: 'demo-2',
    timeRange: '1:10 to 1:40',
    title: 'Demo 2: Web Exploitation & DevTools',
    description: 'HTML comments, CSS/JS discovery, DevTools tabs deep-dive, modifying cookies for admin escalation, and robots.txt secrets.',
    route: '/demo-2',
    durationMinutes: 30,
    accent: '#6BCB77', // Green
    colorName: 'green',
  },
  {
    id: 'break',
    timeRange: '1:40 to 1:50',
    title: 'Break & File Distribution',
    description: '10-minute break while distributing evidence.jpg and stego.jpg as clean ZIP archives without image compression.',
    route: '/break-and-demo-3',
    anchor: 'break-section',
    durationMinutes: 10,
    accent: '#FF9F45', // Orange
    colorName: 'orange',
  },
  {
    id: 'demo-3',
    timeRange: '1:50 to 2:20',
    title: 'Demo 3: Forensics & Steganography',
    description: 'Magic numbers, file signature verification, strings, ExifTool metadata, binwalk file extraction, xxd hex view, and steghide.',
    route: '/break-and-demo-3',
    anchor: 'forensics-stepper',
    durationMinutes: 30,
    accent: '#A29BFE', // Purple
    colorName: 'purple',
  },
  {
    id: 'linux',
    timeRange: '2:20 to 2:30',
    title: 'Linux Basics & Bandit Wargame',
    description: 'The 6 core terminal commands (pwd, ls, cd, cat, grep, file), terminal navigation, guided treasure hunt, and Bandit level 0-5.',
    route: '/linux-basics',
    durationMinutes: 10,
    accent: '#FFD93D', // Yellow
    colorName: 'yellow',
  },
  {
    id: 'mini-ctf',
    timeRange: '2:30 to 3:15',
    title: 'Mini CTF: Team Challenge',
    description: 'Hands-on competition in teams of 2-3 on picoCTF Practice challenges, hint escalation rules, and interactive flag verification.',
    route: '/mini-ctf',
    anchor: 'mini-ctf-rules',
    durationMinutes: 45,
    accent: '#FF6B9D', // Pink
    colorName: 'pink',
  },
  {
    id: 'wrap-up',
    timeRange: '3:15 to 3:30',
    title: 'Wrap-up, Write-ups & Cheat Sheet',
    description: 'Participant solution presentation, structured write-up template, next learning platforms, and comprehensive troubleshooting.',
    route: '/mini-ctf',
    anchor: 'wrap-up-section',
    durationMinutes: 15,
    accent: '#6BCB77', // Green
    colorName: 'green',
  }
];

export const NAV_SECTIONS = [
  { path: '/before-you-start', label: '1. Before you start', shortTitle: 'Before Start', accent: '#FFD93D', colorClass: 'bg-brutal-yellow' },
  { path: '/setup', label: '2. Setup (picoCTF, CyberChef, WSL)', shortTitle: 'Setup', accent: '#4D9DE0', colorClass: 'bg-brutal-blue' },
  { path: '/demo-1', label: '3. Demo 1: Crypto & encoding', shortTitle: 'Crypto', accent: '#FF6B9D', colorClass: 'bg-brutal-pink' },
  { path: '/demo-2', label: '4. Demo 2: Web', shortTitle: 'Web', accent: '#6BCB77', colorClass: 'bg-brutal-green' },
  { path: '/break-and-demo-3', label: '5. Break & Demo 3: Forensics & stego', shortTitle: 'Forensics', accent: '#A29BFE', colorClass: 'bg-brutal-purple' },
  { path: '/linux-basics', label: '6. Linux basics & Bandit', shortTitle: 'Linux', accent: '#FF9F45', colorClass: 'bg-brutal-orange' },
  { path: '/mini-ctf', label: '7. Mini CTF & Cheat Sheet', shortTitle: 'Mini CTF', accent: '#FFD93D', colorClass: 'bg-brutal-yellow' },
];
