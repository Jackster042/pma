import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });

    console.log(newProject, "NEW PROJECT FROM PROJECT CONTROLLER");

    await prisma.$queryRaw`
  SELECT setval(
    pg_get_serial_sequence('"Project"', 'id'), 
    COALESCE((SELECT MAX(id) FROM "Project"), 1),
    true
  );
`;

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error, "Error from createProject");
    res.status(500).json({
      message: `Error creating project`,
    });
  }
};
