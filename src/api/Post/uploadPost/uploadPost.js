import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        uploadPost: async (_, args, { request, isLogined }) => {
            isLogined(request);
            const { caption, files } = args;
            const { user } = request;
            const post = await prisma.createPost({ caption, user: { connect: { id: user.id } } });
            files.forEach(async file => {
                await prisma.createFile({ url: file, post: { connect: {id: post.id} } });
            });

            return post;
        }
    }
}