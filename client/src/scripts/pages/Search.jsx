import { useEffect } from 'react';
import { useState } from 'react';
import { getGames } from '../api/getGames';
import { getNextGames } from '../api/getNextGames';
import { getGameByTag } from '../api/getGameByTag';
import { useSearchParams } from 'react-router-dom';
import Gamecard from '../components/gameCard';
import LoadingCircle from '../components/loadingCircle';

// search page

export default function Search() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('q');
    const tag = searchParams.get('tag');
    const [games, setGames] = useState([]);
    const [page, setPage] = useState({ next: false, prev: false });
    const [loading, setLoading] = useState(false);

    async function handleSearch() {
        setLoading(true);
        let data = [];
        if (search || search === "") {
            data = await getGames(search);
        } else if (tag) {
            data = await getGameByTag(tag);
        }

        setGames(data.games ?? []);
        setPage({ next: data.next ?? false, prev: data.prev ?? false });
        setLoading(false);
    }

    // get the searched games
    useEffect(() => {
        handleSearch();
        console.log(`Search: ${search}, Tag: ${tag}`);
    }, [search]);

    // view next/prev page of games
    async function changePage(e) {
        e.preventDefault();

        setLoading(true);
        const data = await getNextGames(e.target.value);

        setGames(data.games);
        setPage({ next: data.next, prev: data.prev });
        setLoading(false);
    }

    return <div className="has-text-white">
        < ul className='games-display' >
            {(loading)
                ? <LoadingCircle />
                : (games.length)
                    ? (games.map((game, i) => <Gamecard game={game} i={i} />))
                    : <div className='no-results'>No games found.</div>
            }
        </ul >
        <button className='button is-info' disabled={!page.prev} value={'prev'} onClick={changePage}>{"<"}</button>
        <button className='button is-info' disabled={!page.next} value={'next'} onClick={changePage}>{">"}</button>
    </ div >
}