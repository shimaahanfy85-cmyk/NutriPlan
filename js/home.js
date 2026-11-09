import MealServices from "./mealServices.js";
import "./productScanner.js";

// Dom elements
  const nav_links = document.querySelectorAll(".nav-link");
  const meals_sections = document.querySelectorAll(
  "#search-filters-section, #meal-categories-section, #all-recipes-section, #meal-details"
);

const scanner_section = document.querySelector("#products-section");
const foodlog_section = document.querySelector("#foodlog-section");

 const recipes_container=document.querySelector("#recipes-grid");
 const meal_categories_section=document.querySelector("#meal-categories-section");
 const search_filters_section=document.querySelector("#search-filters-section");

 const all_recipes_section=document.querySelector("#all-recipes-section");
 const search_input=document.querySelector("#search-input");
 const categories_container=document.querySelector("#categories-grid");
 const areas_container=document.querySelector("#areas-list");
 const div_areas_container=document.querySelector("#areas-container");
 const meal_details=document.querySelector("#meal-details");
 const allRecipes_btn=document.querySelector("[data-all-areas]");
 const meal_title=document.querySelector("#meal-title");
 const meal_hero=document.querySelector("#meal-hero");
 const ingredients_container=document.querySelector("#ingredients-container");
 const instructions_container=document.querySelector("#instructions-container");
 const meal_video=document.querySelector("#meal-video");
 const nutrition_facts_container=document.querySelector("#nutrition-facts-container");
 const nutrition_calories=document.querySelector("#nutrition-calories");
 const nutrition_proten=document.querySelector("#nutrition-protein");
 const nutrition_fiber=document.querySelector("#nutrition-fiber");
 const nutrition_carbs=document.querySelector("#nutrition-carbs");
 const nutrition_fat=document.querySelector("#nutrition-fat");
 const nutrition_sugar=document.querySelector("#nutrition-sugar");
 const total_calories=document.querySelector("#total_calories");
 const back_to_meals_btn=document.querySelector("#back-to-meals-btn");
//  //////////////////////////////////////////////////////////////
const log_meal_btn=document.querySelector("#log-meal-btn")
const logged_items_list=document.querySelector("#logged-items-list")

nav_links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const selected_page = link.dataset.page;
    meals_sections.forEach((section) => {
  section.classList.add("hidden");
});

scanner_section.classList.add("hidden");
foodlog_section.classList.add("hidden");
if (selected_page === "meals") {
  meals_sections.forEach((section) => {
    section.classList.remove("hidden");
  });
}
else if (selected_page === "scanner") {
  scanner_section.classList.remove("hidden");
}
else if (selected_page === "foodlog") {
  foodlog_section.classList.remove("hidden");
}

  });
});


const logged_meals=JSON.parse(localStorage.getItem("loggedMeals"))||[];

function displayLoggedMeals(){
  const meals_cards = logged_meals.map((meal, index) => {
  return `
    <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4">
      <div class="flex items-center gap-4">
        <img
          src="${meal.thumbnail}"
          alt="${meal.name}"
          class="w-14 h-14 rounded-xl object-cover"
        />
        <div>
          <p class="font-semibold text-gray-900">${meal.name}</p>
          <p class="text-sm text-gray-500">1 serving</p>
        </div>
      </div>
    </div>
  `;
});
logged_items_list.innerHTML = meals_cards.join("");
}
displayLoggedMeals();
console.log(JSON.parse(localStorage.getItem("loggedMeals")));


//  object
const mealService=new MealServices();

  back_to_meals_btn.addEventListener("click",()=>{
  all_recipes_section.classList.remove("hidden")
  categories_container.classList.remove("hidden")
  search_input.classList.remove("hidden")
  areas_container.classList.remove("hidden");
  meal_categories_section.classList.remove("hidden");
  search_filters_section.classList.remove("hidden");
  meal_details.classList.add("hidden")
  
})
// loggggggggggggggggggggggg
let current_meal = null;


