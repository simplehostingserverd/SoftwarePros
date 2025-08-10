import { db } from '@/lib/db';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const siteUrl = 'https://softwarepros.org';

  let posts: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    publishedAt: Date | null;
  }> = [];

  try {
    posts = await db.post.findMany({
      where: { published: true },
      select: {
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        publishedAt: true,
      },
      orderBy: { publishedAt: 'desc' },
      take: 50,
    });
  } catch (error) {
    // Fallback to empty feed if DB not available
    posts = [];
  }

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const title = escapeXml(post.title);
      const description = escapeXml(post.excerpt || '');
      const pubDate = post.publishedAt ? post.publishedAt.toUTCString() : new Date().toUTCString();
      const content = escapeXml(`${post.content.substring(0, 500)}...`);

      // Extract categories from title/content for better categorization
      const categories = [];
      if (
        post.title.toLowerCase().includes('healthcare') ||
        post.content.toLowerCase().includes('healthcare')
      ) {
        categories.push('Healthcare Software');
      }
      if (
        post.title.toLowerCase().includes('hipaa') ||
        post.content.toLowerCase().includes('hipaa')
      ) {
        categories.push('HIPAA Compliance');
      }
      if (
        post.title.toLowerCase().includes('enterprise') ||
        post.content.toLowerCase().includes('enterprise')
      ) {
        categories.push('Enterprise Software');
      }
      if (
        post.title.toLowerCase().includes('development') ||
        post.content.toLowerCase().includes('development')
      ) {
        categories.push('Software Development');
      }
      if (
        post.title.toLowerCase().includes('consulting') ||
        post.content.toLowerCase().includes('consulting')
      ) {
        categories.push('Technology Consulting');
      }

      const categoryTags = categories
        .map((cat) => `<category>${escapeXml(cat)}</category>`)
        .join('');

      return `
      <item>
        <title>${title}</title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <pubDate>${pubDate}</pubDate>
        <description><![CDATA[${post.excerpt || ''}]]></description>
        <content:encoded><![CDATA[${content}]]></content:encoded>
        <dc:creator>SoftwarePros Team</dc:creator>
        <dc:date>${pubDate}</dc:date>
        ${categoryTags}
        <slash:comments>0</slash:comments>
      </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/">
    <channel>
      <title>SoftwarePros Blog - Healthcare Software & Technology Insights</title>
      <link>${siteUrl}/blog</link>
      <description>Expert insights on healthcare software development, HIPAA compliance, enterprise solutions, and technology consulting. Stay updated with the latest trends in medical software and digital transformation.</description>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <sy:updatePeriod>weekly</sy:updatePeriod>
      <sy:updateFrequency>1</sy:updateFrequency>
      <generator>SoftwarePros Blog System</generator>
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
        <title>SoftwarePros Blog</title>
        <link>${siteUrl}/blog</link>
        <width>512</width>
        <height>512</height>
      </image>
      <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
