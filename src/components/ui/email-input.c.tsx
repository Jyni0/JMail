import { useState, useRef, type KeyboardEvent, type ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

// ? Icons
import { X } from "lucide-react";

const styles = {
  variants: {
    default:
      "min-h-6 bg-background flex flex-wrap items-center gap-1.5 w-full px-3 rounded-lg transition text-left border outline-0 hover:bg-secondary/80",
    ghost:
      "min-h-6 bg-transparent flex flex-wrap items-center gap-1.5 w-full rounded-lg transition text-left border border-transparent! outline-0",
  },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EmailInputProps = {
  className?: string;
  variant?: keyof typeof styles.variants;
  limit?: number;
  value?: string[];
  onChange?: (emails: string[]) => void;
  placeholder?: string;
  comment?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
};

export function EmailInput({
  className,
  variant = "default",
  limit = 0,
  value = [],
  onChange,
  placeholder = "Add more mails",
  comment,
  disabled = false,
  icon,
}: EmailInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [emails, setEmails] = useState<string[]>(value.filter(isValidEmail));
  const inputRef = useRef<HTMLInputElement>(null);

  function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
  }

  const handleAddEmails = (rawEmails: string) => {
    if (disabled) return;

    const newEmails = rawEmails
      .split(/[\s,]+/)
      .map((e) => e.trim())
      .filter(Boolean);

    if (newEmails.length === 0) return;

    let updatedList = [...emails];
    let addedSomething = false;
    let newInputValue = inputValue;

    newEmails.forEach((email) => {
      if (limit !== 0 && updatedList.length >= limit) return;

      if (isValidEmail(email) && !updatedList.includes(email)) {
        updatedList.push(email);
        addedSomething = true;

        const parts = newInputValue.split(/[\s,]+/);
        newInputValue = parts.filter((p) => p !== email).join(", ").trim();
      }
    });

    if (addedSomething) {
      setEmails(updatedList);
      onChange?.(updatedList);
      setInputValue(newInputValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (["Enter", "Tab", ",", " "].includes(e.key)) {
      e.preventDefault();
      handleAddEmails(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && emails.length > 0) {
      removeEmail(emails.length - 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    handleAddEmails(pastedText);
  };

  const removeEmail = (indexToRemove: number) => {
    if (disabled) return;

    const updatedList = emails.filter((_, index) => index !== indexToRemove);
    setEmails(updatedList);
    onChange?.(updatedList);
  };

  const isLimitReached = limit !== 0 && emails.length >= limit;

  return (
    <div className="w-full flex flex-row items-center gap-2">
      <h2 className="text-muted">{comment}</h2>
      <div
        className={cn(styles.variants[variant], className, {
          "w-full opacity-50 cursor-not-allowed": isLimitReached && limit === 1 && !disabled,
          "cursor-default": disabled,
        })}
        onClick={() => {
          if (!disabled) inputRef.current?.focus();
        }}
      >
        {emails.map((email, index) => (
          <span
            key={`${email}-${index}`}
            className={cn(
              "flex items-center gap-1.5 px-2 rounded-md text-sm transition-colors select-text",
              "bg-primary/25 text-primary"
            )}
          >
            {email}
            {icon && icon}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEmail(index);
                }}
                className="hover:text-primary focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </span>
        ))}

        {!isLimitReached && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => !disabled && setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            readOnly={disabled}
            placeholder={emails.length === 0 ? placeholder : disabled ? "" : "Add more..."}
            className={cn(
              "flex-1 bg-transparent outline-none min-w-[120px] text-sm text-color placeholder:text-muted/60",
              disabled && "pointer-events-none"
            )}
          />
        )}
      </div>
    </div>
  );
}
