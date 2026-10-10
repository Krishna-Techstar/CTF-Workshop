export const beforeYouStartContent = {
  title: "Before you start",
  author: "@Krishna",
  date: "Oct 10, 2026",
  time: "0:00 to 0:20",
  overview: "This guide covers every hands-on segment of your workshop in the order you will teach it, with the exact clicks, commands and expected results. Teach each demo in three beats: you show it, you do it together, they do it alone.",
  participantPrepTasks: [
    "Create a free account on picoCTF (`picoctf.org`)",
    "Windows users: install WSL (Setup section, Part C). Mac and Linux users already have a terminal",
    "Bring a laptop, charger and a browser (Chrome or Firefox)"
  ],
  facilitatorPrepTasks: [
    "Follow Setup Parts A to C yourself once, so you know where people get stuck",
    "Build the web demo site (Demo 2) and open it in the browser",
    "Build the hidden-flag image (Demo 3) and run every tool on it",
    "Build the Linux practice folder (Linux basics section)",
    "Download an offline copy of CyberChef and copy all demo files to a pen drive as backup",
    "Solve 5 to 6 easy picoCTF challenges yourself, so you can answer \"what is it like?\""
  ],
  ethics: {
    heading: "Ethics, say this in the first 10 minutes",
    text: "Only attack systems you have written permission to test. A CTF platform, a practice site and your own laptop are fine. A random website, the college Wi-Fi or a friend's account are not. In India, unauthorized access to computers falls under the IT Act, 2000 (Sections 43 and 66), so \"it was just for learning\" is not a defence."
  },
  flagFormat: {
    heading: "Flag format",
    text: "Every demo flag in this guide looks like `flag{...}`. Real picoCTF flags look like `picoCTF{...}`. Tell participants to always copy the full string including the braces."
  }
};
