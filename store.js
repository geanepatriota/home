async function fetchProducts() {
    const res = await apiRequest({ action: 'getProducts' });
    if (res.success) {
        globalProducts = res.products;
        renderHomeStore();
    }
}

function renderHomeStore() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    globalProducts.forEach(p => {
        const imgs = p.img ? p.img.split(',') : [''];
        const firstImg = imgs[0].trim();
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openProductDetail(p.code);
        card.innerHTML = `
            <img src="${firstImg}" alt="${p.productname}">
            <h3>${p.productname}</h3>
            <p class="price">R$ ${p.price}</p>
        `;
        grid.appendChild(card);
    });
}

function openProductDetail(code) {
    currentProduct = globalProducts.find(p => p.code === code);
    if (!currentProduct) return;
    
    document.getElementById('pd-title').innerText = currentProduct.productname;
    document.getElementById('pd-price').innerText = `R$ ${currentProduct.price}`;
    document.getElementById('pd-desc').innerText = currentProduct.description;
    document.getElementById('pd-qty').innerText = '1';

    const imagesDiv = document.getElementById('pd-images');
    imagesDiv.innerHTML = '';
    const imgs = currentProduct.img ? currentProduct.img.split(',') : [];
    imgs.forEach(imgLink => {
        const imgEl = document.createElement('img');
        imgEl.src = imgLink.trim();
        imagesDiv.appendChild(imgEl);
    });

    navigate('product-detail');
}

function changeQty(amount) {
    const qtySpan = document.getElementById('pd-qty');
    let qty = parseInt(qtySpan.innerText) + amount;
    if(qty < 1) qty = 1;
    qtySpan.innerText = qty;
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = currentCart.length;
}

async function addToCart() {
    if (!currentUser) return alert("Por favor, faça login para adicionar ao carrinho.");
    const qty = parseInt(document.getElementById('pd-qty').innerText);
    for(let i=0; i<qty; i++) {
        currentCart.push(currentProduct.code);
    }
    updateCartCount();
    currentUser.cart = currentCart.join(',');
    localStorage.setItem('luxuryStoreUser', JSON.stringify(currentUser));
    
    // Sincroniza fundo (não bloqueia UI)
    fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'updateCart', user: currentUser.user, cart: currentUser.cart })
    });
    alert("Adicionado ao carrinho!");
}

function viewCart() {
    goToCheckout();
}

function goToCheckout() {
    if (!currentUser) {
        alert("Faça login para continuar.");
        return navigate('login');
    }
    if (currentCart.length === 0) {
        return alert("Seu carrinho está vazio.");
    }
    
    const cartDiv = document.getElementById('checkout-cart');
    cartDiv.innerHTML = '';
    let totalCents = 0;

    // Agrupa e calcula
    const counted = currentCart.reduce((acc, code) => {
        acc[code] = (acc[code] || 0) + 1;
        return acc;
    }, {});

    Object.keys(counted).forEach(code => {
        const prod = globalProducts.find(p => p.code === code);
        if(prod) {
            const priceCents = parseInt(prod.price.replace(',', ''));
            totalCents += priceCents * counted[code];
            
            cartDiv.innerHTML += `
                <div class="list-item">
                    <span>${prod.productname} (x${counted[code]})</span>
                    <span>R$ ${prod.price}</span>
                </div>
            `;
        }
    });

    currentCheckoutTotal = totalCents;
    const finalTotalStr = (totalCents / 100).toFixed(2).replace('.', ',');
    document.getElementById('checkout-total').innerText = `R$ ${finalTotalStr}`;
    document.getElementById('pix-container').classList.add('hidden');
    
    navigate('checkout');
}

async function processCheckout() {
    const shipping = document.getElementById('checkout-shipping').value;
    const address = document.getElementById('checkout-address').value;
    const payment = document.getElementById('checkout-payment').value;

    if (shipping === 'entrega' && address.trim() === '') {
        return alert("Para entrega, o endereço é obrigatório.");
    }

    const orderData = {
        user: currentUser.user,
        products: currentCart.join(','),
        address: address,
        total: (currentCheckoutTotal / 100).toFixed(2).replace('.', ','),
        shipping: shipping
    };

    // Preenche Formsubmit Oculto
    document.getElementById('fs-cliente').value = `Nome: ${currentUser.fullname} | User: ${currentUser.user} | Tel: ${currentUser.tel} | CPF: ${currentUser.cpf}`;
    document.getElementById('fs-endereco').value = `${shipping} - ${address}`;
    document.getElementById('fs-pedido').value = currentCart.join(',');

    const res = await apiRequest({ action: 'createOrder', order: orderData });
    
    if (res.success) {
        // Limpar carrinho
        currentCart = [];
        currentUser.cart = '';
        localStorage.setItem('luxuryStoreUser', JSON.stringify(currentUser));
        updateCartCount();
        fetch(GAS_URL, { method: 'POST', body: JSON.stringify({ action: 'updateCart', user: currentUser.user, cart: '' }) });

        if (payment === 'pix') {
            const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=84991000682";
            document.getElementById('pix-qr').src = qrUrl;
            document.getElementById('pix-container').classList.remove('hidden');
            document.getElementById('fs-submit').click(); // Envia o email
            alert("Pedido gerado! Realize o pagamento via PIX abaixo.");
        } else if (payment === 'cartao') {
            document.getElementById('fs-submit').click(); // Envia o email

            // Constroi link InfinitePay
            const counted = currentCart.reduce((acc, code) => { acc[code] = (acc[code] || 0) + 1; return acc; }, {});
            const itemsArr = [];
            Object.keys(counted).forEach(code => {
                const prod = globalProducts.find(p => p.code === code);
                if(prod) {
                    itemsArr.push({
                        name: prod.productname,
                        price: parseInt(prod.price.replace(',', '')),
                        quantity: counted[code]
                    });
                }
            });
            const itemsJson = JSON.stringify(itemsArr);
            const redirectUrl = window.location.href;
            const infinitePayUrl = `https://checkout.infinitepay.io/audaces?items=${encodeURIComponent(itemsJson)}&redirect_url=${encodeURIComponent(redirectUrl)}`;
            
            window.location.href = infinitePayUrl;
        }
    } else {
        alert("Erro ao registrar pedido.");
    }
}
