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
    <div className="flex flex-col rounded border p-4 shadow">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Start Date: {format(startDate, "MMM dd, yyyy")}</p>
      <p>End Date: {format(endDate, "MMM dd, yyyy")}</p>
    </div>
  );
};

export default ProjectCard;
