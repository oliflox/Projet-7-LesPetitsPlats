import { SearchContainer } from "../components/SearchContainer.js";
import RecipeCard from "../components/RecipeCard.js";
import SearchAlgo from "../components/SearchAlgo.js";
import Filter from "../components/Filter.js";
import ActiveFilter from "../components/ActiveFilter.js";

export const displayPages = () => {
  const filteredRecipes = SearchAlgo.filterRecipesBySearch();
  const app = document.querySelector("#app");


  app.innerHTML = `
        ${SearchContainer()}
        <section class="recipeSection">
            ${Filter.render(filteredRecipes)}
            ${ActiveFilter.render()}
            <div class="recipeGrid">
            ${filteredRecipes
      .map((recipe) => RecipeCard.render(recipe))
      .join("")}
            </div>
        </section>`;

  Filter.selectedFilter();
};

(async () => {
  displayPages();
})();

export default {
  displayPages,
};
