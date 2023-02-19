import { useRouter } from "next/router";
import { Button } from "../shared/ui";

type Props = {
  nextStep: () => void;
};
const StartFunnel = ({ nextStep }: Props) => {
  const router = useRouter();
  const handleOldVersion = () => {
    void router.push("/old");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="bg-gradient-to-tr from-[#6096FD] to-[#FAA7B8] bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-[5rem]">
          summer
        </h1>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-[2rem]">
          누구나 AI를 쉽고 재밌게
        </h2>
        <div className="flex flex-row items-center justify-center gap-2 text-xl font-extrabold tracking-tight text-blue-700">
          <a href="https://toss.me/llllll">toss (donate)</a>
          <div className="h-4 w-1 bg-gray-500"></div>
          <a href="https://github.com/9j/summer">github</a>
        </div>
        <div className="mt-2 flex gap-2">
          <Button onClick={nextStep} type="button">
            시작하기
          </Button>
          <Button
            onClick={handleOldVersion}
            className="to-gray-300"
            type="button"
          >
            이전 버전
          </Button>
        </div>
      </div>
      <div className="fixed top-0 -z-10 h-96 w-full bg-gradient-to-t from-white to-blue-300"></div>
      <div className="fixed bottom-0 -z-10 h-16 w-full bg-gradient-to-b from-white to-blue-300"></div>
    </>
  );
};

export default StartFunnel;
