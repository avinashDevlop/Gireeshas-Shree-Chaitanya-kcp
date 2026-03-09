import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Sri Chaitanya School",
  description: "Sri Chaitanya School provides quality education and modern facilities for students.",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>

        <Header />

        <main>
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}