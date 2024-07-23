const filter = (id, buttonText, options) => {
    const optionsHTML = options.map(option => `<li class="dropdown-item" data-value="${option}">${option}</li>`).join('');
    return `
        <div class="dropdown" id="${id}">
            <button class="dropdown-button">
                ${buttonText}
                <i class="fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu hidden">
                ${optionsHTML}
            </ul>
        </div>
    `;
};

const ingredients = (recipes) => {
    const uniqueIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredients => ingredients.ingredient.toLowerCase())))];
    return filter("Ingredients", "Ingredients", uniqueIngredients);
};

const Ustensiles = (recipes) => {
    const uniqueUstensiles = [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())))];
    return filter("Ustensiles", "Utensiles", uniqueUstensiles);
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
        const selectedValues = new Set();

        button.addEventListener('click', () => {
            menu.classList.toggle('show');
            updateArrow(button, menu.classList.contains('show'));
        });

        items.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.getAttribute('data-value');
                if (selectedValues.has(value)) {
                    selectedValues.delete(value);
                } else {
                    selectedValues.add(value);
                }
                updateUrl(dropdown.id, Array.from(selectedValues));
                updateSelectedItems();
            });
        });
    });

    const updateArrow = (button, isOpen) => {
        const arrow = button.querySelector('i');
        arrow.classList.toggle('fa-angle-down', !isOpen);
        arrow.classList.toggle('fa-angle-up', isOpen);
    };

    const updateUrl = (dropdownId, selectedOptions) => {
        const url = new URL(window.location);
        url.searchParams.set(dropdownId, selectedOptions.join(','));
        window.history.pushState({}, '', url);
    };

    const updateSelectedItems = () => {
        selectedItemsContainer.innerHTML = '';

        const url = new URL(window.location);
        url.searchParams.forEach((value, key) => {
            const values = value.split(',');
            values.forEach(val => {
                const item = document.createElement('div');
                item.className = 'selected-item';
                item.textContent = val;

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.innerHTML = '&times;';
                removeBtn.addEventListener('click', () => {
                    removeSelectedItem(key, val);
                });

                item.appendChild(removeBtn);
                selectedItemsContainer.appendChild(item);
            });
        });
    };

    const removeSelectedItem = (key, value) => {
        const url = new URL(window.location);
        const values = url.searchParams.get(key).split(',');
        const newValues = values.filter(val => val !== value);
        if (newValues.length > 0) {
            url.searchParams.set(key, newValues.join(','));
        } else {
            url.searchParams.delete(key);
        }
        window.history.pushState({}, '', url);
        updateSelectedItems();
    };

    updateSelectedItems();
}

export const render = (recipes) => {
    const length = recipes.length;

    return `
    <div class="recipeHeader">
        <div class="dropdown-container">
            ${ingredients(recipes)}
            ${Ustensiles(recipes)}
            ${Appareils(recipes)}
        </div>
        <h3>${length > 0 ? `${length} recettes` : 'Aucune recette trouvée'}</h3>
    </div>
     <div class="selected-items" id="selectedItemsContainer"></div>
    `;
};

export const event = () => {
    customSelectEvent();
}

export default {
    render,
    event
};