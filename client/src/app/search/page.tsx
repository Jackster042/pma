"use client";

import React, { useEffect, useState } from "react";
import { useSearchQuery } from "@/state/api";
import Header from "@/components/Header";
import { debounce } from "lodash";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchQuery(searchTerm, { skip: searchTerm.length < 3 });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !error && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {/* Tasks */}
            {searchResults.tasks?.map((task) => (
              <div key={task.id}>{task.title}</div>
            ))}
            {/* Project */}
            {searchResults.projects?.map((project) => (
              <div key={project.id}>{project.name}</div>
            ))}
            {/* User */}
            {searchResults.users?.map((user) => (
              <div key={user.userId}>{user.username}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
