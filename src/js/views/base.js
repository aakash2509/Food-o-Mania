//An object which will contain all the objects we selected from the DOM
//this contains basically those things which are reusable by different modules
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList:document.querySelector('.results__list'),
    searchResPages:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe'),
    shopping:document.querySelector('.shopping__list'),
    likesMenu:document.querySelector('.likes__field'),
    likesList:document.querySelector('.likes__list')
};

//to select the loader class 
export const elementStrings = {
    loader:'loader'
};

//for displaying the loader while thedata gets loaded from calling the API (AJAX calls)
export const renderLoader = (parent) => { //parent element here will be the class where 
    //the loader needs to be displayed
    const loader = `
    <div class= "${elementStrings.loader}">
    <svg>
    <use href="img/icons.svg#icon-cw"></use>
    </svg>
    </div>

    `;
    parent.insertAdjacentHTML('afterbegin',loader);
};


export const clearLoader = ()=> {
    const loader = document.querySelector(`.${elementStrings.loader}`);

    if(loader){
        //if loader is there then first go to its parent and then 
        //select its child named as 'loader' to delete it
        loader.parentElement.removeChild(loader);
    }
};