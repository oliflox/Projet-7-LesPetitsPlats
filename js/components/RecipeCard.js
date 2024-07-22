function truncateByWords(str, maxWords) {
    const words = str.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + "..." : str;
}

export const render = (recipes) => {
    const {image, name, ingredients, description} = recipes;
    const truncatedDescription = truncateByWords(description, 30);
    const ingredientsHtml = ingredients.map(({ingredient, quantity = '', unit = ''}) => `
        <div>
            <p>${ingredient}</p>
            <p class="recipeCardIngredientsQuantity">${quantity} ${unit}</p>
        </div>
    `).join('');
    
    return `
        <div class="recipeCard">
            <img class="recipeCardImage" src="../assets/recipies/${image}" alt="${name}">
            <div class="recipeCardContent">
                <h3 class="recipeCardTitle">${name}</h3>
                <div>
                    <div>
                        <h4 class="recipeCardDetailsTitle">recette</h4>
                        <p class="recipeCardDetailsSteps">${truncatedDescription}</p>
                    </div>
                    <div>
                        <h4 class="recipeCardDetailsTitle">Ingrédients</h4>
                        <div class="recipeCardDetailsGrid">
                            ${ingredientsHtml}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export default { render };