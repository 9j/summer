import { type NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm<{ text: string; id: string }>();

  const promptMutation = api.prompts.excute.useMutation();

  const onSubmit = ({ text, id }: { text: string; id: string }) => {
    promptMutation.mutate({ text, id });
  };

  return (
    <>
      <Head>
        <title>summer - AI 텍스트 생성기</title>
        <meta name="description" content="누구나 AI를 쉽고 재밌게" />
        <meta property="og:title" content="summer - AI 텍스트 생성기" />
        <meta property="og:description" content="누구나 AI를 쉽고 재밌게" />
        <meta property="og:image" content="/logo.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3652700860611106"
          crossOrigin="anonymous"
        ></script>
        <script
          defer
          data-domain="summerai.net"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#60efff] to-[#0061ff]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              summer
            </h1>
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
              누구나 AI를 쉽고 재밌게
            </h2>
            <div className="flex flex-row items-center justify-center gap-2 text-xl font-extrabold tracking-tight text-blue-700">
              <a href="https://toss.me/llllll">toss (donate)</a>
              <div className="h-4 w-1 bg-gray-500"></div>
              <a href="https://github.com/9j/summer">github</a>
            </div>
          </div>
          <div className="flex w-full max-w-lg flex-col">
            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
              <textarea
                className="h-40 w-full rounded-lg p-4 text-lg text-gray-900"
                placeholder="여기에 텍스트를 입력하세요."
                {...register("text", { required: true })}
              />
              <label htmlFor="prompts" className="mb-2 font-medium text-white">
                프롬프트 (선택)
              </label>
              <select
                id="prompts"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("id", {
                  required: true,
                  validate: (id) => id !== "none",
                })}
              >
                <option selected value="none">
                  무엇을 해볼까요? 선택해주세요.
                </option>
                <option value="continuation">이어 쓰기</option>
                <option value="takeaways">요점 나열</option>
                <option value="fix-grammar">(EN) 문법수정</option>
                <option value="short-summary">(짧게) 요약하기</option>
                <option value="long-summary">(길게) 요약하기</option>
                <option value="rephrase">글 다시쓰기</option>
                <option value="simplify">간단하게 표현하기</option>
                <option value="generate-titles">제목 뽑기</option>
                <option value="generate-tweets">트윗 생성</option>
                <option value="generate-counter-argument">반론 생성</option>
              </select>
              <button
                className="mt-4 h-12 w-full rounded-lg bg-[#2934fe] text-lg font-bold text-white"
                type="submit"
              >
                실행
              </button>
            </form>
          </div>
          <p className="max-w-lg text-lg text-white">
            {promptMutation.isLoading
              ? "Loading..."
              : promptMutation.data?.text}
          </p>
          {promptMutation.isError && (
            <p className="max-w-lg text-lg text-red-500">
              {promptMutation.error?.message}
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
