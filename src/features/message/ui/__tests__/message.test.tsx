import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Message } from "..";

test("Message", () => {
  render(<Message fromMe>hello</Message>);
  expect(screen.getByText("hello")).toBeTruthy();
});
