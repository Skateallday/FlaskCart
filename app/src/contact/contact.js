import { useState } from "react";
import { Link } from "react-router-dom";

import { BASE_URL } from "../config/config";

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
};

function getCookie(name) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (!cookie) {
    return "";
  }

  return decodeURIComponent(cookie.split("=")[1]);
}

function validateForm(values) {
  const errors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  if (!trimmedName) {
    errors.name = "Enter your name.";
  } else if (trimmedName.length > 100) {
    errors.name = "Your name must be 100 characters or fewer.";
  }

  if (!trimmedEmail) {
    errors.email = "Enter your email address.";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmedEmail)) {
    errors.email = "Enter a valid email address.";
  } else if (trimmedEmail.length > 254) {
    errors.email = "Your email address must be 254 characters or fewer.";
  }

  if (!trimmedMessage) {
    errors.message = "Enter a message.";
  } else if (trimmedMessage.length > 5000) {
    errors.message = "Your message must be 5,000 characters or fewer.";
  }

  return errors;
}

async function readResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return {};
  }

  try {
    return await response.json();
  } catch {
    return {};
  }
}

export default function Contact() {
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setFieldErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];

      return nextErrors;
    });

    setSubmissionStatus(null);
  }

  async function sendContactForm(event) {
    event.preventDefault();

    const validationErrors = validateForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setSubmissionStatus({
        type: "error",
        message: "Please correct the highlighted fields.",
      });
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    setSubmissionStatus(null);

    const csrfToken = getCookie("csrf_token");

    const headers = {
      "Content-Type": "application/json",
    };

    if (csrfToken) {
      headers["X-CSRFToken"] = csrfToken;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          message: formValues.message.trim(),
        }),
      });

      const responseData = await readResponseBody(response);

      if (response.ok) {
        setFormValues(INITIAL_FORM);
        setSubmissionStatus({
          type: "success",
          message: responseData.message || "Thanks — your message has been received.",
        });
        return;
      }

      const serverFieldErrors =
        responseData.error?.fields &&
        typeof responseData.error.fields === "object"
          ? responseData.error.fields
          : {};

      setFieldErrors(serverFieldErrors);

      if (responseData.saved === true) {
        setFormValues(INITIAL_FORM);
        setSubmissionStatus({
          type: "warning",
          message:
            responseData.error?.message ||
            "Your message was saved, but part of the notification process failed. There is no need to submit it again.",
        });
        return;
      }

      setSubmissionStatus({
        type: "error",
        message:
          responseData.error?.message ||
          "We couldn't send your message. Please try again.",
      });
    } catch (error) {
      console.error("Contact request failed:", error);

      setSubmissionStatus({
        type: "error",
        message:
          "We couldn't connect to the server. Your message has not been submitted, so please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const statusClasses = {
    success: "border-green-200 bg-green-50 text-green-800",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    error: "border-red-200 bg-red-50 text-red-800",
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">

        {/* Contact intro */}
        <div className="flex flex-col justify-between bg-teal-50 p-8 sm:p-10 lg:p-12">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white shadow-sm">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16v16H4z" />
                <path d="m4 6 8 7 8-7" />
              </svg>
            </div>

            <p className="font-slab mb-2 text-sm font-bold uppercase tracking-wider text-teal-700">
              Get in touch
            </p>

            <h2 className="font-slab mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              We&apos;d love to hear from you
            </h2>

            <p className="max-w-md text-slate-600">
              Have a question about a recipe, ingredient, or FlaskCart itself?
              Send us a message and we&apos;ll get back to you as soon as we can.
            </p>
          </div>

          <div className="mt-10 border-t border-teal-200 pt-6">
            <p className="text-sm text-slate-600">
              Looking for some cooking inspiration instead?
            </p>

            <Link to="/recipes" className="mt-3 inline-flex items-center gap-2 font-bold text-teal-700 transition hover:gap-3 hover:text-teal-900">
              Explore our recipes
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Contact form */}
        <div className="p-8 sm:p-10 lg:p-12">
          <form onSubmit={sendContactForm} noValidate>
            {submissionStatus && (
              <div className={`mb-6 rounded-lg border p-4 ${statusClasses[submissionStatus.type]}`} role={submissionStatus.type === "error" ? "alert" : "status"} aria-live="polite">
                {submissionStatus.message}
              </div>
            )}

            <div className="mb-5">
              <label htmlFor="contact-name" className="mb-2 block text-sm font-bold text-slate-700">
                Full name <span className="text-teal-700" aria-hidden="true">*</span>
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500/30 ${fieldErrors.name ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-teal-600"}`}
                placeholder="Your full name"
                autoComplete="name"
                maxLength={100}
                required
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
              />

              {fieldErrors.name && (
                <p id="contact-name-error" className="mt-2 text-sm font-medium text-red-700">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="contact-email" className="mb-2 block text-sm font-bold text-slate-700">
                Email address <span className="text-teal-700" aria-hidden="true">*</span>
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500/30 ${fieldErrors.email ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-teal-600"}`}
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={254}
                required
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
              />

              {fieldErrors.email && (
                <p id="contact-email-error" className="mt-2 text-sm font-medium text-red-700">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="contact-message" className="mb-2 block text-sm font-bold text-slate-700">
                Your message <span className="text-teal-700" aria-hidden="true">*</span>
              </label>

              <textarea
                id="contact-message"
                name="message"
                value={formValues.message}
                onChange={handleChange}
                className={`min-h-40 w-full resize-y rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500/30 ${fieldErrors.message ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-teal-600"}`}
                placeholder="How can we help?"
                rows={6}
                maxLength={5000}
                required
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? "contact-message-error" : "contact-message-help"}
              />

              <div className="mt-2 flex items-center justify-between gap-4">
                <p id="contact-message-help" className="text-sm text-slate-500">
                  Maximum 5,000 characters.
                </p>

                <p className="text-sm tabular-nums text-slate-500">
                  {formValues.message.length} / 5,000
                </p>
              </div>

              {fieldErrors.message && (
                <p id="contact-message-error" className="mt-2 text-sm font-medium text-red-700">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            <button
              className="inline-flex min-w-36 items-center justify-center rounded-lg bg-teal-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-teal-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}