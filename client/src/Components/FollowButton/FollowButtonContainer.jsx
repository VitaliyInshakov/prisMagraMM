import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";

import FollowButtonPresenter from "./FollowButtonPresenter";
import { FOLLOW_USER, UNFOLLOW_USER } from "./FollowButtonQueries";

const FollowButtonContainer = ({ isFollowing, id }) => {
    const [isFollowingS, setIsFollowing] = useState(isFollowing);
    const followMutation = useMutation(FOLLOW_USER, { variables: { id } });
    const unfollowMutation = useMutation(UNFOLLOW_USER, { variables: { id } });

    const onClick = () => {
        if (isFollowingS === true) {
            setIsFollowing(false);
            unfollowMutation();
        } else {
            setIsFollowing(true);
            followMutation();
        }
    };

    return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />;
};

FollowButtonContainer.propTypes = {
    isFollowing: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
};

export default FollowButtonContainer;