
//template literals in ES6

let firstName='Aakash';
let lastName='Nainani';
const yearOfBirth=1990;

function calcAge(year){

	return 2019-year;
}

//ES5 - So difficult to write this.
console.log('this is ' + firstName + ' '+ lastName +' he is ' + calcAge(1996) + 'years old');

//ES6 - So easy to write the same thing
console.log(`this is ${firstName} ${lastName} . He is ${calcAge(1996)} years old `);
//in this , we simply have to put all the string inside of  the back ticks and the dynamic
//content under the ${ } block as shown


console.log(firstName.repeat(5)); //repeats the firstname string 5 times



//Arrow functions in ES6 =>

const years= [1990,1992,1996];

//ES5 using normal functions

var ages5=years.map(function(el){
	return 2019-el;
});
console.log(ages5);

//ES6 using Arrow functions
let ages6 = years.map(el=>2019-el);
console.log(ages6);
//here the thing written before the arrow operator are the parameters
//and which is after it are the return statements


// another example (years is the array above). here we return only single line
ages6 = years.map((el,index)=>`Age element ${index + 1}: ${2019-el} .`)
console.log(ages6); 

//here there are 2 parameters el(element) and index and index increas by one every iteration

//for multiple lines or calculations in the arrow function 

 ages6= years.map((el,index)=>{

 	const now = new Date().getFullYear();
 	const age = now-el;
 	return `Age element ${index + 1}: ${age}`  
 });
 console.log(ages6);





 //ARROW FUNCTIONS DO NOT HAVE THEIR OWN 'this' KEYWORD .
 //they use the 'THIS' of the parameter of their surrounding.(the 'this' of area just above the function )
 //So this avoids the undefined type problem where the scope is lost while calling a func
 //So always use arrow function to preserve the value of the this keyw0rd


 //eg or demonstration of the above thing

 function Person(name){ //person constructor
 	this.name = name;
 }

 //ES5 
 Person.prototype.myFriends5 = function(friends){

 	var arr=friends.map(function(element){
 		return this.name + 'is friend with'+ element; 
 	});
 		//in case we use ES5 we must use binf to avoid the problem
 	
 	/*var arr=friends.map(element =>{
 		return `this.name is friend with` ${element}; 
 	}.bind(this));*/

 //since the 'THIS'written in bind() is outside the function hence it would point to 
 //the outermost object i.e. person name . and hence it is binded and passed to the func for use
 	console.log(arr); //prints the array storing the strings 

 }

 var friends=['Bob' , 'Jane' , 'mike'];

 new Person('John').myFriends5(friends);

 //BY RUNNING THE ABOVE CODE THE NAME OF THE PERSON WONT BE PRINTED BECAUSE IN 
 //SINCE A NORMAL FUNC IS USED HENCE THE 'this' IT WOULD POINT WILL BE THE GLOBAL WINDOW OBJECT
 //consoled output : "is friend with bob","is friend with JAne","is friend with mike"



 //SO to avoid this, we can either bind the this in ES5 or simply we can use the arrow function 
 //instead of the normal function as shown below

 //ES6

 Person.prototype.myFriends6 = function(friends){

 	var arr=friends.map(element =>
 		 `${this.name} is friends with ${element}`); 
 	
 	console.log(arr); //prints the array storing the strings 

 }

 var friends=['Bob' , 'Jane' , 'mike'];

 new Person('Aakash').myFriends6(friends);

 //Now here the arrow function has 'this' pointing to its neighbour which is the person name
 //hence here we get output = Aakash is friends with Bob etc..



 //Destructuring in es6 

 //ES5
 var john=['John',26];
 var name=john[0];
 var age=john[1];

 //ES6
 const [name,age]=['John',26]//this is called destructuring. In this , the 'John' is extracted 
 //and stored in the name variable and 26 is stored in the age variable
 console.log(name);
 console.log(age);


 //Similarly in objects:

 const obj = {
 	firstname:'John',
 	lastName:'smith'
 };

