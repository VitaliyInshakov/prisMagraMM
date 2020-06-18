import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeRooms: async (_, __, { request, isLogined }) => {
            isLogined(request);
            const { user } = request;
            return prisma.rooms({
                where: {
                    participants_some: {
                        id: user.id
                    }
                }
            });
        }
    }
}