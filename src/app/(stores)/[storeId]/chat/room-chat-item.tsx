import { formatDateTime } from "@/lib/utils";
import { MessageType } from "@/Type/messageTypes";

interface RoomChatItemProps {
  item: MessageType;
  sender: string;
}

function RoomChatItem({ item, sender }: RoomChatItemProps) {
  return (
    <div
      key={item._id}
      className={`${
        item.senderId === sender ? "self-end bg-blue-400 text-white" : "self-start bg-[#f4f4f5]"
      } max-w-[300px] flex flex-col px-4 py-2 rounded-xl `}
    >
      <span className="break-words">{item.text}</span>
      {item.senderId !== "admin" && (
        <div className="self-end py-1 text-[0.75rem]">{formatDateTime(item.createdAt)}</div>
      )}
    </div>
  );
}

export default RoomChatItem;
