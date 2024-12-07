import { HomeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

function SearchInput() {
  async function searchAction(formData: FormData) {
    "use server";

    const searchTerm = formData.get("searchTerm") as string;

    redirect(`/search/${searchTerm}`);
  }

  return (
    <form
  action={searchAction}
  className="w-full flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-gray-50 to-gray-200 border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300"
>
  <Link href="/" className="flex-shrink-0">
    <HomeIcon className="h-8 w-8 text-gray-500 hover:text-gray-700 transition-colors duration-300" />
  </Link>
  <input
    type="text"
    className="flex-1 p-3 text-gray-700 placeholder-gray-400 bg-transparent outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white rounded-md"
    name="searchTerm"
    placeholder="What genres of movies do you prefer? "
  />
  <button
    type="submit"
    className="ml-3 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300"
  >
    Search
  </button>
</form>

  );
}

export default SearchInput;
