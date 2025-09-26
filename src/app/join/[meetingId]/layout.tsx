export const metadata = {
  title: "SoftwarePros - Video Consultation",
  description: "Join your video consultation with SoftwarePros",
};

export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "#000",
        zIndex: 9999,
      }}
    >
      {children}
    </div>
  );
}
