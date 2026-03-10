/**
 * Filtrage avancé :
 * - Plusieurs filtres Contexte (ctx)
 * - Plusieurs filtres Compétences (comp)
 * 
 * Logique :
 *   - Dans un même groupe : OR (au moins un match)
 *   - Entre les groupes : AND (tous les groupes doivent matcher)
 */

let activeCtx = new Set();   // ex: { "pro", "e6" }
let activeComp = new Set();  // ex: { "patrimoine", "incidents" }

function filterMissions(type, value, btn) {

    const isCtx = type === "ctx";
    const group = isCtx ? activeCtx : activeComp;

    value = value.toLowerCase();

    // Gestion du bouton "Tous"
    if (value === "all") {
        group.clear();
        document.querySelectorAll(isCtx ? ".ctx-btn" : ".comp-btn")
            .forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    } 
    else {
        // Désactiver "Tous"
        document.querySelectorAll(isCtx ? ".ctx-btn" : ".comp-btn")[0]
            .classList.remove("active");

        // Toggle du filtre
        if (group.has(value)) {
            group.delete(value);
            btn.classList.remove("active");
        } else {
            group.add(value);
            btn.classList.add("active");
        }
    }

    // Si aucun filtre actif → réactiver "Tous"
    if (group.size === 0) {
        document.querySelectorAll(isCtx ? ".ctx-btn" : ".comp-btn")[0]
            .classList.add("active");
    }

    applyFilters();
}

function applyFilters() {
    const projects = document.querySelectorAll(".project-item");

    projects.forEach(project => {

        const segmentTags = (project.dataset.segment || "")
            .toLowerCase()
            .split(" ")
            .map(s => s.trim());

        const categoryTags = (project.dataset.categories || "")
            .toLowerCase()
            .split(" ")
            .map(s => s.trim());

        // Vérification Contexte (OR)
        const matchCtx =
            activeCtx.size === 0 ||
            [...activeCtx].some(tag => segmentTags.includes(tag));

        // Vérification Catégories (OR)
        const matchComp =
            activeComp.size === 0 ||
            [...activeComp].some(tag => categoryTags.includes(tag));

        // Logique globale : AND
        const visible = matchCtx && matchComp;

        // Animation
        if (visible) {
            project.style.display = "";
            requestAnimationFrame(() => {
                project.style.opacity = "1";
                project.style.transform = "scale(1)";
            });
        } else {
            project.style.opacity = "0";
            project.style.transform = "scale(0.95)";
            setTimeout(() => {
                if (project.style.opacity === "0") {
                    project.style.display = "none";
                }
            }, 250);
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    console.log("Filtre multi‑sélection prêt.");
});

window.addEventListener("DOMContentLoaded", () => {
    console.log("Filtre multi‑critères prêt.");
});
