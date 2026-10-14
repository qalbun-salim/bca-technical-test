"use client";

import { useId } from "react";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  label: string;
  placeholder?: string;
  items?: { label: string; value: string | null }[];
  disabled?: boolean;
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  errorMessage?: string;
  onRetry?: () => void;
  retryLoading?: boolean;
};

export default function FilterInputDropdown({
  label,
  placeholder = `Select ${label.toLowerCase()}`,
  items = [],
  disabled = false,
  value,
  onValueChange,
  errorMessage,
  onRetry,
  retryLoading = false,
}: Props) {
  const id = useId();
  return (
    <div className="row-span-2 grid min-w-0 grid-rows-subgrid">
      <Field className="self-end">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <Select items={items} value={value} onValueChange={onValueChange} disabled={disabled || items.length === 0}>
          <SelectTrigger id={id} className="w-full max-w-48">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {items.map((item) => (
                <SelectItem key={item.value ?? "all"} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      {errorMessage && (
        <div className="min-w-0 self-start break-words text-sm text-destructive" role="alert">
          {errorMessage}
          {onRetry && (
            <>
              {" "}
              <Button className="h-auto p-0" variant="link" disabled={retryLoading} onClick={onRetry}>
                {retryLoading ? "Retrying…" : "Retry"}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
