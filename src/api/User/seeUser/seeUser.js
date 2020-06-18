import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: async (_, args ) => {
            return prisma.user({ id: args.id });
        },
    }
}