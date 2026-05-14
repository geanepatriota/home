const portifolioImages = [
    'portifolio/1.jpg', 'portifolio/2.jpg', 'portifolio/3.jpg', 'portifolio/4.jpg', 'portifolio/5.jpg', 'portifolio/6.jpg', 'portifolio/7.jpg', 'portifolio/8.jpg', 'portifolio/9.jpg', 'portifolio/10.jpg', 'portifolio/11.jpg', 'portifolio/12.jpg', 'portifolio/13.jpg', 'portifolio/14.jpg', 'portifolio/15.jpg', 'portifolio/16.jpg', 'portifolio/17.jpg', 'portifolio/18.jpg', 'portifolio/19.jpg', 'portifolio/20.jpg', 'portifolio/21.jpg', 'portifolio/22.jpg', 'portifolio/23.jpg', 'portifolio/24.jpg', 'portifolio/25.jpg', 'portifolio/26.jpg', 'portifolio/27.jpg', 'portifolio/28.jpg', 'portifolio/29.jpg', 'portifolio/30.jpg', 'portifolio/31.jpg', 'portifolio/32.jpg', 'portifolio/33.jpg', 'portifolio/34.jpg', 'portifolio/35.jpg', 'portifolio/36.jpg', 'portifolio/37.jpg', 'portifolio/38.jpg', 'portifolio/39.jpg', 'portifolio/40.jpg', 'portifolio/41.jpg', 'portifolio/42.jpg', 'portifolio/43.jpg', 'portifolio/44.jpg', 'portifolio/45.jpg'
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
