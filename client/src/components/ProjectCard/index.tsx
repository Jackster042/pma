import { Project } from "@/state/api";
import { format, parseISO } from "date-fns";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  const startDate = parseISO(project.startDate as string);
  const endDate = parseISO(project.endDate as string);
  return (
    <div className="dark:bg-dark-tertiary dark:shadow-dark-tertiary flex flex-col rounded border p-4 shadow-lg dark:border-gray-500 dark:text-white">
      <div className="">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <p>Start Date: {format(startDate, "MMM dd, yyyy")}</p>
        <p>End Date: {format(endDate, "MMM dd, yyyy")}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
