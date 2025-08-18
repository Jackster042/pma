import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center rounded border p-4 shadow-xl">
      {user?.profilePictureUrl && (
        <Image
          src={`/${user.profilePictureUrl}`}
          alt={user.username}
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div className="ml-4">
        <h3 className="text-lg font-bold">{user.username}</h3>
        <p>{user.teamId}</p>
      </div>
    </div>
  );
};

export default UserCard;
