import { SearchContainer } from "../components/SearchContainer.js";
import RecipeCard from "../components/RecipeCard.js";
import { recipes } from "../data/recipes.js";

const displayPages = (recipe) => {
    const app = document.querySelector("#app");

    app.innerHTML = `
        ${SearchContainer()}
        <div class="recipeGrid">
         ${recipe
              .map((recipes) => RecipeCard.render(recipes))
              .join("")}
        </div>
    `
};

(async () => {

    displayPages(recipes);
})();