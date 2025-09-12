export async function GET() {
  const siteUrl = "https://softwarepros.org";

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/">
    <channel>
      <title>SoftwarePros - Healthcare Software & Technology Solutions</title>
      <link>${siteUrl}</link>
      <description>Professional software development, consulting, and digital solutions for startups and enterprises. Specializing in healthcare software, HIPAA compliance, and enterprise solutions.</description>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <sy:updatePeriod>weekly</sy:updatePeriod>
      <sy:updateFrequency>1</sy:updateFrequency>
      <generator>SoftwarePros Website</generator>
      <managingEditor>contact@softwarepros.org (SoftwarePros Team)</managingEditor>
      <webMaster>contact@softwarepros.org (SoftwarePros Team)</webMaster>
      <category>Technology</category>
      <category>Healthcare Software</category>
      <category>Software Development</category>
      <category>HIPAA Compliance</category>
      <category>Enterprise Software</category>
      <category>Technology Consulting</category>
      <image>
        <url>${siteUrl}/web-app-manifest-512x512.png</url>
        <title>SoftwarePros</title>
        <link>${siteUrl}</link>
        <width>512</width>
        <height>512</height>
      </image>
      <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
