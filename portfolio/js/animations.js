function initAnimations() {
    // Scroll Reveal using Intersection Observer (vanilla JS is better here for performance, but we wrap it in jQuery plugin style)
    const revealElements = $('.reveal-up, .reveal-left, .reveal-right');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('active');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        });

        revealElements.each(function() {
            revealObserver.observe(this);
        });
    } else {
        // Fallback for older browsers
        revealElements.addClass('active');
    }

    // Magnetic Buttons (using jQuery events)
    if (window.matchMedia('(hover: hover)').matches) {
        $('.magnetic-btn').on('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            $(this).css('transform', `translate(${x * 0.2}px, ${y * 0.2}px)`);
        }).on('mouseleave', function() {
            $(this).css('transform', 'translate(0px, 0px)');
        });
    }

    // AI Command Center Visualizer sequential animation
    let flowNodes = $('.ai-flow-visualization .flow-node');
    let currentIndex = 0;

    setInterval(() => {
        flowNodes.removeClass('active');
        $(flowNodes[currentIndex]).addClass('active');
        
        currentIndex++;
        if (currentIndex >= flowNodes.length) {
            currentIndex = 0;
        }
    }, 2000);
}
