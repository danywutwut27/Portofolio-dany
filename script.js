/* ==================================================
   PORTFOLIO - Dany Wahyu Hidayat
   script.js — Final Clean Version
================================================== */

/* ===== 1. DARK MODE ===== */
const themeBtn  = document.getElementById('theme-btn');
const themeIcon = themeBtn?.querySelector('i');

// Load preferensi tersimpan
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon?.classList.replace('fa-moon', 'fa-sun');
}

themeBtn?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    themeIcon?.classList.toggle('fa-moon', !isDark);
    themeIcon?.classList.toggle('fa-sun',   isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


/* ===== 2. HAMBURGER MENU ===== */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Tutup menu saat link diklik
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('show');
        const icon = navToggle?.querySelector('i');
        icon?.classList.add('fa-bars');
        icon?.classList.remove('fa-times');
    });
});


/* ===== 3. ACTIVE NAV ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top    = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id     = section.getAttribute('id');
        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav(); // jalankan sekali saat load


/* ===== 4. SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal-element');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-reveal');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


/* ===== 5. TYPING EFFECT ===== */
const typingEl = document.getElementById('typing-text');
const words    = [
    'Otomasi Industri',
    'Pemrograman PLC/HMI',
    'Sistem Mekatronika',
    'IoT & ESP32',
    'Kelistrikan Industri'
];
let wordIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

function typeAnimation() {
    if (!typingEl) return;

    const current = words[wordIndex];

    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 55 : 100;

    if (!isDeleting && charIndex === current.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % words.length;
        delay = 400;
    }

    setTimeout(typeAnimation, delay);
}

// Jalankan setelah DOM siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', typeAnimation);
} else {
    typeAnimation();
}


/* ===== 6. BACK TO TOP ===== */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
/* ==================================================
   LIGHTBOX — Dokumentasi Prestasi
================================================== */

// Daftar semua foto prestasi (sesuaikan path & caption)
const galleryImages = [
    { src: 'assets/prestasi/plc-unipma-2024.jpg',      caption: 'Juara 1 Lomba PLC — UNIPMA 2024' },
    { src: 'assets/prestasi/plc-ppns-2024.jpg',         caption: 'Juara 1 Lomba PLC — PPNS 2024' },
    { src: 'assets/prestasi/cobot-pnj-2025.jpg',        caption: 'Juara 2 COBOT Schneider — PNJ Jakarta 2025' },
    { src: 'assets/prestasi/lks-mekatronika-2024.jpg',  caption: 'Juara 2 LKS Mechatronics — Kabupaten 2024' },
    { src: 'assets/prestasi/lks-robot-kab-2025.jpg',    caption: 'Juara 1 LKS Robot Manufaktur — Kabupaten 2025' },
    { src: 'assets/prestasi/lks-robot-prov-2025.jpg',   caption: 'Juara 3 LKS Robot Manufaktur — Provinsi 2025' },
];

let currentIndex = 0;

const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

/* Buka lightbox */
function openLightbox(src, caption) {
    // Cari index gambar berdasarkan src
    const idx = galleryImages.findIndex(img => img.src === src);
    currentIndex = idx >= 0 ? idx : 0;

    showImage(currentIndex);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // cegah scroll background
}

/* Tutup lightbox */
function closeLightbox(event) {
    // Hanya tutup jika klik di overlay atau tombol close (bukan gambar)
    if (event && event.target === lightboxImg) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

/* Tampilkan gambar berdasarkan index */
function showImage(index) {
    lightboxImg.style.opacity     = '0';
    lightboxImg.style.transform   = 'scale(.96)';

    setTimeout(() => {
        lightboxImg.src            = galleryImages[index].src;
        lightboxCaption.textContent = `${galleryImages[index].caption}  (${index + 1}/${galleryImages.length})`;
        lightboxImg.style.opacity  = '1';
        lightboxImg.style.transform = 'scale(1)';
    }, 150);
}

/* Tambahkan transisi smooth ke gambar via JS */
document.addEventListener('DOMContentLoaded', () => {
    if (lightboxImg) {
        lightboxImg.style.transition = 'opacity .15s ease, transform .15s ease';
    }
});

/* Navigasi prev/next */
function changeImage(direction) {
    currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
}

/* Keyboard support */
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'ArrowLeft')  changeImage(-1);
});

/* Swipe support (mobile) */
let touchStartX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
        changeImage(diff > 0 ? 1 : -1);
    }
}, { passive: true });