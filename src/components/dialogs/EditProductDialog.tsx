import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Product } from "@/interfaces";
import ColorCircle from "../ColorCircle";
import { COLORS } from "@/constants/color";
import { productFormSchema } from "@/validation/product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  selectedProduct: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>;
  productList: Product[];
  setProductList: (productList: Product[]) => void;
  selectedProductIdx: number;
  tempSelectedColors: string[];
  setTempSelectedColor: React.Dispatch<React.SetStateAction<string[]>>;
}

const EditProductDialog = ({
  open,
  setOpen,
  selectedProduct,
  setSelectedProduct,
  productList,
  setProductList,
  selectedProductIdx,
  tempSelectedColors,
  setTempSelectedColor,
}: IProps) => {
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    // Todo: check on default values
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      imgURL: "",
    },
  });

  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    const updatedProductList = [...productList];
    updatedProductList[selectedProductIdx] = {
      ...values,
      colors: selectedProduct.colors,
    };
    setProductList(updatedProductList);
    setOpen(false);

    // clear input fields after submission
    form.reset();

    // return;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-full max-h-[692px] max-w-[425px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter title must be at least 15 characters"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imgURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter a valid image URL" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Enter Price - must be greater than or equal to 50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified category to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">Clothes</SelectItem>
                        <SelectItem value="m@google.com">
                          Electronics
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write Description must be at least 20 characters"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Label>Standard Colors:</Label>
                <div className="my-1 flex flex-wrap items-center gap-2">
                  {COLORS.map((color) => (
                    <span
                      key={color}
                      style={{ backgroundColor: color }}
                      className="cursor-pointer rounded-md p-1 px-2 py-1 text-xs text-white"
                      onClick={() => {
                        // ** 1.Check if color exits on selectedColor state
                        if (selectedProduct.colors.includes(color)) {
                          return;
                        }
                        setSelectedProduct((prev) => {
                          return {
                            ...prev,
                            colors: [...prev.colors, color],
                          };
                        });
                      }}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Colors</Label>
                <div className="flex flex-wrap items-center space-x-2">
                  {selectedProduct.colors.map((color, idx) => (
                    <ColorCircle
                      key={idx}
                      color={color}
                      onClick={() => {
                        // ** Check if color exists, filter it out
                        if (tempSelectedColors.includes(color)) {
                          setTempSelectedColor((prev) =>
                            prev.filter((item) => item !== color)
                          );
                          return;
                        }
                        setTempSelectedColor((prev) => [...prev, color]);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button>Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
