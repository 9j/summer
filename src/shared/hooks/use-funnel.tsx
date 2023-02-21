import { useState } from "react";
import { assertString } from "@shared/utils/assert";

const useFunnel = (
  steps: Array<string>
): [
  string,
  (step: string) => void,
  {
    nextStep: () => void;
    prevStep: () => void;
  }
] => {
  assertString(steps[0]);
  const [step, setStep] = useState<string>(steps[0]);

  const nextStep = () => {
    const currentStepIndex = steps.indexOf(step);
    if (currentStepIndex === steps.length - 1) {
      return;
    }
    const newStep = steps[currentStepIndex + 1];
    assertString(newStep);
    setStep(newStep);
  };

  const prevStep = () => {
    const currentStepIndex = steps.indexOf(step);
    if (currentStepIndex === 0) {
      return;
    }
    const newStep = steps[currentStepIndex - 1];
    assertString(newStep);
    setStep(newStep);
  };

  return [
    step,
    setStep,
    {
      nextStep,
      prevStep,
    },
  ];
};

export default useFunnel;
