import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/global.css';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import { ThemeProvider } from './components/providers/theme-provider';
import PageTransitionWrapper from './components/PageTransitionWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ProjectPro - Advanced Project Management',
  description: 'Streamline your project management workflow with ProjectPro. Manage tasks, track progress, and collaborate with your team efficiently.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
