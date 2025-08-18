import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();
    console.log(teams, "TEAMS");

    if (!teams) res.status(404).json({ message: "No teams found" });

    const teamsWithUsernames = await Promise.all(
      teams.map(async (team) => {
        const productOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true },
        });
        const productManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true },
        });

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: productManager?.username,
        };
      })
    );

    console.log(teamsWithUsernames, "TEAMS WITH USERNAMES");
    res.json(teamsWithUsernames);
  } catch (error) {
    console.error(error, "Error from getTeams");
    res.status(500).json({ message: `Error retrieving teams` });
  }
};
