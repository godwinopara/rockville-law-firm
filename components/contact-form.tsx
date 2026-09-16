"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { type ContactFormValues, validateContactForm } from "@/lib/form";

const initial: ContactFormValues = { name: "", email: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const change = (key: keyof ContactFormValues, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalid = Object.keys(nextErrors)[0];
      window.requestAnimationFrame(() => document.getElementById(firstInvalid)?.focus());
      return;
    }
    window.location.href = `mailto:info@rockvillelp.com?subject=${encodeURIComponent(`Consultation request from ${values.name}`)}&body=${encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`)}`;
  };

  const fieldClass = "border-b border-line bg-transparent px-0 py-4 outline-none transition-colors focus:border-gold";
  return <form noValidate onSubmit={submit} className="mt-10 grid gap-7">
    <label className="grid text-xs font-semibold uppercase tracking-[.1em]">Name<input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={fieldClass} value={values.name} onChange={(event) => change("name", event.target.value)} />{errors.name && <span id="name-error" className="mt-2 normal-case tracking-normal text-[#9b2f26]">{errors.name}</span>}</label>
    <label className="grid text-xs font-semibold uppercase tracking-[.1em]">Email<input id="email" name="email" autoComplete="email" type="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={fieldClass} value={values.email} onChange={(event) => change("email", event.target.value)} />{errors.email && <span id="email-error" className="mt-2 normal-case tracking-normal text-[#9b2f26]">{errors.email}</span>}</label>
    <label className="grid text-xs font-semibold uppercase tracking-[.1em]">How can we help?<textarea id="message" name="message" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} className={`${fieldClass} min-h-36 resize-y`} value={values.message} onChange={(event) => change("message", event.target.value)} />{errors.message && <span id="message-error" className="mt-2 normal-case tracking-normal text-[#9b2f26]">{errors.message}</span>}</label>
    <p className="text-sm leading-6 text-stone">Submitting will open your email application so you can review the request before sending.</p>
    <button className="btn-primary w-fit" type="submit">Compose request email<ArrowUpRight size={16} /></button>
  </form>;
}
