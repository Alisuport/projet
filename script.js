/**
 * Système de filtrage des projets
 * Filtrage croisé : Contexte (Pro, École...) + Compétences
 */

// État des filtres
let activeCtx = 'all';
let activeComp = 'all';

/**
 * Fonction appelée par les boutons HTML
 */
function filterMissions(type, value, btn) {

    // 1. Mise à jour visuelle des boutons
    const btnClass = (type === 'ctx') ? '.ctx-btn' : '.comp-btn';

    document.querySelectorAll(btnClass).forEach(b => {
        b.classList.remove('active');
    });

    if (btn) btn.classList.add('active');

    // 2. Mise à jour des filtres actifs
    if (type === 'ctx') {
        activeCtx = value.toLowerCase();
    } else {
        activeComp = value.toLowerCase();
    }

    // 3. Filtrage des projets
    const projects = document.querySelectorAll('.project-item');

    projects.forEach(project => {

        // Récupération des tags (multi-tags possibles séparés par virgule)
        const ctxTags = (project.dataset.context || "")
            .toLowerCase()
            .split(',')
            .map(s => s.trim());

        const compTags = (project.dataset.comp || "")
            .toLowerCase()
            .split(',')
            .map(s => s.trim());

        // Vérification des correspondances
        const matchCtx = (activeCtx === 'all' || ctxTags.includes(activeCtx));
        const matchComp = (activeComp === 'all' || compTags.includes(activeComp));

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
window.addEventListener('DOMContentLoaded', () => {
    console.log("Système de filtrage prêt.");

    const count = document.querySelectorAll('.project-item').length;
    if (count === 0) {
        console.error("ERREUR : Aucune carte '.project-item' trouvée.");
    } else {
        console.log(count + " projets détectés.");
    }

    // Curseur pointer sur les boutons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.style.cursor = 'pointer';
    });
});
