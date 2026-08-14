import Events from "@/app/components/Events";

export const metadata = {
  title: "Sunday Meetup | Kerala Coders Cafe",
  description: "Join our Sunday Online Meetup! Share projects, improve your skills, and network with the community.",
  openGraph: {
    title: "Sunday Meetup | Kerala Coders Cafe",
    description: "Join our Sunday Online Meetup! Share projects, improve your skills, and network with the community.",
    url: "https://kcc.sh/events/sunday-meetup",
    type: "website",
    images: [
      {
        url: "https://www.keralacoderscafe.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kerala Coders Cafe Sunday Meetup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunday Meetup | Kerala Coders Cafe",
    description: "Join our Sunday Online Meetup! Share projects, improve your skills, and network with the community.",
    images: ["https://www.keralacoderscafe.in/og-image.jpg"],
  },
};

export default function SundayMeetupPage() {
  return (
    <div className="min-h-screen bg-[#101012] pt-20">
      <Events isDetailsPage={true} />
    </div>
  );
}
