import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Utensils, Bike, PartyPopper } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { CATEGORIES, MENU, formatNaira } from "@/lib/menu";
import { MENU_IMAGES } from "@/lib/menu-images";


export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu & Services | Ahmad's Kitchen Minna" },
      {
        name: "description",
        content:
          "Rice dishes, soups & swallow, grills and extras at Ahmad's Kitchen Minna — plus dine-in, delivery and catering services.",
      },
      { property: "og:title", content: "Menu & Services | Ahmad's Kitchen" },
      {
        property: "og:description",
        content: "Jollof, egusi, pepper soup, suya, small chops, drinks and desserts.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Menu & Services"
        title="What's Cooking"
        subtitle="Everything below is cooked fresh daily. Prices are per plate unless stated otherwise."
      />

      <div className="mx-auto max-w-6xl px-4 py-16">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} className="mb-14">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-3">
              <h2 className="text-2xl text-gold">{cat.name}</h2>
              <p className="text-sm text-muted-foreground">{cat.blurb}</p>
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {MENU.filter((m) => m.category === cat.id).map((item) => (
                <li key={item.id} className="surface-card overflow-hidden">
                  <img
                    src={MENU_IMAGES[item.id]}
                    alt={item.name}
                    loading="lazy"
                    width={768}
                    height={576}
                    className="h-44 w-full object-cover"
                  />
                  <div className="flex justify-between gap-4 p-5">
                    <div>
                      <h3 className="flex items-center gap-2 text-base">
                        {item.name}
                        {item.signature && <Star className="h-4 w-4 text-primary" />}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="shrink-0 font-semibold text-primary">
                      {formatNaira(item.price)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

          </section>
        ))}

        <section className="border-t border-border/60 pt-12">
          <h2 className="text-2xl text-gold">Our Services</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { icon: Utensils, title: "Dine In", text: "Relaxed seating in Minna for lunch, dinner and late-night pepper soup." },
              { icon: Bike, title: "Delivery & Takeaway", text: "Sealed hot packs delivered across Minna, or ready for pickup." },
              { icon: PartyPopper, title: "Catering & Bulk Packs", text: "Trays and party packs for events, offices and celebrations." },
            ].map((s) => (
              <div key={s.title} className="surface-card p-6">
                <s.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
          <Link
            to="/order"
            className="mt-8 inline-block rounded-full bg-gold px-7 py-3 font-semibold text-primary-foreground hover:opacity-90"
          >
            Order Online
          </Link>
        </section>
      </div>
    </>
  );
}
