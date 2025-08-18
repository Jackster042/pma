"use client";

import React, { useEffect, useState } from "react";
import { useSearchQuery } from "@/state/api";
import Header from "@/components/Header";
import { debounce } from "lodash";
import TaskCard from "@/components/TaskCard";
import ProjectCard from "@/components/ProjectCard";
import UserCard from "@/components/UserCard";

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

      <div className="flex flex-col gap-6 p-5">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
        {isLoading && <p>Loading...</p>}
        {error && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !error && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {/* Tasks */}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {/* Project */}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {/* User */}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
