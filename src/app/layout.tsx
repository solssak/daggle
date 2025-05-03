import CommonHead from '@/features/modules/CommonHead/CommonHead';
import '@/styles/globals.css';
import Header from '@/features/ui/Header/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <CommonHead />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
