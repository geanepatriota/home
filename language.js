const dict = {
    pt: {
        login_title: "Login", email_ph: "Email", pass_ph: "Senha",
        btn_enter: "Entrar", btn_forgot: "Esqueci a senha", btn_register: "Registrar-se",
        register_title: "Registrar-se", name_ph: "Nome Completo", tel_ph: "Telefone",
        cpf_ph: "CPF (11 dígitos)", pass_conf_ph: "Confirmar Senha", btn_back: "Voltar",
        reset_title: "Recuperar Senha", new_pass_ph: "Nova Senha", btn_reset: "Criar nova senha",
        nav_home: "Loja", nav_croquis: "Croquis", nav_portifolio: "Portifólio",
        btn_logout: "Sair", cart_title: "Carrinho", btn_buy: "Comprar",
        btn_add_cart: "Adicionar ao Carrinho", checkout_title: "Finalizar Pedido",
        opt_delivery: "Entrega", opt_pickup: "Retirada", btn_finish: "Concluir Pagamento",
        dev_by: "Desenvolvido por", know_here: "conheça aqui",
        pass_rules: "A senha deve ter entre 6 e 20 caracteres, incluindo maiúscula, minúscula, número e caractere especial."
    },
    en: {
        login_title: "Login", email_ph: "Email", pass_ph: "Password",
        btn_enter: "Sign In", btn_forgot: "Forgot password", btn_register: "Register",
        register_title: "Register", name_ph: "Full Name", tel_ph: "Phone",
        cpf_ph: "ID (11 digits)", pass_conf_ph: "Confirm Password", btn_back: "Back",
        reset_title: "Recover Password", new_pass_ph: "New Password", btn_reset: "Create new password",
        nav_home: "Shop", nav_croquis: "Sketches", nav_portifolio: "Portfolio",
        btn_logout: "Logout", cart_title: "Cart", btn_buy: "Checkout",
        btn_add_cart: "Add to Cart", checkout_title: "Finish Order",
        opt_delivery: "Delivery", opt_pickup: "Pickup", btn_finish: "Complete Payment",
        dev_by: "Developed by", know_here: "discover here",
        pass_rules: "Password must be 6-20 chars, including uppercase, lowercase, number and special character."
    }
};

let currentLang = 'pt';

function toggleLanguage() {
    // 1. Alterna o idioma interno e traduz a estrutura estática (seu dicionário)
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    applyTranslations();

    // 2. Altera a tag HTML do site para ajudar o navegador
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';

    // 3. Aciona o tradutor do Google para o conteúdo dinâmico (produtos/planilha)
    const googleSelect = document.querySelector('.goog-te-combo');
    if (googleSelect) {
        googleSelect.value = currentLang;
        googleSelect.dispatchEvent(new Event('change'));
    }
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.innerText = dict[currentLang][el.getAttribute('data-i18n')];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        el.placeholder = dict[currentLang][el.getAttribute('data-i18n-ph')];
    });
}

window.onload = applyTranslations;
