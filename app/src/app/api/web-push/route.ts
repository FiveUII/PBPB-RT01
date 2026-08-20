import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:admin@rt01harmoni.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  try {
    const { action, subscription, payload } = await req.json();
    const supabase = await createClient();

    // ACTION: SUBSCRIBE
    if (action === "subscribe") {
      const { error } = await supabase.from("subscriptions").insert({
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      });

      // Ignore unique constraint error if they are already subscribed
      if (error && error.code !== "23505") {
        throw new Error(error.message);
      }

      return NextResponse.json({ success: true, message: "Subscribed" });
    }

    // ACTION: BROADCAST (Dipanggil oleh server action)
    if (action === "broadcast") {
      const { data: subs, error } = await supabase.from("subscriptions").select("*");
      if (error) throw new Error(error.message);

      if (!subs || subs.length === 0) {
        return NextResponse.json({ success: true, message: "No subscribers" });
      }

      const notifications = subs.map((sub) => {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: sub.keys,
        };
        return webpush.sendNotification(pushSubscription, JSON.stringify(payload))
          .catch((err) => {
            if (err.statusCode === 410 || err.statusCode === 404) {
              // Hapus subscription yang sudah tidak valid
              supabase.from("subscriptions").delete().eq("id", sub.id).then();
            }
          });
      });

      await Promise.all(notifications);
      return NextResponse.json({ success: true, message: `Sent to ${subs.length} subscribers` });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Web Push Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
