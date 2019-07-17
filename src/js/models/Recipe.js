import axios from 'axios';
import {key , proxy} from '../config.js';

//A class which creates the recipe objects
export default class Recipe {
    constructor(id){
        this.id=id;
    }
        // function to get the recipe on the basis of the id of dish
    async getRecipe () {
        try{
            //gets the recipe based on the id of the clickd dish from the api
            const res = await axios(`http://food2fork.com/api/get?key=${key}&rId=${this.id}`)
            console.log(res);
            this.title = res.data.recipe.title;
            this.author= res.data.recipe.publisher;
            this.img=res.data.recipe.image_url;
            this.url=res.data.recipe.source_url;
            this.ingredients= res.data.recipe.ingredients;

        } catch(error){
            console.log(error);
            alert('Error:something is wrong');
        }

    }

    //method to calculate the time to prepare the recipe based on the ingredients
    calcTime(){
        const numIng=this.ingredients.length;
        //Assuming that we need 15 minutes for 3 ingredients
        const periods=Math.ceil(numIng/3);
        this.time=periods * 15;
    }

    calcServings(){
        this.servings= 4; //let by default be 4
    }


    parseIngredients(){
        const unitsLong =['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];

        const newIngredients=this.ingredients.map((el)=>{
            console.log('we are in')
           
            //1) Make the units uniform
            let ingredient = el.toLowerCase(); //ingredient is the ingredient from the array after each iteraion 
            
            unitsLong.forEach((unit,i)=>{ //loop over the array of units ( as present in the api data) 
                ingredient=ingredient.replace(unit,unitsShort[i]); //i is for ith iteration
            });
            //Here above, we select the ingredients & replace the elements in the first array by corresponding 2nd array elements

            //2) Removes the paranthesis.We used 'regular expressions' for this 
            ingredient =ingredient.replace(/ *\([^)]*\) */g, " ");

            //3) Parse the ingredients into count,unit and ingredient
            const arrIng =ingredient.split(' ');
            //splits the ingredients string from spaces and stores as an array
            
            //for each element in unitsShort array checks whether it (unit) is in the arrIng(parsed) array
            //if a unit is found then the index will be returned
            const unitIndex=arrIng.findIndex((el2)=>unitsShort.includes(el2));

            let objIng; //final object which is returned after parsing

            //if there is a unit found
            if(unitIndex >-1){
                //from the data we saw that everything before the unit is always a number starting from 0th index
                //So we store the numbers from 0th to the unitIndex in an array
                //now if eg: 4 1/2 cups then arrCount=[4,1/2] then -> eval ("4 +1/2") gives 4.5
                //if eg: 5 ounces then arrCount = [5] and so on
                const arrCount = arrIng.slice(0,unitIndex);
                
                let count;

                if(arrCount.length===1){
                    //we see that in data it is given 3-1/2 cups which means 3.5 
                    //so to handle it we replace - by +and then our below + logic will work good
                    count =eval(arrIng[0].replace('-','+')); //if there is only 1 number
                } else {
                    count = eval(arrIng.slice(0,unitIndex).join('+'));
                }

                objIng = {
                    count, //means count: count
                    unit:arrIng[unitIndex],//get the unit at position =unitindex calc above
                    ingredient:arrIng.slice(unitIndex+1).join(' ')
                    //everything after the unit will be ingredient
                }
            } 
            //checks whether the 0th element can be parsed into an integer or not
            //i.e. checks whether it is '1' '3' etc such strings can be parsed into integers
            else if (parseInt(arrIng[0],10)){ //10 is the base 10
                //There is no unit but the 1st element is a number

                objIng ={
                    count:parseInt(arrIng[0],10), //converts '4' at 0th position into 4
                    unit:'', //since no unit is found
                    ingredient:arrIng.slice(1).join(' ') //everything apart from the number at 0th position
                };
            } else if(unitIndex===-1){
                //if no unit and no number (in the 0th position) is found in the arrIng
                objIng ={
                    count:1, //for no unit found we say 1 piece etc
                    unit:'',
                    ingredient:ingredient //ingredient will be as it is
                }
            }

                    return objIng; //returns the new ingredient object to the variable newIngredint
        });
        //saves the new returned value
        this.ingredients=newIngredients;
    }


    updateServings (type) {
        //updating the servings
        const newServings = type ==='dec'  ? this.servings-1 : this.servings +1 ;

        //update the Ingredients as per the servings

        this.ingredients.forEach((ing) =>{
            ing.count = ing.count * (newServings/this.servings);
            //simple unitary method
        });
        //updating the new servings 
        this.servings = newServings;
    }
}