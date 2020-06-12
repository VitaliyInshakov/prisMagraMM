import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeMyUser: async (_, __, { request, isLogined }) => {
            isLogined(request);
            const user = prisma.user({ id: request.user.id });
            const posts = prisma.user({ id: request.user.id }).posts();

            return {
                user,
                posts,
            };
        }
    }
}