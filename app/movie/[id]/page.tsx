import MoviePoster from "@/components/MoviePoster";
import db from "@/db";
import { Movie, SimilarMovie } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

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

  if (!(await search.hasNext())) {
    return notFound();
  }

  const movie = (await search.next()) as Movie;

  // Fetch similar movies
  const similarMovies = (await movies
    .find(
      {
        _id: { $ne: movie._id },
        Genre: { $in: movie.Genre.split(", ") },
      },
      {
        vector: movie.$vector,
        limit: 12,
        includeSimilarity: true,
      }
    )
    .toArray()) as SimilarMovie[];

  similarMovies.shift(); // Optional: Remove the first movie if necessary

  return (
    <div>
      {/* Movie Details Section */}
      <div className="flex flex-col md:flex-row items-center gap-y-10 p-10 pb-0">
        <Image
          src={movie.Poster}
          alt={movie.Title}
          width={300}
          height={450}
          className="shrink-0 rounded-lg"
        />
        <div className="px-2 md:px-10 flex flex-col gap-y-2">
          <h1 className="text-6xl font-bold">{movie.Title}</h1>
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
      <div>
        <h2 className="text-3xl pt-10 pl-10 font-bold">Similar Films You May Like</h2>
        <div className="flex justify-between items-center lg:flex-row gap-x-20 gap-y-10 pl-20 pr-10 py-10 overflow-x-scroll">
          {similarMovies.length > 0 ? (
            similarMovies.map((similarMovie, i) => (
              <MoviePoster key={similarMovie._id} movie={similarMovie} />
            ))
          ) : (
            <p className="text-center text-gray-500">No similar movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
