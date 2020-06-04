import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: async (_, args ) => {
            const user = await prisma.user({ id: args.id });
            const posts = await prisma.user({ id: args.id }).posts();

            return {
                user,
                posts,
            };
        },
    }
}