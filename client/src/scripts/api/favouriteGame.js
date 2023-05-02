import $ from 'jquery';

// makes post request to database to add the selected game to favourites
export async function addToFavourites(user, gameID, name, background_image) {
    const rating = -1; // default rating assuming user won't choose one
    const review = "" //default review assuming user won't choose one
    const gameJSON = { gameID, name, background_image, rating, review };

    $.ajax({
        url: 'http://localhost:3000/user/games',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${user.JWT}`,
        },
        data: JSON.stringify(gameJSON),
        success: function (data) {
            return data;
        },
        error: function (error) {
            console.log(error);

        }
    });
}

// make delete request to database to remove the selected game from favourites
export async function removeFromFavourites(user, id) {
    $.ajax({
        url: `http://localhost:3000/user/games/${id}`,
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${user.JWT}`,
        },
        success: function (data) {
        },
        error: function (error) {
            console.log(error);
        }
    })
}

// makes patch request to add the user's rating for the game
export async function updateFavourites(user, rating, review, id) {
    const gameJSON = { rating, review };

    $.ajax({
        url: `http://localhost:3000/user/games/${id}`,
        method: 'PATCH',
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${user.JWT}`,
        },
        data: JSON.stringify(gameJSON),
        success: function (data) {
        },
        error: function (error) {
            console.log(error);

        }
    });
}