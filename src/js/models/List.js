import uniqid from 'uniqid';

export default class List {
    constructor (){
        //an empty array for storing the objects added to the shopping list
        this.items = [];
    }

    addItem (count,unit,ingredient){
        const item = {
            id : uniqid(),
            count, //means count : count and so on
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem (id){
        //finds the index of element whose id = id of the item to be deleted
        const index = this.items.findIndex(el =>el.id===id);
        //removes 1 item starting from index = index and modifies the new array
        this.items.splice(index,1);
    }
//function to update the count of ingredients in the shopping list iteself
//it takes the id of the ingr3edient and the newcount to be updated
updateCount (id,newCount){
    //finds the item whose id = selected id to be updated and then uodates it's newcount
    this.items.find(el =>el.id===id).count = newCount;
    }

}