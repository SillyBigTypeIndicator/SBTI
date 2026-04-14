/**
 * Plausible-style analytics abstraction — wire `NEXT_PUBLIC_ANALYTICS_ENDPOINT` to your collector.
 */
type Props = Record<string, string | number | boolean | undefined>;

export const analytics = {
  track(event: string, props?: Props) {
    if (typeof window === "undefined") return;
    const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
    if (!endpoint) return;
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, props, ts: Date.now() }),
      keepalive: true,
    }).catch(() => {});
  },
};
