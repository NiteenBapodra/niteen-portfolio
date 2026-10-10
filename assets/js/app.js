/**
 * ENGINEERING OS - PORTFOLIO INTERACTIONS
 * Built with jQuery and Bootstrap 5
 */

$(document).ready(function() {
    
    /* ==========================================================================
       THEME TOGGLE
       ========================================================================== */
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme);

    $('#themeToggle').on('click', function() {
        const newTheme = $('html').attr('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        $('html').attr('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            $('.theme-icon-dark').removeClass('d-none');
            $('.theme-icon-light').addClass('d-none');
        } else {
            $('.theme-icon-dark').addClass('d-none');
            $('.theme-icon-light').removeClass('d-none');
        }
    }

    /* ==========================================================================
       SCROLL EFFECTS & NAVIGATION
       ========================================================================== */
    const navbar = $('#mainNav');
    const scrollBar = $('#scrollBar');
    
    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Scroll Progress
        scrollBar.css('width', scrollPercent + '%');
        
        // Navbar styling
        if (scrollTop > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
        
        // Intersection Reveals
        handleReveals();
    });

    // Active Navigation Highlighting
    $('body').scrollspy({ target: '#mainNav', offset: 100 });

    /* ==========================================================================
       INTERSECTION REVEALS
       ========================================================================== */
    function handleReveals() {
        const windowBottom = $(window).scrollTop() + $(window).height() - 50;
        
        $('.fade-in-up, .fade-in-left, .fade-in-right').each(function() {
            const elementTop = $(this).offset().top;
            if (elementTop < windowBottom) {
                $(this).addClass('visible');
            }
        });
        
        // Counters
        $('.counter').each(function() {
            const $this = $(this);
            if (!$this.hasClass('counted') && $this.offset().top < windowBottom) {
                $this.addClass('counted');
                const target = parseFloat($this.data('target'));
                $({ countNum: 0 }).animate({ countNum: target }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum * 10) / 10);
                    },
                    complete: function() {
                        $this.text(target);
                    }
                });
            }
        });
    }
    
    // Initial trigger
    handleReveals();

    /* ==========================================================================
       TERMINAL INTERACTION
       ========================================================================== */
    const terminalOutput = $('#termOutput');
    const commands = {
        'whoami': 'Java Full Stack Developer<br>Specializing in enterprise systems & secure APIs.',
        'stack --core': 'Java • Spring Boot • Microservices • REST • Security • SQL • Angular',
        'system --status': `Backend <span class="text-success">██████████</span> ONLINE<br>
                            APIs <span class="text-success">██████████</span> ONLINE<br>
                            Security <span class="text-accent">██████████</span> ACTIVE<br>
                            Database <span class="text-success">██████████</span> CONNECTED`,
        'clear': ''
    };

    $('.btn-terminal').on('click', function() {
        const cmd = $(this).data('cmd');
        
        if (cmd === 'clear') {
            terminalOutput.html('');
            return;
        }

        const outputText = commands[cmd];
        terminalOutput.append(`<div><span class="text-success">$</span> ${cmd}</div>`);
        
        // Simulate thinking
        setTimeout(() => {
            terminalOutput.append(`<div class="mb-2 text-white">${outputText}</div>`);
            $('.terminal-body').scrollTop($('.terminal-body')[0].scrollHeight);
        }, 300);
    });

    /* ==========================================================================
       TECH BADGES TOOLTIP
       ========================================================================== */
    $('.tech-badge').hover(
        function() {
            const info = $(this).data('info');
            if (info) {
                $('#techTooltip').text(info);
            }
        },
        function() {
            $('#techTooltip').text('');
        }
    );

    /* ==========================================================================
       ARCHITECTURE INTERACTION (SYSTEM THINKING)
       ========================================================================== */
    $('.interactive-node').on('click', function() {
        const title = $(this).data('title');
        const desc = $(this).data('desc');
        const tech = $(this).data('tech');
        
        $('.interactive-node').removeClass('bg-surface').addClass('bg-primary'); // reset
        $(this).removeClass('bg-primary').addClass('bg-surface'); // highlight
        
        $('#archTitle').text(title);
        $('#archDesc').text(desc);
        $('#archTech').text(tech);
        
        $('.arch-detail-panel').removeClass('d-none').hide().fadeIn(300);
    });

    /* ==========================================================================
       LIVE REQUEST FLOW
       ========================================================================== */
    $('#startRequestFlow').on('click', function() {
        const btn = $(this);
        const packet = $('#flowPacket');
        const status = $('#flowStatus');
        const stops = ['client', 'nginx', 'auth', 'ctrl', 'db'];
        const messages = [
            'REQUEST RECEIVED',
            'ROUTED VIA NGINX',
            'AUTHENTICATED',
            'BUSINESS LOGIC EXECUTED',
            'DATABASE ACCESSED / RESPONSE GENERATED'
        ];
        
        btn.prop('disabled', true);
        packet.removeClass('d-none');
        
        let currentStop = 0;
        
        function animateToNext() {
            if (currentStop >= stops.length) {
                status.html('<span class="text-success">FLOW COMPLETE</span>');
                setTimeout(() => {
                    packet.addClass('d-none');
                    btn.prop('disabled', false);
                    $('.flow-stop').removeClass('text-accent fw-bold');
                    status.text('SYSTEM IDLE');
                }, 2000);
                return;
            }
            
            // Highlight text
            $('.flow-stop').removeClass('text-accent fw-bold');
            $(`#fs-${stops[currentStop]}`).addClass('text-accent fw-bold');
            status.text(messages[currentStop]);
            
            // Move packet
            const targetX = (currentStop / (stops.length - 1)) * 100;
            
            packet.animate(
                { dummy: 1 }, 
                {
                    duration: 800,
                    step: function(now, fx) {
                        const currentX = (fx.pos * (targetX - (currentStop === 0 ? 0 : ((currentStop - 1) / (stops.length - 1)) * 100))) + (currentStop === 0 ? 0 : ((currentStop - 1) / (stops.length - 1)) * 100);
                        $(this).attr('cx', currentX + '%');
                    },
                    complete: function() {
                        setTimeout(() => {
                            currentStop++;
                            animateToNext();
                        }, 400); // pause at node
                    }
                }
            );
        }
        
        // Reset packet position
        packet.attr('cx', '0%');
        animateToNext();
    });

    /* ==========================================================================
       PRODUCTION PIPELINE
       ========================================================================== */
    $('.pipeline-stage').hover(
        function() {
            const detail = $(this).data('detail');
            $('.pipeline-detail').text(detail);
        },
        function() {
            $('.pipeline-detail').text('');
        }
    );

    /* ==========================================================================
       PROJECT ARCHITECTURE MODALS
       ========================================================================== */
    const archData = {
        tenderCreation: {
            title: 'TENDER CREATION ARCHITECTURE',
            svg: `
                <div class="d-flex flex-column align-items-center font-mono small text-center gap-3">
                    <div class="p-3 border border-dark rounded bg-surface w-100">Tender Brief</div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-dark rounded bg-surface w-100">Historical Tender Knowledge</div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-dark rounded bg-surface w-100">Document Extraction / OCR</div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="d-flex justify-content-center gap-4 w-100">
                        <div class="p-3 border border-dark rounded bg-darker flex-grow-1">Text Processing</div>
                        <div class="p-3 border border-dark rounded bg-darker flex-grow-1">Chunking</div>
                    </div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-warning rounded bg-surface w-100 text-warning">Embeddings &rarr; Qdrant Vector Database</div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-accent rounded bg-surface w-100 text-accent">Semantic Retrieval / RAG Context</div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-success rounded bg-surface w-100 text-success">LLM (Provider Agnostic)</div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-dark rounded bg-surface w-100 fw-bold">Structured Tender Output</div>
                </div>
            `
        },
        tenderEval: {
            title: 'TENDER EVALUATION ARCHITECTURE',
            svg: `
                <div class="d-flex flex-column align-items-center font-mono small text-center gap-3">
                    <div class="d-flex justify-content-center gap-4 w-100">
                        <div class="p-3 border border-dark rounded bg-surface flex-grow-1">RFP</div>
                        <div class="p-3 border border-dark rounded bg-surface flex-grow-1">Bidder Response</div>
                    </div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-dark rounded bg-surface w-100">Document Extraction / OCR</div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-dark rounded bg-surface w-100">Requirement Identification</div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-warning rounded bg-surface w-100 text-warning">RAG / Knowledge Retrieval</div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-dark rounded bg-darker w-100">Requirement Matching & Evidence Extraction</div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-success rounded bg-surface w-100 text-success">LLM Analysis</div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="d-flex justify-content-center gap-4 w-100">
                        <div class="p-3 border border-dark rounded bg-surface flex-grow-1">AI-Assisted Evaluation</div>
                        <div class="p-3 border border-dark rounded bg-surface flex-grow-1">Human Review</div>
                    </div>
                    <i class="bi bi-arrow-down fs-4 text-accent"></i>
                    <div class="p-3 border border-dark rounded bg-surface w-100 fw-bold">Evaluation Report</div>
                </div>
            `
        }
    };

    $('.open-arch-modal').on('click', function() {
        const target = $(this).data('target');
        const data = archData[target];
        
        if (data) {
            $('#archModalTitle').text(data.title);
            $('#archModalContent').html(data.svg);
            const modal = new bootstrap.Modal(document.getElementById('archModal'));
            modal.show();
        }
    });
});
