export const demo2WebContent = {
  title: "Demo 2 (1:10 to 1:40): Web, view source, DevTools, cookies, robots.txt",
  time: "1:10 to 1:40",
  goal: "participants learn one idea that powers most beginner web challenges: everything the server sends to your browser is visible to you, and anything the browser stores can be edited by you. Developers hide things \"in the page\" and forget that the page belongs to the visitor.",

  step0: {
    title: "Step 0: How a website reaches you (3 minutes)",
    flow: [
      "You type a URL. The browser sends a request to a server.",
      "The server sends back a response: HTML (structure), CSS (style), JavaScript (behaviour), plus headers and sometimes cookies.",
      "The browser draws the page. But it also keeps all of that raw material, and you can read it."
    ],
    cookieExplanation: "A cookie is a small piece of text the site stores in your browser, such as `session=abc123` or `admin=false`. The browser sends it back on every request so the site remembers you. If a site trusts a cookie value without checking it, you can change the value."
  },

  step1: {
    title: "Step 1: Build the demo website (do this before the workshop)",
    intro: "In Ubuntu (WSL), create a folder with four small files. Paste this whole block in one go:",
    script: `mkdir -p ~/webdemo/secret && cd ~/webdemo

cat > index.html <<'EOF'
<!DOCTYPE html>
<html>
<head>
<title>Workshop Web Demo</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h1>Welcome to the Demo Site</h1>
<p>Nothing to see here... or is there?</p>
<!-- TODO: remove before launch. Part 1 of flag: flag{view_ -->
<p id="msg">You are not an admin.</p>
<script src="app.js"></script>
</body>
</html>
EOF

cat > style.css <<'EOF'
body { font-family: sans-serif; text-align: center; margin-top: 60px; }
/* Part 2 of flag: source_ */
EOF

cat > app.js <<'EOF'
// Part 3 of flag: and_devtools}
function getCookie(name) {
const m = document.cookie.split('; ').find(c => c.startsWith(name + '='));
return m ? m.split('=')[1] : null;
}
if (!getCookie('admin')) { document.cookie = 'admin=false; path=/'; }
if (getCookie('admin') === 'true') {
document.getElementById('msg').textContent = 'Welcome, admin! Secret code: flag{cookie_monster}';
}
EOF

cat > robots.txt <<'EOF'
User-agent: *
Disallow: /secret/
EOF

cat > secret/index.html <<'EOF'
<h1>Secret Area</h1>
<p>You found it with robots.txt. Flag: flag{robots_reveal_secrets}</p>
EOF`,
    runServerCommand: "python3 -m http.server 8765",
    serverInstructions: "The terminal will say \"Serving HTTP on 0.0.0.0 port 8765\". Leave it running. Open a browser on Windows and go to `http://localhost:8765` (if that fails, try `http://127.0.0.1:8765`). Stop the server later with `Ctrl + C`.",
    hiddenFlagsTable: [
      {
        flagId: "web-viewsource",
        flagPlaceholder: "{{flag:web-viewsource}}",
        where: "Three pieces: HTML comment, CSS comment, JS comment",
        technique: "View source, then open linked files"
      },
      {
        flagId: "web-cookie",
        flagPlaceholder: "{{flag:web-cookie}}",
        where: "Appears when cookie admin is true",
        technique: "Edit a cookie"
      },
      {
        flagId: "web-robots",
        flagPlaceholder: "{{flag:web-robots}}",
        where: "The `/secret/` page",
        technique: "`robots.txt`"
      }
    ]
  },

  step2: {
    title: "Step 2: View source",
    steps: [
      "Open the demo page. It looks empty and boring. Say that out loud.",
      "Press `Ctrl + U` (Windows and Linux) or `Cmd + Option + U` (Mac Chrome). You can also right-click the page and choose View page source.",
      "Read the HTML like a story. Point out: the `<title>`, the `<!-- ... -->` comment, the `<link>` to `style.css`, the `<script>` for `app.js`.",
      "Find the comment with Part 1: `flag{view_`.",
      "Click the `style.css` link inside the source. It opens in a new tab. Find Part 2: `source_` in the CSS comment.",
      "Go back, click `app.js`. Find Part 3: `and_devtools}`.",
      "Join the parts: {{flag:web-viewsource}}."
    ],
    lesson: "Lesson: a challenge page is never just the page. Always read the HTML, then every linked CSS and JavaScript file. Comments, hidden form fields (`<input type=\"hidden\">`) and hard-coded passwords in JavaScript are the usual treasure."
  },

  step3: {
    title: "Step 3: DevTools tour, tab by tab",
    intro: "Open DevTools with `F12`, or `Ctrl + Shift + I` (`Cmd + Option + I` on Mac), or right-click and choose Inspect. If it opens at the side or bottom, use the three-dot menu to change the dock position. Walk through each tab below on the demo site.",
    devToolsTabs: [
      {
        name: "Elements",
        shows: "The live HTML (the DOM) after JavaScript has run. You can edit it",
        whatToDo: "Click the arrow icon at top left (or `Ctrl + Shift + C`), then click on the heading. Double-click text in the Elements panel and change it. Right-click a node and choose Delete element. Explain that edits are only in your browser."
      },
      {
        name: "Console",
        shows: "Errors, logs, and a place to run JavaScript",
        whatToDo: "Type `document.title` and press Enter. Then type `document.cookie` to see your cookies. Tell them the console runs code as the page, so never paste code you do not understand."
      },
      {
        name: "Sources",
        subname: "Debugger in Firefox",
        shows: "Every file the page loaded: HTML, CSS, JS",
        whatToDo: "Open `app.js`. Press `Ctrl + F` to search inside one file, `Ctrl + Shift + F` to search in all files. Click `{ }` at the bottom to pretty-print minified code."
      },
      {
        name: "Network",
        shows: "Every request the page made and every response",
        whatToDo: "Keep it open and reload the page with `F5`. Click `index.html`, then look at Headers (URL, method, status code 200, response headers), Response (raw body) and Cookies. Tick Preserve log so requests are not cleared on navigation."
      },
      {
        name: "Application",
        subname: "Storage in Firefox",
        shows: "Cookies, Local Storage, Session Storage",
        whatToDo: "Expand Cookies, click `http://localhost:8765`, and find `admin` with value `false`."
      }
    ],
    networkKeyPoints: [
      "Status codes: 200 means OK, 301 or 302 means redirect, 403 means forbidden, 404 means not found, 500 means server error.",
      "Method: GET asks for a page, POST sends data such as a login form.",
      "Filter buttons: Fetch/XHR shows background data requests, which often reveal hidden API paths.",
      "Headers: custom headers (for example `X-Flag` or `X-Secret`) are sometimes used to hide a flag."
    ]
  },

  step4: {
    title: "Step 4: Cookies, change the value and win",
    intro: "The page says \"You are not an admin.\" The site decides that using a cookie. Change the cookie yourself:",
    method1: {
      name: "Method 1: Application tab (the visual way)",
      steps: [
        "Open DevTools, go to Application, expand Cookies, click `http://localhost:8765`.",
        "Find the row named `admin`. Double-click its Value cell.",
        "Change `false` to `true` and press Enter.",
        "Reload the page with `F5`. The page now shows \"Welcome, admin!\" and the flag {{flag:web-cookie}}."
      ]
    },
    method2: {
      name: "Method 2: Console (the fast way)",
      code: `document.cookie = "admin=true; path=/";\nlocation.reload();`
    },
    realWorldNote: "Note for the real world: in this demo the check happens in JavaScript in your browser, which is weak by design. Real challenges often keep the check on the server, but the idea is the same: look at the cookie, ask what it means, change it. Cookie values are often encoded, so if you see something like `eyJ1c2VyIjoiZ3Vlc3QifQ==` paste it into CyberChef and use `From Base64`. That connects this demo back to Demo 1.",
    flagId: "web-cookie"
  },

  step5: {
    title: "Step 5: robots.txt hunt",
    intro: "`robots.txt` is a public text file at the top of a website that asks search engines which paths not to crawl. It is a polite request, not security, and it accidentally lists the paths the owner wanted to hide.",
    steps: [
      "In the address bar change the URL to `http://localhost:8765/robots.txt` and press Enter.",
      "Read it. `Disallow: /secret/` means \"do not crawl this folder\".",
      "Visit `http://localhost:8765/secret/`. The page shows {{flag:web-robots}}."
    ],
    commonPathsToTry: "On a real CTF target, also try these paths by hand: `/robots.txt`, `/sitemap.xml`, `/admin`, `/login`, `/backup`, `/.git/`. Only do that on challenge servers you are meant to attack.",
    flagId: "web-robots"
  },

  bonusCurl: {
    title: "Bonus: the same demo from the terminal with curl",
    intro: "Open a second Ubuntu window while the server runs in the first:",
    command: `curl http://localhost:8765/robots.txt             # read a file
curl -i http://localhost:8765/                  # -i also shows response headers
curl http://localhost:8765/ | grep -i flag      # search the HTML for the word flag
curl -b "admin=true" http://localhost:8765/app.js # send a cookie with the request`
  },

  boardFlow: {
    title: "Solving flow to write on the board",
    steps: [
      "1. View source. Read every comment and every linked file.",
      "2. Open DevTools. Check Network (what was requested), Application (cookies and storage) and Sources (all code).",
      "3. Check `/robots.txt` and obvious paths.",
      "4. Change what you control: cookies, URL parameters, hidden fields.",
      "5. Decode anything that looks encoded (back to Demo 1)."
    ]
  },

  picoCtfPractice: {
    title: "Practice on picoCTF",
    text: "Open the Web Exploitation category and sort by difficulty. Past beginner challenges used exactly these ideas, for example named `Insp3ct0r` (view source and linked files), `Where are the robots` (`robots.txt`), `Cookies` and `logon` (cookie editing), and `Inspect HTML`. Names change by year, so search by category."
  }
};
