import Wrapper from "@/components/wrapper";
import MainNavbar from "@/app/(stores)/[storeId]/_navbar/main-nav";
import Footer from "@/components/Footer";

function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainNavbar />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </div>
  );
}

export default StoreLayout;
