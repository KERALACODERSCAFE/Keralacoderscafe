import Events from "@/app/components/Events";

export const metadata = {
  title: "Sunday Meetup | Kerala Coders Cafe",
  description: "Join our Sunday Online Meetup! Share projects, improve your skills, and network with the community.",
};

export default function SundayMeetupPage() {
  return (
    <div className="min-h-screen bg-[#101012] pt-20">
      <Events isDetailsPage={true} />
    </div>
  );
}
