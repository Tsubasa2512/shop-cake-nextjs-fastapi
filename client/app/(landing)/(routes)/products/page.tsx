import ListProduct from "@/components/client/product/list-product";
import { FilterSidebar } from "@/components/client/product/filter";
export default function Product() {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-8 w-full px-4 md:my-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className=" md:col-span-1">
            <FilterSidebar />
          </div>
          <div className="md:col-span-3">
            <ListProduct />
          </div>
        </div>
      </div>
    </main>
  );
}
