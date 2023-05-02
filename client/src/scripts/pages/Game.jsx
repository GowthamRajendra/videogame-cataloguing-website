import { useLocation } from 'react-router-dom'
import "../../styles/game.css"
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getGameById } from "../api/getGameByID";
import "../../styles/tags.css"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import { Rating } from 'react-simple-star-rating';
import $ from 'jquery';
import GameChart from "../components/gameChart.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { addToFavourites, removeFromFavourites, updateFavourites } from '../api/favouriteGame';
import LoadingCircle from '../components/loadingCircle';

// gamepage

export default function Gamepage() {
  const { user } = useAuthContext();

  const info = useLocation();
  const [ad_info, setAdInfo] = useState({});
  const [gameExist, setgameExist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentGame, setCurrentGame] = useState({});
  const [main_image, setMainImage] = useState(info.state.background_image);

  const colors = ["tag-yellow tag-lg", "tag-blue tag-lg", "tag-green tag-lg", "tag-red tag-lg"];

  // get the info for this page on initialization
  useEffect(() => {
    async function getGameInfo() {
      const data = await getGameById(info.state.id);
      setAdInfo(data);
    }

    getGameInfo();
  }, [])

  useEffect(() => {
    loadFavourite();
  }, [user, loading, gameExist]);

  async function loadFavourite() {
    // only get info if user is logged in
    if (user) {
      $.ajax({
        url: "http://localhost:3000/user/games",
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.JWT}`,
        },
        success: function (data) {
          for (const game of data) {
            if (game.gameID == info.state.id && user.userID == game.user_id) {
              setCurrentGame(game);
              setgameExist(true);
              break;
            }
            else {
              setgameExist(false);
            }
          }

          setLoading(false)
        },
        error: function (error) {
          console.log(error);
        }
      })
    }
  }

  //function to change main image
  function changeImage(e) {
    setMainImage(e.target.src);
  }

  const handleAdd = async () => {
    setLoading(true);
    const newGame = await addToFavourites(user, ad_info.id, info.state.name, info.state.background_image);
    setCurrentGame(newGame);
  }

  const handleRemove = async () => {
    setLoading(true);
    await removeFromFavourites(user, currentGame._id);
    setgameExist(false);
  }

  const handleRating = async (rating) => {
    setLoading(true);
    await updateFavourites(user, rating, currentGame.review, currentGame._id);
  }

  const handleReview = async (event) => {
    event.preventDefault();
    const review = event.target[0].value;
    setLoading(true);
    await updateFavourites(user, currentGame.rating, review, currentGame._id);
  }

  return (
    <section className="gamepage">
      {/* set title of the game */}
      <h1 id='game_name'> {info.state.name} </h1>
      {/* set main image of the game */}
      <div>
        <img id='game_pic' src={main_image} alt="abtimg" />
      </div>
      {/* create carousel swiper for the additional game pictures */}
      <Swiper slidesPerView={3} spaceBetween={0} freeMode={true} pagination={{ clickable: true, }}
        modules={[FreeMode, Pagination]} className="mySwiper">
        {(info.state.short_screenshots.map((pic) => <SwiperSlide onClick={changeImage}><img src={pic.image} /></SwiperSlide>))}
      </Swiper>

      <div id='details'>
        <div id="rating-bar">
          {
            (user) ?
              <div className="my-box">
                {(!loading ?
                  (!gameExist ?
                    <button disabled={loading} onClick={() => { handleAdd() }} className="button is-success favourite">
                      <span className="icon">
                        <i className="fa-solid fa-heart"></i>
                      </span>
                      <span>Add to Favourites</span>

                    </button>
                    :
                    <div id="update-game">
                      <div className="field" id="unfavourite">
                        <button disabled={loading} onClick={() => { handleRemove() }} className="button is-danger favourite">
                          <span className="icon">
                            <i className="fa-solid fa-heart-crack"></i>
                          </span>
                          <span>Remove from Favourite</span>
                        </button >
                      </div>
                      <div className="field">
                        <label className="label">Rating</label>
                        <Rating
                          className="star-rating"
                          onClick={handleRating}
                          initialValue={currentGame.rating == -1 ? 0 : currentGame.rating}
                          readonly={loading}
                        />
                      </div>
                      <form id="review" onSubmit={(event) => handleReview(event)}>
                        <div className="field">
                          <label className="label">Review</label>
                          <div className="control">
                            <textarea
                              defaultValue={currentGame.review}
                              className="textarea"
                              placeholder="Write youre review here..."></textarea>
                          </div>
                        </div>
                        <div className="field">
                          <p className="control">
                            {/* disable button if request is currently being made. avoid multiple requests */}
                            <button disabled={loading} className="button is-success">
                              {(currentGame.review == "") ? "Add Review" : "Update Review"}
                            </button>
                          </p>
                        </div>
                      </form>
                    </div >)
                  : <span id="spinner" className="icon">
                    <LoadingCircle />
                  </span>)}
              </div>
              : <p></p>
          }
        </div >

        {/* set game descriptions */}
        <div className='my-box'>
          <h2 id='description_headings'>Description</h2>
          <p id='game_description'>{ad_info.description_raw}</p></div>

        {/* set game details */}
        <div className='my-box'>
          <h2 id='detail_headings'>Game Details</h2>
          <p className='detail'>Ratings: <div className='list'><span className="tag-firebase tag-lg">{ad_info.rating}/5</span></div></p>
          <p className='detail'>Genre:{(info.state.genres.length > 0) ? (info.state.genres.map((genre) => <div className='list'> <span className="tag-angular tag-lg"> {genre.name} </span></div>)) : <span className="tag-angular tag-lg">N/A</span>}</p>
          <p className='detail'>Tags:{(ad_info.tags?.length > 0) ? (ad_info.tags?.map((tag) => <div className='list'><span className="tag-ios tag-lg"> {tag.name} </span></div>)) : <span className="tag-ios tag-lg"> "N/A"</span>}</p>
          <p className='detail'>Platforms:{(info.state.platforms.length > 0) ? (info.state.platforms.map((platform) => <div className='list'> <span className="tag-typescript tag-lg"> {platform.platform.name} </span></div>)) : <span className="tag-typescript tag-lg">"N/A"</span>}</p>
          <p className='detail'>Store:{(info.state.stores.length > 0) ? (info.state.stores.map((store) => <div className='list'><span className="tag-python tag-lg"> {store.store.name}</span></div>)) : <span className="tag-react tag-lg">"N/A"</span>}</p>
          <p className='detail'>ESRB Rating: <div className='list'><span className="tag-react tag-lg">{info.state.esrb_rating ? info.state.esrb_rating.name : "N/A"}</span></div></p>
        </div>

        {/* set game rating legends */}
        <div className='my-box'>
          <h2 id='rating_headings'>Game Ratings</h2>
          <p id='legend'>{(info.state.ratings.map((ratings, i) => <span className={colors[i]}>{ratings.title}: {ratings.percent}%</span>))}</p>
          {/* call Chart component */}
          <GameChart />
        </div>
      </div >
    </section >
  )
}

