import { PROMPTS_LIST } from "core/constants/prompts";
import { Message } from "features/message/ui";
import Image from "next/image";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "shared/ui";

type Props = {
  generatedContent?: string;
  isReceiving: boolean;
  error?: string;
  onReset: () => void;
  prevStep: () => void;
};

const ResultFunnel = ({
  generatedContent,
  isReceiving,
  error,
  prevStep,
  onReset,
}: Props) => {
  const { getValues } = useFormContext<{
    id: string;
    text: string;
  }>();
  const { id: promptId, text } = getValues();
  const promptChat = PROMPTS_LIST.find((p) => p.id === promptId)?.chat;

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [generatedContent]);

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(generatedContent ?? "");
  };

  return (
    <div className="h-full w-full">
      <div className="sticky top-0 flex h-24 w-full items-center gap-4 bg-gradient-to-t from-white to-yellow-200 pl-6">
        <Image
          className="h-10 w-10 rounded-full"
          width={40}
          height={40}
          src="/avatar.jpg"
          alt="avatar"
          onClick={onReset}
        />
        <span className="text-center text-2xl font-bold">summer AI</span>
      </div>
      <div className="pb-16">
        <Message fromMe>
          {text}
          {promptChat}
        </Message>
        {error ? (
          <div className="fixed bottom-16 flex w-full flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-black bg-gradient-to-t from-red-500 to-white p-4">
              <h1 className="text-2xl font-bold">에러가 발생했습니다.</h1>
              <p className="text-lg">{error}</p>

              <Button onClick={() => prevStep()}>다시 시도하기</Button>
            </div>
          </div>
        ) : (
          <Message name="summer 🤖">{generatedContent}</Message>
        )}
        {!isReceiving ? (
          <div className="fixed bottom-6 flex w-full items-center justify-center gap-4">
            <Button onClick={onReset} type="button">
              처음부터 다시하기
            </Button>

            <Button
              onClick={copyToClipboard}
              className="to-gray-300"
              type="button"
            >
              답변 복사하기
            </Button>
          </div>
        ) : null}
      </div>
      <div className="fixed bottom-0 -z-10 h-16 w-full bg-gradient-to-b from-white to-yellow-200"></div>
    </div>
  );
};

export default ResultFunnel;
