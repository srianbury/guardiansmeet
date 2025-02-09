import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../helpers/mediaQueries";
import ProfilePicPlaceHolder from "../../images/Portrait_placeholder.png";
import Cookies from "js-cookie";

const ProfileCard = ({ user, handleChat, showChatBtn, loggedInUser }) => {
  const [showMatchedCheck, setshowMatchedCheck] = useState(false);
  const [showAcceptedMessage, setShowAcceptedMessage] = useState(false);
  useEffect(() => {
    if (loggedInUser && loggedInUser.sentMatches) {
      loggedInUser.sentMatches.forEach(matches => {
        if (matches.id === user._id && matches.accepted === false) {
          setshowMatchedCheck(true);
        } else if (matches.id === user._id && matches.accepted === true) {
          setShowAcceptedMessage(true);
        }
      });
    }
  }, []);
  return (
    <>
      <UserProfileContainer>
        <UserImageContainer>
          <UserImage
            src={
              user.profilePicture ? user.profilePicture : ProfilePicPlaceHolder
            }
          ></UserImage>
        </UserImageContainer>
        <UserDetails>
          <UserNameContainer>
            <UserName>
              {user.name}, {user.age}
            </UserName>
            <UserUsername>@{user.username}</UserUsername>
          </UserNameContainer>
          {user.bio && <UserBio>{user.bio}</UserBio>}
          {Cookies.get("token") && showChatBtn && (
            <ConnectBtnContainer>
              {showMatchedCheck && <ConnectBtn>Waiting</ConnectBtn>}
              {showAcceptedMessage && <ConnectBtn>Accepted</ConnectBtn>}
              {!showMatchedCheck && !showAcceptedMessage && (
                <ConnectBtn onClick={() => handleChat(user)}>Chat</ConnectBtn>
              )}
            </ConnectBtnContainer>
          )}
        </UserDetails>
      </UserProfileContainer>
    </>
  );
};

export default ProfileCard;

const UserProfileContainer = styled.div`
  background: hsl(213, 16%, 82%);
  width: 300px;
  height: 280px;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 15px 30px hsla(0, 0%, 0%, 0.2);
`;
const UserImageContainer = styled.div`
  height: 100px;
  position: absolute;
  bottom: 230px;
  border-radius: 100%;
  border: 2px solid hsl(262, 100%, 78%);
  background-color: hsl(0, 0%, 91%);
`;
const UserImage = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 100%;
`;
const UserDetails = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  width: 100%;
  align-items: center;
  justify-items: center;
  margin-top: 52px;
  color: hsl(210, 24%, 16%);
  padding: 10px;
`;
const UserNameContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 5px;
`;
const UserName = styled.p`
  grid-row: 1;
  font-size: 20px;
`;
const UserUsername = styled.p`
  align-self: center;
  justify-self: center;
`;
const UserBio = styled.p`
  padding: 10px;
  font-size: 14px;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
const ConnectBtnContainer = styled.div`
  justify-self: end;
  padding-right: 10px;
`;
const ConnectBtn = styled.button`
  width: 100px;
  background: hsl(274, 87%, 37%);
  border: none;
  height: 30px;
  border-radius: 6px;
  font-size: 16px;
  color: hsl(216, 33%, 97%);
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;

  :hover {
    box-shadow: none;
    transform: translateY(-2px);
    background: hsl(273, 80%, 47%);
  }
`;
