const grid = document.getElementById('characterGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

async function fetchCharacters(name = "") {
    try {
        const url = name 
            ? `https://rickandmortyapi.com/api/character/?name=${name}`
            : 'https://rickandmortyapi.com/api/character/[1,2,3,4,5,6,7]';

        const response = await fetch(url);
        const data = await response.json();
        
        // Manejo de respuesta: la API devuelve .results en búsquedas
        const characters = data.results ? data.results : data;
        renderCards(Array.isArray(characters) ? characters : [characters]);
    } catch (error) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center;">No se encontraron resultados.</p>`;
    }
}

function renderCards(list) {
    grid.innerHTML = '';
    const fragment = document.createDocumentFragment(); // NODO TEMPORAL EN MEMORIA

    // Limitamos a los requerimientos del layout (ej. mostrar primeros 7)
    list.slice(0, 7).forEach(char => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}" loading="lazy">
            <p>${char.name}</p>
        `;
        card.onclick = () => window.location.href = `detail.html?id=${char.id}`;
        fragment.appendChild(card); // Agregamos al fragmento, NO al DOM todavía
    });

    grid.appendChild(fragment); // Una sola inserción física al DOM = Máximo rendimiento
}

searchBtn.addEventListener('click', () => {
    fetchCharacters(searchInput.value.trim());
});

// Soporte para tecla Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchCharacters(searchInput.value.trim());
});

if(grid) fetchCharacters();