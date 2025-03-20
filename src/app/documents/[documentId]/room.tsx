"use client";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { FullscreenLoader } from "@/components/fullscreen-loader";
import { DEFAULT_LEFT_MARGIN, DEFAULT_RIGHT_MARGIN } from "@/lib/constants";
import { Id } from "../../../../convex/_generated/dataModel";
import { getDocuments, getUsers } from "./action";

type User = {
  id: string;
  name: string;
  avatar: string;
};

const Room = ({ children }: { children: ReactNode }) => {
  const params = useParams<{ documentId: string }>();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId;

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });

        return await response.json();
      }}
      throttle={16}
      resolveUsers={({ userIds }) =>
        userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        )
      }
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);

        return documents.map((document) => ({ ...document }));
      }}
    >
      <RoomProvider
        id={params.documentId}
        initialStorage={{
          leftMargin: DEFAULT_LEFT_MARGIN,
          rightMargin: DEFAULT_RIGHT_MARGIN,
        }}
      >
        <ClientSideSuspense
          fallback={<FullscreenLoader label="Document loading..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export { Room };
