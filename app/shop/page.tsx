import SiteListContainer from "@/components/SiteListContainer";

export const dynamic = "force-dynamic";

const ShopPage = () => {
  return (
    <main className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
      <SiteListContainer />
    </main>
  );
};

export default ShopPage;
