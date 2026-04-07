const grid = document.getElementById('characterGrid');

// Fetch de 7 personajes para cumplir la regla de 5 en primera fila y 2 en segunda (layout alargado)
async function fetchCharacters() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character/[1,2,3,4,5,6,7]');
        const data = await response.json();
        renderCards(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderCards(characters) {
    grid.innerHTML = '';
    characters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}">
            <p>${char.name}</p>
        `;
        card.addEventListener('click', () => {
            window.location.href = `detail.html?id=${char.id}`;
        });
        grid.appendChild(card);
    });
}

if(grid) fetchCharacters();