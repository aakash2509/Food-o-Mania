import Search from './models/Search.js';
import * as searchView  from './views/searchView' //* imports everything 
import { elements, renderLoader ,clearLoader} from './views/base.js';
import Recipe from './models/Recipe.js';
import List from './models/List.js';
import Likes from './models/Likes.js';
import * as listView  from './views/listView' //* imports everything 
import * as likesView  from './views/likesView'
import * as recipeView  from './views/recipeView' //* imports everything 
//search Controller

/*  Here we store the Global state of the app which contains:
* Search object
* Current recipe object
* Shopping list object
* Liked recipes

*/

const state = {};
window.state=state;  //testing purposes

const controlSearch= async () =>{
    
    //1. Get the query from the view /UI
    const query=searchView.getInput(); 
    //to call the getinput func in searchview.js to get the input from the searchbox
   // console.log(query);

    if(query)  //if there is anything in the searchbox
    {
        state.search = new Search(query); //creates a new search object for fulfilling the query
        //and also stores the new object to the global state 
        
        //3. Prepare the UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //passing the results class as the parent element i.e. where we need the loader to be displayed

        try{
                //4. Search for the recipies
                await state.search.getResults();
                    
                //5. Render the results in UI
                clearLoader(); //first clear the loader and then display the recipe by calling searchView
                searchView.renderResults(state.search.result);
        } catch(err){
            alert('SOmething wrong with the search')
            clearLoader();
        }
       
    }
}

elements.searchForm.addEventListener('submit',(e)=>{

    e.preventDefault(); //for preventing the reloading of the page on the event
    controlSearch();
});

//Event delagation for attaching events to the page buttons
//We attached the evnet to its parent i.e. to resultspages class
elements.searchResPages.addEventListener('click',e=>{
//This will return the closest acestor as the .btn-inline element when we click
//all its neighbouring areas (eg. here : span , svg etc which are its child elemnts)
//so By this we can then attach a method to the whole button such that if the user 
//clicks anywhere in the button i.e on button or svg or span then the same method must
//be performed. i.e. the desired page must be loded  
    const btn = e.target.closest('.btn-inline');
    
    if(btn){
        //by dataset.goto attribute we read the page number from the 
        //goto attribute in the button element Then we should redirect
        //to that particular page i.e page 2 page 5 or page x etc;
        const goToPage = parseInt(btn.dataset.goto,10); //10 means base 10 i.e decimal system
        searchView.clearResults(); //clears the previous page
        searchView.renderResults(state.search.result,goToPage);//shows the desired page on UI
        console.log(goToPage);
    }

});


/**
 * Recipe controller  // As soon as we load a recipe
 */
const controlRecipe = async () =>{
const id= window.location.hash.replace('#',''); //removes the # from the hashid
console.log(id);

if(id){
     
    //if a new request to show recipe then clear the previous recipe on the UI 
    recipeView.clearRecipe();
    //prepare UI changes
    renderLoader(elements.recipe); //here the loader must be displayed on the recipe section
    //Hence we pass the recipe object as the parent i.e. where it must be displayed

    //Highlight the selected search item
    //pass the id of the item which is selected
    
    if(state.search) //if there is an actual search
    searchView.highlightSelected(id); 


    //create new recipe object with the clicked dish id
    state.recipe = new Recipe(id);

    //exposing this recipe to the global i.e. to the window as an object r in the window
   // window.r=state.recipe;  //for only testing purposes
//so if we write 'r' in the console, we'll get the same data as console.log(state.recipe)

    try{
         //Get the recipe data of the id from the API
    await state.recipe.getRecipe();
        console.log(state.recipe.ingredients);
    //calculate the servings and time
    state.recipe.calcTime();
    state.recipe.calcServings();
    state.recipe.parseIngredients();

    //Render the recipe
    clearLoader(); //clears the loader when showing the results
    recipeView.renderRecipe(state.recipe); 
    console.log(state.recipe);
    } catch(err){
        alert('Error processing recipe');
    }
   
}

};


//adds an event listener on the whole window object to monitor the change in the URL
window.addEventListener('hashchange',controlRecipe);
//we have attach the event to load of a page also if it contains the hashid in its URL
window.addEventListener('load',controlRecipe);
//hashchange is the change in the hash part in the URL
//controlrecipe function is called when a change occurs in the hash part of the URL

//LIst Controller 

const controlList = () =>{
    //Create a list if there is none yet
    if(!state.list) //if no list present
    state.list=new List(); //create a new empty list

    //Add each ingredient to the list and then UI
    state.recipe.ingredients.forEach((el)=>{
      const item = state.list.addItem(el.count , el.unit ,el.ingredient);
        listView.renderItem(item);//displays the list in uI
    });
}

//handle , delete and update the list item events
elements.shopping.addEventListener('click', (e)=>{
    //selects the closest element's id to the shopping item from the shopping list 
    const id=e.target.closest('.shopping__item').dataset.itemid;

    //handle the delete button

    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //Delete it from the state
        state.list.deleteItem(id);

        //delete it from the UI
        listView.deleteItem(id);

        //Handle the count update
    } else if(e.target.matches('.shopping__count-value')){
        const val= parseFloat(e.target.value,10);
        state.list.updateCount(id,val);
    }
});

//LIke controller

const controlLike = ()=>{
    if(!state.likes)
    state.likes = new Likes();

    const currentID=state.recipe.id;

    //if recipe isn't liked 
    if(!state.likes.isLiked(currentID)){
        //Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        console.log('item pushed');
        //Toggle the like button
            likesView.toggleLikeBtn(true);

        //Add like to the UI list
        likesView.renderLike(newLike);

        //if recipe is already liked
    } else {
        //Remove the like from the state
        state.likes.deleteLike(currentID);
        console.log(' item deleted');
        //Toggle the like button
        likesView.toggleLikeBtn(false);

        //Remove the like from UI list
        likesView.deleteLike(currentID);

    }
    //to display or hide the liked recipe section up in the header
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

//Restore the liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes(); //creates a new likes object as a page reloads
    state.likes.readStorage(); //restores the liked array from the local storage
    likesView.toggleLikeMenu(state.likes.getNumLikes());//toggle the like menu option

    //render the existing likes which are got back from the local storage
    state.likes.likes.forEach(like => likesView.renderLike(like));
})


//Handling the recipe button clicks
elements.recipe.addEventListener('click', e =>{
 //if the target where the event occurs matches to the btn-decrease class or any of it's child (*)
    
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        //means decrease button is clicked so do this
        if(state.recipe.servings >1){
        state.recipe.updateServings('dec');
        //calling the ui change function with the current state
        recipeView.updateServingsIngredients(state.recipe);
     }
    }
     else if(e.target.matches('.btn-increase, .btn-increase *')){
        //means increase button is clicked so do this
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    } else if (e.target.matches('.recipe__love,.recipe__love *')){
        controlLike();
    }
   // console.log(state.recipe);
});

window.l= new List();