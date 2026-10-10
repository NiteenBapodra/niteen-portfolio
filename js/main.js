$(document).ready(function() {
    
    // Floating Navigation Scroll Effect
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('#floatingNav').addClass('scrolled');
        } else {
            $('#floatingNav').removeClass('scrolled');
        }
    });

    // Scroll Reveal using Intersection Observer
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
        revealElements.addClass('active');
    }

    // Interactive Architecture Diagram
    $('.arch-node').hover(
        function() {
            const info = $(this).data('info');
            $('.arch-info-panel').text(info);
            // Highlight connections if SVG lines existed (mocked via CSS classes here)
        },
        function() {
            $('.arch-info-panel').text('Hover over a node to view technical details.');
        }
    );

    // Contact Form Validation (Mock)
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!this.checkValidity()) {
            $(this).addClass('was-validated');
            return;
        }

        const btn = $(this).find('button[type="submit"]');
        const originalText = btn.text();
        const status = $('#formStatus');

        btn.prop('disabled', true).text('TRANSMITTING...');
        
        setTimeout(() => {
            status.removeClass('d-none text-danger').addClass('text-accent').text('TRANSMISSION SUCCESSFUL.');
            $(this).removeClass('was-validated')[0].reset();
            btn.prop('disabled', false).text(originalText);
            
            setTimeout(() => {
                status.addClass('d-none');
            }, 5000);
        }, 1500);
    });
    
    // Engineering Stack interaction
    $('.tech-tag').hover(
        function() {
            // Subtle highlighting handled by CSS, could add JS logic for related tech
        },
        function() {
            // Revert
        }
    );
});
