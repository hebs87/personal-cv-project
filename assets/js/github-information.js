//THIS IS WRITTEN AFTER THE fetchGitHubInformation() FUNCTION, BUT IS WRITTEN ABOVE IT AND IS CALLED WHEN OUR PROMISE RESOLVES
//user parameter is the object that is being returned from the API
function userinformationHTML(user) {
    //${user.name} returns the user's public username
    //(@) puts an @ before the user's login name and encapsulates it all in brackets
    //${user.html_url} links to the user's public GitHub profile
    //${user.login} will be the user's login name which will be the text inside our anchor tag
    //.gh-content will be where content about the user will appear
    //.gh-avatar will be where the user's avatar appears - ${user.avatar_url} - this will be displayed as an image in an anchor so will link to their GitHub profile
    //${user.followers} - count of no of people that follow the user; ${user.following} - count of no of people that the user is following
    //${user.public_repos} count of public repos the user has
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>
                Followers: ${user.followers} - Following: ${user.following} <br/>
                Repos: ${user.public_repos}
            </p>
        </div>`;
}

//THIS IS WRITTEN AFTER THE fetchGitHubInformation() FUNCTION, BUT IS WRITTEN ABOVE IT AND IS CALLED WHEN OUR PROMISE RESOLVES
function repoinformationHTML(repos) {
    //git returns this as an array, so we can use a standard array method in the function, which is length, to see if it's === 0
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No Repos!</div>`
    }
    //if data HAS been returned, since it's an array, we want to iterate through it and get the info out
    //create a var called listItemsHTML and it takes the results of our map method (like we did with the maps API)
    var listItemsHTML = repos.map(function(repo) {
        //${repo.html_url} is the actual repository - will take us to it when the text is clicked
        //${repo.name} is the name of the respository - this will be the text for the anchor tag
        //${listItemsHTM.join("\n")} uses the join() method on the array items and joins everything on a new line - stops us from having to iterate through array again
        return `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </li>`;
    });
    
    return `
        <div class="clearfix repo-list">
            <p>
                <strong>Repo List:</strong>
            </p>
            <ul>
                ${listItemsHTML.join("\n")}
            </ul>
        </div>`;
}

//Create fetchGitHubInformation() function that will be called in our html file
function fetchGitHubInformation(event) {
    //sets the div content to an empty string, which clears any info when the input text is deleted from the box, so data doesn't remain
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");
    
    //create var that holds the username - use jquery to target the div with id of gh-username and gets the value in that text field
    var username = $("#gh-username").val();
    //if statement
    if (!username) {
        //if username is empty, the #gh-user-data div will display the text and return out of that function as we don't want to display any data
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    //if text has been input then we want to display a loader - this will loop while data is being accessed
    $("#gh-user-data").html(
        `<div id="loader" class="text-center">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);
    
    //now we input our jQuery promise
    //.when(//we have a response from the GitHub API (https://api.github.com/users/))
    //.then(//run a function to display it in the #gh-user-data div, unless we get an error)
    $.when(
        //${username} means we get the value of the username when we acces our GitHub API
        $.getJSON(`https://api.github.com/users/${username}`),
        //the first JSON gets the username info; the second JSON gets the repo info for that username
        $.getJSON(`https://api.github.com/users/${username}/repos`)
        ).then(
            //response that came back from our getJSON() method - need one for the first response and another for the second response...
            function(firstResponse, secondResponse) {
                //...first response will be stored in userData var
                //when we do two calls, the when() method packs response into arrays, and each one is the first element of the array, so we need the index
                var userData = firstResponse[0];
                //...second response will be stored in repoData var
                var repoData = secondResponse[0];
                
                //set the html of the div to userinformationHTML(userData), which is a function we will write later
                $("#gh-user-data").html(userinformationHTML(userData));
                //set the html of the div to repoinformationHTML(repoData), which is a function we will write later
                $("#gh-repo-data").html(repoinformationHTML(repoData));
            }, function(errorResponse) {
                //if there is an error (status 404) then we want an error response - get our div and set its HTML to an error message
                if (errorResponse.status === 404) {
                    $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
                } else {
                    //if it isn't a 404 error, then we'll console.log our errorResponse and we'll set our div HTML value to the JSON response that we got back
                    console.log(errorResponse);
                    $("#gh-user-data").html(
                        `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                }
            });
            
}

//this fetches the info when the page is fully loaded, so it displays the info for the default username that is in the field when the page loads
$(document).ready(fetchGitHubInformation);