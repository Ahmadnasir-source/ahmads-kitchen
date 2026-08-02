import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Truck, UtensilsCrossed, Star } from "lucide-react";
import logo from "@/assets/ahmads-kitchen-logo.png.asset.json";
import heroJollof from "@/assets/hero-jollof.jpg";
import grills from "@/assets/grills.jpg";
import soups from "@/assets/soups.jpg";
import { MENU, formatNaira, BUSINESS } from "@/lib/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ahmad's Kitchen | Jollof, Soups & Grills in Minna" },
      {
        name: "description",
        content:
          "Smoky jollof rice, rich Nigerian soups and charcoal grills, cooked fresh daily in Minna, Niger State. Dine in, take away or order online.",
      },
      { property: "og:title", content: "Ahmad's Kitchen | Nigerian Food in Minna" },
      {
        property: "og:description",
        content:
          "Jollof rice, pepper soup, suya and more — cooked fresh daily in Minna, Niger State. Order online for delivery.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const signature = MENU.filter((m) =>
    ["jollof-chicken", "pepper-soup", "suya-plantain", "bbq-fish-yam"].includes(m.id),
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={heroJollof}
          alt="Smoky jollof rice with grilled chicken"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/85 to-background" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <img
            src={logo.url}
            alt="Ahmad's Kitchen logo"
            className="mx-auto h-40 w-auto drop-shadow-2xl sm:h-52"
          />
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-primary">
            {BUSINESS.city}
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl leading-tight text-gold sm:text-6xl">
            Nigerian Cooking, Served Golden
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Party jollof, deep pots of soup and charcoal grills — cooked fresh every day and
            delivered hot across Minna.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/order"
              className="rounded-full bg-gold px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Order Now
            </Link>
            <Link
              to="/menu"
              className="rounded-full border border-primary/60 px-7 py-3 font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
          {[
            { icon: Flame, title: "Cooked Fresh Daily", text: "Nothing sits. Every pot is made the same day it's served." },
            { icon: Truck, title: "Fast Minna Delivery", text: "Hot packs delivered across Minna and Niger State." },
            { icon: UtensilsCrossed, title: "Dine In & Takeaway", text: "Comfortable dine-in space, plus trays for events." },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <f.icon className="mx-auto h-7 w-7 text-primary" />
              <h3 className="mt-3 text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">Signature Plates</p>
          <h2 className="mt-3 text-3xl text-gold sm:text-4xl">What Minna Orders Most</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signature.map((item) => (
            <article key={item.id} className="surface-card flex flex-col p-6">
              {item.signature && (
                <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                  <Star className="h-3 w-3" /> Number One
                </span>
              )}
              <h3 className="text-lg">{item.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.description}</p>
              <p className="mt-4 font-semibold text-primary">{formatNaira(item.price)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-20 md:grid-cols-2">
        {[
          { img: soups, title: "Soups & Swallow", text: "Egusi, ogbono, nsala and pepper soup — packed properly for delivery." },
          { img: grills, title: "Grills & Sides", text: "Suya, grilled chicken and BBQ fish straight off the charcoal." },
        ].map((c) => (
          <div key={c.title} className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src={c.img}
              alt={c.title}
              loading="lazy"
              width={1200}
              height={900}
              className="h-72 w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <h3 className="text-2xl text-gold">{c.title}</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">{c.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-3xl text-gold sm:text-4xl">Hungry? Let&apos;s Get Cooking</h2>
          <p className="mt-4 text-muted-foreground">
            Build your order online and pay securely by card. We&apos;ll have it hot and on the
            way in minutes.
          </p>
          <Link
            to="/order"
            className="mt-7 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </>
  );
}
