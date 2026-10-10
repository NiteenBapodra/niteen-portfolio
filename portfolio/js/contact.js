function initContact() {
    const form = $('#contactForm');
    
    form.on('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        // Bootstrap native validation check
        if (!this.checkValidity()) {
            form.addClass('was-validated');
            return;
        }

        const btn = $(this).find('button[type="submit"]');
        const originalText = btn.text();
        const status = $('#formStatus');

        btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...');
        
        // Simulate API Call
        setTimeout(() => {
            status.removeClass('d-none text-danger').addClass('text-success').text('Message successfully queued for delivery!');
            
            form.removeClass('was-validated')[0].reset();
            btn.prop('disabled', false).text(originalText);
            
            setTimeout(() => {
                status.addClass('d-none');
            }, 5000);
        }, 1500);
    });
}
