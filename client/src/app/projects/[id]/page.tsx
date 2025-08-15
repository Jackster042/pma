"use client";

import React, { useState } from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../BoardView";
import List from "../ListView";
import Table from "../TableView";
import Timeline from "../TimelineView";

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
      {activeTab === "Board" && (
        <Board setIsModalNewTaskOpen={setIsModalNewTaskOpen} id={id} />
      )}
      {activeTab === "List" && <List />}
      {activeTab === "Timeline" && <Timeline />}
      {activeTab === "Table" && <Table />}
    </div>
  );
};

export default Project;
