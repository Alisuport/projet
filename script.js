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
document.addEventListener('DOMContentLoaded', () => {
    const segmentBtns = document.querySelectorAll('.filter-btn');
    const categoryBtns = document.querySelectorAll('.cat-btn');
    const projects = document.querySelectorAll('.project-item');

    let activeSegment = 'all';
    let selectedCats = [];

    function applyFilters() {
        projects.forEach(project => {
            const pSegments = project.dataset.segment.split(' ');
            const pCats = project.dataset.categories.split(' ');

            const matchSegment = (activeSegment === 'all' || pSegments.includes(activeSegment));
            const matchCat = (selectedCats.length === 0 || selectedCats.some(c => pCats.includes(c)));

            project.style.display = (matchSegment && matchCat) ? 'flex' : 'none';
        });
    }

    // Clic sur Segmentation
    segmentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            segmentBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeSegment = btn.dataset.segment;
            applyFilters();
        });
    });

    // Clic sur Catégories (Multi-sélection)
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            const cat = btn.dataset.cat;
            
            if (btn.classList.contains('selected')) {
                selectedCats.push(cat);
            } else {
                selectedCats = selectedCats.filter(c => c !== cat);
            }
            applyFilters();
        });
    });
});
</script>
document.addEventListener('DOMContentLoaded', () => {
    // On récupère les boutons grâce à tes classes
    const segmentBtns = document.querySelectorAll('.filter-btn');
    const categoryBtns = document.querySelectorAll('.cat-btn');
    
    // On récupère toutes les cartes de projets
    const projects = document.querySelectorAll('.project-item');

    let activeSegment = 'all';
    let selectedCats = [];

    // Fonction qui met à jour l'affichage
    function applyFilters() {
        projects.forEach(project => {
            // Sécurité : au cas où un attribut serait vide
            const segmentData = project.dataset.segment || "";
            const catData = project.dataset.categories || "";

            const pSegments = segmentData.split(' ');
            const pCats = catData.split(' ');

            // Vérifications
            const matchSegment = (activeSegment === 'all' || pSegments.includes(activeSegment));
            const matchCat = (selectedCats.length === 0 || selectedCats.some(c => pCats.includes(c)));

            // Affichage ou masquage de la carte
            if (matchSegment && matchCat) {
                project.style.display = 'flex'; // ou 'block' selon comment tes cartes sont codées
            } else {
                project.style.display = 'none';
            }
        });
    }

    // Gestion du clic sur les boutons de SEGMENTATION
    segmentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // On retire la classe 'active' de tous les boutons
            segmentBtns.forEach(b => b.classList.remove('active'));
            // On l'ajoute à celui cliqué
            btn.classList.add('active');
            // On met à jour le filtre
            activeSegment = btn.dataset.segment;
            applyFilters();
        });
    });

    // Gestion du clic sur les boutons de CATÉGORIES
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // On ajoute ou on enlève la classe 'selected'
            btn.classList.toggle('selected');
            const cat = btn.dataset.cat;
            
            // On ajoute ou on retire la catégorie de notre tableau de recherche
            if (btn.classList.contains('selected')) {
                selectedCats.push(cat);
            } else {
                selectedCats = selectedCats.filter(c => c !== cat);
            }
            applyFilters();
        });
    });
});
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn') || e.target.classList.contains('cat-btn')) {
        alert('Le bouton a été cliqué !');
        e.target.style.backgroundColor = "red"; // Change la couleur en rouge pour tester
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const segmentBtns = document.querySelectorAll('.filter-btn');
    const categoryBtns = document.querySelectorAll('.cat-btn');
    const projects = document.querySelectorAll('.project-item');

    let activeSegment = 'all';
    let selectedCats = [];

    function applyFilters() {
        projects.forEach(project => {
            const pSegments = (project.dataset.segment || "").split(' ');
            const pCats = (project.dataset.categories || "").split(' ');

            const matchSegment = (activeSegment === 'all' || pSegments.includes(activeSegment));
            const matchCat = (selectedCats.length === 0 || selectedCats.some(c => pCats.includes(c)));

            // Animation de transition simple
            if (matchSegment && matchCat) {
                project.style.display = 'flex';
                setTimeout(() => { project.style.opacity = '1'; }, 10);
            } else {
                project.style.opacity = '0';
                project.style.display = 'none';
            }
        });
    }

    // Gestion Segmentation (Choix unique)
    segmentBtns.forEach(btn => {
        btn.style.cursor = 'pointer'; // Force le curseur
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            segmentBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeSegment = btn.dataset.segment;
            applyFilters();
        });
    });

    // Gestion Catégories (Multi-sélection)
    categoryBtns.forEach(btn => {
        btn.style.cursor = 'pointer'; // Force le curseur
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('selected');
            const cat = btn.dataset.cat;
            
            if (btn.classList.contains('selected')) {
                selectedCats.push(cat);
            } else {
                selectedCats = selectedCats.filter(c => c !== cat);
            }
            applyFilters();
        });
    });
});
</script>
