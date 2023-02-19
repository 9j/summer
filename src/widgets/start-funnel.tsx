import { Button } from "../shared/ui";

type Props = {
  nextStep: () => void;
};
const StartFunnel = ({ nextStep }: Props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="bg-gradient-to-t from-purple-400 to-white bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-[5rem]">
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
        <Button onClick={() => nextStep()}>시작하기</Button>
      </div>
      <div className="fixed top-0 -z-10 h-96 w-full bg-gradient-to-t from-white to-blue-300"></div>
      <div className="fixed bottom-0 -z-10 h-16 w-full bg-gradient-to-b from-white to-blue-300"></div>
    </>
  );
};

export default StartFunnel;