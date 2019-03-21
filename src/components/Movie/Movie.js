import React from 'react';
import { API_URL, API_KEY } from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';

export default class Movie extends React.Component {

    state = {
        movie: null,
        loading: false,
        actors: []
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        const endPoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
        this.fetchItems(endPoint);
    }

    fetchItems = (endPoint) => {
        fetch(endPoint)
        .then(result => result.json())
        .then(result => {
            console.log('fetchResults:', result);
            if(result.status_code) {
                this.setState({loading: false})
            } else {
                console.log('setting state:-', result)
                this.setState({
                    movie: result,
                    loading: false,
                    actors: result.credits.cast
                });
            }
        })
        .catch(error => console.error('Error:->', error));
    }
    render() {
        console.log('myMovie:', this.state.movie);
        return (
            <div className="rmdb-movie">
                {this.state.movie ? 
                    <div>
                        <Navigation movie={this.state.movie.title}/>
                        <MovieInfo movie={this.state.movie}/>
                        <MovieInfoBar time={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue}/>

                    </div>
                
                    :

                    null
                }
               
                {this.state.actors ? 
                    <div className="rmdb-movie-grid">
                        <FourColGrid 
                            header={'Actors'}
                        >
                            {this.state.actors.map((element, i) => {
                                return <Actor 
                                            key={i} 
                                            actor={element}
                                        />
                            })}
                        </FourColGrid>
                    </div>
                    :
                    null
                }
                {this.state.loading ? <Spinner /> : null}
            </div>
        );
    }
}