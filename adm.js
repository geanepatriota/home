let adminClients = [];

async function fetchClients() {
    const res = await apiRequest({ action: 'getUsers' });
    if (res.success) {
        adminClients = res.users;
        renderClients(adminClients);
    }
}

function renderClients(list) {
    const container = document.getElementById('clients-list');
    container.innerHTML = '';
    list.forEach(u => {
        if(u.user === 'geane.adm') return;
        const card = document.createElement('div');
        card.className = 'product-card'; // reusando o estilo
        card.innerHTML = `
            <h3>${u.fullname}</h3>
            <p><b>User:</b> ${u.user}</p>
            <p><b>Tel:</b> ${u.tel}</p>
            <p><b>Email:</b> ${u.email}</p>
            <p><b>Carrinho:</b> ${u.cart ? u.cart : 'Vazio'}</p>
        `;
        container.appendChild(card);
    });
}

function filterClients() {
    const term = document.getElementById('search-clients').value.toLowerCase();
    const filtered = adminClients.filter(u => 
        u.fullname.toLowerCase().includes(term) || 
        u.user.toLowerCase().includes(term) ||
        u.tel.includes(term)
    );
    renderClients(filtered);
}

async function fetchOrders() {
    const res = await apiRequest({ action: 'getOrders' });
    if (res.success) {
        const container = document.getElementById('orders-list');
        container.innerHTML = '';
        res.orders.forEach(o => {
            container.innerHTML += `
                <div class="list-item">
                    <div>
                        <strong>Pedido: ${o.code}</strong><br>
                        Usuário: ${o.user}<br>
                        Itens: ${o.products}<br>
                        Modo: ${o.shipping} - ${o.address}
                    </div>
                    <div style="font-size: 1.2em; font-weight: bold;">
                        R$ ${o.total}
                    </div>
                </div>
            `;
        });
    }
}

function renderAdminProducts() {
    const container = document.getElementById('admin-products-list');
    container.innerHTML = '';
    globalProducts.forEach(p => {
        container.innerHTML += `
            <div class="list-item">
                <span><b>${p.productname}</b> (Código: ${p.code}) - R$ ${p.price}</span>
            </div>
        `;
    });
}

async function submitNewProduct() {
    const name = document.getElementById('add-prod-name').value;
    const price = document.getElementById('add-prod-price').value;
    const desc = document.getElementById('add-prod-desc').value;
    const img = document.getElementById('add-prod-img').value;

    if(!name || !price) return alert("Nome e preço são obrigatórios. Use o formato de preço com vírgula (ex: 89,99)");

    const newProd = { productname: name, price: price, description: desc, img: img };
    const res = await apiRequest({ action: 'addProduct', product: newProd });
    
    if(res.success) {
        alert("Produto adicionado com sucesso.");
        document.getElementById('add-prod-name').value = '';
        document.getElementById('add-prod-price').value = '';
        document.getElementById('add-prod-desc').value = '';
        document.getElementById('add-prod-img').value = '';
        // Atualiza a lista local e re-renderiza
        fetchProducts(); // busca de novo do sheet pra atualizar tudo
        setTimeout(() => navigate('adm-products'), 1500);
    } else {
        alert("Erro ao adicionar produto.");
    }
}
