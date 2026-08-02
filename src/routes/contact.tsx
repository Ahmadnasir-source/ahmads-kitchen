import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/SiteLayout";
import { BUSINESS } from "@/lib/menu";
import { sendContactMessage } from "@/lib/orders.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ahmad's Kitchen | Minna, Niger State" },
      {
        name: "description",
        content:
          "Call, WhatsApp, email or message Ahmad's Kitchen in Minna, Niger State for orders, catering and reservations.",
      },
      { property: "og:title", content: "Contact Ahmad's Kitchen" },
      {
        property: "og:description",
        content: "Reach Ahmad's Kitchen in Minna for orders, catering and enquiries.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const send = useServerFn(sendContactMessage);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await send({ data: form });
      toast.success("Message sent. We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Talk To The Kitchen"
        subtitle="Orders, catering, reservations or feedback — we're one message away."
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
        <div className="space-y-6">
          <div className="surface-card p-6">
            <h2 className="text-xl text-gold">Reach Us</h2>
            <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {BUSINESS.address}
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>{BUSINESS.phone}</a>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </li>
            </ul>
          </div>

          <div className="surface-card p-6">
            <h2 className="text-xl text-gold">Opening Hours</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {BUSINESS.hours.map((h) => (
                <li key={h.days} className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-foreground">{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Map showing Ahmad's Kitchen in Minna, Niger State"
              src="https://www.google.com/maps?q=Minna,%20Niger%20State,%20Nigeria&output=embed"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={onSubmit} className="surface-card h-fit space-y-4 p-6">
          <h2 className="text-xl text-gold">Send a Message</h2>
          <div>
            <label className="text-sm text-muted-foreground" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground" htmlFor="cemail">
              Email
            </label>
            <input
              id="cemail"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground" htmlFor="cphone">
              Phone (optional)
            </label>
            <input
              id="cphone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-primary-foreground disabled:opacity-50"
          >
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}
