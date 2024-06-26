"use client";
import { useBearStore } from "@/app/global-state/store";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationInfoHeader from "./conversation-info-header/Header";
import ConversationInfoBody from "./conversation-info-body/ConversationInfoBody";
import { TYPE_GROUP } from "@/app/types";

interface IProps {
  type: TYPE_GROUP;
}
function ConversationInfo({ type }: IProps) {
  const state = useBearStore();
  const onClose = () => {
    state.setOpenConversationInfo();
  };

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0",
          `${state.isOpenConversationInfo ? "" : "hidden"}`,
          "md:hidden"
        )}
      />
      <div
        className={cn(
          "w-[344px] h-dvh shadow-[0_0_10px_rgba(0,0,0,0.25)] bg-white absolute top-0 right-0 z-10 transition-all duration-300",
          `${
            state.isOpenConversationInfo
              ? "translate-x-full w-0"
              : "translate-x-full md:w-[344px] md:translate-x-0"
          }`,
          "md:relative"
        )}
      >
        {/* Title */}
        <div className="h-[68px]">
          <p className="text-[17px] text-[#081c36] font-[600] text-center leading-[68px]">
            {type === TYPE_GROUP.SIGNLE
              ? "Thông tin hội thoại"
              : "Thông tin nhóm"}
          </p>
        </div>
        <Separator
          className="w-full h-[1px] bg-[#d6dbe1]"
          orientation="vertical"
        />
        <ScrollArea className="h-[calc(100%-68px)]">
          <ConversationInfoHeader
            type={TYPE_GROUP.GROUP}
            conversationName="Công Nghệ Mới"
          />
          <ConversationInfoBody typeGroup={TYPE_GROUP.GROUP} />
        </ScrollArea>
      </div>
    </>
  );
}

export default ConversationInfo;
