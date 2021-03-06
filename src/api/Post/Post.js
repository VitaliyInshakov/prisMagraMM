import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        isLiked: async (parent, _, {request}) => {
            const {user} = request;
            const {id: parentId} = parent;
            return prisma.$exists.like({
                AND: [
                    {
                        user: {id: user.id}
                    },
                    {
                        post: {id: parentId}
                    },
                ]
            })
        },
        likeCount: (parent) => prisma.likesConnection({where: {post: {id: parent.id}}}).aggregate().count(),
        commentCount: (parent) => prisma.commentsConnection({where: {post: {id: parent.id}}}).aggregate().count(),
        files: parent => prisma.post({id: parent.id}).files(),
        comments: parent => prisma.post({id: parent.id}).comments(),
        likes: parent => prisma.post({id: parent.id}).likes(),
        user: parent => prisma.post({id: parent.id}).user(),
    }
}