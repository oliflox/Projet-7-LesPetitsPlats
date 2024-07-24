const filter = (id, buttonText, options) => {
    const optionsHTML = options.map(option => `<li class="dropdown-item" data-value="${option}">${option}</li>`).join('');
    return `
        <div class="dropdown" id="${id}">
            <button class="dropdown-button">
                ${buttonText}
                <i class="fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu hidden">
                <input type="text" class="dropdown-search" placeholder="Search...">
                <ul class="selected-items"></ul>
                ${optionsHTML}
            </ul>
        </div>
    `;
};

document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const searchInput = dropdown.querySelector('.dropdown-search');
        const items = dropdown.querySelectorAll('.dropdown-item');
        
        if (searchInput && items.length > 0) {
            searchInput.addEventListener('input', function() {
                const filter = this.value.toLowerCase();
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(filter) ? '' : 'none';
                });
            });
        }
    });
});

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

export const customSelectEvent = () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    const selectedItemsContainer = document.getElementById('selectedItemsContainer');

    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-button');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = dropdown.querySelectorAll('.dropdown-item');
        const selectedItemsList = dropdown.querySelector('.selected-items');
        const dropdownId = dropdown.id;

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('show');
            updateArrow(button, menu.classList.contains('show'));
        });

        items.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.getAttribute('data-value');
                const url = new URL(window.location);
                const currentValues = new Set(url.searchParams.get(dropdownId)?.split(',') || []);
                
                if (currentValues.has(value)) {
                    currentValues.delete(value);
                } else {
                    currentValues.add(value);
                }

                if (currentValues.size > 0) {
                    url.searchParams.set(dropdownId, Array.from(currentValues).join(','));
                } else {
                    url.searchParams.delete(dropdownId);
                }

                window.history.pushState({}, '', url);
                updateSelectedItems();
                updateDropdownItems(dropdown);
            });
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                menu.classList.remove('show');
                updateArrow(button, false);
            }
        });
    });

    const updateArrow = (button, isOpen) => {
        const arrow = button.querySelector('i');
        arrow.classList.toggle('fa-angle-down', !isOpen);
        arrow.classList.toggle('fa-angle-up', isOpen);
    };

    const updateSelectedItems = () => {
        const url = new URL(window.location);
        selectedItemsContainer.innerHTML = '';

        dropdowns.forEach(dropdown => {
            const dropdownId = dropdown.id;
            const selectedItemsList = dropdown.querySelector('.selected-items');
            selectedItemsList.innerHTML = '';

            const values = url.searchParams.get(dropdownId)?.split(',') || [];
            values.forEach(val => {
                const item = document.createElement('li');
                item.className = 'selected-item';
                item.textContent = val;

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.innerHTML = '&times;';
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    removeSelectedItem(dropdownId, val);
                    updateDropdownItems(dropdown);
                });

                item.appendChild(removeBtn);
                selectedItemsList.appendChild(item);
                selectedItemsContainer.appendChild(item.cloneNode(true));
            });
        });

        selectedItemsContainer.querySelectorAll('.selected-item .remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = btn.parentNode.textContent.trim();
                const dropdownId = Object.keys(Object.fromEntries(url.searchParams)).find(id => {
                    return url.searchParams.get(id)?.split(',').includes(value);
                });
                if (dropdownId) {
                    removeSelectedItem(dropdownId, value);
                    const dropdown = document.getElementById(dropdownId);
                    updateDropdownItems(dropdown);
                }
            });
        });
    };

    const removeSelectedItem = (dropdownId, value) => {
        const url = new URL(window.location);
        const values = url.searchParams.get(dropdownId)?.split(',') || [];
        const newValues = values.filter(val => val !== value);

        if (newValues.length > 0) {
            url.searchParams.set(dropdownId, newValues.join(','));
        } else {
            url.searchParams.delete(dropdownId);
        }

        window.history.pushState({}, '', url);
        updateSelectedItems();
    };

    const updateDropdownItems = (dropdown) => {
        const dropdownId = dropdown.id;
        const url = new URL(window.location);
        const selectedValues = url.searchParams.get(dropdownId)?.split(',') || [];

        const items = dropdown.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            const value = item.getAttribute('data-value');
            item.classList.toggle('selected', selectedValues.includes(value));
        });
    };

    updateSelectedItems();
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

export const event = () => {
    customSelectEvent();
};

export default {
    render,
    event,
};
