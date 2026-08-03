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
          message:
            responseData.message ||
            "Thanks — your message has been received.",
        });
        return;
      }

      const serverFieldErrors =
        responseData.error?.fields &&
        typeof responseData.error.fields === "object"
          ? responseData.error.fields
          : {};

      setFieldErrors(serverFieldErrors);

      /*
       * The enquiry reached the database, so clearing the fields prevents
       * the visitor from accidentally submitting the same message twice.
       */
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

      /*
       * Nothing was saved, so formValues remain unchanged and the visitor
       * can correct or retry the submission.
       */
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
    success: "border-green-300 bg-green-50 text-green-800",
    warning: "border-amber-300 bg-amber-50 text-amber-900",
    error: "border-red-300 bg-red-50 text-red-800",
  };

  return (
    <div className="w-full flex flex-wrap">
      <div className="w-full bg-white flex flex-col p-4 m-4 rounded shadow-md">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl py-5 font-bold text-center mt-8 pb-8">
            Contact us
          </h2>

          <p>
            Have questions about our recipes, ingredients, or anything else?
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>

          <p className="mt-2">
            In the meantime, why not explore some of our recipes?
          </p>

          <p>
            <Link
              to="/recipes"
              className="inline-block py-4 text-teal-600 hover:underline"
            >
              View our recipes
            </Link>
          </p>
        </div>

        <form
          className="w-full max-w-3xl mx-auto"
          onSubmit={sendContactForm}
          noValidate
        >
          {submissionStatus && (
            <div
              className={`mb-4 rounded border p-3 ${
                statusClasses[submissionStatus.type]
              }`}
              role={
                submissionStatus.type === "error" ? "alert" : "status"
              }
              aria-live="polite"
            >
              {submissionStatus.message}
            </div>
          )}

          <label
            htmlFor="contact-name"
            className="block text-gray-700 pt-2 text-sm font-bold mb-2"
          >
            Full name
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Full name"
            autoComplete="name"
            maxLength={100}
            required
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={
              fieldErrors.name ? "contact-name-error" : undefined
            }
          />

          {fieldErrors.name && (
            <p
              id="contact-name-error"
              className="mt-1 text-sm text-red-700"
            >
              {fieldErrors.name}
            </p>
          )}

          <label
            htmlFor="contact-email"
            className="block text-gray-700 pt-2 text-sm font-bold mb-2"
          >
            Email address
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Email address"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={
              fieldErrors.email ? "contact-email-error" : undefined
            }
          />

          {fieldErrors.email && (
            <p
              id="contact-email-error"
              className="mt-1 text-sm text-red-700"
            >
              {fieldErrors.email}
            </p>
          )}

          <label
            htmlFor="contact-message"
            className="block text-gray-700 pt-2 text-sm font-bold mb-2"
          >
            Your message
          </label>

          <textarea
            id="contact-message"
            name="message"
            value={formValues.message}
            onChange={handleChange}
            className="border w-full p-2"
            placeholder="Your message"
            rows={7}
            maxLength={5000}
            required
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={
              fieldErrors.message
                ? "contact-message-error"
                : "contact-message-help"
            }
          />

          <div className="flex justify-between gap-4">
            <p
              id="contact-message-help"
              className="mt-1 text-sm text-gray-600"
            >
              Maximum 5,000 characters.
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {formValues.message.length}/5,000
            </p>
          </div>

          {fieldErrors.message && (
            <p
              id="contact-message-error"
              className="mt-1 text-sm text-red-700"
            >
              {fieldErrors.message}
            </p>
          )}

          <button
            className="bg-teal-600 text-black font-bold px-4 py-2 rounded mt-4 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}