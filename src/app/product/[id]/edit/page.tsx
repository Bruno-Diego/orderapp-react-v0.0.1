"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

type FormValues = {
  id: string;
  title: string;
  desc: string;
  price: number;
  img?: FileList;
  isFeatured: string;
  catSlug: string;
};

const EditProductPage = ({ params }: { params: { id: string } }) => {
  const methods = useForm<FormValues>();
  const { handleSubmit, setValue } = methods;
  const router = useRouter();
  const [imgURL, setImgURL] = useState<string | null>(null);
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        const res = await fetch("/api/admincheck");
        const data = await res.json();
        if (!data.isAdmin) {
          router.push("/"); // Redirect to the homepage if not an admin
        } else {
          setIsAdmin(true);
        }
      }
    };
    checkAdminRole();
  }, [user]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (params.id) {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        setValue("id", data.id);
        setValue("title", data.title);
        setValue("desc", data.desc);
        setValue("price", data.price);
        setValue("isFeatured", data.isFeatured ? "true" : "false");
        setValue("catSlug", data.catSlug);
        setImgURL(data.img || null);
      }
    };
    fetchProduct();
  }, [params.id, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      let img = imgURL;

      // If a new image is selected, upload it to Cloudinary
      if (data.img && data.img.length > 0) {
        const formData = new FormData();
        formData.append("file", data.img[0]);
        formData.append("upload_preset", "orderapp"); // Replace with your Cloudinary upload preset

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dd8ske4ub/image/upload`, // Replace with your Cloudinary account name
          {
            method: "POST",
            body: formData,
          }
        );

        const responseData = await response.json();
        img = responseData.secure_url;
      }

      const productData = {
        id: data.id,
        title: data.title,
        desc: data.desc,
        price: data.price,
        isFeatured: data.isFeatured === "true",
        img, // Use the new image URL if uploaded
        catSlug: data.catSlug,
      };

      const res = await fetch(`/api/products`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        router.push("/menu");
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (!isAdmin) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold mb-6">Modifica Prodotto</h1>

          {/* Title Field */}
          <FormField
            name="title"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome del prodotto</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </FormControl>
                <FormDescription>
                  Un titolo descrittivo per il prodotto.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            name="desc"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrizione</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </FormControl>
                <FormDescription>
                  Una descrizione dettagliata del prodotto.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Price Field */}
          <FormField
            name="price"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prezzo (€)</FormLabel>
                <FormControl>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </FormControl>
                <FormDescription>
                  Il prezzo del prodotto in Euro.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Category Field */}
          <FormField
            name="catSlug"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="pizze">Pizze</option>
                    <option value="fritture">Fritture</option>
                    <option value="insalate">Insalate</option>
                    <option value="menu_specialita">Menu Specialità</option>
                    <option value="dolci">Dolci</option>
                    <option value="panini">Panini e Piadine</option>
                    <option value="pizette">Pizette</option>
                    <option value="asporto">Piatti da Asporto</option>
                    <option value="calzoni">Calzoni</option>
                    <option value="bevande">Bevande</option>
                  </select>
                </FormControl>
                <FormDescription>
                  La categoria a cui appartiene il prodotto.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Featured Field */}
          <FormField
            name="isFeatured"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mettere in evidenza?</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="false">No</option>
                    <option value="true">Si</option>
                  </select>
                </FormControl>
                <FormDescription>
                  Questo prodotto sarà evidenziato?
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
          <FormField
            name="img"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Immagine</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    onChange={(e) => {
                      field.onChange(e.target.files); // Update field with selected files
                      if (e.target.files && e.target.files[0]) {
                        setImgURL(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Carica una nuova immagine per il prodotto.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Aggiorna Prodotto
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditProductPage;
