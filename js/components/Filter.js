import { setURLParams } from '../utils/getUrlParams.js';
import ActiveFilter from './ActiveFilter.js';

const filter = (id, buttonText, options) => {
    const optionsHTML = options.map(option => `
        <li class="dropdown-item" data-value="${option}" onclick="selectDropdownItem('${id}', '${option}')">
            ${option}
            <button class="remove-btn hidden">&times;</button>
        </li>
    `).join('');
    return `
        <div class="dropdown" id="${id}">
            <button class="dropdown-button" onclick="OpenDropdown('${id}')">
                ${buttonText}
                <i class="fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu hidden">
                <div class="dropdown-search-container">
                    <input type="text" class="dropdown-search" placeholder="Search..." oninput="filterDropdown('${id}', this.value)">
                    <div class="dropdown-search-icon">
                        <button class="clear-btn" onclick="clearSearchInputFilter('${id}')">&times;</button>
                        <i class="fa fa-search search-icon"></i>
                    </div>
                </div>
                ${optionsHTML}
            </ul>
        </div>
    `;
};

const ingredients = (recipes) => {
    const uniqueIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
    return filter("ingredients", "Ingrédients", uniqueIngredients);
};

const ustensiles = (recipes) => {
    const uniqueUstensiles = [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())))];
    return filter("ustensiles", "Ustensiles", uniqueUstensiles);
};

const appareils = (recipes) => {
    const appliances = [...new Set(recipes.map(recipe => recipe.appliance.toLowerCase()))];
    return filter("appareils", "Appareils", appliances);
};

window.OpenDropdown = (dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    const menu = dropdown.querySelector('.dropdown-menu');
    menu.classList.toggle('hidden');
};

window.filterDropdown = (dropdownId, query) => {
    const dropdown = document.getElementById(dropdownId);
    const items = dropdown.querySelectorAll('.dropdown-item');
    const filter = query.toLowerCase();

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? '' : 'none';
    });
};

window.clearSearchInputFilter = (dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    const searchInput = dropdown.querySelector('.dropdown-search');
    searchInput.value = '';
    filterDropdown(dropdownId, '');
};

window.selectDropdownItem = (dropdownId, value) => {
    setURLParams(dropdownId, value);
    ActiveFilter.updateSelectedItems();
    const dropdown = document.getElementById(dropdownId);
    ActiveFilter.updateDropdownItems(dropdown);
};


export const render = (recipes) => {
    const length = recipes.length;

    return `
        <div class="recipeHeader">
            <div class="dropdown-container">
                ${ingredients(recipes)}
                ${ustensiles(recipes)}
                ${appareils(recipes)}
            </div>
            <h3 class="filterResult">${length > 0 ? `${length} recettes` : 'Aucune recette trouvée'}</h3>
        </div>
        <div class="selected-items" id="selectedItemsContainer"></div>
    `;
};

export default {
    render,
};
