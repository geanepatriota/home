// INSIRA SUA URL DO GOOGLE APPS SCRIPT AQUI
const GAS_URL = 'COLE_AQUI_A_URL_DO_SEU_WEB_APP';

// Elementos Globais
const loadingOverlay = document.getElementById('loading-overlay');
let globalProducts = [];
let currentProduct = null;
let currentCart = [];
let currentCheckoutTotal = 0;

function showLoading() {
    loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
    loadingOverlay.classList.add('hidden');
}

// Navegação do SPA
function navigate(viewName) {
    const views = document.querySelectorAll('.view');
    views.forEach(v => v.classList.add('hidden'));
    
    // Fechar menu dropdown
    document.getElementById('user-dropdown').classList.add('hidden');

    if (viewName === 'home') {
        document.getElementById('view-home').classList.remove('hidden');
        if (globalProducts.length === 0) fetchProducts();
    } else if (viewName === 'croquis') {
        document.getElementById('view-croquis').classList.remove('hidden');
        loadCroquis();
    } else if (viewName === 'portfolio') {
        document.getElementById('view-portfolio').classList.remove('hidden');
    } else {
        const targetView = document.getElementById(`view-${viewName}`);
        if(targetView) targetView.classList.remove('hidden');
    }

    // Rotas de Admin
    if(viewName.startsWith('adm-')) {
        if(viewName === 'adm-clients') fetchClients();
        if(viewName === 'adm-orders') fetchOrders();
        if(viewName === 'adm-products') renderAdminProducts();
    }
}

function toggleUserMenu() {
    document.getElementById('user-dropdown').classList.toggle('hidden');
}

async function apiRequest(payload) {
    showLoading();
    try {
        const response = await fetch(GAS_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' } // text/plain evita preflight no CORS do GAS
        });
        const data = await response.json();
        hideLoading();
        return data;
    } catch (error) {
        hideLoading();
        console.error("Erro de conexão", error);
        alert('Erro de conexão com o servidor.');
        return { success: false };
    }
}

async function loadCroquis() {
    const el = document.getElementById('croquis-content');
    if(el.innerHTML !== '') return; // Já carregou
    showLoading();
    try {
        const res = await fetch('croquis.txt');
        const text = await res.text();
        el.innerText = text;
    } catch (e) {
        el.innerText = "Erro ao carregar croquis.txt";
    }
    hideLoading();
}

window.onload = () => {
    checkSession();
    navigate('home');
};
