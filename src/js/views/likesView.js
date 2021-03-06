import {elements} from './base';
import {limitRecipeTitle} from './searchView.js'
//displays the liked icon acc to if the recipe is liked or not
export const toggleLikeBtn = isLiked => {
    //if liked then display 1st icon else 2nd icon
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
 //selects the <use> element of .recipe__love class and then uses setattribute to change its href(image name)
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = (numlikes)=> {
    elements.likesMenu.style.visibility = numlikes >0 ? 'visible' :'hidden';
}

export const renderLike = (like) =>{
    const markup = `
    <li>
    <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
            <img src="${like.img}" alt="${like.title}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
            <p class="likes__author">${like.author}</p>
        </div>
    </a>
</li>
    `;

    elements.likesList.insertAdjacentHTML('beforeend',markup);
};

export const deleteLike = (id) => {
    const el= document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    
    if(el)
    el.parentElement.removeChild(el);
}