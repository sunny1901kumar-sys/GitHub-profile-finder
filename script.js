console.log("JavaScript file connected");
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

    if(username === ""){
        profile.style.display = "none";  // purana profile hide karega.
        message.textContent = "Please enter a username";
        return; // empty input hone par API call rok dega.
    }

    const apiUrl = `https://api.github.com/users/${username}`; // Backticks : - ` ` → variable ko string ke andar use karne ke liye.
    
    profile.style.display = "none";
    message.textContent = "Loading...";

    fetch(apiUrl) // means API se data request kar rha hai
        .then(function(response){ 
            
            if(!response.ok){ // response.ok → check karta hai ki HTTP response successful hai ya nahi.
                throw new Error("User not found");
            }
            return response.json(); // response ko javascript object mein convert karta hai
        })
        .then(function(data){
            name.textContent = data.name || data.login; //  || data.login :- agar name available nahi hai, toh username show hoga.
            login.textContent = "@" + data.login;

            avatar.src = data.avatar_url;
            // avatar.src → HTML ke <img> element mein image URL set karta hai.
            // data.avatar_url → API se profile picture ka URL milta hai.
            bio.textContent = data.bio || "No bio available";

            // followers, following aur repositories
            followers.textContent = "Followers: " + data.followers; // data.followers -> followers ki count
            following.textContent = "Following: " + data.following;
            repos.textContent = "Public Repositories: " + data.public_repos;

            profileLink.href = data.html_url; // data.html_url → user ke GitHub profile ka URL.  //  profileLink.href → “View GitHub Profile” link set karta hai.
            reposLink.href = data.html_url + "?tab=repositories"; // ?tab=repositories → profile ke repositories tab ko open karta hai.
            profile.style.display = "block"; // block -> profile card visible ho jata hai

            message.textContent = ""; // jab profile mil jayen toh loading... ko hta do
        })
        .catch(function(error){
            profile.style.display = "none";

            if(error.message === "User not found"){
                message.textContent = "GitHub user not found";
            }
            else{
                message.textContent = "Something went wrong. Please try again.";
            }
            
        });
});