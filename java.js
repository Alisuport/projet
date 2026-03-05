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
</script>
