import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeRoom: async (_, args, { request, isLogined}) => {
            isLogined(request);
            const { id } = args;
            const { user } = request;

            const canSee = await prisma.$exists.room({
                participants_some: {
                    id: user.id
                }
            });

            if (canSee) {
                return prisma.room({ id }).$fragment(ROOM_FRAGMENT);

            } else {
                throw new Error("You can't see this room")
            }
        }
    }
}