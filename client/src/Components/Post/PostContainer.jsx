import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";

import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { ADD_COMMENT, TOGGLE_LIKE } from "./PostQueries";

const PostContainer = ({
    id,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    createdAt,
}) => {
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const comment = useInput("");

    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, { variables: { postId: id } });
    const [addCommentMutation] = useMutation(ADD_COMMENT, { variables: { postId: id, text: comment.value } });

    const slide = () => {
        const totalFiles = files.length;
        if (currentItem === totalFiles - 1) {
            setTimeout(() => setCurrentItem(0), 3000);
        } else {
            setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        }
    };

    useEffect(() => {
        slide();
    }, [currentItem]);

    const toggleLike = () => {
        toggleLikeMutation();

        if (isLikedS) {
            setIsLiked(false);
            setLikeCount(likeCountS - 1);
        } else {
            setIsLiked(true);
            setLikeCount(likeCountS + 1);
        }
    };

    return (
        <PostPresenter
            user={user}
            files={files}
            isLiked={isLikedS}
            likeCount={likeCountS}
            comments={comments}
            createdAt={createdAt}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            currentItem={currentItem}
            toggleLike={toggleLike}
        />
    );
};

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
    }).isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    })).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired
        }).isRequired
    })).isRequired,
    createdAt: PropTypes.string.isRequired,
}

export default PostContainer;
