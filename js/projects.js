const caseStudies = {
    tender: {
        id: "PROJECT_01",
        title: "AI-POWERED TENDER CREATION & EVALUATION SYSTEM",
        overview: "An enterprise intelligence platform built to automate the end-to-end lifecycle of tender generation and bidder evaluation, replacing manual workflows with LLMs and semantic search.",
        problem: "Generating complex RFPs and evaluating 100+ page bidder responses was highly manual, error-prone, and required weeks of stakeholder alignment. There was no single source of truth for historical requirements.",
        solution: "Engineered a dual-pipeline architecture. For creation: a RAG pipeline leveraging historical tender data to draft structured RFPs. For evaluation: an ingestion engine utilizing OCR and Vector Search to map bidder evidence against requirements.",
        architecture: `
            <div class="bg-darker p-4 font-mono small border border-dark text-muted mb-4">
                <div>// RETRIEVAL-AUGMENTED GENERATION FLOW</div>
                <div class="mt-2 text-white">DOCUMENT → OCR → CHUNKING → QDRANT → SEMANTIC SEARCH → LLM</div>
            </div>
            <p>The system utilizes PostgreSQL for transactional data (users, workflows, audit logs) and Qdrant for storing high-dimensional embeddings of historical tender clauses.</p>
        `,
        tech: "Java, Spring Boot, PostgreSQL, Qdrant, OpenAI / Gemini, OCR Tools, Microservices",
        engineering: "I spearheaded the backend architecture, defining the chunking strategies for legal documents, implementing the REST APIs for the UI, and integrating the LLM abstraction layer to ensure provider lock-in was avoided. I also implemented OWASP security standards to protect sensitive pre-bidding data."
    },
    imps: {
        id: "PROJECT_02",
        title: "INTEGRATED PROJECT MANAGEMENT SYSTEM (IMPS)",
        overview: "A unified microservices platform designed to handle enterprise project tracking, budgeting, requisitions, and vendor management.",
        problem: "The client relied on disparate legacy tools that lacked real-time synchronization, leading to budget overruns and resource misallocation.",
        solution: "Developed a distributed microservices architecture using Spring Boot, centralizing domain logic while allowing independent scaling of the Billing, User, and Project modules.",
        architecture: `
            <div class="bg-darker p-4 font-mono small border border-dark text-muted mb-4">
                <div>// MICROSERVICES COMMUNICATION</div>
                <div class="mt-2 text-white">CLIENT → API GATEWAY → (USER SVC | PROJECT SVC | FINANCE SVC) → ORACLE DB</div>
            </div>
        `,
        tech: "Java, Spring Boot, Angular, Oracle 19c, LDAP, REST APIs",
        engineering: "Responsible for core backend service development, database query optimization for complex financial reporting, and integrating LDAP for SSO. Oversaw UAT deployments and resolved critical production bottlenecks."
    },
    siidcul: {
        id: "PROJECT_03",
        title: "PROPERTY APPLICATION & BIDDING SYSTEM",
        overview: "An enterprise state portal facilitating industrial development processes, property bidding, and secure document management.",
        problem: "The manual allocation of industrial plots lacked transparency and scale, requiring physical document submissions and manual payment reconciliation.",
        solution: "Built a highly secure web portal with an integrated payment gateway, role-based access control, and complex multi-stage approval workflows.",
        architecture: `
            <div class="bg-darker p-4 font-mono small border border-dark text-muted mb-4">
                <div>// SYSTEM FLOW</div>
                <div class="mt-2 text-white">SSO LOGIN → BIDDING ENGINE → PAYMENT GATEWAY → AUTOMATED RECONCILIATION</div>
            </div>
        `,
        tech: "Java EE, Spring Framework, Oracle, Hibernate, JSP/Servlets",
        engineering: "Implemented secure bidding algorithms, built Excel bulk operation utilities for admin reporting, and optimized Hibernate caching mechanisms to handle high-traffic bidding events."
    }
};

$(document).ready(function() {
    $('.open-project-modal').on('click', function() {
        const projectId = $(this).data('project');
        const data = caseStudies[projectId];
        
        if (data) {
            $('#modal-doc-id').text(data.id);
            
            const content = `
                <div class="mb-5 border-bottom border-dark pb-5">
                    <h1 class="fw-bold display-5 mb-3">${data.title}</h1>
                    <div class="font-mono text-muted mb-4">COMPANY PROJECT / ENGINEERING CASE STUDY</div>
                </div>
                
                <div id="doc-overview" class="mb-5">
                    <h4 class="font-mono text-accent mb-4">01 / OVERVIEW</h4>
                    <p class="fs-5">${data.overview}</p>
                </div>
                
                <div id="doc-problem" class="mb-5">
                    <h4 class="font-mono text-accent mb-4">02 / PROBLEM</h4>
                    <p class="fs-5 text-muted">${data.problem}</p>
                </div>
                
                <div id="doc-solution" class="mb-5">
                    <h4 class="font-mono text-accent mb-4">03 / SOLUTION & ARCHITECTURE</h4>
                    <p class="fs-5 text-muted">${data.solution}</p>
                    <div class="mt-4">${data.architecture}</div>
                </div>
                
                <div id="doc-tech" class="mb-5">
                    <h4 class="font-mono text-accent mb-4">04 / TECHNOLOGY</h4>
                    <div class="font-mono p-3 border border-dark bg-darker text-white">
                        ${data.tech}
                    </div>
                </div>
                
                <div id="doc-engineering" class="mb-5 pb-5">
                    <h4 class="font-mono text-accent mb-4">05 / ENGINEERING CONTRIBUTION</h4>
                    <p class="fs-5 text-muted">${data.engineering}</p>
                </div>
            `;
            
            $('#modal-doc-content').html(content);
            const modal = new bootstrap.Modal(document.getElementById('projectDocModal'));
            modal.show();
        }
    });
});
