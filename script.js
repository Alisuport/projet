/**
 * Filtrage croisé : Segment (pro, e6, école, perso...)
 * + Catégories (patrimoine, incidents, service...)
 * 
 * Le script gère EXACTEMENT 2 filtres en même temps.
 */

let activeCtx = "all";   // Filtre segment
let activeComp = "all";  // Filtre catégorie

function filterMissions(type, value, btn) {

    // 1. Mise à jour visuelle des boutons
    const btnClass = (type === "ctx") ? ".ctx-btn" : ".comp-btn";

    document.querySelectorAll(btnClass).forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    // 2. Mise à jour des filtres actifs
    if (type === "ctx") {
        activeCtx = value.toLowerCase();
    } else {
        activeComp = value.toLowerCase();
    }

    // 3. Filtrage des projets
    const projects = document.querySelectorAll(".project-item");

    projects.forEach(project => {

        // Récupération des tags (séparés par espace)
        const segmentTags = (project.dataset.segment || "")
            .toLowerCase()
            .split(" ")
            .map(s => s.trim());

        const categoryTags = (project.dataset.categories || "")
            .toLowerCase()
            .split(" ")
            .map(s => s.trim());

        // Vérification des correspondances
        const matchCtx = (activeCtx === "all" || segmentTags.includes(activeCtx));
        const matchComp = (activeComp === "all" || categoryTags.includes(activeComp));

        // Animation d'affichage
        if (matchCtx && matchComp) {
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

/**
 * Initialisation
 */
window.addEventListener("DOMContentLoaded", () => {
    console.log("Système de filtrage prêt.");

    const count = document.querySelectorAll(".project-item").length;
    if (count === 0) {
        console.error("ERREUR : Aucune carte '.project-item' trouvée.");
    } else {
        console.log(count + " projets détectés.");
    }
});
