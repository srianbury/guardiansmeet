import React, { useEffect } from "react";
import ProfilePicPlaceHolder from "../../images/Portrait_placeholder.png";
import {
  MessagesPageContainer,
  MessagesContainer,
  MessagesItemContainer,
  UserProfilePicture,
  UserName,
  MessageDetails,
  InputBottomOfPageContainer,
  InputContainer,
  MessageInput,
  MessageSubmitButton,
  MessageTimeStamp,
  MessageDetailsContinaer,
  BackArrowContainer,
  BackContainerUsername,
  NoMessageText
} from "./MessagesPage_Styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Scroll from "react-scroll";
import { Loading } from "../loadingComponent/Loading";

const MessagesPage_View = ({
  user,
  messagesList,
  errors,
  values,
  handleChange,
  handleSubmit,
  messageGroupDetails,
  loading,
  currentUserProfilePicture
}) => {
  var animateScroll = Scroll.animateScroll;

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: "messagesDiv",
      behavior: "smooth"
    });
  }, [messagesList]);
  if (loading) {
    return (
      <MessagesPageContainer>
        <Loading />
      </MessagesPageContainer>
    );
  }
  return (
    <MessagesPageContainer>
      {messageGroupDetails && (
        <BackArrowContainer>
          <Link to="/messages">
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon="arrow-left"
              size="lg"
            />
          </Link>
          <BackContainerUsername>
            {messageGroupDetails.name}
          </BackContainerUsername>
        </BackArrowContainer>
      )}
      <MessagesContainer name="messagesDiv" id="messagesDiv">
        {messagesList[0] &&
          messagesList.map(message => (
            <MessagesItemContainer
              leftMargin={user.id == message.sender.id ? "auto" : "0"}
              direction={user.id == message.sender.id ? "row-reverse" : "row"}
              key={message._id}
            >
              {user.id !== message.sender.id && (
                <UserProfilePicture
                  src={
                    currentUserProfilePicture.profilePic
                      ? currentUserProfilePicture.profilePic
                      : ProfilePicPlaceHolder
                  }
                />
              )}
              <MessageDetailsContinaer>
                <MessageDetails>{message.messageDetails}</MessageDetails>
                <MessageTimeStamp>{message.timestamp}</MessageTimeStamp>
              </MessageDetailsContinaer>
            </MessagesItemContainer>
          ))}
        {messagesList.length <= 0 && (
          <NoMessageText>
            Send your first message to {messageGroupDetails.name}!
          </NoMessageText>
        )}
      </MessagesContainer>
      <InputBottomOfPageContainer>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <MessageInput
              borderColor={
                errors.message ? "1px solid hsl(0, 75%, 45%)" : "none"
              }
              type="text"
              value={values.message || ""}
              onChange={handleChange}
              id="message"
              name="message"
              placeholder="Send message..."
            />
            <MessageSubmitButton disabled={values.message ? false : true}>
              Send
            </MessageSubmitButton>
          </InputContainer>
        </form>
      </InputBottomOfPageContainer>
    </MessagesPageContainer>
  );
};

export default MessagesPage_View;
