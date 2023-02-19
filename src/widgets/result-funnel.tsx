import Image from "next/image";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { PROMPTS_LIST } from "../constants/prompts";
import { Button, Message } from "../shared/ui";

type Props = {
  generatedContent?: string;
  loading: boolean;
  error?: string;
};

const ResultFunnel = ({ generatedContent, loading, error }: Props) => {
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

  return (
    <div className="h-screen w-full">
      <div className="sticky top-0 flex h-24 w-full items-center gap-4 bg-gradient-to-t from-white to-yellow-200 pl-6">
        <Image
          className="h-10 w-10 rounded-full"
          width={40}
          height={40}
          src="/avatar.jpg"
          alt="avatar"
        />
        <span className="text-center text-2xl font-bold">summer AI</span>
      </div>
      <div className="pb-16">
        <div className="mt-4 flex justify-end gap-2 px-2">
          <Message fromMe>
            {text}
            {promptChat}
          </Message>
        </div>
        {!error && !loading ? (
          <div className="mt-4 flex gap-2 px-2">
            <div className="flex-shrink-0">
              <Image
                className="h-8 w-8 rounded-full"
                width={40}
                height={40}
                src="/avatar.jpg"
                alt="avatar"
              />
            </div>
            <Message>{generatedContent}</Message>
          </div>
        ) : null}
        {error ? (
          <div className="fixed bottom-16 flex w-full flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-black bg-gradient-to-t from-red-500 to-white p-4">
              <h1 className="text-2xl font-bold">에러가 발생했습니다.</h1>
              <p className="text-lg">{error}</p>

              <Button onClick={() => window.location.reload()}>
                다시 시도하기
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      <div className="fixed bottom-0 -z-10 h-16 w-full bg-gradient-to-b from-white to-yellow-200"></div>
    </div>
  );
};

export default ResultFunnel;
