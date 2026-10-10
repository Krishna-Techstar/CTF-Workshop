// Precomputed SHA-256 hashes of all 13 workshop flags
// Keeps the flags hidden in client-side code while enabling immediate verification

export const WORKSHOP_FLAGS = [
  {
    id: 'crypto-base64',
    title: 'Demo 1: Base64 Decoded',
    category: 'Crypto',
    points: 10,
    hash: 'd7ba614676b457e3e6c432df3d5965368400fd07723d23b85ddbbba4e8e781c3',
    hint: 'Decoded from ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259'
  },
  {
    id: 'crypto-rot13',
    title: 'Demo 1: ROT13 Caesar Shift',
    category: 'Crypto',
    points: 10,
    hash: 'cb4a012c5138f0733609e8e69811c04a6401dd04264b517c365cf41140cbfbca',
    hint: 'Decoded from synt{ebg13_vf_whfg_n_fuvsg}'
  },
  {
    id: 'crypto-hex',
    title: 'Demo 1: Hexadecimal Stream',
    category: 'Crypto',
    points: 10,
    hash: 'b6820c86016505378326344a630c8cbfb69385c8b1cd9ef402e2aee0976e785c',
    hint: 'Decoded from 666c61677b6865785f69735f6a7573745f62797465737d'
  },
  {
    id: 'crypto-layered',
    title: 'Demo 1: Layered Challenge (Hex -> Base64 -> ROT13)',
    category: 'Crypto',
    points: 25,
    hash: 'c5e898d40589069dd37514423dca1030592235b0febe8e1bb534d46340e0783a',
    hint: 'Peel all three layers in CyberChef'
  },
  {
    id: 'web-viewsource',
    title: 'Demo 2: View Source & Comments (HTML + CSS + JS)',
    category: 'Web',
    points: 15,
    hash: '11a83d111fbd30a294ea210552cdd6f98123ba4ad11760d634fe8099c2046d82',
    hint: 'Combine Part 1 (HTML comment) + Part 2 (CSS) + Part 3 (JS)'
  },
  {
    id: 'web-cookie',
    title: 'Demo 2: Admin Cookie Privilege Escalation',
    category: 'Web',
    points: 20,
    hash: '1f3b650ab794a4414c85064ecf249f18c38b7da65377ac4919d71b1d64f84c95',
    hint: 'Set admin=true in Application -> Cookies or via document.cookie'
  },
  {
    id: 'web-robots',
    title: 'Demo 2: robots.txt Disallowed Folder',
    category: 'Web',
    points: 15,
    hash: '2560da5ab00fb5c63f745d6f0c456a5e06c01dea0d86ab970247f21a80f747c2',
    hint: 'Navigate to /secret/ as revealed by robots.txt'
  },
  {
    id: 'forensics-strings',
    title: 'Demo 3: Strings in Appended Binary',
    category: 'Forensics',
    points: 15,
    hash: 'ea4d5aeeb6895f03c9ea036c9f689270d7179ba3b961b866e28237a04482a67b',
    hint: 'Run strings evidence.jpg | grep -i flag'
  },
  {
    id: 'forensics-exiftool',
    title: 'Demo 3: ExifTool Metadata Comment',
    category: 'Forensics',
    points: 20,
    hash: 'f0656e59b434b7becd50c201e579837ae4e6191653d364ba819b33343d2f3081',
    hint: 'Check Comment in exiftool, then base64 decode it'
  },
  {
    id: 'forensics-binwalk',
    title: 'Demo 3: Binwalk Embedded Zip Archive',
    category: 'Forensics',
    points: 20,
    hash: '8dfe241cccb1819f720da2f98ed509b5270c5554769f39f51a4184ca1476eae8',
    hint: 'Extract with binwalk -e evidence.jpg and read secret.txt'
  },
  {
    id: 'forensics-steghide',
    title: 'Demo 3: Steghide Pixel Steganography',
    category: 'Forensics',
    points: 25,
    hash: 'b0063fa204c42220aaba649bf36e75639f9387570c30db6ae064d34452cd02b9',
    hint: 'steghide extract -sf stego.jpg (empty passphrase)'
  },
  {
    id: 'linux-hidden',
    title: 'Linux Basics: Hidden Directory and File (ls -a)',
    category: 'Linux',
    points: 15,
    hash: '518255b5d8fe3c761f7b52c7ac220faeb545d45da88b956acd00567e9dddb39e',
    hint: 'Found in ~/ctf-lab/.hidden/.secret.txt'
  },
  {
    id: 'linux-grep',
    title: 'Linux Basics: Grep Needle in Log File',
    category: 'Linux',
    points: 15,
    hash: '0ffb2e729a79104fc1b7c727c19fb074f8f2b48a8b6f64e1839c3fcb2dc33c83',
    hint: 'Found in logs/app.log with grep -n flag logs/app.log'
  }
];

// Hash function using subtle crypto with fallback
export async function sha256(text) {
  const trimmed = text.trim();
  if (window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(trimmed);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback simple DJB2-based mock if crypto not present (crypto.subtle is standard in modern browsers)
  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = ((hash << 5) - hash) + trimmed.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}

export async function checkFlag(submittedString) {
  const hash = await sha256(submittedString.trim());
  const found = WORKSHOP_FLAGS.find(f => f.hash === hash);
  return found || null;
}
