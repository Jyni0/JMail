import type React from "react";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface SelectOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

type SelectVariant = "default" | "transparent";

interface SelectContextValue {
  value?: string;
  open: boolean;
  disabled: boolean;
  activeValue?: string;
  contentId: string;
  items: SelectOption[];
  triggerRef: React.RefObject<HTMLButtonElement | null>;

  setOpen: (open: boolean) => void;
  setActiveValue: (value?: string) => void;
  selectValue: (value: string) => void;
  openSelect: (direction?: 1 | -1) => void;
  moveActive: (direction: 1 | -1) => void;
}

interface SelectProps {
  children: React.ReactNode;
  items: SelectOption[];
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  variant?: SelectVariant;
}

interface SelectValueProps
  extends React.ComponentPropsWithoutRef<"span"> {
  placeholder?: React.ReactNode;
}

interface SelectItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<"button">,
    "value"
  > {
  value: string;
}

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const selectStyles = {
  trigger: {
    variants: {
      default: cn(
        "border",
        "bg-background text-color",
        "hover:bg-secondary/25",
      ),
      transparent: cn(
        "border border-transparent!",
        "bg-transparent text-color",
        "hover:text-primary hover:[&_>svg]:text-primary",
      ),
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */

const SelectContext = createContext<SelectContextValue | null>(
  null,
);

function useSelect() {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error(
      "Select components must be used inside <Select>.",
    );
  }

  return context;
}

/* -------------------------------------------------------------------------- */
/* Select                                                                     */
/* -------------------------------------------------------------------------- */

export function Select({
  children,
  items,
  value,
  defaultValue,
  disabled = false,
  onValueChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] =
    useState(defaultValue);
  const [activeValue, setActiveValue] = useState<string>();

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentId = useId();

  const selectedValue =
    value !== undefined ? value : internalValue;

  const enabledItems = useMemo(
    () => items.filter((item) => !item.disabled),
    [items],
  );

  function selectValue(nextValue: string) {
    const item = items.find(
      (currentItem) => currentItem.value === nextValue,
    );

    if (!item || item.disabled) {
      return;
    }

    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);

    setOpen(false);
    setActiveValue(undefined);

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }

  function openSelect(direction: 1 | -1 = 1) {
    if (disabled || enabledItems.length === 0) {
      return;
    }

    const selectedItem = enabledItems.find(
      (item) => item.value === selectedValue,
    );

    const fallbackItem =
      direction === 1
        ? enabledItems[0]
        : enabledItems[enabledItems.length - 1];

    setActiveValue(selectedItem?.value ?? fallbackItem?.value);
    setOpen(true);
  }

  function moveActive(direction: 1 | -1) {
    if (enabledItems.length === 0) {
      return;
    }

    const currentIndex = enabledItems.findIndex(
      (item) => item.value === activeValue,
    );

    if (currentIndex === -1) {
      const fallbackItem =
        direction === 1
          ? enabledItems[0]
          : enabledItems[enabledItems.length - 1];

      setActiveValue(fallbackItem?.value);
      return;
    }

    const nextIndex =
      (currentIndex + direction + enabledItems.length) %
      enabledItems.length;

    setActiveValue(enabledItems[nextIndex]?.value);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setActiveValue(undefined);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "Escape": {
          event.preventDefault();

          setOpen(false);
          setActiveValue(undefined);
          triggerRef.current?.focus();

          break;
        }

        case "ArrowDown": {
          event.preventDefault();
          moveActive(1);
          break;
        }

        case "ArrowUp": {
          event.preventDefault();
          moveActive(-1);
          break;
        }

        case "Home": {
          event.preventDefault();
          setActiveValue(enabledItems[0]?.value);
          break;
        }

        case "End": {
          event.preventDefault();

          setActiveValue(
            enabledItems[enabledItems.length - 1]?.value,
          );

          break;
        }

        case "Enter":
        case " ": {
          event.preventDefault();

          if (activeValue) {
            selectValue(activeValue);
          }

          break;
        }

        case "Tab": {
          setOpen(false);
          setActiveValue(undefined);
          break;
        }
      }
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, activeValue, enabledItems]);

  return (
    <SelectContext.Provider
      value={{
        value: selectedValue,
        open,
        disabled,
        activeValue,
        contentId,
        items,
        triggerRef,
        setOpen,
        setActiveValue,
        selectValue,
        openSelect,
        moveActive,
      }}
    >
      <div
        ref={rootRef}
        className="relative inline-block w-full"
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* SelectTrigger                                                              */
/* -------------------------------------------------------------------------- */

export const SelectTrigger = forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(function SelectTrigger(
  {
    children,
    variant = "default",
    className,
    disabled,
    onClick,
    onKeyDown,
    ...props
  },
  forwardedRef,
) {
  const context = useSelect();

  const isDisabled = context.disabled || disabled;

  function setRefs(node: HTMLButtonElement | null) {
    context.triggerRef.current = node;

    if (typeof forwardedRef === "function") {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  }

  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    onClick?.(event);

    if (event.defaultPrevented || isDisabled) {
      return;
    }

    if (context.open) {
      context.setOpen(false);
      context.setActiveValue(undefined);
    } else {
      context.openSelect();
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) {
    onKeyDown?.(event);

    if (
      event.defaultPrevented ||
      isDisabled ||
      context.open
    ) {
      return;
    }

    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "ArrowDown" ||
      event.key === "ArrowUp"
    ) {
      event.preventDefault();

      context.openSelect(
        event.key === "ArrowUp" ? -1 : 1,
      );
    }
  }

  return (
    <button
      ref={setRefs}
      type="button"
      role="combobox"
      aria-controls={context.contentId}
      aria-expanded={context.open}
      aria-haspopup="listbox"
      disabled={isDisabled}
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2",
        "rounded-[0.5rem] px-3 text-start",
        "transition-colors",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-primary/50",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        "hover:cursor-pointer",
        selectStyles.trigger.variants[variant],
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}

      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className={cn(
          "size-4 shrink-0 text-muted",
          "transition-transform duration-200",
          context.open && "rotate-180",
        )}
      >
        <path
          d="m6 8 4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});

/* -------------------------------------------------------------------------- */
/* SelectValue                                                                */
/* -------------------------------------------------------------------------- */

export const SelectValue = forwardRef<
  HTMLSpanElement,
  SelectValueProps
>(function SelectValue(
  {
    placeholder = "Select an option",
    className,
    ...props
  },
  ref,
) {
  const { value, items } = useSelect();

  const selectedItem = items.find(
    (item) => item.value === value,
  );

  return (
    <span
      ref={ref}
      className={cn(
        "min-w-0 truncate",
        !selectedItem && "text-muted",
        className,
      )}
      {...props}
    >
      {selectedItem?.label ?? placeholder}
    </span>
  );
});

/* -------------------------------------------------------------------------- */
/* SelectContent                                                              */
/* -------------------------------------------------------------------------- */

export const SelectContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function SelectContent(
  { children, className, ...props },
  ref,
) {
  const { open, contentId } = useSelect();

  if (!open) {
    return null;
  }

  return (
    <div
      ref={ref}
      id={contentId}
      role="listbox"
      className={cn(
        "absolute left-0 top-full z-50 mt-1",
        "min-w-full overflow-hidden p-1",
        "rounded-[0.75rem]",
        "border border-border",
        "bg-background text-color",
        "shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* SelectGroup                                                                */
/* -------------------------------------------------------------------------- */

export function SelectGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="group"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* SelectItem                                                                 */
/* -------------------------------------------------------------------------- */

export const SelectItem = forwardRef<
  HTMLButtonElement,
  SelectItemProps
>(function SelectItem(
  {
    value,
    children,
    disabled,
    className,
    onClick,
    onMouseEnter,
    ...props
  },
  ref,
) {
  const context = useSelect();

  const item = context.items.find(
    (currentItem) => currentItem.value === value,
  );

  const isDisabled =
    context.disabled || disabled || item?.disabled;

  const selected = context.value === value;
  const active = context.activeValue === value;

  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    onClick?.(event);

    if (event.defaultPrevented || isDisabled) {
      return;
    }

    context.selectValue(value);
  }

  function handleMouseEnter(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    onMouseEnter?.(event);

    if (!isDisabled) {
      context.setActiveValue(value);
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      role="option"
      aria-selected={selected}
      disabled={isDisabled}
      tabIndex={-1}
      className={cn(
        "relative flex h-9 w-full items-center",
        "rounded-[0.5rem] px-3 pr-8",
        "text-start text-sm text-color",
        "transition-colors",
        "hover:bg-secondary/25",
        "focus-visible:outline-none",
        active && "bg-secondary/25",
        selected && "bg-secondary/25",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        "hover:cursor-pointer",
        className,
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      <span className="truncate">
        {children}
      </span>

      {selected && (
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="absolute right-3 size-4 text-primary"
        >
          <path
            d="m5 10 3 3 7-7"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
});