// recipe details===============================
recipes_container.addEventListener("click",async(e)=>{
  const recipe_card=e.target.closest(".recipe-card")
  if(!recipe_card){
    return;
  }
  const recipe_id=recipe_card.dataset.mealId;
  const data =await mealService.getMealById(recipe_id);
  const mealDetails=data.result;
  current_meal=mealDetails
  // ------------------------------------------------
  log_meal_btn.dataset.mealId=mealDetails.id
  

  const ingredients=mealDetails.ingredients.map((item)=>{
    return`${item.measure}${item.ingredient}`
  })
  try{
  const nutritionData=await mealService.Analyze_recipe_nutrition(mealDetails.name,ingredients);

   if (nutritionData?.success) {
    const perServing=nutritionData.data.perServing;
    nutrition_calories.textContent=perServing.calories
    nutrition_fat.textContent=perServing.fat+"g"
    nutrition_proten.textContent=perServing.protein+"g"
    nutrition_fiber.textContent=perServing.fiber+"g"
    nutrition_sugar.textContent=perServing.sugar+"g"
    nutrition_carbs.textContent=perServing.carbs+"g"
    total_calories.textContent=`Total: ${nutritionData.data.totals.calories} cal`
   }
  }catch (error) {
  console.error("Nutrition analysis failed:", error);
}


// video
  const videoid=mealDetails.youtube.split("v=")[1]
  const embedlink=`https://www.youtube.com/embed/${videoid}`
  meal_video.src=embedlink;

  //Instructions =========================================================
  const Instructions_cards = mealDetails.instructions.map((Instructions,index) => {
  return ` <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                     ${index+1}
                    </div>
                   <p class="text-gray-700 leading-relaxed pt-2">
                      ${Instructions}.
                    </p>
                  </div>
  `;
  });
  const instructions= Instructions_cards.join("")
  instructions_container.innerHTML=instructions

// ingredients========================================================
  const ingredients_cards = mealDetails.ingredients.map((ingredient) => {
  return ` <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${ingredient.measure}</span> ${ingredient.ingredient}
                    </span>
                  </div>

  `;
  });
const cards= ingredients_cards.join("")
ingredients_container.innerHTML=cards

// *********************************
  all_recipes_section.classList.add("hidden")
  categories_container.classList.add("hidden")
  search_input.classList.add("hidden")
  div_areas_container.classList.add("hidden")
  meal_categories_section.classList.add("hidden")
  search_filters_section.classList.add("hidden")
  meal_details.classList.remove("hidden")
  const meal_tags=mealDetails.tags.map((tag)=>{
    return`<span
                    class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
                    >${tag}</span>`
  })
  const tagsHTML=meal_tags.join("")
  meal_hero.innerHTML=`<div class="relative h-80 md:h-96">
              <img
                src="${mealDetails.thumbnail}"
                alt="${mealDetails.name}"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${mealDetails.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${mealDetails.area}</span
                  >
                  ${tagsHTML}
                  
                </div>
                <h1 id="meal-title" class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${mealDetails.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">485 cal/serving</span>
                  </span>
                </div>
              </div>
            </div>`
 
  
 })

 log_meal_btn.addEventListener("click",()=>{
    const meal_id=log_meal_btn.dataset.mealId;
    logged_meals.push(current_meal)
    localStorage.setItem("loggedMeals",JSON.stringify(logged_meals))
    displayLoggedMeals()
  
    
    
})

// display 25 meals======================================
let originalMeals = [];
const meals=await mealService.getRandomMeals();
originalMeals = meals.results;


 const mealsResults=meals.results;

 const cards=mealsResults.map((meal) =>{
    return `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meal.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meal.thumbnail}"
                  alt="${meal.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meal.area}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meal.category}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meal.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  Delicious recipe to try!
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meal.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meal.area}
                  </span>
                </div>
              </div>
            </div>
    `
}
)
recipes_container.innerHTML=cards.join("")

// display search========================================
search_input.addEventListener("input", async()=>{
    const searchTerm =search_input.value
    const data= await mealService.searchMeals(searchTerm);
    const searchMeals=data.results;
    const cards=searchMeals.map((meal)=>{
         return `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meal.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meal.thumbnail}"
                  alt="${meal.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meal.area}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meal.category}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meal.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  Delicious recipe to try!
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meal.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meal.area}
                  </span>
                </div>
              </div>
            </div>
    `
    
    }
    )
    recipes_container.innerHTML=cards.join("")

    
})

// display categories=======================================
const Categories= await mealService.getAllCategories();
const categoriesResults=Categories.results
const categories_cards=categoriesResults.map((category)=>{
    return` <div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${category.name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
                </div>
              </div>
            </div>`
}
)
categories_container.innerHTML=categories_cards.join("")

// filter meals==================================================
categories_container.addEventListener("click",async(e)=>{
    const category_card= e.target.closest(".category-card")
    if(!category_card){
        return;
    }
    const category=category_card.dataset.category;
    const data= await mealService.filterMeals("category",category);
    const categories_results=data.results;
    const categories_filter_cards= categories_results.map((meal)=>{
         return `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meal.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meal.thumbnail}"
                  alt="${meal.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meal.area}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meal.category}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meal.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  Delicious recipe to try!
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meal.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meal.area}
                  </span>
                </div>
              </div>
            </div>
    `

}
)
recipes_container.innerHTML=categories_filter_cards.join("")
    
})

//display Areas==================================================
const Areas=await mealService.getAllAreas();
const data=Areas.results;
const area_cards= data.map((area)=>{
    return`<button
              data-area="${area.name}"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >
              ${area.name}
            </button>`
})
areas_container.innerHTML=area_cards.join("")

// filter meals[Area]==================================================
div_areas_container.addEventListener("click",async(e)=>{
    const area_btn= e.target.closest("[data-area]")
    if(!area_btn){
        return;
    }
    const area=area_btn.dataset.area;
    const data= await mealService.filterMeals("area",area);
    const area_results=data.results;
    const area_filter_cards= area_results.map((meal)=>{
         return `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meal.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meal.thumbnail}"
                  alt="${meal.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meal.area}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meal.category}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meal.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  Delicious recipe to try!
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meal.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meal.area}
                  </span>
                </div>
              </div>
            </div>
    `

}
)
recipes_container.innerHTML=area_filter_cards.join("")
    
})
// =================
allRecipes_btn.addEventListener("click",()=>{
 const mealsResults=originalMeals;;
 const cards=mealsResults.map((meal) =>{
    return `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meal.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meal.thumbnail}"
                  alt="${meal.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meal.area}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meal.category}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meal.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  Delicious recipe to try!
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meal.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meal.area}
                  </span>
                </div>
              </div>
            </div>
    `
}
)
recipes_container.innerHTML=cards.join("")

})









