import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { BUSINESS } from "@/lib/menu";

export const Route = createFileRoute("/order/success")({
  validateSearch: z.object({ id: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Order Received | Ahmad's Kitchen" },
      {
        name: "description",
        content: "Your Ahmad's Kitchen order has been received. We'll call to confirm shortly.",
      },
      { property: "og:title", content: "Order Received | Ahmad's Kitchen" },
      { property: "og:description", content: "Thanks for ordering from Ahmad's Kitchen, Minna." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { id } = Route.useSearch();

  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
      <h1 className="mt-6 text-4xl text-gold">Order Received</h1>
      <p className="mt-4 text-muted-foreground">
        Thank you. Our kitchen has your order and we&apos;ll call you on the number you gave us
        to confirm delivery and payment.
      </p>
      {id && (
        <p className="mt-4 text-sm text-muted-foreground">
          Order reference: <span className="text-primary">{id.slice(0, 8).toUpperCase()}</span>
        </p>
      )}
      <p className="mt-6 text-sm text-muted-foreground">
        Need to change something? Call us on{" "}
        <a className="text-primary" href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>
          {BUSINESS.phone}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/menu"
          className="rounded-full border border-primary/60 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/10"
        >
          Back to Menu
        </Link>
        <Link
          to="/"
          className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Home
        </Link>
      </div>
    </section>
  );
}
