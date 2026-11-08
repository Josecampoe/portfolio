"use client";

import { useState, type FormEvent } from "react";
import { contactText } from "@/data/contact";
import { profile } from "@/data/profile";
import {
  hasErrors,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "@/lib/validation";
import { SendIcon } from "@/components/ui/Icons";

const emptyFields: ContactFields = { name: "", email: "", message: "" };

const inputClass =
  "mt-2 w-full rounded-xl border bg-bg px-4 py-3 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(emptyFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSent, setIsSent] = useState(false);
  const { form, errors: errorText } = contactText;

  const updateField = (name: keyof ContactFields, value: string) => {
    setFields((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: false }));
    setIsSent(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateContact(fields);
    setErrors(result);
    if (hasErrors(result)) return;

    const body = `${fields.message.trim()}\n\n— ${fields.name.trim()} (${fields.email.trim()})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      form.subject,
    )}&body=${encodeURIComponent(body)}`;
    setIsSent(true);
    setFields(emptyFields);
  };

  const borderFor = (name: keyof ContactFields) =>
    errors[name] ? "border-accent" : "border-line-strong";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          {form.nameLabel}
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={fields.name}
            placeholder={form.namePlaceholder}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={errors.name || undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${inputClass} ${borderFor("name")}`}
          />
          {errors.name ? (
            <span id="name-error" className="mt-2 block text-xs text-accent-text">
              {errorText.name}
            </span>
          ) : null}
        </label>

        <label className="block text-sm font-medium">
          {form.emailLabel}
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={fields.email}
            placeholder={form.emailPlaceholder}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={errors.email || undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${inputClass} ${borderFor("email")}`}
          />
          {errors.email ? (
            <span id="email-error" className="mt-2 block text-xs text-accent-text">
              {errorText.email}
            </span>
          ) : null}
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium">
        {form.messageLabel}
        <textarea
          name="message"
          rows={5}
          value={fields.message}
          placeholder={form.messagePlaceholder}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={errors.message || undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-y ${borderFor("message")}`}
        />
        {errors.message ? (
          <span id="message-error" className="mt-2 block text-xs text-accent-text">
            {errorText.message}
          </span>
        ) : null}
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary">
          {form.submit}
          <SendIcon />
        </button>
        <p role="status" className="text-sm text-muted">
          {isSent ? form.success : ""}
        </p>
      </div>
    </form>
  );
}
