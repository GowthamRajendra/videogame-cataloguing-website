import $ from 'jquery';

// query the game api with a search term from the search bar
export async function getGames(search) {
    return $.ajax({
        url: `http://localhost:3000/rawg/games/searchGames?search=${search.replace(/ /g, "_")}`,
        type: "GET",
        success: function (data) {
            return data;
        },
        error: function (type, status, error_desc) {
            console.log(`ERROR: 
                type: ${type}, 
                status: ${status}, 
                desc: ${error_desc}`
            );
        }
    })
}