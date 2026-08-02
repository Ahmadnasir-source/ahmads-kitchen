import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/SiteLayout";
import { CATEGORIES, MENU, MENU_BY_ID, formatNaira, BUSINESS } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { placeOrder } from "@/lib/orders.functions";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Online | Ahmad's Kitchen Minna" },
      {
        name: "description",
        content:
          "Build your order from Ahmad's Kitchen in Minna — jollof, soups, grills, small chops and drinks — and get it delivered hot.",
      },
      { property: "og:title", content: "Order Online | Ahmad's Kitchen" },
      {
        property: "og:description",
        content: "Order Nigerian food online for delivery across Minna, Niger State.",
      },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const submitOrder = useServerFn(placeOrder);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.lines.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitOrder({ data: { ...form, lines: cart.lines } });
      cart.clear();
      navigate({ to: "/order/success", search: { id: result.orderId } });
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <>
      <PageHero
        eyebrow="Order Online"
        title="Build Your Order"
        subtitle={`Delivery across ${BUSINESS.city}. Flat delivery fee of ${formatNaira(BUSINESS.deliveryFee)} per order.`}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {CATEGORIES.map((cat) => (
            <section key={cat.id} className="mb-10">
              <h2 className="border-b border-border/60 pb-2 text-xl text-gold">{cat.name}</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {MENU.filter((m) => m.category === cat.id).map((item) => (
                  <li key={item.id} className="surface-card flex flex-col p-5">
                    <h3 className="text-base">{item.name}</h3>
                    <p className="mt-1 flex-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-semibold text-primary">
                        {formatNaira(item.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          cart.add(item.id);
                          toast.success(`${item.name} added to cart`);
                        }}
                        className="rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                      >
                        Add
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="surface-card p-6">
            <h2 className="text-xl text-gold">Your Order</h2>
            {cart.lines.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Nothing here yet. Add a dish to get started.
              </p>
            ) : (
              <ul className="mt-4 space-y-4">
                {cart.lines.map((line) => {
                  const item = MENU_BY_ID[line.id];
                  if (!item) return null;
                  return (
                    <li key={line.id} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatNaira(item.price * line.qty)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Reduce ${item.name}`}
                          onClick={() => cart.setQty(line.id, line.qty - 1)}
                          className="rounded border border-border p-1"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-sm">{line.qty}</span>
                        <button
                          type="button"
                          aria-label={`Add ${item.name}`}
                          onClick={() => cart.setQty(line.id, line.qty + 1)}
                          className="rounded border border-border p-1"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => cart.remove(line.id)}
                          className="rounded border border-border p-1 text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <dl className="mt-6 space-y-2 border-t border-border/60 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatNaira(cart.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd>{formatNaira(cart.deliveryFee)}</dd>
              </div>
              <div className="flex justify-between text-base font-semibold text-primary">
                <dt>Total</dt>
                <dd>{formatNaira(cart.total)}</dd>
              </div>
            </dl>
          </div>

          <form onSubmit={onSubmit} className="surface-card mt-6 space-y-4 p-6">
            <h2 className="text-xl text-gold">Delivery Details</h2>
            <div>
              <label className="text-sm text-muted-foreground" htmlFor="customerName">
                Full name
              </label>
              <input
                id="customerName"
                required
                value={form.customerName}
                onChange={(e) => update("customerName", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground" htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground" htmlFor="email">
                Email (optional)
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground" htmlFor="address">
                Delivery address in Minna
              </label>
              <textarea
                id="address"
                required
                rows={2}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground" htmlFor="notes">
                Order notes (optional)
              </label>
              <textarea
                id="notes"
                rows={2}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={submitting || cart.lines.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-primary-foreground disabled:opacity-50"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Place Order · {formatNaira(cart.total)}
            </button>
          </form>
        </aside>
      </div>
    </>
  );
}
