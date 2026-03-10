<script>
document.addEventListener('DOMContentLoaded', () => {
    const segmentBtns = document.querySelectorAll('.filter-btn');
    const categoryBtns = document.querySelectorAll('.cat-btn');
    const projects = document.querySelectorAll('.project-item');

    let activeSegment = 'all';
    let selectedCategories = [];

    const filter = () => {
        projects.forEach(card => {
            const cardSegments = card.dataset.segment.split(' ');
            const cardCats = card.dataset.categories.split(' ');

            const matchSegment = (activeSegment === 'all' || cardSegments.includes(activeSegment));
            const matchCategory = (selectedCategories.length === 0 || selectedCategories.some(c => cardCats.includes(c)));

            card.style.display = (matchSegment && matchCategory) ? 'flex' : 'none';
        });
    };

    segmentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            segmentBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeSegment = btn.dataset.segment;
            filter();
        });
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            const cat = btn.dataset.cat;
            if(btn.classList.contains('selected')) {
                selectedCategories.push(cat);
            } else {
                selectedCategories = selectedCategories.filter(c => c !== cat);
            }
            filter();
        });
    });
});
// On initialise les filtres par défaut
let activeCtx = 'all';
let activeComp = 'all';

function filterMissions(type, value, btn) {
    // 1. Mise à jour de l'état des boutons (UI)
    const btnClass = type === 'ctx' ? '.ctx-btn' : '.comp-btn';
    document.querySelectorAll(btnClass).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 2. Mise à jour de la variable globale correspondante
    if (type === 'ctx') activeCtx = value;
    if (type === 'comp') activeComp = value;

    // 3. Logique de filtrage des cartes
    const projects = document.querySelectorAll('.project-item');
    
    projects.forEach(project => {
        // On récupère les tags de la carte (ex: "pro e6" ou "patrimoine incident")
        const projectCtx = project.getAttribute('data-context') || "";
        const projectComp = project.getAttribute('data-comp') || "";

        // Vérification du contexte (PRO/ECOLE/E6...)
        const matchCtx = (activeCtx === 'all' || projectCtx.includes(activeCtx));
        
        // Vérification de la compétence (PATRIMOINE/INCIDENT...)
        const matchComp = (activeComp === 'all' || projectComp.includes(activeComp));

        // Affichage si les deux conditions sont vraies
        if (matchCtx && matchComp) {
            project.style.display = "block";
            project.style.opacity = "1";
        } else {
            project.style.display = "none";
            project.style.opacity = "0";
        }
    });
}
</script>
