import { ChatBubble } from "@entities/message/ui";
import Image from "next/image";

type Props = {
  fromMe?: boolean;
  name?: string;
  avatar?: string;
  children?: React.ReactNode;
};
const Message = ({ fromMe = false, name, avatar, children }: Props) => {
  return (
    <div
      className={`mt-4 flex ${
        fromMe ? "justify-end gap-2 px-2" : "flex-col gap-1"
      }`}
    >
      {fromMe ? (
        <ChatBubble fromMe>{children}</ChatBubble>
      ) : (
        <>
          <div className="pl-12">{name}</div>
          <div className="flex gap-2 px-2">
            <div className="flex-shrink-0">
              <Image
                className="h-8 w-8 rounded-full"
                width={40}
                height={40}
                src={avatar ?? "/avatar.jpg"}
                alt="avatar"
              />
            </div>
            {children ? (
              <ChatBubble>{children}</ChatBubble>
            ) : (
              <span className="p-1 text-gray-400">입력 중...</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Message;
