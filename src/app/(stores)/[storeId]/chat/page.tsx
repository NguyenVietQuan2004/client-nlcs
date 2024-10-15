import ChatCLient from "@/app/(stores)/[storeId]/chat/chat";

async function Chat() {
  return (
    <div className="  pt-16">
      <div className="px-[200px] xl:px-[100px] lg:px-[30px] md:px-2 hidden md:block">
        <ChatCLient />
      </div>
      <div className=" md:hidden block">
        <div>dis is mobile</div>
      </div>
    </div>
  );
}

export default Chat;
