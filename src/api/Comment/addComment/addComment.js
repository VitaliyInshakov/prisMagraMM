import { isLogined } from "../../../middlewares";
import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addComment: async (_, args, { request }) => {
            isLogined(request);

            const { text, postId } = args;
            const { user } = request;
            return prisma.createComment({
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                post: {
                    connect: {
                        id: postId,
                    },
                },
                text,
            });
        }
    }
}