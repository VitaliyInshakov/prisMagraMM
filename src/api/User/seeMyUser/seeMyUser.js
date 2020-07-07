import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeMyUser: async (_, __, { request, isLogined }) => {
            isLogined(request);
            return prisma.user({ id: request.user.id });
        }
    }
}