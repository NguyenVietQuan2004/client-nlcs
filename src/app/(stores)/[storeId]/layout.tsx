import Footer from "@/components/footer";
import Wrapper from "@/components/wrapper";
import MainNavbar from "@/app/(stores)/[storeId]/_navbar/main-nav";

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
