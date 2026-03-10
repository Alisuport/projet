<script>

// On initialise les filtres par défaut
// On initialise les filtres par défaut (état global)
let activeCtx = 'all';
let activeComp = 'all';

/**
 * Fonction de filtrage des missions
 * @param {string} type - 'ctx' (contexte) ou 'comp' (compétence)
 * @param {string} value - La valeur du filtre (ex: 'pro', 'incident', 'all')
 * @param {HTMLElement} btn - Le bouton sur lequel l'utilisateur a cliqué
 */
function filterMissions(type, value, btn) {
    // 1. Mise à jour visuelle des boutons (UI)
    // On cible soit les boutons de contexte, soit les boutons de compétences
    const btnClass = type === 'ctx' ? '.ctx-btn' : '.comp-btn';
    document.querySelectorAll(btnClass).forEach(b => {
        b.classList.remove('active');
        b.style.cursor = 'pointer'; // On s'assure que le curseur est bien un pointeur
    });
    
    // On active le bouton cliqué
    btn.classList.add('active');

    // 2. Mise à jour des variables d'état global
    if (type === 'ctx') {
        activeCtx = value;
    } else if (type === 'comp') {
        activeComp = value;
    }

    // 3. Application du filtre sur les cartes de projets
    // Chaque carte doit avoir la classe 'project-item'
    const projects = document.querySelectorAll('.project-item');
    
    projects.forEach(project => {
        // Récupération des attributs de données de la carte
        // On utilise lowercase pour éviter les problèmes de casse (E6 vs e6)
        const projectCtx = (project.getAttribute('data-context') || "").toLowerCase();
        const projectComp = (project.getAttribute('data-comp') || "").toLowerCase();
        
        const filterCtxValue = activeCtx.toLowerCase();
        const filterCompValue = activeComp.toLowerCase();

        // Condition 1 : Est-ce que le contexte correspond ?
        const matchCtx = (filterCtxValue === 'all' || projectCtx.includes(filterCtxValue));
        
        // Condition 2 : Est-ce que la compétence correspond ?
        const matchComp = (filterCompValue === 'all' || projectComp.includes(filterCompValue));

        // On affiche la carte seulement si elle remplit les deux conditions (Filtre croisé)
        if (matchCtx && matchComp) {
            project.style.display = "block"; // Ou "flex" selon votre mise en page
            // Petit délai pour l'animation d'opacité si définie en CSS
            setTimeout(() => {
                project.style.opacity = "1";
                project.style.transform = "scale(1)";
            }, 10);
        } else {
            project.style.opacity = "0";
            project.style.transform = "scale(0.95)";
            // On attend la fin de la transition pour masquer l'élément
            setTimeout(() => {
                if (project.style.opacity === "0") {
                    project.style.display = "none";
                }
            }, 300);
        }
    });
}

// Initialisation au chargement de la page pour s'assurer que tout est bien cliquable
window.addEventListener('DOMContentLoaded', () => {
    const allBtns = document.querySelectorAll('.filter-btn');
    allBtns.forEach(btn => {
        btn.style.cursor = 'pointer';
    });
});

</script>
