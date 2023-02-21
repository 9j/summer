import { PROMPTS_LIST } from "@core/constants/prompts";
import { Button } from "@shared/ui";

type Props = {
  onPromptClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const PromptList = ({ onPromptClick }: Props) => {
  return (
    <div className="flex w-full flex-col gap-4 px-4 pb-6">
      {PROMPTS_LIST.map((prompt) => (
        <Button
          key={prompt.id}
          className="mx-auto h-14 w-full max-w-md gap-2 bg-gradient-to-b from-white to-blue-300 px-5 text-left font-normal"
          data-prompt-id={prompt.id}
          onClick={onPromptClick}
          type="button"
        >
          {prompt.name}
        </Button>
      ))}
    </div>
  );
};

export default PromptList;
