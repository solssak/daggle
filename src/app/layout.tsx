import CommonHead from '@/features/modules/CommonHead/CommonHead';
import '@/styles/globals.css';
import Header from '@/features/ui/Header';
import AppProvider from '@/features/modules/AppProvider';

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
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
