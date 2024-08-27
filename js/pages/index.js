import { SearchContainer } from "../components/SearchContainer.js";
import RecipeCard from "../components/RecipeCard.js";
import SearchAlgo from "../components/SearchAlgo.js";
import Filter from "../components/Filter.js";



export const displayPages = () => {
  const filteredRecipes = SearchAlgo.filterRecipesBySearch();
  const app = document.querySelector("#app");

  app.innerHTML = `
        ${SearchContainer()}
        <section class="recipeSection">
            ${Filter.render(filteredRecipes)}
            <div class="recipeGrid">
            ${filteredRecipes
              .map((recipe) => RecipeCard.render(recipe))
              .join("")}
            </div>
        </section>`;
};

(async () => {
  displayPages();
})();

export default {
  displayPages,
};
