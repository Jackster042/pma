"use client";

import React, { useState } from "react";
import ProjectHeader from "../ProjectHeader";

type Props = {
  params: Promise<{ id: string }>;
};

const Project = ({ params }: Props) => {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;
  const [activeTab, setActiveTab] = useState<string>("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState<boolean>(false);

  return (
    <div>
      {/* Modal for new task */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Project;
