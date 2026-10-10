function initAIDemo() {
    // Tender Creation Workflow
    $('#btn-generate-tender').on('click', function() {
        const btn = $(this);
        const originalHtml = btn.html();
        const progressContainer = $('#demo-progress-container');
        const progressBar = $('#demo-progress');
        const statusText = $('#demo-status');
        const placeholder = $('#demo-output-placeholder');
        const accordion = $('#tenderAccordion');
        
        // Reset state
        accordion.addClass('d-none').empty();
        placeholder.removeClass('d-none');
        btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...');
        progressContainer.removeClass('d-none');
        statusText.removeClass('d-none').text('Initializing LLM...');
        progressBar.css('width', '10%');
        
        // Simulate AI Pipeline delays
        setTimeout(() => {
            progressBar.css('width', '35%');
            statusText.text('Querying Qdrant Vector Database...');
        }, 1000);
        
        setTimeout(() => {
            progressBar.css('width', '65%');
            statusText.text('Retrieving Context (RAG)...');
        }, 2500);
        
        setTimeout(() => {
            progressBar.css('width', '90%');
            statusText.text('Generating Tender Sections...');
        }, 4000);
        
        setTimeout(() => {
            progressBar.css('width', '100%');
            statusText.text('Complete!');
            
            // Show Output
            setTimeout(() => {
                progressContainer.addClass('d-none');
                statusText.addClass('d-none');
                btn.prop('disabled', false).html(originalHtml);
                placeholder.addClass('d-none');
                
                // Inject Mock Content
                const sections = [
                    { title: "Tender Overview", content: "This document outlines the requirements for an enterprise HR management system..." },
                    { title: "Scope of Work", content: "The vendor will be responsible for deployment, data migration, and training..." },
                    { title: "Technical Requirements", content: "System must support SSO, role-based access control, and PostgreSQL backend..." }
                ];
                
                let accHtml = '';
                sections.forEach((sec, i) => {
                    accHtml += `
                        <div class="accordion-item mb-2 border border-secondary-subtle rounded">
                            <h2 class="accordion-header">
                                <button class="accordion-button ${i !== 0 ? 'collapsed' : ''} bg-body" type="button" data-bs-toggle="collapse" data-bs-target="#demo-collapse-${i}">
                                    ${sec.title}
                                </button>
                            </h2>
                            <div id="demo-collapse-${i}" class="accordion-collapse collapse ${i === 0 ? 'show' : ''}" data-bs-parent="#tenderAccordion">
                                <div class="accordion-body bg-body-tertiary font-monospace small">
                                    ${sec.content}
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                accordion.html(accHtml).removeClass('d-none');
            }, 500);
            
        }, 5500);
    });

    // Evaluation Workflow
    $('#btn-run-evaluation').on('click', function() {
        const btn = $(this);
        const originalHtml = btn.html();
        const placeholder = $('#eval-placeholder');
        const results = $('#eval-results');
        
        btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Analyzing Docs...');
        
        placeholder.html(`
            <div class="text-center text-primary">
                <div class="spinner-grow mb-3" role="status"></div>
                <p class="font-monospace small mb-0">Extracting text via OCR...</p>
            </div>
        `);
        
        setTimeout(() => {
            placeholder.html(`
                <div class="text-center text-info">
                    <div class="spinner-grow mb-3" role="status"></div>
                    <p class="font-monospace small mb-0">Mapping Requirements via LLM...</p>
                </div>
            `);
        }, 2000);
        
        setTimeout(() => {
            placeholder.addClass('d-none');
            results.removeClass('d-none');
            btn.prop('disabled', false).html(originalHtml);
        }, 4000);
    });
}
