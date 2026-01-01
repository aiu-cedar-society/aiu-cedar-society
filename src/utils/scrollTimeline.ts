/**
 * Scroll Timeline Fallback
 * Provides Intersection Observer fallback for browsers without Scroll-driven Animations support
 */

export function initScrollTimelineFallback() {
    // Check if browser supports scroll timeline
    if (CSS.supports('animation-timeline', 'scroll()')) {
        return; // Native support, no fallback needed
    }

    // Intersection Observer fallback
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
            }
        });
    }, observerOptions);

    // Observe all scroll-driven elements
    const elements = document.querySelectorAll(
        '.scroll-parallax, .scroll-fade-in, .scroll-scale, .scroll-slide-left, .scroll-slide-right'
    );

    elements.forEach((el) => {
        observer.observe(el);
    });

    // Progress bar fallback
    const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
    if (progressBar) {
        function updateProgress() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // Initial call
    }
}

// Auto-initialize on DOM ready
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollTimelineFallback);
    } else {
        initScrollTimelineFallback();
    }
}
