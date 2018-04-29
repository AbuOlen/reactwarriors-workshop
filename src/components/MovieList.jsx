import React from "react";
import MovieItem from "./MovieItem";
import { API_KEY_3 } from "../utils";

export default class MovieList extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      isFetched: false
    };
  }

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.type
      }?api_key=${API_KEY_3}&language=en-US&region=ru&page=1`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results,
          isFetched: true
        });
      });
  }

  render() {
    const { movies, isFetched } = this.state;
    console.log("type", this.props.type);
    return (
      <div className="row">
        {isFetched ? (
          movies.map(item => {
            return (
              <div className="col-6" key={item.id}>
                <MovieItem item={item} />
              </div>
            );
          })
        ) : (
          <p>...Loading</p>
        )}
      </div>
    );
  }
}
