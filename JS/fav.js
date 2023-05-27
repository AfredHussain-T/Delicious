// this function returns the data present in local storage

function getStorage() {
    let data = JSON.parse(localStorage.getItem("favorite")) || [];
    return data;
}

//It is used to set data into local storage

function setStorage(data) {
    let dataString = JSON.stringify(data);
    localStorage.setItem("favorite", dataString);
}

//To update the favorite dish data, this function is used

function updateFavorite(e) {
    let data = JSON.parse(e.getAttribute("data-dish"));     // here we get the in form of string which contains the required info
    let favoriteList = getStorage();                        // of the dish like meal id, meal name, instructions, img url

    for (let dish = 0; dish < favoriteList.length; dish++) {
        if (favoriteList[dish].idMeal == data.idMeal) {     // here we update the fav list by removing the unwanted item from local
            favoriteList.splice(dish, 1);                   // storage, if the data id is present in fav list then, we unset the
            e.setAttribute("value", "Favorite");            // value to fav and the we remove it from the list and send the rest of
            setStorage(favoriteList);                       // list to local setStorage method to update local storage.
            window.location.reload();
            return;
        }
    }

    favoriteList.push(data);                                // if the data is not present in fav list then we push the value into local
    setStorage(favoriteList);                               // storage using setStorage method and we change the value as unFav.
    e.setAttribute("value", "UnFavorite");
}

// This function is used to display the fav dish items present in local storage.

function displayFav(favoriteContainer) {        

    let myFavoriteList = getStorage();              // we get the local storage data using getStorage() method

    if (myFavoriteList.length > 0) {                
        favoriteContainer.innerHTML = "";
    }

    for (let dish = 0; dish < myFavoriteList.length; dish++) {
        const { idMeal, strMeal, strMealThumb } = myFavoriteList[dish];     //the items present in the list we map the required fields
                                                                            // accordingly and store them in the variables.
        let div = document.createElement("div");                             
        div.classList.add("dish-card");                                     // we create a container here to represent and style the
        div.setAttribute("id", idMeal);                                     // data as required.

        let detailsPath = `../pages/Info.html#${idMeal}`;                   // here we append the meal id to use it under info page
        div.innerHTML = `
          <img class="thumb" src=${strMealThumb} alt="">                    
          <div class="item-container">
          <a href=${detailsPath}>${strMeal}</a>
          <input type="button" value="UnFavorite" id=${idMeal} data-dish='{"idMeal": "${idMeal}", "strMeal": "${strMeal}", "strMealThumb": "${strMealThumb}"}' onclick="updateFavorite(this)"/>
          </div>
      `;                                      // in the above lines we create a container which has the dish image, name and fav    or                                      unfav button.
        console.log(strMealThumb, strMeal, idMeal, myFavoriteList)//this is to check if we are getting the data,is mapped with const var.
        favoriteContainer.appendChild(div);
    }
}

// this is the container where all the dish items are displayed.

let favoriteContainer = document.getElementById('favorite-dish');   
if (favoriteContainer != null) {
    displayFav(favoriteContainer);
}