export default class Likes {
    constructor (){
        this.likes= []; //an empty array to store likes
    }
    //adds a new like object having an id,title ,img and author
    addLike(id,title,author,img) {
        const like = {id, title, author, img};
        this.likes.push(like);

        //saves the data in the local storage
        this.persistData();
        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex( el => el.id ===id);
            this.likes.splice(index,1); //deletes 1 element from the index
            //saves teh data in the local storage
            this.persistData();
        }

        isLiked(id) { //checks whether the recipe with a id is in the likes array or not
            return this.likes.findIndex(el=> el.id ==id) !==-1;
        }
        
        getNumLikes(){ //gets the total number of liked elements from like array
            return this.likes.length;
        }

        persistData(){//we change the likes array into string bcoz we can onl store data
            //in localstorage in string format 
            localStorage.setItem('likes',JSON.stringify(this.likes));
        }

        readStorage (){//converts the string back into its orignal form
            const storage = JSON.parse(localStorage.getItem('likes'));

            //Restoring the likes back from the local storage
            if(storage)
            this.likes = storage;
        }
    }
