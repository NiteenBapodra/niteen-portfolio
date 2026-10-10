function initNavigation() {
    // Sticky Navbar
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 50) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }
    });

    // Theme Toggle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        $('html').attr('data-bs-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            $('html').attr('data-bs-theme', 'light');
            updateThemeIcon('light');
        }
    }

    $('#theme-toggle').on('click', function () {
        const currentTheme = $('html').attr('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        $('html').attr('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            $('.moon-icon').removeClass('d-none');
            $('.sun-icon').addClass('d-none');
        } else {
            $('.sun-icon').removeClass('d-none');
            $('.moon-icon').addClass('d-none');
        }
    }
}
