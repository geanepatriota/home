const croquisImages = [
    'croquis/1.jpg', 'croquis/2.jpg', 'croquis/3.jpg', 'croquis/4.jpg', 'croquis/5.jpg', 'croquis/6.jpg'
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
