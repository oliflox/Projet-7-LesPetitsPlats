import { SearchContainer } from "../components/SearchContainer.js";
import RecipeCard from "../components/RecipeCard.js";
import { recipes } from "../data/recipes.js";
import Filter from "../components/Filter.js";

export const displayPages = (recipe) => {
  const app = document.querySelector("#app");

  app.innerHTML = `
        ${SearchContainer()}
        <section class="recipeSection">
            ${Filter.render(recipe)}
            <div class="recipeGrid">
            ${recipe.map((recipes) => RecipeCard.render(recipes)).join("")}
            </div>
        </section>
    `;
};

(async () => {
  displayPages(recipes);
})();

export default {
  displayPages,
};
