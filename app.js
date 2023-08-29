let urldish = "https://api.edamam.com/api/recipes/v2?type=public&app_id=298482c6&app_key=f8608f68c6e14c4e1cd8158474529d33";
let inp = document.querySelector("input");
let btn = document.querySelector(".search");
let body = document.querySelector("body");
let recipediv = document.querySelector(".recipe-container");
let textDiv = document.querySelector(".body-text");

const setscrollPostion = () => {
    recipediv.scrollTo({ top: 0, behavior: "smooth" });
}

btn.addEventListener("click", async () => {
    let res = await axios.get(urldish + `&q=${inp.value}`);
    body.querySelectorAll(".food-box").forEach((food) => {
        food.remove();
    });
    setscrollPostion();

    recipeArr = res.data.hits;
    for (rec of recipeArr) {
        let food = document.createElement("div");
        food.classList.add("food-box");
        textDiv.style.display = "none";


        let foodname = document.createElement("h2");
        foodname.innerText = rec.recipe.label;
        food.appendChild(foodname);


        let foodImg = document.createElement("img");
        foodImg.setAttribute("src", `${rec.recipe.image}`);
        foodImg.setAttribute("alt", `Tasty ${inp.value}`);
        foodImg.style.fontSize = "2rem";
        recipediv.appendChild(food);
        food.appendChild(foodImg);

        let btndiv = document.createElement("div");
        btndiv.classList.add("btn-div");
        food.appendChild(btndiv);

        createButtons(rec.recipe.url, rec.recipe, btndiv, food);
    }
});
function createButtons(recipeUrl, recipe, btndiv, food) {

    let ingredientbtn = document.createElement("button");
    ingredientbtn.innerText = "Ingredients";
    ingredientbtn.classList.add("btn");
    btndiv.appendChild(ingredientbtn);

    ingredientbtn.addEventListener("click", () => {
        ingredientbtn.classList.add("display-btn");
        recipebtn.classList.add("display-btn");

        let materialdiv = document.createElement("div");
        food.appendChild(materialdiv);

        let heading = document.createElement("h3");
        heading.innerHTML = "Ingredients";
        materialdiv.appendChild(heading);

        let cross = document.createElement("div");
        cross.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        cross.addEventListener("click", () => {
            cross.style.display = "none";
            materialdiv.style.display = "none";
            ingredientbtn.classList.remove("display-btn");
            recipebtn.classList.remove("display-btn");
        });
        heading.appendChild(cross);

        createIngredientList(materialdiv, recipe);

    });

    let recipebtn = document.createElement("a");
    recipebtn.innerText = "Recipe";
    recipebtn.classList.add("btn");
    btndiv.appendChild(recipebtn);

    recipebtn.addEventListener("click", () => {
        recipebtn.setAttribute("href", recipeUrl);
        recipebtn.setAttribute("target", "_blank");
    });
}
function createIngredientList(materialdiv, recipe) {
    let material = document.createElement("ul");
    materialdiv.appendChild(material);
    materialdiv.classList.add("materialdiv");

    for (let i = 0; i < recipe.ingredientLines.length; i++) {
        let materialitem = document.createElement("li");
        materialitem.innerText = recipe.ingredientLines[i];
        material.appendChild(materialitem);
    }
}
