import { createFileRoute, Link } from "@tanstack/react-router";
import kitchen from "@/assets/kitchen.jpg";
import { PageHero } from "@/components/SiteLayout";
import { BUSINESS } from "@/lib/menu";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ahmad's Kitchen | Minna, Niger State" },
      {
        name: "description",
        content:
          "The story behind Ahmad's Kitchen in Minna — family recipes, fresh daily cooking, dine-in, takeaway and delivery across Niger State.",
      },
      { property: "og:title", content: "About Ahmad's Kitchen" },
      {
        property: "og:description",
        content: "Family recipes and fresh daily cooking from Minna, Niger State.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About Ahmad's Kitchen"
        subtitle="A Minna kitchen built on family recipes, generous portions and food that tastes like it was cooked for you."
      />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <img
          src={kitchen}
          alt="Chefs plating food in the Ahmad's Kitchen kitchen"
          loading="lazy"
          width={1400}
          height={1000}
          className="rounded-2xl border border-border object-cover"
        />
        <div>
          <h2 className="text-3xl text-gold">Cooked The Way Home Does It</h2>
          <p className="mt-4 text-muted-foreground">
            Ahmad&apos;s Kitchen started with one pot of jollof and a simple rule: never serve
            food you wouldn&apos;t proudly put in front of your own family. That rule still runs
            the kitchen today.
          </p>
          <p className="mt-4 text-muted-foreground">
            Every morning our team is in {BUSINESS.city} picking peppers, tomatoes, fresh fish
            and meat from the market. Stocks are simmered from scratch, suya is spiced by hand,
            and swallow is turned to order — nothing frozen, nothing reheated from yesterday.
          </p>
          <p className="mt-4 text-muted-foreground">
            Whether you&apos;re eating in with friends, grabbing a pack on the way home, or
            feeding a whole event, you get the same plate: hot, generous and full of flavour.
          </p>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-3">
          {[
            {
              title: "Fresh Every Day",
              text: "Market runs each morning. Pots are cooked for the day, never held over.",
            },
            {
              title: "Real Nigerian Flavour",
              text: "Smoky party jollof, proper draw soups, charcoal-grilled suya and fish.",
            },
            {
              title: "Serving Minna",
              text: "Dine-in, takeaway, delivery and bulk catering packs across Niger State.",
            },
          ].map((v) => (
            <div key={v.title} className="surface-card p-6">
              <h3 className="text-lg text-primary">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl text-gold">Find Us</h2>
            <p className="mt-3 text-muted-foreground">{BUSINESS.address}</p>
            <p className="mt-1 text-muted-foreground">{BUSINESS.phone}</p>
          </div>
          <div>
            <h2 className="text-2xl text-gold">Opening Hours</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {BUSINESS.hours.map((h) => (
                <li key={h.days} className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-foreground">{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/menu"
            className="rounded-full border border-primary/60 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/10"
          >
            See the Menu
          </Link>
          <Link
            to="/order"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Order Online
          </Link>
        </div>
      </section>
    </>
  );
}