//for storing as the same name as the object's property
 const {firstname, lastName} = obj;
 console.log(firstname);
 console.log(lastName);


//for storing as diferent name
const {firstname:a, lastName:b} = obj;
 console.log(a);
 console.log(b);


//This destructuring is used for returning multiple elements together as shown

function retire(year){
	const age=new Date().getFullYear()-year;
	return [age,65-age];
}

const [age,retirement]=retire(1990);
console.log(age);
console.log(retirement);




//For converting a list into an array

const boxes = document.querySelectorAll('.box');
//ES5

var boxesArr5= new Array.prototype.slice.call(boxes);
boxesArr5.array.forEach( function(current) {
	current.style.backgroundColor='dodgerblue';
	// statements
});

//but in the or map method to traverse an array, we cannot use break and continue statements

//So in ES6

const boxesArr6 = Array.from(boxes); //this simply converts the nodelist boxes into an array

boxesArr6.forEach(curr=> cur.style.backgroundColor = 'dodgerblue');


//for using the break & continue,

//ES5 - we use simple for loops  

for(var i=0;i<boxesArr5.length;i++){

	if(boxesArr5[i].className==='box blue'){
		continue;
	}

	//else
	boxesArr5[i].textContent='I changed to blue';
}



//ES6 - we can use 'for of loop' as shown

for(const cur of boxesArr6){

	if(cur.className==='box blue'){
		continue;
	}

	//else
	cur.textContent='I changed to blue';

}



//for finding the index and finding a value

//ES5
var ages=[12,17,8,21,14,11];

var full=ages.map(function(cur){

	return cur>=18; //returns true or false depending on element is >=18
});
console.log(full);

console.log(full.indexOf(true)) //finds the index of element which is true for the condth
console.log(ages[full.indexOf(true)]); //prints that element


//ES6 
//finds the index of only the fist element which is >=18
console.log(ages.findIndex(cur => cur >=12))
//find the first element which is >=18
console.log(ages.find(cur => cur>=12));




//Spread operator in ES6 ->

