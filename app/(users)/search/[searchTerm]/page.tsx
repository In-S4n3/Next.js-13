import React from "react";

type SearchResults = {
  organic_results: [
    {
      position: number;
      title: string;
      link: string;
      thumbnail: string;
      snippet: string;
    }
  ];
};

const getSearch = async (searchTerm: string) => {
  const res = await fetch(
    `https://serpapi.com/search.json?q=${searchTerm}&api_key=${process.env.API_KEY}`
  );
  const search: SearchResults = await res.json();
  return search;
};

const SearchResults = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const searchResults = await getSearch(searchTerm);
  return (
    <div>
      <p className="text-sm text-gray-500 py-4">
        You searched for: {searchTerm}
      </p>
      <ol className="space-y-3 p-5">
        {searchResults.organic_results.map((result) => {
          return (
            <li key={result.position} className="list-decimal">
              <p className="font-bold">{result.title}</p>
              <p>{result.snippet}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default SearchResults;
