import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      res.status(200).json({
        message: "No users found",
        data: users,
      });
    } else {
      res.status(200).json({
        message: "Users retrieved successfully",
        data: users,
      });
      return;
    }
    res.json(users);
  } catch (error) {
    console.error(error, "Error from getUser");
    res.status(500).json({ message: `Error retrieving user` });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: Number(id),
      },
    });
    console.log(user, "USER");
    res.json(user);
  } catch (error) {
    console.error(error, "Error from getUser");
    res.status(500).json({ message: `Error retrieving user` });
  }
};

export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      username,
      cognitoId: userId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;

    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId: userId,
        profilePictureUrl,
        teamId,
      },
    });
    res.json({ message: "User Created Successfully", newUser });
  } catch (error) {
    console.error(error, "Error from getUser");
    res.json({ message: `Error creating user` });
  }
};
