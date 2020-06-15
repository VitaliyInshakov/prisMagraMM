import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isLogined }) => {
            isLogined(request);
            const { roomId, message, to } = args;
            const { user } = request;
            let room;
            if (!roomId) {
                if (user.id !== to) {
                    room = await prisma.createRoom({
                        participants: {
                            connect: [{ id: to }, { id: user.id }]
                        }
                    }).$fragment(ROOM_FRAGMENT);
                }
            } else {
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
            }

            if (!room) {
                throw new Error("Room not found");
            }

            const getTo = room.participants.filter(participant => participant.id !== user.id)[0];
            return prisma.createMessage({
                text: message,
                from: { connect: { id: user.id } },
                to: { connect: { id: roomId ? getTo.id : to } },
                room: { connect: { id: room.id } }
            });
        }
    }
}