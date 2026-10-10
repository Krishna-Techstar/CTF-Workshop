export const demo3ForensicsContent = {
  title: "Break and Demo 3: Forensics and stego",
  time: "1:40 to 2:20",
  breakTitle: "Break (1:40 to 1:50) - Use the break to hand out the files",
  breakInstructions: "Share `evidence.jpg` and `stego.jpg` (built in the prep steps below) as a ZIP file or Drive link; never send them as a photo; send as a ZIP or file. WhatsApp, Instagram and similar apps re-compress photos and silently destroy hidden data. Ask everyone to unzip the files into a folder called `forensics-demo` in their Ubuntu home folder, or on Windows copy them with `WINUSER=\"yourname\"` and `cp /mnt/c/Users/$WINUSER/Downloads/evidence.jpg ~/forensics-demo/`. Also tell anyone whose tools check failed in the Setup section to fix that now.",
  demo3Title: "Demo 3 (1:50 to 2:20): Forensics and stego",

  step0: {
    title: "Step 0: Why files can hide things (5 minutes)",
    intro: "A file is just a long list of bytes. The program that opens it reads only the parts it understands and ignores the rest. So data can hide in three places: metadata (labels stored in the file), extra bytes added after the end, and inside the pixels or samples themselves (steganography).\n\nThe first few bytes of a file, called the magic number or file signature, say what the file really is. The extension (`.jpg`) is only a name and can lie.",
    magicNumbersTable: [
      { type: "JPEG", bytes: "FF D8 FF", text: "not readable" },
      { type: "PNG", bytes: "89 50 4E 47", text: ".PNG" },
      { type: "GIF", bytes: "47 49 46 38", text: "GIF8" },
      { type: "PDF", bytes: "25 50 44 46", text: "%PDF" },
      { type: "ZIP", bytes: "50 4B 03 04", text: "PK" }
    ],
    routine: "The standard forensics routine, in order: `file`, `strings`, `exiftool`, `binwalk`, hex view, then stego tools. Cheap and fast tools first."
  },

  prep: {
    title: "Prep: build the sample files (do this before the workshop)",
    intro: "You need one ordinary photo, at least 100 KB so steghide has room. Save any JPG as `cat.jpg` (any name works, adjust the commands). Then in Ubuntu:",
    script: `# Set your Windows username in Ubuntu once:
WINUSER="yourname"

mkdir -p ~/forensics-demo && cd ~/forensics-demo
cp /mnt/c/Users/$WINUSER/Downloads/cat.jpg .

# evidence.jpg holds three hidden layers
cp cat.jpg evidence.jpg

# Layer 1: metadata. The comment is Base64 so it links back to Demo 1
exiftool -overwrite_original -Comment="ZmxhZ3tleGlmdG9vbF9yZWFkc19tZXRhZGF0YX0=" -Artist="Anonymous" evidence.jpg

# Layer 2: plain text appended after the end of the image
echo "{{flag:forensics-strings}}" >> evidence.jpg

# Layer 3: a zip file appended after the image
(echo "{{flag:forensics-binwalk}}"; for i in $(seq 1 200); do echo "padding line $i of harmless text"; done) > secret.txt
zip -q -9 secret.zip secret.txt
cat secret.zip >> evidence.jpg
rm secret.txt secret.zip

# stego.jpg hides a file inside the image data with an empty password
cp cat.jpg stego.jpg
echo "{{flag:forensics-steghide}}" > hidden.txt
steghide embed -cf stego.jpg -ef hidden.txt -p ""
rm hidden.txt`,
    verification: "Check that both images still open normally in Windows (`explorer.exe .` then double-click). They should look like the original photo. Then test every command in this section once yourself. If steghide embed says the cover file is too short, use a larger photo."
  },

  steps: [
    {
      id: "step1",
      name: "file",
      title: "Step 1: file, what is this really?",
      purpose: "Identifies the actual file type by checking the magic number, regardless of extension",
      commands: [
        {
          label: "Identify file type via magic number",
          code: "cd ~/forensics-demo\nfile evidence.jpg",
          note: "Expected: a line like `evidence.jpg: JPEG image data, JFIF standard 1.01, ...`. It identifies the type from the magic number, not the extension."
        },
        {
          label: "Prove that extension can lie",
          code: "cp evidence.jpg mystery.dat\nfile mystery.dat",
          note: "It still says JPEG. On real challenges, a file called `flag.txt` that `file` calls a ZIP or PNG is a big clue."
        }
      ]
    },
    {
      id: "step2",
      name: "strings",
      title: "Step 2: strings, read the text hiding in binary",
      purpose: "Prints every run of readable ASCII characters inside binary files",
      flagId: "forensics-strings",
      commands: [
        {
          label: "Extract readable strings",
          code: `strings evidence.jpg | less          # scroll with arrows, quit with q
strings evidence.jpg | grep -i flag  # only lines containing "flag"
strings -n 8 evidence.jpg            # only strings of 8 or more characters
strings evidence.jpg | tail -20      # the end of the file is where appended text lives`,
          note: "Expected: {{flag:forensics-strings}} appears. Also point out the lines near the end that mention `secret.txt`, which hints that a file is hidden inside. Pipe (`|`) sends output to the next command, and `grep -i` ignores case."
        }
      ]
    },
    {
      id: "step3",
      name: "exiftool",
      title: "Step 3: exiftool, read the metadata",
      purpose: "Reads embedded EXIF metadata (camera specs, GPS, timestamps, comments)",
      flagId: "forensics-exiftool",
      commands: [
        {
          label: "Read metadata fields",
          code: "exiftool evidence.jpg",
          note: "Read down the long list of fields. Find the Comment field: `ZmxhZ3tleGlmdG9vbF9yZWFkc19tZXRhZGF0YX0=`. It ends with `=`, so it looks like Base64."
        },
        {
          label: "Extract and decode comment",
          code: "exiftool -Comment evidence.jpg\necho 'ZmxhZ3tleGlmdG9vbF9yZWFkc19tZXRhZGF0YX0=' | base64 -d",
          note: "Result: {{flag:forensics-exiftool}}. Photos can leak GPS coordinates, and OSINT challenges often ask where a photo was taken from its EXIF data."
        }
      ]
    },
    {
      id: "step4",
      name: "binwalk",
      title: "Step 4: binwalk, find files hidden inside files",
      purpose: "Scans for embedded file signatures (e.g. PK zip header) at any byte offset",
      flagId: "forensics-binwalk",
      commands: [
        {
          label: "Scan file signatures",
          code: "binwalk evidence.jpg",
          note: "Expected output has columns DECIMAL, HEXADECIMAL and DESCRIPTION. A row says `Zip archive data with name: secret.txt`, followed by `End of Zip archive`. That means a zip file is glued to the end of the photo."
        },
        {
          label: "Extract embedded files",
          code: "binwalk -e evidence.jpg\nls\nls _evidence.jpg.extracted\ncat _evidence.jpg.extracted/secret.txt | head -1",
          note: "The folder name can differ by binwalk version (newer versions use `extractions`), so use `ls` to find it. The first line of `secret.txt` is {{flag:forensics-binwalk}}."
        },
        {
          label: "Bonus direct unzip trick",
          code: "unzip evidence.jpg",
          note: "A zip's index sits at the end of the file, so `unzip` can often open the image directly. It prints a warning about extra bytes and extracts `secret.txt`."
        }
      ]
    },
    {
      id: "step5",
      name: "xxd",
      title: "Step 5: Hex view with xxd",
      purpose: "Displays raw byte offsets, hexadecimal values, and ASCII text representation",
      commands: [
        {
          label: "Inspect head and tail hex bytes",
          code: `xxd evidence.jpg | head -3  # the first bytes: starts with ffd8 ffe0
xxd evidence.jpg | tail -5  # the last bytes: you can see PK near the end`,
          note: "Three columns: the offset, the hex bytes, and readable text on the right. Point out `ffd8` at the very start (the JPEG signature). You do not need to read hex fluently, only to know where to look."
        }
      ]
    },
    {
      id: "step6",
      name: "steghide",
      title: "Step 6: steghide, data hidden inside the pixels",
      purpose: "Inspect and extract data steganographically hidden in pixel data",
      flagId: "forensics-steghide",
      commands: [
        {
          label: "Verify appended byte tools find nothing",
          code: "strings stego.jpg | grep -i flag   # prints nothing\nbinwalk stego.jpg                  # only shows the JPEG",
          note: "Steganography hides a secret inside normal-looking data so nobody suspects it exists. Unlike appended bytes, this data is mixed into the image itself."
        },
        {
          label: "Inspect and extract steganographic file",
          code: "steghide info stego.jpg\nsteghide extract -sf stego.jpg",
          note: "When it asks for a passphrase, just press Enter (the password is empty in this demo). It writes `hidden.txt`. In real challenges the password comes from a hint or challenge text. Works on JPEG, BMP, WAV, AU."
        },
        {
          label: "Read extracted secret",
          code: "cat hidden.txt",
          note: "Reads the extracted text: {{flag:forensics-steghide}}."
        }
      ]
    }
  ],

  otherTools: "Other tools to name-drop (not to demo): `zsteg` for PNG and BMP files, `Stegsolve` and `Aperi'Solve` (a website) for looking at colour layers, `Audacity` for audio spectrograms, and `foremost` for carving files out of disk images.",

  summaryTable: [
    { symptom: "What type of file is this?", tool: "file", command: "file x" },
    { symptom: "Readable text inside a binary", tool: "strings", command: "strings x | grep -i flag" },
    { symptom: "Camera, date, GPS, comments", tool: "exiftool", command: "exiftool x" },
    { symptom: "A file hidden inside a file", tool: "binwalk", command: "binwalk -e x" },
    { symptom: "Raw bytes at the start or end", tool: "xxd", command: "xxd x | head" },
    { symptom: "Data hidden in a JPEG's pixels", tool: "steghide", command: "steghide extract -sf x" }
  ],

  picoCtfPractice: {
    title: "Practice on picoCTF",
    text: "Open the Forensics category and sort by difficulty. Beginner challenges often hide a flag in a file's metadata, in its strings, or inside a second file."
  }
};
