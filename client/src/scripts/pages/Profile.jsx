import { useState, useEffect } from "react";
import $ from 'jquery';
import '../../styles/profile.css';
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import LoadingCircle from "../components/loadingCircle";
import FavChart from "../components/favChart";
import GameReview from "../components/gameReview";


export default function Profile() {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const [selected, setSelected] = useState("reviews");
    const [gameDetails, setGameDetails] = useState([]);

    // for some reason the d3 graph only renders when game details is set
    useEffect(() => {
        const temp = [...gameDetails]
        setGameDetails(temp)
    }, [selected])

    useEffect(() => {
        $('#reviews').addClass('is-active');

        const getProfileGames = async () => {
            $.ajax({
                url: "http://localhost:3000/user/games",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.JWT}`,
                },
                success: function (data) {
                    setGameDetails(data);
                    setLoading(false);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

        // only get games if there is user logged in
        if (user) {
            setLoading(true);
            getProfileGames();
        }
    }, [user]);

    const handle = (element) => {
        $('.hero-foot li').removeClass();
        element.target.parentNode.className = "is-active";
        setSelected(element.target.parentNode.id);
    }

    const views = () => {
        switch (selected) {
            case "games":
                return <div>
                    < ul className='games-display' >
                        {(loading)
                            ? (<LoadingCircle />)
                            : (gameDetails.length)
                                ? (gameDetails.map((game, i) => <li style={{ backgroundImage: `url(${game.background_image})` }}>
                                    <h1 className="card-title">{game.name}</h1>
                                </li>))
                                : <li>No games favourited.</li>
                        }

                    </ul >
                </div>;
            case "stats":
                return <FavChart gameDetails={gameDetails} />
            case "reviews":
                return <div>
                    < ul className='reviews-display' >
                        {(loading)
                            ? (<LoadingCircle />)
                            : (gameDetails.length)
                                ? (gameDetails.map((game, i) => <li >
                                    {GameReview(game)}
                                </li>))
                                : <li id="no-game">No games favourited.</li>
                        }

                    </ul >
                </div>;
        };
    }

    return (
        <div id="profile">
            <section className="hero is-dark">
                <div className="hero-body">
                    {/* change name */}
                    <div id="avatar">{user.username.charAt(0).toUpperCase()}</div>
                </div>

                <div className="hero-foot">
                    <nav className="tabs is-boxed is-fullwidth">
                        <div className="container">
                            <ul onClick={(element) => handle(element)}>
                                <li id="reviews"><a>My Reviews</a></li>
                                <li id="games"><a>My Favourites</a></li>
                                <li id="stats"><a>My Stats</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </section>
            {
                views()
                // (selected)
                //     ? <div>
                //         < ul className='games-display' >
                //             {(loading)
                //                 ? (<LoadingCircle />)
                //                 : (gameDetails.length)
                //                     ? (gameDetails.map((game, i) => <li style={{ backgroundImage: `url(${game.background_image})` }}>
                //                         <h1 className="card-title">{game.name}</h1>
                //                     </li>))
                //                     : <li>No games favourited.</li>
                //             }

                //         </ul >
                //     </div>
                //     : <FavChart gameDetails={gameDetails} />
            }
        </div>
    );
}