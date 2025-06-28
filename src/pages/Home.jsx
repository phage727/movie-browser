import MovieCard from "../components/MovieCard";
import {useState, useEffect, use} from "react";
import "../css/Home.css"; 
import { searchMovies, getPopularMovies } from "../services/API";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load popular movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);
    

const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if(loading) return; 

    setLoading(true);
    try {
       const searchResult = await searchMovies(searchQuery)
       setMovies(searchResult);
       setError(null);
    }catch (err) {
        console.log(err);
        setError("Failed to search for movies. Please try again later.");
    }finally {
        setLoading(false);
    }


    // setSearchQuery("");
};
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">  
                <input type="text" placeholder="Search for a movie..." className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {loading ? 
                <div className="loading">Loading...</div>
                :
                <div className="movies-grid">
                    {movies.map(movie =>  
                    <MovieCard key={movie.id} movie={movie} />
                    )}
                </div>
            }
        </div>
    );
}
 

export default Home;