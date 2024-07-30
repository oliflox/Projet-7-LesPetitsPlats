import { setURLParams, getURLParams } from '../utils/getUrlParams.js';

const filter = (id, buttonText, options) => {
    const optionsHTML = options.map(option => `
        <li class="dropdown-item" data-value="${option}" onclick="selectDropdownItem('${id}', '${option}')">
            ${option}
            <button class="remove-btn hidden" onclick="removeSelectedItem('${id}', '${option}'); event.stopPropagation();">&times;</button>
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
                        <button class="clear-btn" onclick="clearSearchInput('${id}')">&times;</button>
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
    return filter("Ingredients", "Ingrédients", uniqueIngredients);
};

const Ustensiles = (recipes) => {
    const uniqueUstensiles = [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())))];
    return filter("Ustensiles", "Ustensiles", uniqueUstensiles);
};

const Appareils = (recipes) => {
    const appliances = [...new Set(recipes.map(recipe => recipe.appliance.toLowerCase()))];
    return filter("Appareils", "Appareils", appliances);
};

window.OpenDropdown = (dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    const menu = dropdown.querySelector('.dropdown-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('show');
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

window.clearSearchInput = (dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    const searchInput = dropdown.querySelector('.dropdown-search');
    searchInput.value = '';
    filterDropdown(dropdownId, '');
};

window.selectDropdownItem = (dropdownId, value) => {
    setURLParams(dropdownId, value);
    updateSelectedItems();
    const dropdown = document.getElementById(dropdownId);
    updateDropdownItems(dropdown);
};

const updateSelectedItems = () => {
    const params = getURLParams();
    const selectedItemsContainer = document.getElementById('selectedItemsContainer');
    selectedItemsContainer.innerHTML = '';

    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownId = dropdown.id;
        const selectedValues = new Set(params[dropdownId] || []);

        const items = dropdown.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            const value = item.getAttribute('data-value');
            const removeBtn = item.querySelector('.remove-btn');
            if (selectedValues.has(value)) {
                item.classList.add('selected');
                removeBtn.classList.remove('hidden');
                addSelectedItemToContainer(selectedItemsContainer, dropdownId, value);
            } else {
                item.classList.remove('selected');
                removeBtn.classList.add('hidden');
            }
        });
    });
};

const addSelectedItemToContainer = (container, dropdownId, value) => {
    const item = document.createElement('li');
    item.className = 'selected-item filter-tag-items'; 
    item.textContent = value;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '&times;';
    removeBtn.onclick = () => {
        removeSelectedItem(dropdownId, value);
        updateDropdownItems(document.getElementById(dropdownId));
    };

    item.appendChild(removeBtn);
    container.appendChild(item);
};

const removeSelectedItem = (dropdownId, value) => {
    setURLParams(dropdownId, value);
    updateSelectedItems();
};

const updateDropdownItems = (dropdown) => {
    const dropdownId = dropdown.id;
    const params = getURLParams();
    const selectedValues = new Set(params[dropdownId] || []);

    const items = dropdown.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        const value = item.getAttribute('data-value');
        item.classList.toggle('selected', selectedValues.has(value));
    });
};

export const render = (recipes) => {
    const length = recipes.length;

    return `
        <div class="recipeHeader">
            <div class="dropdown-container">
                ${ingredients(recipes)}
                ${Ustensiles(recipes)}
                ${Appareils(recipes)}
            </div>
            <h3 class="filterResult">${length > 0 ? `${length} recettes` : 'Aucune recette trouvée'}</h3>
        </div>
        <div class="selected-items" id="selectedItemsContainer"></div>
    `;
};
export default {
    render,
};






