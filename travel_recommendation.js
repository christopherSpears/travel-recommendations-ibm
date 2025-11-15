const searchForm = document.getElementById('searchForm');

function getRecommendations(keyword) {

    return fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            if (keyword === "beaches") return data.beaches;
            if (keyword === "temples") return data.temples;

            const country = data.countries.find(
                c => c.name.toLowerCase().includes(keyword)
            );

            if (!country) return [];

            return country.cities;
        })
        .catch(err => console.error(err));
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let recommendationsDiv = document.getElementById('recommendations');
    const searchInput = document.getElementById('search').value;
    console.log(searchInput);

    let query = searchInput;

    query = query.toLowerCase().trim();

    const keywordMap = {
        beach: "beaches",
        beaches: "beaches",
        australia: "australia",
        japan: "japan",
        brazil: "brazil",
        temples: "temples",
        temple: "temples",
    };

    const keyword = keywordMap[query] ?? null;
    if (!keyword) {
        console.warn("No matching keywords found");
        return;
    }

    getRecommendations(keyword).then(results => {

        recommendationsDiv.innerHTML = '';

        results.forEach(element => {
            const imgSrc = element.imageUrl;
            const title = element.name;
            const description = element.description;
            
            const recsCard = `
                <div class="card bg-dark text-white" style="width: 100%;">
                    <img src="${imgSrc}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <a href="#" class="btn btn-primary">Visit</a>
                    </div>
                </div>
            `;

            recommendationsDiv.insertAdjacentHTML('beforeend', recsCard);
        });
    })


});