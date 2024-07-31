import { setURLParams } from '../utils/getUrlParams.js';
import { displayPages } from '../pages/index.js';

export const SearchContainer = () => {
    return `
    <section class="searchSection">
        <header class="headerLogo">
            <img src="/assets/img/Logo.png" alt="logo">
        </header>
        <h1 class="headerTitle">cherchez parmi plus de 1500 recettes du quotidien, simples et délicieuses</h1>
        <div class="searchInputContainer">
            <input class="headerInput inputElement" id="searchInput" placeholder="rechercher une recette, un ingrédient, ..." type="text" onkeypress="handleKeyPress(event)">
            <i class="fa fa-search searchIcon" onclick="handleSearch()"></i>
        </div>
    </section>
    `;
};

window.handleSearch = () => {
    const query = document.getElementById('searchInput').value;
    setURLParams('search', query, true);
    displayPages();
};

window.handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
};
