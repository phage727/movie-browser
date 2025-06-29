import "../css/Favorites.css"; 
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites){
        return (
            <div>
        <h1 className="head">Your Favorites</h1>
        <div className="favorites">
            <div className="movies-grid">
                {favorites.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
       </div>
           
        );
    }
    return (
        <div className="favorites">
            <h1>Your Favorites</h1>
            <p>You have no favorite movies yet.</p>
        </div>
    );
}

export default Favorites;
