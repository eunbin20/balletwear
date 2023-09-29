export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <div className="w-full flex flex-col items-center">
      <form action="/crawling/product-list" method="get">
        <button className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          Get ProductItem
        </button>
      </form>
    </div>
  );
}
