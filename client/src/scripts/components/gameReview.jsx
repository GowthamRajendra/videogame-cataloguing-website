import { Rating } from 'react-simple-star-rating';

export default function GameReview(game) {
    return (
        <div className="field" id="review">
            <div className="field">
                <label className="label">{game.name}</label>
            </div>
            <div className="field">
                <label className="label">Rating</label>
                {game.rating != -1 ?
                    <Rating
                        className="star-rating"
                        initialValue={game.rating}
                        readonly={true}
                    />
                    :
                    <label className="label">You did not rate this game</label>}
            </div>
            <div className="field">
                <label className="label">Review</label>
            </div>
            <div className="control">
                {game.review != "" ?
                    <textarea
                        readOnly={true}
                        defaultValue={game.review}
                        className="textarea"
                        placeholder="You did not review this game"></textarea>
                    :
                    <label className="label">You did not review this game</label>}
            </div>
        </div>
    );
}