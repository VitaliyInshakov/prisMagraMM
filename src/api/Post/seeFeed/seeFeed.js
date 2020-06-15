import {prisma} from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFeed: async (_, __, { request, isLogined }) => {
            isLogined(request);
            const { user } = request;
            const following = await prisma.user({ id: user.id }).following();

            return prisma.posts({
                where: {
                    user: {
                        id_in: [...following.map(({ id }) => id), user.id]
                    }
                },
                orderBy: "createdAt_DESC"
            });
        }
    }
}