function addFourAges(a,b,c,d){
	return a+b+c+(d;
	}
	
	var sum1= addFourAges(18,20,21,23);
	
	var ages=[18,30,12,23];
	//ES5
	var sum2=addFourAges.apply(null,ages); //null is the 'this' 
	console.log(sum2);

	//ES6 using the spread operator '...'
	const sum3=addFourAges(...ages); //spread operator seperates the components of the array
	console.log(sum3);


	//to join 2 arrays;

	const a=['abc','def' ,'ghi'];
	const b=['x','y','z'];

	const c=[...a,...b]; //array c will contain both the array elements 

	console.log(c);


	//spread operators work not only on arrays but on the nodelists also

//combining an element and a nodelist/array using ...

const h=document.querySelector('h1');
const boxes=document.querySelectorAll('.box');
const all=[h, ...boxes];

Array.from(all).forEach(cur=>
	cur.style.color='purple');



	//Rest parameters are just opposite to the spread operator but have same symnol '...'
	//Rest parmaters are used or written in the function paramaters which makes an array by 
	//combining all the parameters passes to the function as shown.


	function isFullAge5(){
		console.log(arguments) // we see that the type of arguments is an Object

		var argsArr=Array.prototype.slice.call(arguments);
		//converts the arguments into an array.


	//ES6

	function isFullAge6(...years){
		years.forEach(cur=> console.log( (2016-cur) >=18)); 
			// statement
	}

	isFullAge6(1990,2005,1998)
		argsArr.forEach( function(cur) {
			console.log((2016 - cur) >=18);
			// statements
		});
	}

	isFullAge5(1990,2005,1998);
;



//Default parameters in function in ES6

function person(firstName,yearOfBirth,lastName='Smith',nationality='american'){
	this.firstname: firstName;
	this.lastName: lastName;
	this.yearOfBirth: yearOfBirth;
	this.nationality: nationality;
}

var john= new person('John',1990);
//since the last name and nationality are not passed hence they'll be assigned from the
//default value given in the function parameter as shown 






//Asynchronous javascript

const second = ()=>{
	setTimeout(() => {
		console.log('Async code after 2 seconds');
		
	}, 2000);
}

const first = () =>{
	console.log('first');
	second();
	console.log('last');
}

first();

//print order : first , last , async code (after 2 seconds)



// practical Example of using the setTimeout function or async code to get recipies from and external api

//ES5:

function getRecipe() {

 	setTimeout(()=>{  //1st callback for getting all the ids
		const recipeId=[2,4,6,8];
		console.log(recipeId); //to print all the recipe ids

		setTimeout((id)=>{ //2nd callback to get the recipe of a particular id(done after the 1st callback)
			const recipe={title:'pasta' , publisher:'Jonas'};
			console.log(`${id}:  ${recipe.title}`);

			setTimeout((publisher)=>{ //3rd callback to get a recipe of a particular publisher
				const recipe2={title:'Pizza' ,publisher:'Jonas'};
				console.log(recipe2);
			},1500,recipe.publisher); //3rd callback ends

		},1500,recipeId[2]); //2nd callback ends

	},1500); //1st callback ends
}

getRecipe();

//The above triangular like structure formed due to the nested callback functions(one inside the other) is called callback hell which is a problem in es5 and is avoided by using promises in ES6

//Promises in ES6 :

//a promise takes resolve and reject parameters. resolve is called when the the promise was succesful and reject when unsuccesful
const getIds= new Promise((resolve,reject)=>{

	setTimeout(()=>{//if this function call (eg: if API call is succesful)
		resolve([2,4,6,8]); //then we call the resolve function 
		//if not succesful then we will give a reject function for that
	//but as setTimeout is always true hence here we omited the reject func
	},1500);
});

//A function to get the recipe based on a recipe id.It returns a promise
const getRecipe = recId =>{
	return new Promise((resolve,reject)=>{

		setTimeout((Id)=>{

			const recipe={title:'Pasta',publisher:'Jonas'};
			resolve(`${Id}:  ${recipe.title}`);
		},1500,recId);

	});
};

//function which gets the recipe of a particular author/publisher
const getRelated = publisher =>{
	return new Promise((resolve,reject)=>{
		setTimeout((publisher)=>{
			const recipe2={title:'Pizza' ,publisher:'Jonas'};
				resolve(`${publisher} : ${recipe2.title}`);

		},1500,publisher);
	});

};
	//This is a callback which is called when then above Getids callback is fulfilled(.then).Here the parameter Ids in it will contain whatever is returned on succesful fullfilment. (resolve function) .here it will contain the array[2,4,6,8] which is returned in the resolve above
	getIds
	.then((Ids)=>{ 
		console.log(Ids);
		return getRecipe(Ids[2]); // this promise returns the getrecipe function promise
	})
	.then((recipe)=>{ //this 'then' is called when the 1st is fulfiled
		console.log(recipe);
		return getRelated('Jonas') // this promise returns the getRelated function promise
	})
	.then((recipe)=>{ //this 'then' is called when the 2nd is fulfilled
		console.log(recipe);
	})
	.catch((error)=>{ //catch is called when any of the above promises is rejected or unfulfilled
		console.log('Error!!!') 
	});

	//In this way as shown here , we can use promises to avoid the callback hell 


	//To consume the promises , there is a much easier way then to use .then and .catch method which is the async await as shown :
//async func always runs in the background and the await method can only be used inside the async 
	async function getRecipesAW(){
		//waits till the promise is fulfilled and then stores the resolved value in the variable ie. Ids ,recipe ,related here
		const Ids = await getIds; 
		console.log(Ids);
		const recipe=await getRecipe(Ids[2]);
		console.log(recipe);
		const related = await getRelated('Jonas');
		console.log(related);
		
		return recipe; //async function also returns a promise always!
	}

	//prints the value after the promise is resolved
	getRecipesAW().then(result=>console.log(`${result} is the best ever!`));