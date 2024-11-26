import MoviePoster from "@/components/MoviePoster";
import db from "@/db";
import { Movie, SimilarMovie } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

// Refresh cache every 24 hours
export const revalidate = 60 * 60 * 24;

async function MoviePage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const movies = db.collection("movies");

  // Fetch the movie details
  const search = await movies.find({ $and: [{ _id: id }] });

  // If the movie is not found, return a 404 page
  if (!(await search.hasNext())) {
    return notFound();
  }

  // Get the movie data
  const movie = (await search.next()) as Movie;

  // Fetch similar movies
  const similarMovies = (await movies
    .find(
      {},
      {
        vector: movie.$vector,
        limit: 12, // Include the current movie + 5 similar movies
        includeSimilarity: true, // Compute similarity
      }
    )
    .toArray()) as SimilarMovie[];

  // Log the similar movies for debugging
  //console.log("Similar Movies Array:", similarMovies);

  // Remove the first movie (same as the one being displayed)
  similarMovies.shift();

  return (
    <div>
      {/* Movie Details Section */}
      <div className="flex flex-col md:flex-row items-center gap-y-10 p-10 pb-0">
        <Image
          src={movie.Poster}
          alt={movie.Title}
          width={300}
          height={450}
          className="shrink-0 rounded-lg "
        />
        <div className="px-2 md:px-10 flex flex-col gap-y-2">
          <h1 className="text-6xl font-bold ">{movie.Title}</h1>
          <p className="text-gray-600 text-white">{movie.Genre}</p>
          <p className="font-light">{movie.$vectorize}</p>

          <div className="mt-auto grid grid-cols-2 text-white">
            <div className="font-semibold text-white">
              <p>Directed by</p>
              <p>Box Office:</p>
              <p>Released:</p>
              <p>Runtime:</p>
              <p>Rated:</p>
              <p>IMDB Rating:</p>
              <p>Language:</p>
              <p>Country:</p>
              <p>Featuring:</p>
            </div>
            <div>
              <p>{movie.Director}</p>
              <p>{movie.BoxOffice}</p>
              <p>{movie.Released}</p>
              <p>{movie.Runtime} min</p>
              <p>{movie.Rated}</p>
              <p>{movie.imdbRating}</p>
              <p>{movie.Language}</p>
              <p>{movie.Country}</p>
              <p>{movie.Actors}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="">
        <h2 className="text-3xl pt-10 pl-10 font-bold ">
          Similar Films you may like
        </h2>
        <div className="flex justify-between items-center lg:flex-row gap-x-20 gap-y-10 pl-20 pr-10 py-10 overflow-x-scroll">
          {similarMovies.map((similarMovie, i) => (
            <MoviePoster
              key={similarMovie._id}
              index={i + 1}
              movie={similarMovie}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
