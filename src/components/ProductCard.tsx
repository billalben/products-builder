import { Product } from "@/interfaces";
import ProductCardAction from "./ProductCardAction";
import ColorCircle from "./ColorCircle";

interface ProductCard {
  product: Product;
  open: boolean;
  setOpen: (value: boolean) => void;
  productIdx: number;
  setSelectedProduct: (product: Product) => void;
  setSelectedProductIdx: (idx: number) => void;
  openDestroyDialog: boolean;
  setOpenDestroyDialog: (value: boolean) => void;
}

const ProductCard = ({
  product,
  open,
  setOpen,
  productIdx,
  setSelectedProduct,
  setSelectedProductIdx,
  setOpenDestroyDialog,
}: ProductCard) => {
  const { id, title, description, imgURL, price, category, colors } = product;

  return (
    <div key={id} className="grid rounded-lg border p-3 shadow-md">
      <h4 className="my-2 text-center tracking-widest">{title}</h4>
      <img src={imgURL} className="rounded-md" />
      <p className="my-3 max-h-[4.5em] overflow-auto text-gray-600 text-sm">
        {description}
      </p>
      <div className="flex items-center gap-1">
        {colors.map((color, idx) => (
          // TODO: add onClick functionality
          <ColorCircle key={idx} color={color} onClick={() => {}} />
        ))}
      </div>
      <div className="my-3 flex items-center justify-between text-sm font-medium text-gray-500">
        <span>{`$${price}`}</span>
        <span>{category}</span>
      </div>

      <ProductCardAction
        open={open}
        setOpen={setOpen}
        product={product}
        productIdx={productIdx}
        setSelectedProduct={setSelectedProduct}
        setSelectedProductIdx={setSelectedProductIdx}
        setOpenDestroyDialog={setOpenDestroyDialog}
      />
    </div>
  );
};

export default ProductCard;
