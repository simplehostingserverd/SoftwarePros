export async function GET() {
  const manifest = {
    name: "SoftwarePros",
    short_name: "SoftwarePros",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1020",
    theme_color: "#0b1020",
    description:
      "Professional software development, consulting, and digital solutions for startups and enterprises.",
    icons: [
      { src: "/images/softwarepros-logo.png", sizes: "192x192", type: "image/png" },
      { src: "/images/softwarepros-logo.png", sizes: "512x512", type: "image/png" },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
