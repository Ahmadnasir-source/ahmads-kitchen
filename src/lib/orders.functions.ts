import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { MENU_BY_ID, BUSINESS } from "@/lib/menu";

const orderSchema = z.object({
  customerName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  address: z.string().trim().min(6).max(400),
  notes: z.string().trim().max(600).optional().or(z.literal("")),
  lines: z
    .array(z.object({ id: z.string().min(1), qty: z.number().int().min(1).max(50) }))
    .min(1)
    .max(40),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const items = data.lines.map((line) => {
      const item = MENU_BY_ID[line.id];
      if (!item) throw new Error(`Unknown menu item: ${line.id}`);
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        qty: line.qty,
        lineTotal: item.price * line.qty,
      };
    });

    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
    const deliveryFee = BUSINESS.deliveryFee;
    const total = subtotal + deliveryFee;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: data.customerName,
        phone: data.phone,
        email: data.email || null,
        address: data.address,
        notes: data.notes || null,
        items,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to save order", error);
      throw new Error("We couldn't save your order. Please try again.");
    }

    return { orderId: inserted.id, total, subtotal, deliveryFee };
  });

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(2000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    });

    if (error) {
      console.error("Failed to save contact message", error);
      throw new Error("We couldn't send your message. Please try again.");
    }

    return { ok: true };
  });
