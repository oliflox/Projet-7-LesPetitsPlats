const Ingredients = () => {
    return `
        <div class="dropdown" id="ingredients">
            <button class="dropdown-button">
                Select Ingredient
                <i class="fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu hidden">
                <li class="dropdown-item" data-value="Salt">Salt</li>
                <li class="dropdown-item" data-value="Sugar">Sugar</li>
                <li class="dropdown-item" data-value="Flour">Flour</li>
            </ul>
        </div>
    `;

};

const ustensils = () => {
    return `
        <div class="dropdown" id="utensils">
            <button class="dropdown-button">
                Select Utensil
                <i class="fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu hidden">
                <li class="dropdown-item" data-value="Spoon">Spoon</li>
                <li class="dropdown-item" data-value="Fork">Fork</li>
                <li class="dropdown-item" data-value="Knife">Knife</li>
            </ul>
        </div>
    `;
};

const servings = () => {
    return `
        <div class="dropdown" id="servings">
            <button class="dropdown-button">
                Select Servings
                <i class="fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu hidden">
                <li class="dropdown-item" data-value="1">1</li>
                <li class="dropdown-item" data-value="2">2</li>
                <li class="dropdown-item" data-value="3">3</li>
            </ul>
        </div>
    `;
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

    // Initialize selected items on page load
    updateSelectedItems();
}

export const render = (recipes) => {
    const length = recipes.length;

    return `
    <div class="recipeHeader">
        <div class="dropdown-container">
            ${Ingredients()}
            ${ustensils()}
            ${servings()}
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