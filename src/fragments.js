export const COMMENT_FRAGMENT = `
    id
    text
    user {
        ${USER_FRAGMENT}
    }
`;

export const USER_FRAGMENT = `
    id
    username
    avatar
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const FULL_POST_FRAGMENT =  `
    fragment PostParts on Post {
        id
        locations
        caption
        likes
        isLiked
        likeCount
        createdAt
        updatedAt
        files {
            ${FILE_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
        user {
            ${USER_FRAGMENT}
        }
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            ${USER_FRAGMENT}
        }
        messages {
            ${MESSAGE_FRAGMENT}
        }
    }
`;

export const MESSAGE_FRAGMENT = `
    fragment MessageParts on Message {
        id
        text
        to {
            ${USER_FRAGMENT}
        }
        from {
            ${USER_FRAGMENT}
        }
    }
`;