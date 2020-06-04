export const COMMENT_FRAGMENT = `
    fragments CommentParts on Comment {
        id
        text
        user {
            username
        }
    }
`;