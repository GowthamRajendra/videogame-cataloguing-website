import $ from 'jquery';

// using the game's id to make a get request to the RAWG API
export async function getGameById(id) {
    return $.ajax({
        url: `http://localhost:3000/rawg/games/searchGameById?id=${id}`,
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