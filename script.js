const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");

const profile = document.getElementById("profile");
const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const login = document.getElementById("login");
const bio = document.getElementById("bio");

const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");

const reposLink = document.getElementById("reposLink");
const profileLink = document.getElementById("profileLink");

const message = document.getElementById("message");


searchBtn.addEventListener("click", function() {
    const username = usernameInput.value.trim(); // trim :- starting/ending extra spaces remove karta hai

    if(username == ""){
        console.log("Please enter a username");
        return;
    }

    const apiUrl = `https://api.github.com/users/${username}`; // Backticks : - ` ` → variable ko string ke andar use karne ke liye.
    console.log(apiUrl)
    console.log(username);
    
})