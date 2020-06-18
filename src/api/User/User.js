import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: parent => `${parent.firstName} ${parent.lastName}`,
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                    AND: [
                        {
                            id: user.id
                        },
                        {
                            followers_some: { id: parentId }
                        },
                    ]
                });
            } catch(error) {
                console.error(error);
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        },
        posts: parent => prisma.user({id: parent.id}).posts(),
        following: parent => prisma.user({id: parent.id}).following(),
        followers: parent => prisma.user({id: parent.id}).followers(),
        likes: parent => prisma.user({id: parent.id}).likes(),
        comments: parent => prisma.user({id: parent.id}).comments(),
        rooms: parent => prisma.user({id: parent.id}).rooms(),
        followingCount: parent => {
            return prisma.usersConnection({ where: { followers_some: { id: parent.id}}}).aggregate().count();
        },
        followersCount: parent => {
            return prisma.usersConnection({ where: { following_none: { id: parent.id}}}).aggregate().count();
        },
    }
}