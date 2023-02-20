import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useFunnel } from "../hooks";
import EnterTextFunnel from "../widgets/enter-text-funnel";
import ResultFunnel from "../widgets/result-funnel";
import SelectPromptFunnel from "../widgets/select-prompt-funnel";
import StartFunnel from "../widgets/start-funnel";

const Home: NextPage = () => {
  const [step, setStep, { nextStep, prevStep }] = useFunnel([
    "시작",
    "프롬프트선택",
    "텍스트입력",
    "완료",
  ]);

  const methods = useForm<{ text: string; id: string }>();
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async ({ text, id }: { text: string; id: string }) => {
    setError("");
    setStep("완료");
    const response = await fetch("/api/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        id,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      setError(errorText);
      return;
    }
    setGeneratedContent("");
    setError("");

    const data = response.body;
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      const chunkValue = decoder.decode(value);

      setGeneratedContent((prev) => `${prev}${chunkValue}`);
    }

    setLoading(false);
  };

  const onReset = () => {
    setStep("시작");
    setGeneratedContent("");
    setError("");
    methods.reset();
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
      <main className="flex h-full flex-col items-center justify-center">
        <FormProvider {...methods}>
          <form
            onSubmit={(...args) => void methods.handleSubmit(onSubmit)(...args)}
            className="flex w-full flex-col items-center justify-center"
          >
            {step === "시작" ? <StartFunnel nextStep={nextStep} /> : null}
            {step === "프롬프트선택" ? (
              <SelectPromptFunnel nextStep={nextStep} prevStep={prevStep} />
            ) : null}
            {step === "텍스트입력" ? (
              <EnterTextFunnel prevStep={prevStep} />
            ) : null}
            {step === "완료" ? (
              <ResultFunnel
                loading={loading}
                generatedContent={generatedContent}
                error={error}
                onReset={onReset}
                prevStep={prevStep}
              />
            ) : null}
          </form>
        </FormProvider>
      </main>
    </>
  );
};

export default Home;
