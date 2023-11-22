import Footer from "@/components/Footer";
import MainBody from "@/components/Body";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div className="app">
      <Header />
      <MainBody />
      <Footer />
      <div className="overlay"></div>
    </div>
  );
}
