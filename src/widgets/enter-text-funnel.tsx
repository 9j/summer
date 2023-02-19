import { useFormContext } from "react-hook-form";
import { PROMPTS_LIST } from "../constants/prompts";
import { BackButton, Button } from "../shared/ui";

type Props = {
  prevStep: () => void;
};

const EnterTextFunnel = ({ prevStep }: Props) => {
  const { register, getValues } = useFormContext();
  const { id: promptId } = getValues();
  const promptName = PROMPTS_LIST.find((p) => p.id === promptId)?.name;

  return (
    <div className="h-screen w-full">
      <div className="sticky top-0 flex h-24 w-full items-center justify-center bg-gradient-to-t from-white to-purple-300">
        <div className="absolute top-0 left-0 flex h-24 items-center justify-center">
          <BackButton onClick={prevStep} />
        </div>
        <h1 className="w-full text-center text-2xl font-bold">
          텍스트를 입력해주세요
        </h1>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center gap-4 px-4">
        <span className="text-center text-lg font-bold">
          {promptName}을(를) 선택하셨습니다.
        </span>
        <textarea
          className="h-40 w-full max-w-lg  rounded-lg border border-black p-4 text-lg text-gray-900"
          placeholder="여기에 텍스트를 입력하세요."
          {...register("text", { required: true })}
        />
        <div className="w-full max-w-lg text-right">
          <Button className="px-6" type="submit">
            보내기
          </Button>
        </div>
      </div>
      <div className="fixed bottom-0 -z-10 h-16 w-full bg-gradient-to-b from-white to-purple-300"></div>
    </div>
  );
};

export default EnterTextFunnel;
