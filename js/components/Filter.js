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

function updateURL(selectedValue) {
    const url = new URL(window.location);
    url.searchParams.set('sort', selectedValue);
    window.history.pushState({}, '', url);
}

export const customSelectEvent = () => {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const dropdownButton = dropdown.querySelector(".dropdown-button");
        const dropdownMenu = dropdown.querySelector(".dropdown-menu");
        const dropdownItems = dropdown.querySelectorAll(".dropdown-item");
        const dropdownArrow = dropdownButton.querySelector(".fa");

        dropdownButton.addEventListener("click", () => {
            toggleDropdown(dropdownMenu, dropdownArrow);
        });

        dropdownItems.forEach(item => {
            item.addEventListener("click", (event) => {
                const selectedValue = event.target.getAttribute("data-value");
                updateURL(dropdown.id, selectedValue);
                closeDropdown(dropdownMenu, dropdownArrow);
            });
        });

        window.addEventListener("click", (event) => {
            if (!dropdown.contains(event.target)) {
                closeDropdown(dropdownMenu, dropdownArrow);
            }
        });
    });

    function toggleDropdown(menu, arrow) {
        const isOpen = menu.classList.contains("show");
        menu.classList.toggle("show");
        arrow.classList.toggle("fa-angle-down", !isOpen);
        arrow.classList.toggle("fa-angle-up", isOpen);
    }

    function closeDropdown(menu, arrow) {
        menu.classList.remove("show");
        arrow.classList.add("fa-angle-down");
        arrow.classList.remove("fa-angle-up");
    }

    function updateURL(filter, value) {
        const url = new URL(window.location);
        url.searchParams.set(filter, value);
        window.history.pushState({}, '', url);
    }
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
    `;
};

export const event = () => {
    customSelectEvent();
}

export default {
    render,
    event
};