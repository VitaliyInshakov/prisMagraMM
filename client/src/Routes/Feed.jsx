import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../Components/Loader";

const FEED_QUERY = gql`
    {
        seeFeed {
            id
            locations
            caption
            user {
                id
                avatar
                username
            }
            files {
                id
                url
            }
            likeCount
            isLiked
            comments {
                id
                text
                user {
                    id
                    username
                }
            }
            createdAt
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
`;

export default () => {
    const { data, loading } = useQuery(FEED_QUERY);

    return (
        <Wrapper>
            {loading && <Loader/>}
        </Wrapper>
    );
}