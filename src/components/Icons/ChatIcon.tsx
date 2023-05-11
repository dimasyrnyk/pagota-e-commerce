import chatIcon from "@assets/icons/chatIcon.svg";

type Props = {
  className?: string;
};

function ChatIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={chatIcon}
      alt="Chat icon"
    />
  );
}

export default ChatIcon;
