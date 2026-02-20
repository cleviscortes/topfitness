document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // Header Stickyness & Active Link on Scroll
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Sticky effect (already fixed, but maybe add shadow or transparency change if needed)
        // Here we can implement scroll spy for active menu items
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // =========================================
    // HERO CAROUSEL
    // =========================================
    const slides = document.querySelectorAll('.carousel-item');
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Reset Logic
        slides.forEach(slide => slide.classList.remove('active'));

        // Loop Logic
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Autoplay
    function startSlideTimer() {
        slideInterval = setInterval(nextSlide, 5000); // 5s transition
    }

    function stopSlideTimer() {
        clearInterval(slideInterval);
    }

    // Event Listeners for Controls
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            stopSlideTimer();
            nextSlide();
            startSlideTimer();
        });

        prevBtn.addEventListener('click', () => {
            stopSlideTimer();
            prevSlide();
            startSlideTimer();
        });
    }

    // Start Carousel
    if (slides.length > 0) {
        startSlideTimer();
    }

    // =========================================
    // GALLERY LIGHTBOX
    // =========================================
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const nextLightbox = document.querySelector('.lightbox-next');
    const prevLightbox = document.querySelector('.lightbox-prev');
    let currentLightboxIndex = 0;

    if (lightbox) {
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                lightbox.style.display = "block";
                lightboxImg.src = item.src;
                currentLightboxIndex = index;
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = "none";
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.style.display = "none";
        });

        function showLightboxImage(index) {
            if (index >= galleryItems.length) currentLightboxIndex = 0;
            else if (index < 0) currentLightboxIndex = galleryItems.length - 1;
            else currentLightboxIndex = index;

            lightboxImg.src = galleryItems[currentLightboxIndex].src;
        }

        if (nextLightbox && prevLightbox) {
            nextLightbox.addEventListener('click', (e) => {
                e.stopPropagation();
                showLightboxImage(currentLightboxIndex + 1);
            });

            prevLightbox.addEventListener('click', (e) => {
                e.stopPropagation();
                showLightboxImage(currentLightboxIndex - 1);
            });
        }

        // Keyboard Support
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === "block") {
                if (e.key === "Escape") lightbox.style.display = "none";
                if (e.key === "ArrowRight") showLightboxImage(currentLightboxIndex + 1);
                if (e.key === "ArrowLeft") showLightboxImage(currentLightboxIndex - 1);
            }
        });
    }

    // =========================================
    // TRAINERS MODAL
    // =========================================
    const trainerCards = document.querySelectorAll('.trainer-card');
    const modal = document.getElementById('trainer-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalName = document.getElementById('modal-trainer-name');
    const modalDesc = document.getElementById('modal-trainer-desc');

    if (modal) {
        trainerCards.forEach(card => {
            card.addEventListener('click', () => {
                const name = card.getAttribute('data-name');
                const info = card.getAttribute('data-info');

                modalName.textContent = name;
                modalDesc.textContent = info;

                modal.style.display = "flex";
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = "none";
        });

        // Keyboard Support for Modal
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === "flex" && e.key === "Escape") {
                modal.style.display = "none";
            }
        });
    }

    // =========================================
    // ABOUT VIDEO AUTOPLAY
    // =========================================
    const video = document.getElementById('about-video');

    if (video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(err => console.log("Autoplay blocked/failed", err));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    }
});
