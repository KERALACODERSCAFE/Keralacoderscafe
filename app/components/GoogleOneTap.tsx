"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GoogleOneTap() {
  const { status } = useSession();
  const router = useRouter();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Only load if user is unauthenticated
    if (status === "unauthenticated") {
      // Check if script is already loaded
      if (document.getElementById("google-gsi-script")) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = "google-gsi-script";
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    }
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated" && scriptLoaded && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "562262535135-njkgcvahk51t2hst9d7e7iir2d4phpb3.apps.googleusercontent.com",
        callback: async (response: any) => {
          const res = await signIn("google-one-tap", {
            credential: response.credential,
            redirect: false,
          });
          
          if (res?.ok) {
            router.refresh();
          }
        },
        auto_select: false,
        cancel_on_tap_outside: false,
        use_fedcm_for_prompt: true,
      });

      window.google.accounts.id.prompt();
    }
  }, [status, scriptLoaded, router]);

  return null;
}
