import { PromptList } from "features/prompt/ui";
import { useFormContext } from "react-hook-form";
import { BackButton } from "shared/ui";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

const SelectPromptFunnel = ({ nextStep, prevStep }: Props) => {
  const { setValue } = useFormContext();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const promptId = e.currentTarget.dataset.promptId;
    if (!promptId) {
      return;
    }
    setValue("id", promptId);
    nextStep();
  };

  return (
    <div className="h-full w-full">
      <div className="sticky top-0 flex h-24 w-full items-center justify-center bg-gradient-to-t from-white to-[#90dc4c]">
        <div className="absolute top-0 left-0 flex h-24 items-center justify-center">
          <BackButton onClick={prevStep} />
        </div>
        <h1 className="w-full text-center text-2xl font-bold">
          무엇을 해볼까요?
        </h1>
      </div>
      <PromptList onPromptClick={handleButtonClick} />
      <div className="fixed bottom-0 -z-10 h-16 w-full bg-gradient-to-b from-white to-[#90dc4c]"></div>
    </div>
  );
};

export default SelectPromptFunnel;
