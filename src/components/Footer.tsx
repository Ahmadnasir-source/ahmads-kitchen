import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logo from "@/assets/ahmads-kitchen-logo.png";
import { BUSINESS } from "@/lib/menu";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <img src={logo} alt="Ahmad's Kitchen logo" className="h-24 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Home-style Nigerian cooking from Minna — jollof, soups, grills and everything in
            between, served hot and delivered fast.
          </p>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-primary">Visit & Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {BUSINESS.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>{BUSINESS.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-primary">Opening Hours</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {BUSINESS.hours.map((h) => (
              <li key={h.days} className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="block text-foreground">{h.days}</span>
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-4 text-sm">
            <Link to="/menu" className="text-primary hover:underline">
              Menu
            </Link>
            <Link to="/order" className="text-primary hover:underline">
              Order Online
            </Link>
            <Link to="/contact" className="text-primary hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border/50 py-5 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Ahmad&apos;s Kitchen, {BUSINESS.city}. All rights
        reserved.
      </div>
    </footer>
  );
}
