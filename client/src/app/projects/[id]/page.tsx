"use client";

import React, { useState } from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../BoardView";
import List from "../ListView";
import Table from "../TableView";
import Timeline from "../TimelineView";
import ModalNewProject from "../ModalNewProject";
import ModalNewTask from "@/components/ModalNewTask";

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
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board setIsModalNewTaskOpen={setIsModalNewTaskOpen} id={id} />
      )}
      {activeTab === "List" && (
        <List setIsModalNewTaskOpen={setIsModalNewTaskOpen} id={id} />
      )}
      {activeTab === "Timeline" && (
        <Timeline setIsModalNewTaskOpen={setIsModalNewTaskOpen} id={id} />
      )}
      {activeTab === "Table" && (
        <Table setIsModalNewTaskOpen={setIsModalNewTaskOpen} id={id} />
      )}
    </div>
  );
};

export default Project;
