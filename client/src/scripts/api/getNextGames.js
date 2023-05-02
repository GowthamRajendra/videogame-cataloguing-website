import $ from 'jquery';

// the game api paginates the results, this function changes the page to get the next/previous get of games from the search.
export async function getNextGames(direction) {
    return $.ajax({
        url: `http://localhost:3000/rawg/games/changePage?direction=${direction}`,
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