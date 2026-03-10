/**
 * Script de filtrage pour les réalisations professionnelles
 * Gère le filtrage croisé entre Contexte (Pro, École...) et Compétences.
 */

// Variables d'état pour mémoriser les sélections
let activeCtx = 'all';
let activeComp = 'all';

/**
 * Fonction principale appelée par les boutons HTML (onclick)
 */
function filterMissions(type, value, btn) {
    // 1. Mise à jour de l'interface utilisateur (boutons)
    // On sélectionne le groupe de boutons concerné (Contexte ou Compétences)
    const btnClass = (type === 'ctx') ? '.ctx-btn' : '.comp-btn';
    
    // On retire la classe 'active' de tous les boutons du groupe
    document.querySelectorAll(btnClass).forEach(b => {
        b.classList.remove('active');
    });

    // On ajoute la classe 'active' au bouton sur lequel on a cliqué
    if (btn) {
        btn.classList.add('active');
    }

    // 2. Mise à jour des filtres actifs
    if (type === 'ctx') {
        activeCtx = value.toLowerCase();
    } else {
        activeComp = value.toLowerCase();
    }

    // 3. Filtrage des projets
    // On récupère toutes les cartes de projets qui doivent avoir la classe 'project-item'
    const projects = document.querySelectorAll('.project-item');

    projects.forEach(project => {
        // Récupération des données de la carte (data-context et data-comp)
        const projectCtx = (project.getAttribute('data-context') || "").toLowerCase();
        const projectComp = (project.getAttribute('data-comp') || "").toLowerCase();

        // Vérification de la correspondance (Logique : ET)
        const matchCtx = (activeCtx === 'all' || projectCtx.includes(activeCtx));
        const matchComp = (activeComp === 'all' || projectComp.includes(activeComp));

        // Affichage ou masquage avec une petite transition fluide
        if (matchCtx && matchComp) {
            project.style.display = "block";
            // On utilise un petit timeout pour permettre à l'animation CSS de se déclencher
            setTimeout(() => {
                project.style.opacity = "1";
                project.style.transform = "scale(1)";
            }, 10);
        } else {
            project.style.opacity = "0";
            project.style.transform = "scale(0.95)";
            // On attend la fin de la transition (300ms) avant de mettre en display: none
            setTimeout(() => {
                if (project.style.opacity === "0") {
                    project.style.display = "none";
                }
            }, 300);
        }
    });
}

/**
 * Initialisation au chargement de la page
 */
window.addEventListener('DOMContentLoaded', () => {
    console.log("Système de filtrage prêt.");
    
    // Vérification du nombre de projets trouvés
    const count = document.querySelectorAll('.project-item').length;
    if (count === 0) {
        console.error("ERREUR : Aucune carte avec la classe 'project-item' n'a été trouvée dans le HTML.");
    } else {
        console.log(count + " projets détectés.");
    }

    // On s'assure que les boutons sont bien cliquables au niveau du curseur
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.style.cursor = 'pointer';
    });
});
