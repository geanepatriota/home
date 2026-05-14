const portifolioImages = [
    'portifolio/1.png', 'portifolio/2.png', 'portifolio/3.png', 'portifolio/4.png', 'portifolio/5.png', 'portifolio/6.png', 'portifolio/7.png', 'portifolio/8.png', 'portifolio/9.png', 'portifolio/10.png', 'portifolio/11.png', 'portifolio/12.png', 'portifolio/13.png', 'portifolio/14.png', 'portifolio/15.png', 'portifolio/16.png', 'portifolio/17.png', 'portifolio/18.png', 'portifolio/19.png', 'portifolio/20.png', 'portifolio/21.png', 'portifolio/22.png', 'portifolio/23.png', 'portifolio/24.png', 'portifolio/25.png', 'portifolio/26.png', 'portifolio/27.png', 'portifolio/28.png', 'portifolio/29.png', 'portifolio/30.png', 'portifolio/31.png', 'portifolio/32.png', 'portifolio/33.png', 'portifolio/34.png', 'portifolio/35.png', 'portifolio/36.png', 'portifolio/37.png', 'portifolio/38.png', 'portifolio/39.png', 'portifolio/40.png', 'portifolio/41.png', 'portifolio/42.png', 'portifolio/43.png', 'portifolio/44.png', 'portifolio/45.png'
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
