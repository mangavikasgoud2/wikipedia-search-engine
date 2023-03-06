let searchInputEl = document.getElementById("searchInput");
let DynamicEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendSearchResult(results) {

    let DivEl = document.createElement("div");
    DivEl.classList.add("result-item");
    DynamicEl.appendChild(DivEl);

    let {
        title,
        link,
        description
    } = results;

    let Name = document.createElement("a");
    Name.classList.add("result-title");
    Name.setAttribute("href", link);
    Name.setAttribute("target", "_blank");
    Name.textContent = title;
    DivEl.appendChild(Name);

    let Break1 = document.createElement("br");
    DivEl.appendChild(Break1);

    let Link = document.createElement("a");
    Link.classList.add("result-url");
    Link.setAttribute("href", results.link);
    Link.setAttribute("target", "_blank");
    Link.textContent = results.link;
    DivEl.appendChild(Link);

    let Break2 = document.createElement("br");
    DivEl.appendChild(Break2);

    let Description = document.createElement("p");
    Description.classList.add("link-description");
    Description.textContent = results.description;
    DivEl.appendChild(Description);

}

function DisplayResults(search_results) {
    // console.log(search_results[0]);
    spinner.classList.toggle("d-none");
    for (let data of search_results) {
        //console.log(data);
        createAndAppendSearchResult(data);
    }
    // let results = search_results[0];
    // createAndAppendSearchReult(results);
}


function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        DynamicEl.textContent = "";
        console.log(searchInput);
        let URL = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(URL, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let {
                    search_results
                } = data;
                //console.log(data.search_results[0]);
                DisplayResults(search_results);
            });
    }
}




searchInputEl.addEventListener("keydown", searchWikipedia);
