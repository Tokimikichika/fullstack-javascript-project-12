import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useGetChannels } from '../../service/channelsApi';
import { useGetMessages } from '../../service/messagesApi';
import NewMessageForm from './MessageInput';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

const ChatBox = () => {
  const { t } = useTranslation();
  const { data: channels } = useGetChannels();
  const { data: allMessages } = useGetMessages();

  const channel = useSelector((state) => {
    const { currentChannelId } = state.ui;
    return channels?.find((c) => c.id === currentChannelId);
  });

  const messages = useSelector((state) => {
    const { currentChannelId } = state.ui;
    const channelMessages = allMessages?.filter((m) => m.channelId === currentChannelId);
    return channelMessages;
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${channel?.name}`}
          </b>
        </p>
        <span className="text-muted">
          {`${messages.length} ${t('chat.messageCount', { count: messages.length })}`}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messages.map(({ id, username, body }) => (
          <Message
            key={id}
            username={username}
            body={body}
          />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessageForm channel={channel} />
      </div>
    </div>
  );
};

export default ChatBox;
