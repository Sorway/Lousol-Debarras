document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.image-modal');
    const modalImage = modal.querySelector('.modal-image');
    const modalLabel = modal.querySelector('.modal-label');
    const closeButton = modal.querySelector('.modal-close');
    const prevButton = modal.querySelector('.nav-button.prev');
    const nextButton = modal.querySelector('.nav-button.next');
    let currentImageIndex = 0;
    let images = [];

    document.querySelectorAll('.realisation-img').forEach((img, index) => {
        img.addEventListener('click', () => {
            images = Array.from(document.querySelectorAll('.realisation-img'));
            currentImageIndex = index;
            openModal(img);
        });
    });

    function openModal(img) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalLabel.textContent = img.dataset.type === 'before' ? 'Avant' : 'Après';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateNavigation();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateNavigation() {
        prevButton.style.visibility = currentImageIndex > 0 ? 'visible' : 'hidden';
        nextButton.style.visibility = currentImageIndex < images.length - 1 ? 'visible' : 'hidden';
    }

    function navigateImages(direction) {
        currentImageIndex += direction;
        if (currentImageIndex >= 0 && currentImageIndex < images.length) {
            const newImage = images[currentImageIndex];
            openModal(newImage);
        }
    }

    closeButton.addEventListener('click', closeModal);
    prevButton.addEventListener('click', () => navigateImages(-1));
    nextButton.addEventListener('click', () => navigateImages(1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') navigateImages(-1);
        if (e.key === 'ArrowRight') navigateImages(1);
    });

    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeLength = touchEndX - touchStartX;

        if (Math.abs(swipeLength) > swipeThreshold) {
            if (swipeLength > 0) {
                navigateImages(-1);
            } else {
                navigateImages(1);
            }
        }
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});