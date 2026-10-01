"use client";

import { buttonStyles } from "@/components/ui/Button";
import { SITE_METADATA } from "@/lib/constants";
import { useContactForm } from "../hooks/useContactForm";
import type { ContactFormData } from "../types";

type FieldName = Exclude<keyof ContactFormData, "project">;

export function ContactForm() {
  const { form, onSubmit, status } = useContactForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  if (status === "success") {
    return (
      <p role="status" className="font-display text-lg font-bold">
        Message sent. I&apos;ll reply within two days.
      </p>
    );
  }

  const field = (name: FieldName, label: string, opts: { type?: string; autoComplete?: string; textarea?: boolean } = {}) => {
    const id = `contact-${name}`;
    const error = errors[name]?.message;
    const props = {
      id,
      placeholder: " ",
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}-error` : undefined,
      ...register(name),
    };
    return (
      <div className="field" data-invalid={error ? "true" : undefined}>
        {opts.textarea ? <textarea rows={5} {...props} /> : <input type={opts.type ?? "text"} autoComplete={opts.autoComplete} {...props} />}
        <label htmlFor={id}>{label}</label>
        {error && (
          <p id={`${id}-error`} role="alert" className="field-error">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {status === "error" && (
        <p role="alert" className="mb-4 rounded-xl border p-4 text-sm" style={{ borderColor: "var(--fuchsia)" }}>
          Couldn&apos;t send your message. Email me at{" "}
          <a href={`mailto:${SITE_METADATA.email}`} className="font-bold underline">
            {SITE_METADATA.email}
          </a>{" "}
          instead.
        </p>
      )}
      <div className="grid gap-x-3 sm:grid-cols-2">
        {field("name", "Name", { autoComplete: "name" })}
        {field("email", "Email", { type: "email", autoComplete: "email" })}
      </div>
      {field("subject", "Subject")}
      {field("message", "Message", { textarea: true })}
      <button type="submit" disabled={status === "submitting"} className={buttonStyles({ variant: "gradient" })}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
