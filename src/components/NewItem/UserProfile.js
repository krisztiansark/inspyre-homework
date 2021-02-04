import React from "react";
import { H3, Img } from "../../utils/globalStyles";
import { ProfileCard, ProfileDiv } from "./NewItemStyle";
import PropTypes from "prop-types";
function UserProfile({ users, selected, handlePerson }) {
  return (
    <>
      <ProfileDiv
        data-testid="profiles-container"
        className="row mx-auto justify-content-center w-100"
        data-testid="profile-div"
      >
        {users.map((user, i) => (
          <ProfileCard
            className="row mx-auto justify-content-center w-75"
            key={user.id}
            id={user.id}
            onClick={handlePerson}
            selected={selected[i]}
          >
            <H3 className="col-6 my-auto mx-auto" noPointer>
              {user.name}
            </H3>
            <Img
              selected={selected[i]}
              className="my-auto mx-auto image"
              noPointer
              alt={user.name}
              src={user.profilePictureUrl}
            />
          </ProfileCard>
        ))}
      </ProfileDiv>
    </>
  );
}
UserProfile.propTypes = {
  users: PropTypes.array,
  selected: PropTypes.array,
  handlePerson: PropTypes.func,
};
export default UserProfile;
