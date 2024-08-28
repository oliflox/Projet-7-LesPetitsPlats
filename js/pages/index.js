import { SearchContainer } from "../components/SearchContainer.js";
import { getURLParams } from "../utils/getUrlParams.js";
import RecipeCard from "../components/RecipeCard.js";
import SearchAlgo from "../components/SearchAlgo.js";
import Filter from "../components/Filter.js";
import ActiveFilter from "../components/ActiveFilter.js";



export const displayPages = () => {
  const filteredRecipes = SearchAlgo.filterRecipesBySearch();
  const app = document.querySelector("#app");

  const params = getURLParams();

  console.log(params);

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
};

(async () => {
  displayPages();
})();

export default {
  displayPages,
};
