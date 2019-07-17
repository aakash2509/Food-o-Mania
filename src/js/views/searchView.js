import {elements} from './base.js';

export const getInput = () => elements.searchInput.value; 

//for clearing the imputs after search

export const clearInput = () => {
    elements.searchInput.value='';
    //sets the value of input as blank
};

export const clearResults = ()=> {
    elements.searchResList.innerHTML='' //to clear the recipes on the ui
    elements.searchResPages.innerHTML='' //to clear the prev and next buttons

};

export const highlightSelected = (id)=>{
    //selects all the items which have class results__link
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    //removes the initial active classes from all of the selected items so that 
    //after we add the active class to new selected item, the highlighted item
    //must only be one and not the previous items 
    resultsArr.forEach((el)=>{
        el.classList.remove('results__link--active');
    })
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}

//function to shorten the titles of the displayed recipes

export const limitRecipeTitle = (title, limit=17) => { //17 is the default parameter
    const newTitle = []; //an empty array to store the shorten title words
    //if the length is > limit i.e 17 then shorten it else not
    if(title.length>limit){
        //splits the whole title from spaces and then store them in the array 
        //if the new length till that word is still  < limit
        title.split(' ').reduce((acc,cur)=>{

            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length; 
            //returns the new length back to the function(loop)
            //as the new current length after adding the word in the array
        
        }, 0); //initial length of the current element must  be 0

        return `${newTitle.join(' ')} ...`
        //joins the words of the array together and then returns it
        //This will be the shorten title of the recipes
    }
    return title;
}


//for showing the results  in the UI
 
//this func wil recieve only one recipe to show on UI
const renderRecipe = (recipe) =>{
    const markup =`
         <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

     elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

//type identifies which page button to be displayed prev or next
const createButton =(page,type)=>`
                <button class="btn-inline results__btn--${type}" data-goto=${type==='prev'?page-1:page+1}>
                <span>Page ${type==='prev'? page-1 : page+1}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type==='prev'? 'left' : 'right'}"></use>
                </svg>
                </button>     
        `;


//to render or show the page buttons in the UI
const renderButtons= (page,numResults,resPerPage)=>{
    //to calc the total no of pages required for storing the total results
    const pages=Math.ceil(numResults/resPerPage);

    let button;
    //if we are on the 1st page
    if(page===1&&pages>1){
        //render only the next page button
        button= createButton(page,'next');
    }
    else if(page<pages){
        //render both prev nd next page button
        button= `${createButton(page,'prev')}
                 ${createButton(page,'next')}
                 `;
    }
    //if we are on the last page
    else if(page===pages &&pages>1){
        //render only the prev page button
        button= createButton(page,'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin',button);

};

export const renderResults = (recipes, page= 1,resPerPage=10) => {
    const start= (page-1)*resPerPage;
    const end=page*resPerPage;
    //for looping over the array of 30 recipes got from the api
    recipes.slice(start,end).forEach(renderRecipe);
//calls the renderrecipe func for each recipe to display it in UI

//render the buttons on dom after the results
    renderButtons(page,recipes.length,resPerPage);
}