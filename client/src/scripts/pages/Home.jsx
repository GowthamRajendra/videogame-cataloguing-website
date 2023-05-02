import Gamecard from "../components/gameCard"
import '../../styles/loading.css';
import '../../styles/App.css'
import '../../styles/Home.css'
import LoadingCircle from "../components/loadingCircle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

function BannerSlides(banner_info) {
    let first_slide = true;
    const navigate = useNavigate();

    // redirect to search page with query
    function handleSearch(e) {
        navigate({ pathname: '/search', search: `?tag=${e.target.id}` });
    }

    return banner_info.tags?.map((tag, i) => {
        // removing some tags from the pool because they have reoccuring pictures and/or are boring.
        if (!["steam-achievements", "full-controller-support", "singleplayer", "multiplayer"].includes(tag.slug)) {
            return <SwiperSlide id={tag.slug} onClick={handleSearch}>
                <div style={{ backgroundImage: `url(${tag.image_background})` }}>
                    {(first_slide)
                        ? <h1 className="banner-title">Browse your favourite genres! {<br />}{tag.name}</h1>
                        : <h1 className="banner-title">{tag.name.toUpperCase()}</h1>}
                    {first_slide = false}
                </div>
            </SwiperSlide>
        }
    });
}

export default function Home(props) {
    return (<div id="Home" className="has-text-white">
        <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            id="banner"
            className="mySwiper"
        >
            {BannerSlides(props.banner_info)}
        </Swiper>
        <h1 className="">POPULAR</h1>
        < ul className='games-display'>
            {(props.loading)
                ? <LoadingCircle />
                : (props.games.length)
                    ? (props.games.map((game, i) => <Gamecard game={game} i={i} />))
                    : <li>No games found.</li>
            }
        </ul >
    </div>)
}