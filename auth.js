let currentUser = null;

function updateAvatar() {
    const avatar = document.getElementById('user-avatar');
    if (currentUser) {
        avatar.innerText = currentUser.fullname.charAt(0).toUpperCase();
        document.getElementById('unauth-menu').classList.add('hidden');
        document.getElementById('auth-menu').classList.remove('hidden');
        document.getElementById('user-greeting').innerText = `Olá, ${currentUser.fullname}!`;
        
        if (currentUser.user === 'geane.adm') {
            document.getElementById('admin-links').classList.remove('hidden');
        } else {
            document.getElementById('admin-links').classList.add('hidden');
        }
    } else {
        avatar.innerText = "?";
        document.getElementById('unauth-menu').classList.remove('hidden');
        document.getElementById('auth-menu').classList.add('hidden');
        document.getElementById('admin-links').classList.add('hidden');
    }
}

function checkSession() {
    const saved = localStorage.getItem('luxuryStoreUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        if(currentUser.cart && currentUser.cart !== "") {
            currentCart = currentUser.cart.split(',');
        }
        updateCartCount();
        updateAvatar();
    }
}

function doLogout() {
    currentUser = null;
    currentCart = [];
    localStorage.removeItem('luxuryStoreUser');
    updateAvatar();
    navigate('login');
}

async function attemptLogin() {
    const u = document.getElementById('login-user').value;
    const p = document.getElementById('login-pass').value;
    if(!u || !p) return alert("Preencha todos os campos.");

    const res = await apiRequest({ action: 'login', user: u, password: p });
    if (res.success) {
        currentUser = res.user;
        localStorage.setItem('luxuryStoreUser', JSON.stringify(currentUser));
        if(currentUser.cart && currentUser.cart !== "") {
            currentCart = currentUser.cart.split(',');
        } else {
            currentCart = [];
        }
        updateCartCount();
        updateAvatar();
        navigate('home');
    } else {
        alert(res.message);
    }
}

async function attemptRegister() {
    const fn = document.getElementById('reg-fullname').value;
    const u = document.getElementById('reg-user').value;
    const p = document.getElementById('reg-pass').value;
    const e = document.getElementById('reg-email').value;
    const t = document.getElementById('reg-tel').value;
    const c = document.getElementById('reg-cpf').value;

    if(!fn || !u || !p || !e || !t || !c) return alert("Preencha todos os campos.");

    const res = await apiRequest({ action: 'register', fullname: fn, user: u, password: p, email: e, tel: t, cpf: c });
    if (res.success) {
        currentUser = res.user;
        localStorage.setItem('luxuryStoreUser', JSON.stringify(currentUser));
        updateAvatar();
        navigate('home');
    } else {
        alert(res.message);
    }
}

async function attemptRecover() {
    const u = document.getElementById('rec-user').value;
    const e = document.getElementById('rec-email').value;
    const t = document.getElementById('rec-tel').value;
    const np = document.getElementById('rec-newpass').value;

    if(!u || !e || !t || !np) return alert("Preencha todos os campos.");

    const res = await apiRequest({ action: 'recover', user: u, email: e, tel: t, newPassword: np });
    alert(res.message);
    if(res.success) navigate('login');
}
