import { Link } from 'react-router-dom'

// creates the game cards that are shown in home, search and profile page
export default function Gamecard(props) {
    return (
        <Link to={`/games/${props.game.id}`} state={props.game}>
            <li style={{ backgroundImage: `url(${props.game.background_image})` }}>
                <h1 className="card-title">{props.game.name}</h1>
            </li>
        </Link>);
}