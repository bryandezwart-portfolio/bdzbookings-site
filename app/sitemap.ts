import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase";

const BASIS = "https://bdzbookings.nl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vast: MetadataRoute.Sitemap = [
    { url: BASIS, changeFrequency: "weekly", priority: 1 },
    { url: `${BASIS}/acts`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASIS}/over`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASIS}/contact`, changeFrequency: "monthly", priority: 0.8 },
  ];

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("bdzbookings_acts_publiek")
      .select("slug");

    const acts: MetadataRoute.Sitemap = (data ?? []).map((a) => ({
      url: `${BASIS}/acts/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...vast, ...acts];
  } catch {
    return vast;
  }
}
