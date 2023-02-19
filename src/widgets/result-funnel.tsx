import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { PROMPTS_LIST } from "../constants/prompts";
import { Message } from "../shared/ui";

type Props = {
  generatedContent?: string;
  loading: boolean;
  error?: string;
};

const ResultFunnel = ({ generatedContent }: Props) => {
  const { getValues } = useFormContext<{
    id: string;
    text: string;
  }>();
  const { id: promptId, text } = getValues();
  const promptName = PROMPTS_LIST.find((p) => p.id === promptId)?.name;

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
      <div className="mt-4 flex justify-end gap-2 px-2">
        <Message fromMe>
          {text}, {promptName}
        </Message>
      </div>
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
      <div className="fixed bottom-0 -z-10 h-16 w-full bg-gradient-to-b from-white to-yellow-200"></div>
    </div>
  );
};

export default ResultFunnel;
