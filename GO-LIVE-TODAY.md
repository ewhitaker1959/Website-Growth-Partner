# Website Growth Partner — GO LIVE TODAY

Your AI-powered site is finished and ready. This guide gets it online today with
explicit, click-by-click steps. No coding knowledge needed to deploy.

Two things are in this download:
- **`public/`** — the finished website (this is what you upload / put online)
- Everything else — the Hugo source you edit later to make changes

---

# ⭐ IMPORTANT — do this ONE thing first (2 minutes): the contact form

Your contact form needs a free service called **Formspree** to deliver messages,
because a static site can't send email by itself. Do this before you deploy so the
form works the moment you go live.

1. Go to **formspree.io** → sign up free.
2. Click **+ New Form**. Name it (e.g. "Growth Partner Contact"). Set the email
   address where you want to receive messages.
3. Formspree shows you an endpoint like `https://formspree.io/f/abcdwxyz`.
   Copy the ID part at the end — `abcdwxyz`.
4. Open the file **`public/index.html`** in a plain text editor (Notepad, TextEdit,
   VS Code — anything). Press Ctrl-F / Cmd-F and search for: `YOUR_FORM_ID`
5. Replace `YOUR_FORM_ID` with your real ID. Save the file.

Done. (If you skip this, the form still displays but won't send — and your email
address is shown right next to it, so people can still reach you.)

---

# 🚀 DEPLOY — pick ONE path

You asked about Cloudways, so I've written that out fully (Path B). But I want to be
honest with you: **Cloudways is designed for WordPress/PHP, not static sites like
this one.** It works, but it's fiddly. If your only goal is "live today, looks
professional, zero hassle," **Path A (Netlify) is genuinely the better tool for this
kind of site** — it's free, takes 5 minutes, and it's what modern AI/web studios
actually use. Your call. Both get you live today.

---

## ✅ PATH A — Netlify (recommended, ~5 min, free)

1. Go to **app.netlify.com** → sign up free (use Google/GitHub or email).
2. On your dashboard, look for the box that says
   **"Want to deploy a new site without connecting to Git? Drag and drop your site
   output folder here."**
3. Drag your **`public`** folder onto that box.
4. It uploads and goes live instantly on a random address like
   `celadon-otter-123.netlify.app`. **Your site is now live.** Open it and check it.

### Point your domain (websitegrowthpartner.com) at it:
5. In your new site → **Domain settings** (or "Set up a custom domain").
6. Click **Add a domain**, type `websitegrowthpartner.com`, click Verify → Add.
7. Netlify shows you DNS records to set. You set these wherever your domain is
   registered (where you bought websitegrowthpartner.com). Two common cases:
   - **Easiest:** In Netlify, choose **"Use Netlify DNS"** and it gives you 4
     nameservers (like `dns1.p01.nsone.net`). Go to your domain registrar, find
     **Nameservers**, and replace what's there with Netlify's 4. Save.
   - **Or keep your current DNS:** add the **A record** and **CNAME** Netlify shows
     you at your registrar.
8. DNS changes take anywhere from a few minutes to a few hours to take effect.
   Netlify auto-issues a free SSL certificate (the padlock) once it's pointed.

That's it — live on your real domain with HTTPS, free.

---

## 🔧 PATH B — Cloudways (your current host)

Cloudways serves files from a folder on your server. You'll upload the **contents of
`public`** into the web root. Here's the click-by-click:

### 1. Find (or create) an app to host it
- Log into **Cloudways**. You need a **server** with an **application** on it.
- If you're adding this to an existing server: open the server, then
  **Add Application** → choose a **PHP** app (a plain PHP app just serves whatever
  static files you drop in — it won't run any PHP, which is fine). Name it
  `websitegrowthpartner`.

### 2. Get your connection details
- Open the application → **Access Details**. Note the **Application URL**, and under
  **Application Credentials** you'll see SFTP/SSH username and the public folder.
- The folder you upload into is: `applications/<app-name>/public_html`
  This `public_html` is your web root.

### 3. Upload the files (via SFTP — no command line)
- Download **FileZilla** (free) at **filezilla-project.org**.
- In Cloudways → application → **Access Details**, copy the **SFTP host, username,
  and password** (or use your Master Credentials from the server's Master
  Credentials tab).
- In FileZilla, top bar: enter **Host** (sftp://your-server-ip), **Username**,
  **Password**, **Port 22** → Quickconnect.
  - NOTE: because you're on an RV with changing IPs, if SFTP is blocked you may need
    to whitelist your current IP first: Cloudways → Server → **Security → SFTP/SSH**
    and add your IP (or temporarily allow all). This is the same whitelist friction
    you've hit before.
- On the right side (server), navigate into
  `applications/<your-app>/public_html`.
- **Delete** the default placeholder files already in `public_html` (like the
  default index).
- On the left side (your computer), open your **`public`** folder, select
  **everything inside it** (not the folder itself — its contents), and drag it into
  `public_html` on the right.

### 4. View it
- Open the **Application URL** from Access Details — your site shows up.

### 5. Point your domain
- Cloudways → application → **Domain Management** → add
  `websitegrowthpartner.com` as your primary domain.
- At your domain registrar, point the domain's **A record** to your Cloudways
  **server IP** (shown in Cloudways).
- Back in Cloudways → application → **SSL Certificate** → enter your domain and
  email → **Install** a free Let's Encrypt certificate for HTTPS.

Live on Cloudways with SSL. (If anything fights you here, Path A is your escape
hatch — you can always Netlify it in 5 minutes instead.)

---

# 🎨 Changing things later (when the clients let you breathe)

- **All the words** are in `layouts/index.html`.
- **All colors and fonts** are at the top of `static/css/main.css` in the `:root`
  block — each one is labeled (e.g. `--cyan` is the electric accent).
- **The AI animation** is `static/js/neural.js` — you can change node colors/speed
  there, but it works great as-is.
- **Contact email / site title / menu** are in `hugo.toml`.

After any edit, rebuild so `public` updates:
1. Install Hugo once from **gohugo.io/installation** (get the **extended** version).
2. In this folder run: `hugo --minify`
3. Re-upload the new `public` (or on Netlify, just drag the new `public` folder onto
   your site again — it replaces the old one).

To preview live while editing: run `hugo server` and open http://localhost:1313 —
the page refreshes as you save.

---

# Quick reference

| Change this...          | Open this file                      |
|-------------------------|-------------------------------------|
| Any text on the page    | `layouts/index.html`                |
| Colors / fonts          | `static/css/main.css` (top `:root`) |
| The AI animation        | `static/js/neural.js`               |
| Email / title / menu    | `hugo.toml`                         |
| Footer text             | `layouts/partials/footer.html`      |

Get it live today. Polish it when you have time. You've got this.
