export const setupContent = {
  title: "Setup (0:20 to 0:40): picoCTF, CyberChef and WSL",
  time: "0:20 to 0:40",
  overview: "By the end of this slot every participant has three things working: a picoCTF account, CyberChef open in a browser tab, and a Linux terminal. Button labels on websites change from time to time, so treat the names below as a guide.",

  partA: {
    title: "Part A: picoCTF account",
    steps: [
      { num: 1, text: "Open picoctf.org in the browser and click Login or Register at the top right." },
      { num: 2, text: "Choose to create an account. Use a username that is not your real name (it can appear on public scoreboards), an email you can open right now, and a password." },
      { num: 3, text: "Open the verification email and click the link." },
      { num: 4, text: "Log in. Open the Practice area (play.picoctf.org/practice). This is the library of past challenges you will use in the Mini CTF." },
      { num: 5, text: "Show participants the filters: Category (Web Exploitation, Cryptography, Forensics, General Skills, Reverse Engineering, Binary Exploitation) and Difficulty. Tell them to start with General Skills and Forensics." },
      { num: 6, text: "Open any easy challenge and point out its parts: the description, hints, the Launch Instance button when it needs a server, the attached files to download, and the flag box where the answer is submitted." }
    ],
    note: "PicoCTF also has a built-in browser terminal called the webshell. If someone's laptop cannot run WSL, that is their fallback for the whole workshop."
  },

  partB: {
    title: "Part B: CyberChef",
    intro: "CyberChef is a free website, built by the UK's GCHQ, that decodes and converts data. It runs entirely in your browser, so nothing is uploaded.",
    steps: [
      { num: 1, text: "Open gchq.github.io/CyberChef." },
      { 
        num: 2, 
        text: "Learn the four areas:", 
        subitems: [
          "Operations (left): the searchable list of tools, such as From Base64 and ROT13.",
          "Recipe (middle): the chain of operations that will run, top to bottom.",
          "Input (top right): where you paste the data.",
          "Output (bottom right): the result."
        ] 
      },
      { num: 3, text: "Try it: type hello in the Input, type To Base64 in the Operations search box, and double-click the result. The Output shows aGVsbG8= ." },
      { num: 4, text: "Make sure Auto Bake is ticked at the bottom (otherwise press the Bake! button after every change)." },
      { num: 5, text: "Offline backup: on the CyberChef page use the link to download the ZIP, unzip it, and open the HTML file inside. It works without internet." }
    ]
  },

  partC: {
    title: "Part C: WSL (Linux inside Windows)",
    intro: "WSL means Windows Subsystem for Linux. It gives you a real Ubuntu terminal on a Windows laptop without a virtual machine or dual boot. You need Windows 10 version 2004 or later (build 19041+), or Windows 11, plus about 10 GB of free disk space and admin rights. Plan 10 to 20 minutes, most of it waiting.",
    steps: [
      { num: 1, text: "Check your Windows version. Press Win + R , type winver , press Enter. Windows 10 needs version 2004 or higher, Windows 11 is fine." },
      { num: 2, text: "Open PowerShell as administrator. Click Start, type PowerShell , right-click Windows PowerShell and choose Run as administrator. Click Yes on the prompt." },
      { 
        num: 3, 
        text: "Install. Type the command below and press Enter. It turns on the required Windows features and downloads Ubuntu.",
        command: "wsl --install",
        language: "bash"
      },
      { num: 4, text: "Restart the laptop when it asks. This step is required." },
      { num: 5, text: "Finish Ubuntu setup. After the restart a black Ubuntu window opens by itself (or open Ubuntu from the Start menu). Wait for \"Installing, this may take a few minutes\"." },
      { num: 6, text: "Create your Linux user. Type a username (lowercase, no spaces) and press Enter. Type a password and press Enter. The screen shows nothing while you type the password, which is normal. Type it again to confirm." },
      { num: 7, text: "You are in. The prompt looks like krishna@LAPTOP:~$ . The ~ means you are in your home folder." },
      { 
        num: 8, 
        text: "Update the package list and installed packages:",
        command: "sudo apt update && sudo apt upgrade -y",
        language: "bash"
      },
      { 
        num: 9, 
        text: "Install every tool the workshop needs in one command:",
        command: "sudo apt install -y binutils file libimage-exiftool-perl binwalk steghide xxd zip unzip curl wget python3 python3-pip",
        language: "bash"
      },
      { 
        num: 10, 
        text: "Check that it worked. Each line should print a version or a path, not \"command not found\":",
        command: `strings --version | head -1
file --version | head -1
exiftool -ver
binwalk --help | head -3
steghide --version
xxd -v`,
        language: "bash"
      }
    ],
    tips: [
      "Your Windows files are visible under /mnt/c/ . Your Downloads folder is /mnt/c/Users/<your-windows-username>/Downloads .",
      "To open the current Linux folder in Windows Explorer: explorer.exe .",
      "To copy a downloaded file into Linux: cp /mnt/c/Users/<name>/Downloads/image.jpg ~/",
      "Paste into the Ubuntu window with right-click (or Ctrl + Shift + V ).",
      "Prefer working inside your Linux home folder ( ~ ) for speed."
    ],
    macLinuxGuide: "Mac and Linux users: open the Terminal app. On Mac install the tools with Homebrew: brew install exiftool binwalk binutils . Steghide is not reliably available on Mac, so Mac users can follow that one demo on a neighbour's screen or in the picoCTF webshell. On Ubuntu or Debian use the apt command in step 9.",
    banditFallback: "For OverTheWire Bandit later you only need an SSH client. Windows PowerShell already has the ssh command, so even without WSL they can still do Bandit."
  },

  troubleshooting: [
    {
      problem: "wsl --install only prints a help list",
      fix: "Windows is too old. Update Windows, or use the picoCTF webshell"
    },
    {
      problem: "Error about virtualization or Virtual Machine Platform",
      fix: "Virtualization is off in BIOS. Restart, open BIOS (often F2, F10 or Del), enable Intel VT-x or AMD SVM, save"
    },
    {
      problem: "No admin rights (college lab PC)",
      fix: "Use the picoCTF webshell, or work in pairs on a laptop that works"
    },
    {
      problem: "apt cannot download packages",
      fix: "Check internet. Try a phone hotspot if the college network blocks it"
    },
    {
      problem: "Stuck for more than 10 minutes",
      fix: "Pair them with a neighbour and move on. Do not stop the room for one laptop"
    }
  ]
};
