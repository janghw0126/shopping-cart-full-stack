import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "../common/Checkbox";

describe("Checkbox", () => {
  it("체크된 상태일 때 check_filled 이미지를 렌더링한다", () => {
    render(<Checkbox checked={true} onChange={vi.fn()} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/check_filled.png");
    expect(img).toHaveAttribute("alt", "선택됨");
  });

  it("체크되지 않은 상태일 때 check_empty 이미지를 렌더링한다", () => {
    render(<Checkbox checked={false} onChange={vi.fn()} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/check_empty.png");
    expect(img).toHaveAttribute("alt", "선택 안 됨");
  });

  it("클릭하면 onChange가 반전된 값으로 호출된다", async () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole("img"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("체크된 상태에서 클릭하면 onChange(false)가 호출된다", async () => {
    const onChange = vi.fn();
    render(<Checkbox checked={true} onChange={onChange} />);
    await userEvent.click(screen.getByRole("img"));
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
