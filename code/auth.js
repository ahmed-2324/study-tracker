// Google sign-in through Firebase Authentication.
// The Firebase SDK is downloaded only when a student actually taps "Continue with Google".
window.StudyAuth = (() => {
  const SDK = "https://www.gstatic.com/firebasejs/10.12.2";
  let ready = null;
  let auth = null;
  let authApi = null;

  const configured = () => Boolean(window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey);

  function load() {
    if (!configured()) return Promise.reject(new Error("not-configured"));
    if (!ready) {
      ready = (async () => {
        const [appApi, authModule] = await Promise.all([
          import(SDK + "/firebase-app.js"),
          import(SDK + "/firebase-auth.js"),
        ]);
        authApi = authModule;
        auth = authModule.getAuth(appApi.initializeApp(window.FIREBASE_CONFIG));
      })();
      ready.catch(() => { ready = null; }); // allow a retry after a failed load
    }
    return ready;
  }

  async function signInWithGoogle() {
    await load();
    const provider = new authApi.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const { user } = await authApi.signInWithPopup(auth, provider);
    return {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
    };
  }

  async function signOut() {
    if (!configured()) return;
    await load();
    await authApi.signOut(auth);
  }

  async function deleteAccount() {
    await load();
    let user = auth && auth.currentUser;
    if (!user && authApi && auth) {
      user = await new Promise((resolve) => {
        let unsubscribe = () => {};
        unsubscribe = authApi.onAuthStateChanged(auth, (current) => { unsubscribe(); resolve(current); }, () => { unsubscribe(); resolve(null); });
      });
    }
    if (!user) throw new Error("auth/no-current-user");
    try {
      await authApi.deleteUser(user);
    } catch (error) {
      if (!error || error.code !== "auth/requires-recent-login") throw error;
      const provider = new authApi.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await authApi.reauthenticateWithPopup(user, provider);
      await authApi.deleteUser(user);
    }
  }

  return { configured, signInWithGoogle, signOut, deleteAccount };
})();
