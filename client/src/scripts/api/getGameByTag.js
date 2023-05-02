import $ from 'jquery';

export async function getGameByTag(tag) {
    return $.ajax({
        url: `http://localhost:3000/rawg/games/searchGamesByTag?tag=${tag}`,
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