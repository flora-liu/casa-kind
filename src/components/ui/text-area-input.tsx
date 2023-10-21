"use client";
import { cn } from "@/lib/utils";
import Textarea, { TextareaAutosizeProps } from "react-textarea-autosize";

function TextAreaInput({
  id,
  title,
  value,
  setValue,
  className,
  ...props
}: {
  title: string;
  value: string | number | readonly string[] | undefined;
  setValue: (value: string | undefined) => void;
} & TextareaAutosizeProps) {
  return (
    <>
      <div>
        <label htmlFor={id}>
          <p className="mb-2">{title}</p>
        </label>
        <Textarea
          id={id}
          tabIndex={0}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          className={cn(
            "whitespace-pre-line min-h-[25vh] md:min-h-[30vh] w-full resize-none rounded-md bg-background p-4 focus-within:outline-none text-sm md:text-base border border-input ring-offset-background placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            className
          )}
          {...props}
        />
      </div>
    </>
  );
}

export { TextAreaInput };
