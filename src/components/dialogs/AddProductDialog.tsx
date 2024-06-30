import { v4 as uuid } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import ColorCircle from "../ColorCircle";
import { Label } from "../ui/label";
import { Dispatch, SetStateAction } from "react";
import { COLORS } from "@/constants/color";
import { productFormSchema } from "@/validation/product";

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  productList: Product[];
  setProductList: (productList: Product[]) => void;
  tempSelectedColors: string[];
  setTempSelectedColor: Dispatch<SetStateAction<string[]>>;
}

const AddProductDialog = ({
  open,
  setOpen,
  productList,
  setProductList,
  tempSelectedColors,
  setTempSelectedColor,
}: IProps) => {
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      imgURL: "",
    },
  });

  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    setProductList([
      { id: uuid(), colors: tempSelectedColors, ...values },
      ...productList,
    ]);
    // ** Close the dialog
    setOpen(false);
    // ** Reset the form
    // ** Reset Temp colors
    setTempSelectedColor([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-full max-h-[692px] max-w-[425px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a new product</DialogTitle>
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
              <div className="my-1 flex flex-wrap items-center gap-2">
                {!tempSelectedColors.length
                  ? "No colors selected"
                  : tempSelectedColors.map((color) => (
                      <span
                        key={color}
                        className="inline-block rounded-md px-2 py-1 text-xs text-white"
                        style={{ backgroundColor: color }}
                      >
                        {color}
                      </span>
                    ))}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Colors</Label>
                <div className="flex items-center gap-1">
                  {COLORS.map((color, idx) => (
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
              <Button>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
