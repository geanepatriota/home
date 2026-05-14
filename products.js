let globalProducts = [];
let cart = [];
let currentProduct = null;

const INFINITE_BASE = "https://checkout.infinitepay.io/audaces?items=";
const STORE_URL = "https://geanepatriota.github.io/home/";

document.addEventListener('DOMContentLoaded', loadProducts);

async function loadProducts() {
    const res = await apiRequest({ action: 'getProducts' });
    if (res && res.success) {
        globalProducts = res.products;
        renderProducts();
    }
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    globalProducts.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.onclick = () => openProductPage(prod);
        
        const imgSrc = (prod.img && prod.img.length > 0 && prod.img[0] !== '') ? prod.img[0] : '';
        
        div.innerHTML = `
            <img src="${imgSrc}" alt="${prod.productname}">
            <h3>${prod.productname}</h3>
            <p class="price">R$ ${parseFloat(prod.price || 0).toFixed(2)}</p>
        `;
        grid.appendChild(div);
    });
}

function openProductPage(prod) {
    currentProduct = prod;
    document.getElementById('prod-page-name').innerText = prod.productname;
    document.getElementById('prod-page-price').innerText = `R$ ${parseFloat(prod.price || 0).toFixed(2)}`;
    document.getElementById('prod-page-desc').innerHTML = marked.parse(prod.description || '');
    
    const imgCol = document.getElementById('prod-page-imgs');
    imgCol.innerHTML = '';
    if (prod.img && prod.img.length > 0) {
        prod.img.forEach(src => {
            if (src.trim() !== '') {
                const img = document.createElement('img');
                img.src = src.trim();
                imgCol.appendChild(img);
            }
        });
    }

    const infoCol = document.querySelector('.prod-info-col');
    const existingButtons = infoCol.querySelectorAll('.btn');
    existingButtons.forEach(b => b.remove());

    const addCartBtn = document.createElement('button');
    addCartBtn.className = 'btn';
    addCartBtn.setAttribute('data-i18n', 'btn_add_cart');
    addCartBtn.innerText = 'Adicionar ao Carrinho';
    addCartBtn.onclick = addToCartCurrent;

    const buyNowBtn = document.createElement('button');
    buyNowBtn.className = 'btn mt-1';
    buyNowBtn.innerText = 'Comprar Agora';
    buyNowBtn.onclick = buyNowCurrent;

    infoCol.appendChild(addCartBtn);
    infoCol.appendChild(buyNowBtn);

    document.getElementById('product-page').classList.remove('hidden');
    if (typeof applyTranslations === 'function') applyTranslations();
}

function closeProductPage() {
    document.getElementById('product-page').classList.add('hidden');
}

function addToCartCurrent() {
    if (!currentProduct) return;
    const existing = cart.find(i => i.code === currentProduct.code);
    if (!existing) {
        cart.push({ ...currentProduct, selected: true, qty: 1 });
        updateCartUI();
        alert("Adicionado ao carrinho!");
        closeProductPage();
    } else {
        alert("Produto já está no carrinho.");
    }
}

function buyNowCurrent() {
    if (!currentProduct) return;
    const existingIndex = cart.findIndex(i => i.code === currentProduct.code);
    
    cart.forEach(item => item.selected = false);

    if (existingIndex === -1) {
        cart.push({ ...currentProduct, selected: true, qty: 1 });
    } else {
        cart[existingIndex].selected = true;
    }
    
    updateCartUI();
    closeProductPage();
    openCheckout();
}

function updateCartUI() {
    const count = cart.length;
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.innerText = count;
    
    const list = document.getElementById('cart-items');
    if (!list) return;
    list.innerHTML = '';
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <input type="checkbox" ${item.selected ? 'checked' : ''} onchange="toggleCartItem(${index}, this.checked)">
            <span>${item.productname}</span>
            <span>R$ ${parseFloat(item.price || 0).toFixed(2)}</span>
            <button onclick="removeFromCart(${index})" style="background:none;border:none;color:red;cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
        `;
        list.appendChild(div);
    });
}

function toggleCartItem(index, isChecked) {
    cart[index].selected = isChecked;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}
