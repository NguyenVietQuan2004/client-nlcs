import { OrderType } from "@/Type/OrderTypes";
import { ProductType } from "@/Type/ProductType";

interface CellPriceOrderProps {
  row: OrderType;
}

function CellPriceOrder({ row }: CellPriceOrderProps) {
  const error: Array<string> = [];
  const totalPrice = row.listProductOrder.reduce((acc: number, order: any) => {
    const sizeUserSelect = order.size;
    const colorsUserSelect = order.colors;
    const product: ProductType = order._id[0];
    const objectPrice = product.arrayPrice.find((objectPrice) => objectPrice.size === sizeUserSelect);
    const colors = objectPrice?.colors;
    const isValidColor: boolean = colorsUserSelect.every((el: string) => colors?.includes(el));

    if (!objectPrice) {
      error.push(`Has a size in ${product.name} is not valid in store so not add price to total.`);
      return acc + 0;
    }
    if (!isValidColor) {
      error.push(`Has a color in ${product.name} is not valid in store so not add price to total.`);
      return acc + 0;
    }
    return acc + objectPrice.price;
  }, 0);

  return (
    <div>
      {totalPrice}{" "}
      <div>
        {error.map((item) => (
          <div key={item} className="text-red-500">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CellPriceOrder;
