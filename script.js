let random = document.getElementById('randomImg'); 
let searchButton = document.getElementById('searchButton');
let welcomeIntro = document.getElementById('welcomeIntro')
let foodResults = document.getElementById('foodResults')
let footer = document.getElementById('footer')
let h2 = document.getElementById('hr2')
let ingredientsPage = document.getElementById('ingredientsPage')
let ingridientItems = document.getElementById('ingridientItems')
let home = document.getElementById('home')
let recipe = document.getElementById('recipe')
let closeButton = document.getElementById('closeButton')

searchButton.addEventListener('click', function () {
    searchOperation();
});

document.getElementById('searchBox').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchOperation();
    }
});

function searchOperation() {
    let userInput = document.getElementById('searchBox').value;
    if (userInput.trim() === "") {
        alert("Enter the category name");
    } else {
        welcomeIntro.style.display = "none";
        headLine.style.display = "block";
        foodResults.style.display = "grid";
        headLine.innerText = `Searched items for ${userInput}:`;
        console.log(userInput);
        finalResults(userInput);
    }
}

function finalResults(userInput) { // for the page showing the search results
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${userInput}`)
    .then((res) => {
        console.log(res)
        return res.json(); // json to make the object file
    })
    .then((items) => {
        console.log(items)
        let main = items.meals 
        var current = '';
            main.forEach(all => { //  to go through the array of single meal
            current += `
            <div class = "block">
            <img src = "${all.strMealThumb}" id="blockImg" alt = "image>
            <p class = "blockName">${all.strMeal}</p>
            </div>`
            foodResults.innerHTML = current;
        });
    })
    .catch((error) => {
        headLine.innerText = `Searched items for ${userInput} not found!` // if the category is not found
        footer.style.marginTop = "19vh";
        headLine.style.marginTop = "23vh";
        footer.style.marginBottom = "0vw";
        welcomeIntro.innerHTML = "";
        console.log(error)
    })
}

function randomImg() { // for the random image on the first page
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((res) => res.json())
        .then((data) => {
            let storeData = data.meals;
            storeData.forEach((e) => {
                meal = e.idMeal;
                random.innerHTML += `
                    <div class="meal-item">
                        <img src="${e.strMealThumb}" class="randomImage">
                        <p class="randomName">${e.strMeal}</p>
                    </div>`;

                for(let num=1; num<=20;num++){ // to go through the keys with the help of loop
                    if(`${e['strIngredient'+num]}`==="" ||`${e['strIngredient'+num]}`=== null){   // loop will break if there is no ingredient
                        break;
                    }
                    else{
                        ingridientItems.innerHTML += `
                            <li>${e['strIngredient'+num]}</li>`;  
                    }
                }
                recipe.innerHTML = `<h2>Recipe</h2>${e.strInstructions}`
            });
        })
        .catch((error) => console.log(error));
}
randomImg();

let blockImg = document.getElementById('blockImg')
document.addEventListener('click', function(event){
    if(event.target.id.includes('blockImg')){
    ingredientsPage.style.display = "flex";
    closeButton.style.display = "block";
    foodResults.style.filter = "blur(5px)";
    headLine.style.filter = "blur(5px)";
    ingredientsPage.style.top = "27%";
    closeButton.style.top = "18%";
    }
})

random.addEventListener('click', function(){ // for the pop up of the ingredients page
    ingredientsPage.style.display = "flex";
    closeButton.style.display = "block";
    welcomeIntro.style.filter = "blur(5px)";
})

home.addEventListener('click', function(){
    window.location.href = "./index.html";
})

closeButton.addEventListener('click', function(){
    ingredientsPage.style.display = "none";
    closeButton.style.display = "none";
    welcomeIntro.style.filter = "blur(0px)";
    foodResults.style.filter = "blur(0px";
    headLine.style.filter = "blur(0px)";
})
