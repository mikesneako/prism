import { HelioCheckout } from "@heliofi/checkout-react";

const helioConfig = {
  paylinkId: "690c612031e40af529050012",
  theme: { themeMode: "dark" as const },
  primaryColor: "#6400CC",
  neutralColor: "#5A6578",
  amount: "5.99",
  display: "inline" as const,
  onSuccess: (event: unknown) => console.log(event),
  onError: (event: unknown) => console.log(event),
  onPending: (event: unknown) => console.log(event),
  onCancel: () => console.log("Cancelled payment"),
  onStartPayment: () => console.log("Starting payment"),
};

export function YourCheckoutComponent() {
  return <HelioCheckout config={helioConfig} />;
}
