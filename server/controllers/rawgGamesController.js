let page_tracker = { prev: "", next: "" };

// please sign up for a free API key from rawg.io
// put in .env file as API_KEY={whatever the key is}
const API_KEY = process.env.API_KEY;

// client searching for games
const searchGames = (req, res) => {
    const search = req.query.search.replace(/_+/g, " ");
    console.log(`Client searching: ${search}`);

    fetch(`https://rawg.io/api/games?key=${API_KEY}&page=1&page_size=9&search_exact=true&stores=1,2,3,5,6,7,11&search=${search}`)
        .then(res => res.json())
        .then(data => {
            console.log(`${search}: ${data.count} results`);
            page_tracker = JSON.parse(JSON.stringify({ prev: data.previous, next: data.next }));
            res.json({
                next: data.next ? true : false,
                prev: data.previous ? true : false,
                games: data.results
            });
        })
        .catch(error => console.error('Error:', error));
};

// client changes pages on searched items
const changePage = (req, res) => {
    const direction = req.query.direction; // next or prev
    let link = "";
    if (direction === 'next') {
        link = page_tracker.next;
        console.log(`getting next page`);
    } else {
        link = page_tracker.prev;
        console.log(`getting prev page`);
    }

    fetch(link)
        .then(res => res.json())
        .then(data => {
            page_tracker = JSON.parse(JSON.stringify({ prev: data.previous, next: data.next }));
            res.json({
                next: data.next ? true : false,
                prev: data.previous ? true : false,
                games: data.results
            });
        })
        .catch(error => console.error('Error:', error));

};

// client searching for games
const searchGameById = (req, res) => {
    const id = req.query.id;
    console.log(`Searching for game#${id}...`);

    fetch(`https://rawg.io/api/games/${id}?key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(`Found: ${data.name}`);
            res.json(data);
        })
        .catch(error => console.error('Error:', error));
};

// client clicks the banner to see games with the corresponding tag
const searchGamesByTag = (req, res) => {
    const tag = req.query.tag;
    console.log(`Searching for ${tag} games...`);

    fetch(`https://rawg.io/api/games?key=${API_KEY}&page=1&page_size=9&search_exact=true&stores=1,2,3,5,6,7,11&tags=${tag}`)
        .then(res => res.json())
        .then(data => {
            console.log(`${tag}: ${data.count} results`);
            page_tracker = JSON.parse(JSON.stringify({ prev: data.previous, next: data.next }));
            res.json({
                next: data.next ? true : false,
                prev: data.previous ? true : false,
                games: data.results
            });
        })
        .catch(error => console.error('Error:', error));
}

module.exports = {
    searchGames,
    changePage,
    searchGameById,
    searchGamesByTag
};