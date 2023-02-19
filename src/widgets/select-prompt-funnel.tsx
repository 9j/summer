import { useFormContext } from "react-hook-form";
import { PROMPTS_LIST } from "../constants/prompts";
import { Button } from "../shared/ui";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

const SelectPromptFunnel = ({ nextStep, prevStep }: Props) => {
  const { register } = useFormContext();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const promptId = e.currentTarget.dataset.promptId;
    console.log(
      "🚀 ~ file: select-prompt-funnel.tsx:15 ~ handleButtonClick ~ promptId",
      e.currentTarget.dataset
    );
    if (!promptId) {
      return;
    }
    register("id", { value: promptId });
    nextStep();
  };

  return (
    <div className="h-screen w-full">
      <div className="sticky top-0 flex h-24 w-full items-center justify-center bg-gradient-to-t from-white to-[#90dc4c]">
        <h1 className="w-full text-center text-2xl font-bold">
          무엇을 해볼까요?
        </h1>
      </div>
      <div className="flex w-full flex-col gap-4 px-4 pb-6">
        {PROMPTS_LIST.map((prompt) => (
          <Button
            key={prompt.id}
            className="mx-auto h-14 w-full max-w-md gap-2 bg-gradient-to-b from-white to-blue-300 px-5 text-left font-normal"
            data-prompt-id={prompt.id}
            onClick={handleButtonClick}
            type="button"
          >
            {prompt.name}
          </Button>
        ))}
      </div>
      <div className="fixed bottom-0 -z-10 h-16 w-full bg-gradient-to-b from-white to-[#90dc4c]"></div>
    </div>
  );
};

export default SelectPromptFunnel;
