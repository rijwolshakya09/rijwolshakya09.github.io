"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, CheckCircle, AlertCircle, Send, Loader2, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useContactForm } from "../hooks/useContactForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SITE_METADATA, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const INPUT_BASE =
  "w-full rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ContactSection() {
  const { form, onSubmit, status } = useContactForm();
  const reduced = useReducedMotion();
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contact"
          title="Let's Work Together"
          description="Open to Flutter roles, mobile consulting, and interesting collaboration opportunities."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Info column */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="space-y-4"
          >
            <GlassCard className="p-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Mail size={20} className="text-primary" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">Email</p>
                <a
                  href={`mailto:${SITE_METADATA.email}`}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {SITE_METADATA.email}
                </a>
              </div>
            </GlassCard>

            <GlassCard className="p-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Phone size={20} className="text-primary" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">Phone</p>
                <a
                  href={`tel:${SITE_METADATA.phone}`}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {SITE_METADATA.phone}
                </a>
              </div>
            </GlassCard>

            <GlassCard className="p-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MapPin size={20} className="text-primary" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">Location</p>
                <p className="text-sm font-medium text-foreground">{SITE_METADATA.location}</p>
              </div>
            </GlassCard>

            <div className="pt-2 flex gap-3">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted hover:border-primary hover:text-primary transition-all duration-200 hover:scale-[1.08] min-w-[48px] min-h-[48px]"
                aria-label="GitHub profile"
              >
                <GithubIcon width={18} height={18} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted hover:border-primary hover:text-primary transition-all duration-200 hover:scale-[1.08] min-w-[48px] min-h-[48px]"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon width={18} height={18} />
              </a>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
          >
            <GlassCard className="p-6 md:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <CheckCircle size={48} className="text-green-500" aria-hidden />
                  <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-sm text-muted">Thanks for reaching out. I&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  aria-label="Contact form"
                  className="space-y-5"
                >
                  {status === "error" && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
                      <AlertCircle size={16} aria-hidden />
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-muted">
                        Name <span aria-hidden className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        placeholder="Your name"
                        className={cn(INPUT_BASE, errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p id="name-error" role="alert" className="mt-1 text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-muted">
                        Email <span aria-hidden className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        placeholder="your@email.com"
                        className={cn(INPUT_BASE, errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-1 text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-medium text-muted">
                      Subject <span aria-hidden className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      placeholder="What's this about?"
                      className={cn(INPUT_BASE, errors.subject && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <p id="subject-error" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-muted">
                      Message <span aria-hidden className="text-primary">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      placeholder="Tell me about your project or opportunity..."
                      className={cn(INPUT_BASE, "resize-none", errors.message && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={18} aria-hidden />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Direct email fallback */}
                  <p className="text-center text-xs text-muted pt-1">
                    {"Prefer email directly? "}
                    <a
                      href={`mailto:${SITE_METADATA.email}?subject=Portfolio%20Inquiry`}
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                      aria-label="Send email directly"
                    >
                      <ExternalLink size={11} aria-hidden />
                      {SITE_METADATA.email}
                    </a>
                  </p>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
