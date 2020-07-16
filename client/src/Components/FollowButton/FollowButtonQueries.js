import { gql } from "apollo-boost";

export const FOLLOW_USER = gql`
    mutation followUser($id: String!) {
        followUser(id: $id)
    }
`;

export const UNFOLLOW_USER = gql`
    mutation unfollowUser($id: String!) {
        unfollowUser(id: $id)
    }
`;