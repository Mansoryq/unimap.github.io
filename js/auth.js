// ===== UniMap Auth Guard =====
// Include this script on all protected pages BEFORE other scripts.
// Redirects to index.html (login) if user is not authenticated.

(async function () {
  const token = localStorage.getItem('unimap_token');

  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const res = await fetch('/api/check-auth', {
      headers: { 'Authorization': 'Bearer ' + token }
    });

    if (!res.ok) {
      localStorage.removeItem('unimap_token');
      localStorage.removeItem('unimap_user');
      window.location.href = 'index.html';
      return;
    }

    const data = await res.json();

    // Update user info in storage
    if (data.user) {
      localStorage.setItem('unimap_user', JSON.stringify(data.user));
    }

    // Show the page (it was hidden to prevent flash)
    document.documentElement.classList.add('auth-ready');

  } catch (err) {
    // Server unreachable — allow if token exists (offline mode)
    document.documentElement.classList.add('auth-ready');
  }
})();
