import chatIcon from "@assets/icons/chatIcon.svg";

type Props = {
  className?: string;
};

function ChatIcon({ className }: Props) {
  return (
    <div className={className}>
      <img
        src={chatIcon}
        alt="Chat icon"
      />
    </div>
  );
}

export default ChatIcon;
