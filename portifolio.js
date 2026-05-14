const portifolioImages = [
    'portifolio/1.jpg', 'portifolio/2.jpg', 'portifolio/3.jpg', 'portifolio/4.jpg', 'portifolio/5.jpg', 'portifolio/6.jpg'
];

function loadPortifolio() {
    const grid = document.getElementById('portifolio-grid');
    portifolioImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.onerror = () => img.style.display = 'none';
        img.onclick = () => openLightbox(src);
        grid.appendChild(img);
    });
}
