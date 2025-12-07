import { useState } from "react";
import { sendContactMessage } from "../services/contactService";
import { ENDPOINTS } from "../../../config/endpoints";
import { Button } from "../../../components/Button";
import { FiSend } from "react-icons/fi";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submit clicked", { name, email, message });
    setStatus("Sending...");

    try {
      console.log("Calling sendContactMessage to", ENDPOINTS.contacts);
      const response = await sendContactMessage({ name, email, message });
      if (response) {
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your message..."
            required
          ></textarea>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          size="md"
          leftIcon={<FiSend />}
          loading={status === "Sending..."}
        >
          Send Message
        </Button>
      </form>

      {status && <p className="mt-4 text-center text-gray-700">{status}</p>}

      <p className="mt-6 text-gray-700 text-center">
        Or reach us directly at{" "}
        <span className="font-semibold text-indigo-600">
          contact@example.com
        </span>
      </p>
    </div>
  );
}
