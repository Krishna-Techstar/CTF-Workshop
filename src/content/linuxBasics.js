export const linuxBasicsContent = {
  title: "Linux basics (2:20 to 2:30): ls, cat, grep, file, cd and Bandit",
  time: "2:20 to 2:30",
  goal: "in 10 minutes, take someone who has never used a terminal to the point where they can move around, read files and search them. These six commands are enough for most beginner CTF tasks. You have already used several of them in the demos, so say \"you have been doing this all along\".",

  step0: {
    title: "Step 0: Reading the prompt",
    explanation: "The prompt krishna@LAPTOP:~$ means: user krishna , on machine LAPTOP , currently in ~ (the home folder), and $ means a normal user. You type after the $ and press Enter. Linux is case sensitive, so Flag.txt and flag.txt are different files."
  },

  sixCommands: [
    { command: "pwd", does: "Print where you are", example: "pwd prints /home/krishna" },
    { command: "ls", does: "List files. -l long format, -a include hidden files (names starting with . )", example: "ls -la" },
    { command: "cd", does: "Change folder. cd .. goes up one, cd ~ goes home, cd - goes back", example: "cd ctf-lab/docs" },
    { command: "cat", does: "Print a file's contents to the screen", example: "cat notes/todo.txt" },
    { command: "grep", does: "Search for text. -i ignore case, -n show line numbers, -r search inside all files in a folder", example: "grep -rn \"flag\" ." },
    { command: "file", does: "Tell what kind of file something is", example: "file mystery" }
  ],

  helpers: [
    { helper: "Tab key", use: "Auto-completes file names. Type cat fo then press Tab" },
    { helper: "Up arrow", use: "Brings back the previous command" },
    { helper: "Ctrl + C", use: "Stops a running command" },
    { helper: "clear", use: "Clears the screen" },
    { helper: "command --help or man command", use: "Built-in manual (quit man with q )" },
    { helper: "head , tail", use: "First or last lines of a file, such as tail -5 file" },
    { helper: "find", use: "Find files by name: find ~ -name \"*.txt\"" },
    { helper: "| (pipe)", use: "Sends one command's output into another: cat file | grep flag" },
    { helper: ">", use: "Saves output into a file: ls > list.txt" },
    { helper: "wget URL , unzip file.zip", use: "Download a file, extract a zip" }
  ],

  step1: {
    title: "Step 1: Build the practice folder (before the workshop)",
    intro: "Paste this block once. It creates a small treasure hunt with two flags:",
    command: `mkdir -p ~/ctf-lab/docs ~/ctf-lab/notes ~/ctf-lab/.hidden ~/ctf-lab/logs
cd ~/ctf-lab
echo "Nothing useful here." > docs/readme.txt
echo "Shopping list: milk, eggs" > notes/todo.txt
echo "flag{ls_dash_a_shows_hidden}" > .hidden/.secret.txt
for i in 1 2 3 4 5; do echo "INFO line $i ok"; done > logs/app.log
echo "ERROR user=admin token=flag{grep_finds_needles}" >> logs/app.log
for i in 6 7 8; do echo "INFO line $i ok"; done >> logs/app.log
cd ~`,
    note: "Share these lines on a slide or in chat so participants can paste the same block on their own laptops."
  },

  step2: {
    title: "Step 2: Guided walkthrough (live, 5 minutes)",
    intro: "Type each command, say what it does, then ask the room what they expect before pressing Enter.",
    walkthrough: [
      { cmd: "pwd", comment: "where am I?" },
      { cmd: "ls", comment: "what is here? you see ctf-lab" },
      { cmd: "cd ctf-lab", comment: "move into it" },
      { cmd: "ls", comment: "docs, logs, notes. No flag visible" },
      { cmd: "ls -a", comment: "now a hidden folder .hidden appears" },
      { cmd: "cd .hidden", comment: "" },
      { cmd: "ls -a", comment: ".secret.txt is hidden too" },
      { cmd: "cat .secret.txt", comment: "first flag" },
      { cmd: "cd ..", comment: "back up one folder" },
      { cmd: "cat logs/app.log", comment: "long file, flag buried in it" },
      { cmd: "grep -n flag logs/app.log", comment: "search instead of reading" },
      { cmd: "grep -rn flag .", comment: "search every file in this folder and below" },
      { cmd: "file docs/readme.txt", comment: "ASCII text" }
    ],
    flagsFound: [
      "flag{ls_dash_a_shows_hidden}",
      "flag{grep_finds_needles}"
    ],
    pointToLand: "The point to land: ls -a and grep are how you find things when you do not know where to look."
  },

  step3: {
    title: "Step 3: Let them try (3 minutes)",
    text: "Ask everyone, alone, to go back to ~ , run find ~/ctf-lab -name \"*.txt\" , and print the contents of every text file with cat . Fastest person reads out the todo list."
  },

  bandit: {
    title: "OverTheWire Bandit (mention and homework)",
    intro: "Bandit is a free beginner wargame that teaches Linux through 30+ levels. You log in to a remote server over SSH, find the password for the next level, and log in again as the next user. It is the best way to get comfortable with the terminal.",
    steps: [
      "1. Open overthewire.org/wargames/bandit and read the Level 0 page.",
      "2. Connect (works in Ubuntu or in Windows PowerShell):\n   ssh bandit0@bandit.labs.overthewire.org -p 2220",
      "3. The first time it asks \"Are you sure you want to continue connecting?\". Type yes . Then type the password given on the Level 0 page (nothing shows while you type).",
      "4. Level 0 goal: the password for the next level is stored in a file called readme in the home folder. Run ls , then cat readme .",
      "5. Copy that password, type exit , and connect to the next level with the next username:\n   ssh bandit1@bandit.labs.overthewire.org -p 2220 .",
      "6. Keep a text file with each level's password. Read the \"Level Goal\" and \"Commands you may need\" on every level page."
    ],
    homeworkNote: "Tell participants to aim for levels 0 to 5 as homework. The early levels use exactly the commands from this section, plus a few tricky file names (a file literally called - , a file with spaces in its name, and hidden files)."
  }
};
