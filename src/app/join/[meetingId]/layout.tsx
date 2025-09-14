export const metadata = {
  title: 'SoftwarePros - Video Consultation',
  description: 'Join your video consultation with SoftwarePros',
}

export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}