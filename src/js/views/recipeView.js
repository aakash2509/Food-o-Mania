import {elements} from './base.js';
import {Fraction} from 'fractional';


//clears the previous recipe which is displayed on the UI 
//This is only called when we wanna display another recipe
export const clearRecipe = () =>{
    elements.recipe.innerHTML =''
};

//for converting the decimals into fraction
const formatCount = (count) => {
    if(count) {
        //Eg: 2.5 will be -> 2 1/2  0.5 ->  1/2 etc
        const newCount = Math.round(count* 10000) /10000;
        //first converts the number into string
        //then extract the decimal and integer part by splitting from '.'
        //the since it will be stored in an array as string, convert both the 
        //elements in array (which are string) into integers by parseInt 
        const [int,dec]=newCount.toString().split('.').map((el)=> parseInt(el,10));

        if(!dec) //eg: if 4 then int=4 dec= none then return 4
        return newCount;

        if(int ===0) //eg: if count =0.5 0.8 etc
        {
            const fr = new Fraction(newCount); //from the library fractional
            return `${fr.numerator}/${fr.denominator}`;
        } 
        else
         {// Eg: 2.5 cup = 2 +0.5 must be shown as 2 1/2 cup
             const fr = new Fraction(newCount-int) //so frac(2.5-2)
             return ` ${int} ${fr.numerator}/${fr.denominator}`;
             //           2              1 / 2
        }

    }
    return '?'  //for handling corner cases where number is undefined return '?' to UI
 }


//here the recipe is named as ingredient 
const createIngredient = (ingredient) => ` 
            <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${formatCount(ingredient.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.ingredient}
            </div>
            </li>



        `

export const renderRecipe =(recipe,isLiked) =>{ //takes the recipe as parameter
    const markup =`
        <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg> 
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>
            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">


                ${recipe.ingredients.map( (el)=> createIngredient(el)).join(' ')}

                   
                <button class="btn-small recipe__btn recipe__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.title}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>   

    
    `;
    elements.recipe.insertAdjacentHTML('afterbegin',markup);

    // Above  ${recipe.ingredients.map( (el)=> createIngredient(el)).join(' ')}
    //returns an array of the total ingredients from 1 to n which are then joined from the spaces 
//to make them show together in the UI

};


//update the ingredients in the UI

export const updateServingsIngredients = recipe => {

    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    //select all the ingredients of recipe and form an array of the list of those items
    const countElements =Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el,index)=>{ //for each element at index
   // replace the count of the ingredient by the new calculated count
    el.textContent = formatCount(recipe.ingredients[index].count);
});
} ;