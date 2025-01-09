import { formattedPrice } from "@/lib/utils";
import { OrderType } from "@/Type/OrderTypes";
import { ProductType } from "@/Type/ProductType";

interface CellPriceOrderProps {
  row: OrderType;
}

function CellPriceOrder({ row }: CellPriceOrderProps) {
  const error: Array<string> = [];
  console.log(row.listProductOrder);
  const totalPrice = row.listProductOrder.reduce((acc: number, order: any) => {
    const sizeUserSelect = order.size;
    const colorsUserSelect = order.color;
    const product: ProductType = order._id;
    const objectPrice = product.arrayPrice.find((objectPrice) => objectPrice.size === sizeUserSelect);
    const colors = objectPrice?.colors;
    const isValidColor = colors?.includes(colorsUserSelect);

    if (!objectPrice) {
      error.push(`Has a size in ${product.name} is not valid in store so not add price to total.`);
      return acc + 0;
    }
    if (!isValidColor) {
      error.push(`Has a color in ${product.name} is not valid in store so not add price to total.`);
      return acc + 0;
    }
    return acc + (objectPrice.price * order.amount * (100 - product.sale)) / 100;
  }, 0);
  return (
    <div>
      {formattedPrice(totalPrice)}{" "}
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
