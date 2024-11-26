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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div
  className="relative w-full h-[60vh] flex flex-col items-center justify-center text-lef bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-cover bg-center"
  style={{ backgroundImage: `url('https://media.istockphoto.com/id/1409923351/photo/popcorn-in-yellow-white-striped-bucket.jpg?s=2048x2048&w=is&k=20&c=KCA3RaFQTS5IgptNnYFBQ1CWBXIsOrb8j_-WskAqTb8=')`,backgroundPosition: 'center 40%' }}
>
<h1 className="text-6xl font-extrabold text-gray-800">{movie.Title}</h1>
<p className="text-xl mt-4 text-gray-800">{movie.Genre}</p>
</div>


      {/* Movie Details */}
      <div className="max-w-6xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src={movie.Poster}
              alt={movie.Title}
              width={300}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-yellow-500">Movie Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-yellow-500">Directed by</p>
                <p>{movie.Director}</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-500">Box Office</p>
                <p>$ {movie.BoxOffice}</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-500">Released</p>
                <p>{movie.Released}</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-500">Runtime</p>
                <p>{movie.Runtime} min</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-500">IMDB Rating</p>
                <p>{movie.imdbRating}</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-500">Language</p>
                <p>{movie.Language}</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-500">Country</p>
                <p>{movie.Country}</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-500">Actors</p>
                <p>{movie.Actors}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="max-w-6xl mx-auto p-6 mt-10">
        <h2 className="text-3xl font-bold mb-6">Similar Films You May Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {similarMovies.length > 0 ? (
            similarMovies.map((similarMovie) => (
              <div
                key={similarMovie._id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <MoviePoster movie={similarMovie} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No similar movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
