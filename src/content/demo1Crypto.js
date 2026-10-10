export const demo1CryptoContent = {
  title: "Demo 1 (0:40 to 1:10): Crypto and encoding in CyberChef",
  time: "0:40 to 1:10",
  goal: "participants learn to recognise an encoding by how it looks, decode it in CyberChef and in the terminal, and peel off layers until a flag appears. The skill behind every crypto warm-up challenge is: identify, decode, check, repeat.",

  step0: {
    title: "Step 0: Encoding, encryption and hashing (5 minutes)",
    keyMessage: "Base64 is not security. It only changes how data is written, like writing the same sentence in a different alphabet. CTF authors use it to make a flag look scary.",
    table: [
      { idea: "Encoding", needsKey: "No", reversible: "Yes, anyone can", examples: "Base64, hex, URL encoding, binary" },
      { idea: "Encryption", needsKey: "Yes", reversible: "Only with the key", examples: "AES, RSA. Caesar cipher and ROT13 are toy versions" },
      { idea: "Hashing", needsKey: "No", reversible: "No, it is one-way", examples: "MD5, SHA-256" }
    ]
  },

  part1: {
    title: "Part 1: Base64",
    howItWorks: "Computers store text as bytes (8 bits each). Base64 re-cuts the bits into groups of 6, and each group of 6 bits (a number from 0 to 63) is written as one character from a 64-character alphabet: A-Z , a-z , 0-9 , + , / . Three bytes become four characters. If the input is short, = padding is added at the end.",
    workedExample: {
      word: "Man",
      steps: [
        { step: "Letters to ASCII numbers", result: "M = 77, a = 97, n = 110" },
        { step: "Numbers to 8-bit binary", result: "01001101 01100001 01101110" },
        { step: "Regroup into 6-bit chunks", result: "010011 010110 000101 101110" },
        { step: "Chunks as numbers", result: "19, 22, 5, 46" },
        { step: "Look up in the alphabet", result: "T, W, F, u" },
        { step: "Base64 result", result: "TWFu" }
      ]
    },
    recognition: "only letters, digits, + and / ; the length is a multiple of 4; it often ends with = or == . Example: ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259",
    cyberChefSteps: [
      "Paste ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259 into Input.",
      "In the Operations search box type From Base64 . Double-click it (or drag it into Recipe).",
      "Leave the alphabet as default. The Output shows flag{base64_is_not_encryption} .",
      "To encode instead, use To Base64 ."
    ],
    terminalCommand: `echo -n 'Man' | base64\necho 'ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259' | base64 -d`,
    terminalExplanation: "The first line prints TWFu . The second prints flag{base64_is_not_encryption} .",
    pythonVersion: `python3 -c "import base64;\nprint(base64.b64decode('ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259').decode())"`,
    flag: "flag{base64_is_not_encryption}"
  },

  part2: {
    title: "Part 2: ROT13 and the Caesar cipher",
    howItWorks: "A Caesar cipher shifts every letter forward by a fixed number of places in the alphabet. ROT13 is the special case with a shift of 13. Since the alphabet has 26 letters, applying ROT13 twice returns the original text, so the same operation encodes and decodes. Only letters change. Digits, spaces and symbols stay the same, which is why { , } and _ survive.\n\nExample: a becomes n , b becomes o , f becomes s , l becomes y , g becomes t , so flag becomes synt .",
    recognition: "the text looks like words in an unknown language, but the shape is right. For a flag, synt{...} is the giveaway because flag{ is the known start. Example: synt{ebg13_vf_whfg_n_fuvsg}",
    cyberChefSteps: [
      "Paste synt{ebg13_vf_whfg_n_fuvsg} into Input.",
      "Search for ROT13 and double-click it. Keep Rotate lower case chars and Rotate upper case chars ticked and Amount at 13.",
      "Output: flag{rot13_is_just_a_shift} .",
      "If the shift is not 13, use the operation ROT13 Brute Force , which shows every possible shift. Scan the list for the line that starts with flag ."
    ],
    terminalCommand: `echo 'synt{ebg13_vf_whfg_n_fuvsg}' | tr 'A-Za-z' 'N-ZA-Mn-za-m'`,
    flag: "flag{rot13_is_just_a_shift}"
  },

  part3: {
    title: "Part 3: Hexadecimal",
    howItWorks: "Hex writes each byte as two characters from 0-9 and a-f . The letter f is byte 102, which is 66 in hex. So flag is 66 6c 61 67 . It is just another way to write the same bytes.",
    recognition: "only 0-9 and a-f , an even number of characters, often with spaces between pairs. Example: 666c61677b6865785f69735f6a7573745f62797465737d",
    cyberChefSteps: [
      "Paste the hex string into Input.",
      "Search for From Hex and double-click it. Delimiter Auto works for both spaced and unspaced hex.",
      "Output: flag{hex_is_just_bytes} ."
    ],
    terminalCommand: `echo '666c61677b6865785f69735f6a7573745f62797465737d' | xxd -r -p\necho -n 'flag' | xxd -p`,
    terminalExplanation: "The first command decodes. The second encodes and prints 666c6167 .",
    flag: "flag{hex_is_just_bytes}"
  },

  part4: {
    title: "Part 4: Layered challenge (the real skill)",
    intro: "Real challenges stack encodings. Give participants this string and tell them it hides one flag. Do the first layer together, let them finish the rest.",
    challengeString: "63336c7564487435626d78795a575a66596e4e66636d4677596e463259585239",
    layers: [
      { step: 1, action: "Identify", detail: "Only 0-9 and a-f , even length. Probably hex." },
      { step: 2, action: "Decode", detail: "From Hex gives c3ludHt5bmxyZWZfYnNfcmFwYnF2YXR9 ." },
      { step: 3, action: "Identify again", detail: "Letters and digits, length a multiple of 4. Probably Base64." },
      { step: 4, action: "Decode", detail: "Add From Base64 to the Recipe. It gives synt{ynlref_bs_rapbqvat} ." },
      { step: 5, action: "Identify again", detail: "It starts with synt{ , which is flag{ under ROT13." },
      { step: 6, action: "Decode", detail: "Add ROT13 . Final answer: flag{layers_of_encoding} ." }
    ],
    cyberChefNote: "The finished recipe in CyberChef is three boxes stacked in the Recipe column: From Hex, From Base64, ROT13. Show how you can drag the boxes to reorder them and untick a box (the disable icon) to see the output at each stage.",
    flag: "flag{layers_of_encoding}"
  },

  shortcut: {
    title: "Shortcut: the Magic operation",
    text: "When you do not know the encoding, search for Magic in Operations and double-click it. CyberChef tries many decodings and lists the ones that produce readable text. After the live demo, show it on the layered string. Also show the magic wand icon that appears in the Output pane. Warn them that Magic is a helper, not a replacement for recognising the encoding by eye."
  },

  boardFlow: {
    title: "Solving flow to write on the board",
    steps: [
      "1. Look at the characters and length. Guess the encoding.",
      "2. Decode it in CyberChef.",
      "3. Read the output. If it is readable and has the flag format, done.",
      "4. If it still looks like gibberish, treat the output as new input and go to step 1.",
      "5. If nothing works after 5 minutes, try Magic, or search the exact pattern (for example \"string ending in equals sign\")."
    ]
  },

  picoCtfPractice: {
    title: "Practice on picoCTF",
    text: "Search the Practice list for the Cryptography and General Skills categories and pick the easiest ones. Challenge names change between years, but past events included beginner challenges on ROT13, Base64 and hex, for example named 13 , Bases and Mod 26 . Sort by difficulty and solve one together if time allows."
  }
};
