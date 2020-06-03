import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            return prisma.user({ id: args.id });
        }
    }
}