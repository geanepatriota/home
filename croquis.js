const croquisImages = [
    'croquis/1.jpg', 'croquis/2.jpg', 'croquis/3.jpg', 'croquis/4.jpg', 'croquis/5.jpg', 'croquis/6.jpg', 'croquis/7.jpg', 'croquis/8.jpg', 'croquis/9.jpg', 'croquis/10.jpg', 'croquis/11.jpg', 'croquis/12.jpg', 'croquis/13.jpg', 'croquis/14.jpg', 'croquis/15.jpg', 'croquis/16.jpg', 'croquis/17.jpg', 'croquis/18.jpg', 'croquis/19.jpg', 'croquis/20.jpg', 'croquis/21.jpg', 'croquis/22.jpg', 'croquis/23.jpg'
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
