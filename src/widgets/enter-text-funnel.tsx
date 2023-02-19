import { useFormContext } from "react-hook-form";
import { Button } from "../shared/ui";

const EnterTextFunnel = () => {
  const { register } = useFormContext();
  return (
    <div className="h-screen w-full">
      <div className="sticky top-0 flex h-24 w-full items-center justify-center bg-gradient-to-t from-white to-purple-300">
        <h1 className="w-full text-center text-2xl font-bold">
          텍스트를 입력해주세요.
        </h1>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center gap-4 px-4">
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
