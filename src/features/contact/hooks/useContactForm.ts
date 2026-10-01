"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORMSPREE_ENDPOINT } from "@/lib/formspree";
import { contactSchema, type ContactFormData } from "../types";

export type ContactStatus = "idle" | "submitting" | "success" | "error";

export function useContactForm() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const inFlight = useRef(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", project: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  };

  return { form, onSubmit, status };
}
