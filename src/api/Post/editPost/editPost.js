import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editPost: async (_, args, { request, isLogined}) => {
            isLogined(request);
            const { id, caption, locations, action } = args;
            const { user } = request;
            const post = await prisma.$exists.post({id, user: {id: user.id}});

            if (post) {
                if (action === "EDIT") {
                    return prisma.updatePost({data: {caption, locations}, where: { id }});
                } else if (action === "DELETE") {
                    return prisma.deletePost({ id });
                }
            } else {
                throw Error("You can't do that");
            }
        }
    }
}