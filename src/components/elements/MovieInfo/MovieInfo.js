import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../config';
import FontAwesome from 'react-fontawesome';
import MovieThumb from '../MovieThumb/MovieThumb';
import './MovieInfo.css';

const MovieInfo = (props) => {
    console.log('prop', props);
    return (
        <div className="rmdb-movieinfo"
            style={{
                background: props.movie.backdrop_path ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.movie.backdrop_path})` : '#000'
            }}
        >
            <div className="rmdb-movieinfo-content">
                <div className="rmdb-movieinfo-thumb">
                    <MovieThumb 
                        clickable={false}
                        image={props.movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.movie.poster_path}` : '../../public/images/no_image.jpg'}
                        movieId={props.movie.id}
                        movieName={props.movie.original_title}
                    />
                </div>
                <div className="rmdb-movieinfo-text">
                    <h1>{props.movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{props.movie.overview}</p>
                    <h3>IMDB RATING</h3>
                    <div className="rmdb-rating">
                        <meter min="0" max="100" optimum="100" low="40" high="70" value={props.movie.vote_average * 10}></meter> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieInfo;