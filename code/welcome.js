// Welcome screen: "Continue with Google" or "Continue as guest".
// Also provides the Account panel used on the Settings page.
window.StudyWelcome = (() => {
  const ACCOUNT_KEY = "hsc-tracker-account-v1";
  // Flip to true once progress is actually saved to the student's account.
  // Until then the app never claims that signing in backs anything up.
  const SYNC_READY = false;

  const TEXT = {
    en: {
      tagline: "Your HSC syllabus, finally under control.",
      sub: "Tick off chapters, log study time, and spot weak areas before the exam does.",
      features: ["Chapter-by-chapter progress", "Focus timer and study log", "Revision and weak-chapter tracking"],
      sample: "Sample preview",
      complete: "complete",
      welcome: "Welcome",
      choose: "Choose how you'd like to start.",
      google: "Continue with Google",
      soon: "Soon",
      soonMsg: "Google sign-in isn't switched on yet. You can continue as guest for now.",
      or: "or",
      guest: "Continue as guest",
      warning: "Your data is saved in this browser only. Clearing browser data may permanently erase your progress.",
      pull: "Pull the cord to switch on your study space",
      deleteTitle: "Erase your data",
      eraseDevice: "Erase my data on this device",
      deleteAccount: "Delete my Studyflow account",
      deleteIntroGuest: "This permanently erases the HSC tracker data stored in this browser. It cannot be undone.",
      deleteIntroGoogle: "This permanently deletes your Studyflow sign-in account and this device’s HSC tracker data. Study data is not synced to the cloud, so there are no cloud study records to delete.",
      deleteItems: "This includes syllabus status, weak-chapter flags, revision history, study sessions, goals, preferences, and the saved account on this device.",
      typeDelete: "Type DELETE to confirm",
      confirmDelete: "Confirm permanent deletion",
      deleting: "Deleting…",
      deleteError: "Deletion could not be completed. Your browser data is still here. Please try again.",
      deletedGuest: "Your data on this device has been erased.",
      deletedGoogle: "Your Studyflow sign-in account and this device’s data have been erased.",
      reauth: "For security, Google needs you to sign in again before deleting your account.",
      back: "Back to my dashboard",
      signedInAs: "Signed in as",
      cont: "Continue",
      signOut: "Sign out",
      syncNote: "Your progress is still stored in this browser. Cloud sync is coming soon.",
      free: "Free to use · No ads",
      busy: "Opening Google…",
      popup: "Your browser blocked the sign-in window. Allow pop-ups for this site and try again.",
      domain: "This website address isn't approved for sign-in yet.",
      network: "Check your internet connection and try again.",
      generic: "Sign-in didn't work. Please try again, or continue as guest.",
      guestLabel: "Guest",
      guestSub: "Saved in this browser only",
      account: "Account",
      guestAccount: "You're using guest mode.",
      signIn: "Sign in with Google",
      subjects: ["Physics", "Chemistry", "Higher Math"],
      switchTo: "বাংলা",
    },
    bn: {
      tagline: "তোমার HSC সিলেবাস, এবার পুরোপুরি নিয়ন্ত্রণে।",
      sub: "অধ্যায় টিক দাও, পড়ার সময় লগ করো, আর পরীক্ষার আগেই দুর্বল জায়গা খুঁজে বের করো।",
      features: ["অধ্যায়ভিত্তিক অগ্রগতি", "ফোকাস টাইমার ও পড়ার লগ", "রিভিশন ও দুর্বল অধ্যায় ট্র্যাকিং"],
      sample: "নমুনা প্রিভিউ",
      complete: "সম্পন্ন",
      welcome: "স্বাগতম",
      choose: "কীভাবে শুরু করতে চাও বেছে নাও।",
      google: "Google দিয়ে চালিয়ে যাও",
      soon: "শীঘ্রই",
      soonMsg: "Google সাইন-ইন এখনো চালু হয়নি। আপাতত গেস্ট হিসেবে চালিয়ে যেতে পারো।",
      or: "অথবা",
      guest: "গেস্ট হিসেবে চালিয়ে যাও",
      warning: "Your data is saved in this browser only. Clearing browser data may permanently erase your progress.",
      pull: "তোমার পড়ার জায়গার আলো জ্বালাতে কর্ড টানো",
      deleteTitle: "তোমার ডেটা মুছে ফেলো",
      eraseDevice: "এই ডিভাইসের ডেটা মুছে ফেলো",
      deleteAccount: "আমার Studyflow অ্যাকাউন্ট মুছে ফেলো",
      deleteIntroGuest: "এতে এই ব্রাউজারে থাকা HSC ট্র্যাকার ডেটা স্থায়ীভাবে মুছে যাবে। এটি ফিরিয়ে আনা যাবে না।",
      deleteIntroGoogle: "এতে তোমার Studyflow সাইন-ইন অ্যাকাউন্ট এবং এই ডিভাইসের HSC ট্র্যাকার ডেটা স্থায়ীভাবে মুছে যাবে। পড়ার ডেটা ক্লাউডে সিঙ্ক হয় না, তাই মুছে ফেলার মতো ক্লাউডের পড়ার রেকর্ড নেই।",
      deleteItems: "এর মধ্যে সিলেবাসের অবস্থা, দুর্বল অধ্যায়ের চিহ্ন, রিভিশন ইতিহাস, পড়ার সেশন, লক্ষ্য, পছন্দ এবং এই ডিভাইসে সংরক্ষিত অ্যাকাউন্ট অন্তর্ভুক্ত।",
      typeDelete: "নিশ্চিত করতে DELETE লিখো",
      confirmDelete: "স্থায়ীভাবে মুছে ফেলা নিশ্চিত করো",
      deleting: "মুছে ফেলা হচ্ছে…",
      deleteError: "ডেটা মুছে ফেলা যায়নি। ব্রাউজারের তথ্য এখনো আছে। আবার চেষ্টা করো।",
      deletedGuest: "এই ডিভাইসের ডেটা মুছে ফেলা হয়েছে।",
      deletedGoogle: "তোমার Studyflow সাইন-ইন অ্যাকাউন্ট এবং এই ডিভাইসের ডেটা মুছে ফেলা হয়েছে।",
      reauth: "নিরাপত্তার জন্য অ্যাকাউন্ট মুছতে Google-এ আবার সাইন-ইন করতে হবে।",
      back: "আমার ড্যাশবোর্ডে ফিরে যাও",
      signedInAs: "সাইন-ইন করা আছে:",
      cont: "চালিয়ে যাও",
      signOut: "সাইন আউট",
      syncNote: "তোমার অগ্রগতি এখনো এই ব্রাউজারেই থাকে। ক্লাউড সিঙ্ক শীঘ্রই আসছে।",
      free: "ব্যবহার বিনামূল্যে · কোনো বিজ্ঞাপন নেই",
      busy: "Google খুলছে…",
      popup: "তোমার ব্রাউজার সাইন-ইন উইন্ডো আটকে দিয়েছে। এই সাইটে পপ-আপ অনুমতি দিয়ে আবার চেষ্টা করো।",
      domain: "এই ওয়েবসাইটের ঠিকানা এখনো সাইন-ইনের জন্য অনুমোদিত নয়।",
      network: "ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করো।",
      generic: "সাইন-ইন কাজ করেনি। আবার চেষ্টা করো, অথবা গেস্ট হিসেবে চালিয়ে যাও।",
      guestLabel: "গেস্ট",
      guestSub: "শুধু এই ব্রাউজারে সেভ থাকে",
      account: "অ্যাকাউন্ট",
      guestAccount: "তুমি গেস্ট মোডে আছ।",
      signIn: "Google দিয়ে সাইন ইন করো",
      subjects: ["পদার্থবিজ্ঞান", "রসায়ন", "উচ্চতর গণিত"],
      switchTo: "English",
    },
  };

  const GOOGLE_G =
    '<svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
  const WARN_ICON =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>';

  // ---------- saved choice ----------
  const read = () => {
    try { return JSON.parse(localStorage.getItem(ACCOUNT_KEY)); } catch { return null; }
  };
  const write = (value) => {
    try { localStorage.setItem(ACCOUNT_KEY, JSON.stringify(value)); } catch { /* storage unavailable */ }
  };
  const lang = () => (typeof state !== "undefined" && state.preferences && state.preferences.language === "bn" ? "bn" : "en");
  const tr = () => TEXT[lang()];

  const needsChoice = () => !read();
  const isGuest = () => { const a = read(); return Boolean(a && a.mode === "guest"); };
  const isGoogle = () => { const a = read(); return Boolean(a && a.mode === "google"); };
  const label = () => (isGoogle() ? read().name || read().email || "Google" : tr().guestLabel);
  const sublabel = () => (isGoogle() ? read().email || "" : tr().guestSub);
  const initial = () => (label().trim().charAt(0) || "G").toUpperCase();

  // ---------- small DOM helpers (text only, never untrusted HTML) ----------
  function h(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function withIcon(svg, labelText, className) {
    const wrap = h("span", className);
    const icon = h("span", "wl-icon");
    icon.innerHTML = svg; // static SVG constants defined above
    wrap.append(icon, h("span", "", labelText));
    return wrap;
  }
  function button(className, onClick) {
    const b = h("button", className);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }

  function setLanguage(next, rerender) {
    if (typeof state === "undefined") return;
    state.preferences.language = next;
    try { save(KEYS.preferences, state.preferences); } catch { /* ignore */ }
    document.documentElement.lang = next;
    rerender();
  }

  function errorText(error) {
    const t = tr();
    const code = (error && error.code) || "";
    if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return "";
    if (code === "auth/popup-blocked") return t.popup;
    if (code === "auth/unauthorized-domain") return t.domain;
    if (code === "auth/network-request-failed" || (error && /network|Failed to fetch|import/i.test(error.message || ""))) return t.network;
    return t.generic;
  }

  // ---------- the sign-in / guest choices ----------
  function choices(app, done, opts, message) {
    const t = tr();
    const box = h("div", "wl-choices");

    const googleBtn = button("wl-btn wl-google", async () => {
      if (!window.StudyAuth || !StudyAuth.configured()) { message(t.soonMsg); return; }
      googleBtn.disabled = true;
      message(t.busy, "info");
      try {
        const profile = await StudyAuth.signInWithGoogle();
        write({ mode: "google", ...profile });
        done();
      } catch (error) {
        googleBtn.disabled = false;
        message(errorText(error));
      }
    });
    const gLabel = withIcon(GOOGLE_G, t.google, "wl-btn-inner");
    googleBtn.append(gLabel);
    if (!window.StudyAuth || !StudyAuth.configured()) googleBtn.append(h("span", "wl-pill", t.soon));

    const divider = h("div", "wl-divider");
    divider.append(h("span", "", t.or));

    const guestBtn = button("wl-btn wl-guest", () => { write({ mode: "guest" }); done(); });
    guestBtn.append(h("span", "", t.guest));

    const warning = h("div", "wl-warning");
    warning.setAttribute("role", "note");
    const wIcon = h("span", "wl-icon");
    wIcon.innerHTML = WARN_ICON;
    warning.append(wIcon, h("p", "", t.warning));

    box.append(googleBtn, divider, guestBtn, warning);
    return box;
  }

  function signedIn(app, done, rerender, message) {
    const t = tr();
    const a = read();
    const box = h("div", "wl-choices");
    const who = h("div", "wl-who");
    who.append(h("span", "wl-avatar", initial()));
    const copy = h("div");
    copy.append(h("small", "", t.signedInAs), h("strong", "", a.name || a.email), h("span", "", a.name ? a.email : ""));
    who.append(copy);
    const out = button("wl-btn wl-guest", async () => {
      try { if (window.StudyAuth) await StudyAuth.signOut(); } catch { /* still sign out locally */ }
      try { localStorage.removeItem(ACCOUNT_KEY); } catch { /* ignore */ }
      show(app, done, { reopen: true, lampOn: true });
    });
    out.append(h("span", "", t.signOut));
    const go = button("wl-btn wl-google", done);
    go.append(h("span", "", t.cont));
    box.append(who, go, out);
    if (!SYNC_READY) box.append(h("p", "wl-note", t.syncNote));
    return box;
  }

  // ---------- full welcome page ----------
  function show(app, done, opts = {}) {
    const t = tr();
    const rerender = () => show(app, done, opts);
    const root = h("div", "wl");
    const inner = h("div", "wl-inner");

    // left: brand + pitch + sample preview
    const hero = h("section", "wl-hero");
    const brand = h("div", "wl-brand");
    const mark = h("span", "wl-mark");
    mark.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7"/></svg>';
    brand.append(mark, h("span", "wl-brand-name", "Studyflow"));
    hero.append(brand, h("h1", "", t.tagline), h("p", "wl-sub", t.sub));
    const feats = h("ul", "wl-features");
    t.features.forEach((f) => feats.append(h("li", "", f)));
    hero.append(feats);

    const preview = h("div", "wl-preview");
    preview.setAttribute("aria-hidden", "true");
    const ringWrap = h("div", "wl-ring");
    ringWrap.innerHTML = '<svg viewBox="0 0 80 80"><circle class="wl-ring-track" cx="40" cy="40" r="34"/><circle class="wl-ring-bar" cx="40" cy="40" r="34"/></svg>';
    ringWrap.append(h("strong", "", "72%"), h("small", "", t.complete));
    const bars = h("div", "wl-bars");
    [64, 48, 81].forEach((pct, i) => {
      const row = h("div", "wl-bar-row");
      row.append(h("span", "", t.subjects[i]), h("em", "", pct + "%"));
      const track = h("div", "wl-bar-track");
      const fill = h("div", "wl-bar-fill");
      fill.style.setProperty("--w", pct + "%");
      track.append(fill);
      row.append(track);
      bars.append(row);
    });
    preview.append(ringWrap, bars, h("small", "wl-sample", t.sample));
    hero.append(preview);

    // right: the choice card
    const card = h("section", "wl-card");
    const top = h("div", "wl-card-top");
    top.append(h("span", "wl-free", t.free));
    const langBtn = button("wl-lang", () => setLanguage(lang() === "en" ? "bn" : "en", rerender));
    langBtn.textContent = t.switchTo;
    top.append(langBtn);

    const msg = h("p", "wl-msg");
    msg.setAttribute("role", "status");
    msg.setAttribute("aria-live", "polite");
    const message = (text, kind) => { msg.textContent = text || ""; msg.dataset.kind = kind || "error"; };

    card.append(top, h("h2", "", t.welcome), h("p", "wl-choose", t.choose));
    const choicesNode = isGoogle() ? signedIn(app, done, rerender, message) : choices(app, done, opts, message);
    card.append(choicesNode, msg);
    if (opts.notice) message(opts.notice, "info");
    if (opts.reopen && !isGoogle() && read()) {
      const back = button("wl-back", done);
      back.textContent = t.back;
      card.append(back);
    }

    inner.append(hero, card);
    root.append(h("span", "wl-glow wl-glow-a"), h("span", "wl-glow wl-glow-b"), inner);
    const firstVisit = !opts.reopen && !opts.lampOn && (!read() || isGuest());
    if (firstVisit) {
      root.classList.add("wl-lamp-pending");
      const scene = h("div", "wl-scene");
      scene.setAttribute("role", "dialog");
      scene.setAttribute("aria-label", t.pull);
      scene.append(h("div", "wl-scene-brand", "Studyflow"));
      const art = h("div", "wl-lamp-art");
      art.setAttribute("aria-hidden", "true");
      art.innerHTML = '<svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lampShade" x1="85" y1="40" x2="196" y2="101" gradientUnits="userSpaceOnUse"><stop stop-color="#414b5d"/><stop offset=".42" stop-color="#252d3b"/><stop offset="1" stop-color="#131923"/></linearGradient><linearGradient id="lampStem" x1="124" y1="116" x2="153" y2="218" gradientUnits="userSpaceOnUse"><stop stop-color="#586477"/><stop offset=".5" stop-color="#222a37"/><stop offset="1" stop-color="#414b5d"/></linearGradient><radialGradient id="lampGlow"><stop stop-color="#c8ffec"/><stop offset=".25" stop-color="#83e1c3"/><stop offset="1" stop-color="#83e1c3" stop-opacity="0"/></radialGradient><filter id="lampShadow" x="45" y="10" width="190" height="260" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="8"/></filter></defs><ellipse cx="140" cy="252" rx="60" ry="10" fill="#000" opacity=".45" filter="url(#lampShadow)"/><path d="M101 216h78c14 0 23 8 26 20l2 8H73l2-8c3-12 12-20 26-20Z" fill="url(#lampStem)" stroke="#596579" stroke-width="2"/><path d="M111 217c7-5 16-8 29-8s22 3 29 8" stroke="#768297" stroke-width="1.5" opacity=".55"/><path d="M139 210v-75" stroke="url(#lampStem)" stroke-width="13" stroke-linecap="round"/><path d="M140 134c-1-25 19-42 42-45" stroke="#667287" stroke-width="13" stroke-linecap="round"/><path d="M140 134c-1-25 19-42 42-45" stroke="#252e3b" stroke-width="8" stroke-linecap="round"/><circle cx="140" cy="133" r="10" fill="#252d3b" stroke="#667287" stroke-width="3"/><circle cx="140" cy="133" r="3" fill="#aab4c5"/><path d="M181 89 169 49c-2-7 3-13 10-13h32c7 0 12 6 10 13l-12 40c-2 8-9 13-17 13s-15-5-17-13Z" fill="url(#lampShade)" stroke="#687488" stroke-width="2"/><path d="M171 89h48" stroke="#8792a5" stroke-width="3" stroke-linecap="round"/><path d="M176 48c8-6 23-8 37-3" stroke="#a8b2c3" stroke-width="2" stroke-linecap="round" opacity=".4"/><path class="wl-lamp-bulb" d="M188 96c0 7 5 11 5 17h13c0-6 5-10 5-17" fill="#343c49" stroke="#596579" stroke-width="2"/><path class="wl-lamp-light" d="M189 107h22l22 75h-66l22-75Z" fill="url(#lampGlow)" opacity="0"/><path d="M204 43v40" stroke="#9aa5b8" stroke-width="2" stroke-linecap="round" opacity=".6"/><circle class="wl-lamp-pull" cx="204" cy="85" r="4.5" fill="#aab3c2"/></svg>';
      const pull = button("wl-cord", () => switchOn());
      pull.setAttribute("aria-label", t.pull);
      pull.append(h("span", "wl-cord-line"), h("span", "wl-cord-knob"));
      let dragStart = null;
      pull.addEventListener("pointerdown", (event) => { dragStart = event.clientY; pull.classList.add("is-pulling"); pull.setPointerCapture(event.pointerId); });
      pull.addEventListener("pointermove", (event) => { if (dragStart === null) return; const distance = Math.max(0, Math.min(150, event.clientY - dragStart)); pull.style.setProperty("--pull-distance", `${distance}px`); });
      pull.addEventListener("pointerup", (event) => { const distance = dragStart === null ? 0 : event.clientY - dragStart; dragStart = null; if (distance > 58) switchOn(); else { pull.classList.remove("is-pulling"); pull.style.removeProperty("--pull-distance"); } });
      pull.addEventListener("pointercancel", () => { dragStart = null; pull.classList.remove("is-pulling"); pull.style.removeProperty("--pull-distance"); });
      scene.append(art, pull);
      const switchOn = () => {
        if (!scene.isConnected || scene.classList.contains("is-lit")) return;
        scene.classList.add("is-lit");
        root.classList.add("wl-revealed");
        clearTimeout(autoOn);
        setTimeout(() => scene.remove(), 1100);
      };
      root.append(scene);
      const autoOn = setTimeout(switchOn, 10000);
    }
    app.replaceChildren(root);
    window.scrollTo(0, 0);
  }

  // ---------- Account panel for the Settings page ----------
  function settingsPanel(app, done) {
    const t = tr();
    const panel = h("section", "wl-account");
    panel.append(h("h3", "", t.account));
    if (isGoogle()) {
      panel.append(h("p", "wl-account-line", label() + (read().email ? " · " + read().email : "")));
      if (!SYNC_READY) panel.append(h("p", "wl-note", t.syncNote));
    } else {
      panel.append(h("p", "wl-account-line", t.guestAccount));
      const warning = h("div", "wl-warning");
      const wIcon = h("span", "wl-icon");
      wIcon.innerHTML = WARN_ICON;
      warning.append(wIcon, h("p", "", t.warning));
      panel.append(warning);
    }
    const action = button("wl-btn wl-guest wl-small", async () => {
      if (!isGoogle()) { show(app, done, { reopen: true }); return; }
      try { if (window.StudyAuth) await StudyAuth.signOut(); } catch { /* still sign out locally */ }
      try { localStorage.removeItem(ACCOUNT_KEY); } catch { /* ignore */ }
      show(app, done, { reopen: true, lampOn: true });
    });
    action.append(h("span", "", isGoogle() ? t.signOut : t.signIn));
    panel.append(action);
    const wasGoogle = isGoogle();
    const erase = button("wl-btn wl-delete-trigger wl-small", () => renderDeleteConfirmation());
    erase.append(h("span", "", wasGoogle ? t.deleteAccount : t.eraseDevice));
    panel.append(erase);
    function renderDeleteConfirmation() {
      panel.querySelector(".wl-delete-confirm")?.remove();
      const confirm = h("div", "wl-delete-confirm");
      confirm.append(h("h4", "", t.deleteTitle), h("p", "", wasGoogle ? t.deleteIntroGoogle : t.deleteIntroGuest), h("p", "wl-delete-items", t.deleteItems));
      const input = document.createElement("input");
      input.type = "text";
      input.autocomplete = "off";
      input.spellcheck = false;
      input.className = "wl-delete-input";
      input.placeholder = t.typeDelete;
      input.setAttribute("aria-label", t.typeDelete);
      const submit = button("wl-btn wl-delete-submit wl-small", async () => {
        if (input.value !== "DELETE") return;
        submit.disabled = true;
        submit.textContent = t.deleting;
        try {
          if (wasGoogle) {
            if (!window.StudyAuth || !StudyAuth.configured()) throw new Error("auth/not-configured");
            await StudyAuth.deleteAccount();
            try { await StudyAuth.signOut(); } catch { /* deleted Firebase users may already be signed out */ }
          }
          const keys = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("hsc-tracker-")) keys.push(key);
          }
          keys.forEach((key) => localStorage.removeItem(key));
          if (typeof window.resetStudyDataState === "function") window.resetStudyDataState();
          show(app, done, { reopen: true, lampOn: true, notice: wasGoogle ? t.deletedGoogle : t.deletedGuest });
        } catch (error) {
          submit.disabled = false;
          submit.textContent = t.confirmDelete;
          const feedback = confirm.querySelector(".wl-delete-error") || h("p", "wl-delete-error");
          feedback.textContent = error && error.code === "auth/requires-recent-login" ? t.reauth : t.deleteError;
          confirm.append(feedback);
        }
      });
      submit.textContent = t.confirmDelete;
      submit.disabled = true;
      input.addEventListener("input", () => { submit.disabled = input.value !== "DELETE"; });
      confirm.append(input, submit);
      panel.append(confirm);
      input.focus();
    }
    return panel;
  }

  return { needsChoice, isGuest, show, label, sublabel, initial, settingsPanel };
})();
