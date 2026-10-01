"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { SITE_METADATA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useContactForm } from "../hooks/useContactForm";
import type { ContactFormData } from "../types";

const INPUT =
  "w-full rounded-xl border border-line bg-background px-4 py-3 text-base text-foreground placeholder:text-muted outline-none focus:border-primary";

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 mb-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const { form, onSubmit, status } = useContactForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  if (status === "success") {
    return (
      <p role="status" className="rounded-xl bg-background p-6 text-lg font-semibold">
        Message sent. I&apos;ll reply within two days.
      </p>
    );
  }

  const fieldProps = (name: keyof ContactFormData, hint = false) => ({
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby":
      cn(hint && `contact-${name}-hint`, errors[name] && `contact-${name}-error`) || undefined,
    className: cn(INPUT, errors[name] && "border-red-600"),
    ...register(name),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-600/30 p-4 text-sm">
          Couldn&apos;t send your message. Email me at{" "}
          <a href={`mailto:${SITE_METADATA.email}`} className="font-semibold text-primary underline">
            {SITE_METADATA.email}
          </a>{" "}
          instead.
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name?.message}>
          <input type="text" autoComplete="name" {...fieldProps("name")} />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email?.message}>
          <input type="email" autoComplete="email" {...fieldProps("email")} />
        </Field>
      </div>
      <Field id="contact-subject" label="Subject" error={errors.subject?.message}>
        <input type="text" {...fieldProps("subject")} />
      </Field>
      <Field
        id="contact-project"
        label="What do you want built?"
        hint="Optional. Platforms, rough scope, timeline."
        error={errors.project?.message}
      >
        <textarea rows={3} {...fieldProps("project", true)} />
      </Field>
      <Field id="contact-message" label="Message" error={errors.message?.message}>
        <textarea rows={5} {...fieldProps("message")} />
      </Field>
      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
