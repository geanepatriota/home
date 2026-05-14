const croquisImages = [
    'croquis/1.png', 'croquis/2.png', 'croquis/3.png', 'croquis/4.png', 'croquis/5.png', 'croquis/6.png', 'croquis/7.png', 'croquis/8.png', 'croquis/9.png', 'croquis/10.png', 'croquis/11.png', 'croquis/12.png', 'croquis/13.png', 'croquis/14.png', 'croquis/15.png', 'croquis/16.png', 'croquis/17.png', 'croquis/18.png', 'croquis/19.png', 'croquis/20.png', 'croquis/21.png', 'croquis/22.png', 'croquis/23.png'
];

function loadCroquis() {
    const grid = document.getElementById('croquis-grid');
    croquisImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.onerror = () => img.style.display = 'none';
        img.onclick = () => openLightbox(src);
        grid.appendChild(img);
    });
}

function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.remove('hidden');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
}
