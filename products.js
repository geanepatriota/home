let globalProducts = [];
let cart = [];
let currentProduct = null;

const INFINITE_BASE = "https://checkout.infinitepay.io/audaces?items=";
const STORE_URL = "https://geanepatriota.github.io/home/";

async function loadProducts() {
    const res = await apiRequest({ action: 'getProducts' });
    if (res.success) {
        globalProducts = res.products;
        renderProducts();
    }
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    globalProducts.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.onclick = () => openProductPage(prod);
        div.innerHTML = `
            <img src="${prod.img[0]}" alt="${prod.productname}">
            <h3>${prod.productname}</h3>
            <p class="price">R$ ${parseFloat(prod.price).toFixed(2)}</p>
        `;
        grid.appendChild(div);
    });
}

function openProductPage(prod) {
    currentProduct = prod;
    document.getElementById('prod-page-name').innerText = prod.productname;
    document.getElementById('prod-page-price').innerText = `R$ ${parseFloat(prod.price).toFixed(2)}`;
    document.getElementById('prod-page-desc').innerHTML = marked.parse(prod.description);
    
    const imgCol = document.getElementById('prod-page-imgs');
    imgCol.innerHTML = '';
    prod.img.forEach(src => {
        const img = document.createElement('img');
        img.src = src.trim();
        imgCol.appendChild(img);
    });

    document.getElementById('product-page').classList.remove('hidden');
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

function updateCartUI() {
    const count = cart.length;
    document.getElementById('cart-count').innerText = count;
    
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <input type="checkbox" ${item.selected ? 'checked' : ''} onchange="toggleCartItem(${index}, this.checked)">
            <span>${item.productname}</span>
            <span>R$ ${parseFloat(item.price).toFixed(2)}</span>
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
