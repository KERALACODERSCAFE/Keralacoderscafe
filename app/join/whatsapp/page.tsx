import type { Metadata } from "next";
import WhatsAppGateScreen from "../../components/WhatsAppGateScreen";

export const metadata: Metadata = {
  title: "Join WhatsApp",
  description:
    "Complete a quick task to unlock the Kerala Coders Cafe WhatsApp invite.",
};

export default function WhatsAppJoinPage() {
  return <WhatsAppGateScreen />;
}
