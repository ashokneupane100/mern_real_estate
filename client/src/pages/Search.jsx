import SearchForm from "../components/forms/SearchForm";
import { useSearch } from "../context/search";
import AdCard from "../components/cards/AdCard";

export default function Search() {
  const [search, setSearch] = useSearch();

  return (
    <div className="bg-slate-900">
      <h1 className="text-4xl bg-blue-600 text-white p-5 text-center shadow-lg hover:bg-blue-800 transition duration-300 ease-in-out">
        Search
      </h1>
      <SearchForm />

      <div>
        <div className="row">
          {search.results?.length > 0 ? (
            <div className="col-md-12 text-center p-3 bg-black text-xl text-white">
            Found {search.results.length} Properties.

            </div>
          ) : (
            <div className="col-md-12 text-center bg-black text-xl text-white">Search above to find properties; No Properties here.</div>
          )}
        </div>

        <div className="row">
          {search.results?.map(item=><AdCard ad={item}
          key={item._id}
          
          />)}
        </div>





      </div>
    </div>
  );
}
