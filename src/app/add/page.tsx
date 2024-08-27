"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { prisma } from "@/lib/db";

import {
  useForm,
  Controller,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type FormValues = {
  title: string;
  desc: string;
  price: number;
  img?: FileList;
  isFeatured: string;
  catSlug: string;
  category: string;
  options: JSON[];
};

const AddProductPage = () => {
  const methods = useForm<FormValues>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
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
          router.push("/"); // Redireciona para a homepage se não for admin
        } else {
          setIsAdmin(true);
        }
      }
    };
    checkAdminRole();
  }, [user]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      let img = imgURL;

      // Se uma imagem for selecionada, faz o upload para o Cloudinary
      if (data.img && data.img.length > 0) {
        const formData = new FormData();
        formData.append("file", data.img[0]);
        formData.append("upload_preset", "orderapp"); // Substitua com o seu upload preset do Cloudinary

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dd8ske4ub/image/upload`, // Substitua com o seu nome do Cloudinary
          {
            method: "POST",
            body: formData,
          }
        );

        const responseData = await response.json();
        img = responseData.secure_url;
      }
      
      // Agora submeta os dados do formulário junto com a URL da imagem
      const productData = {
        title: data.title,
        desc: data.desc,
        price: data.price,
        isFeatured: data.isFeatured ? true : false,
        options: [""],
        img, // Armazene a URL da imagem no banco de dados
        // catSlug: data.catSlug,
        category: {
          connect: {
            slug: data.catSlug, // Ensure this slug exists in your Category table
          },
        },
      };
      // console.log(productData)
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        router.push("/menu");
      } else {
        console.log(res);
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (!isAdmin) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold mb-6">Aggiungi Prodotto</h1>

          {/* Campo de Título */}
          <FormField
            name="title"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome prodotto</FormLabel>
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
                {errors.title && (
                  <FormMessage>{errors.title.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          {/* Campo de Descrição */}
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
                {errors.desc && (
                  <FormMessage>{errors.desc.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          {/* Campo de Preço */}
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
                {errors.price && (
                  <FormMessage>{errors.price.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          {/* Campo de Categoria */}
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
                    <option value="">Seleziona Categoria</option>
                    <option value="pizze">Pizze</option>
                    <option value="fritture">Fritture</option>
                    <option value="insalate">Insalate</option>
                    <option value="menu_specialita">Menu Specialità</option>
                    <option value="dolci">Dolci</option>
                  </select>
                </FormControl>
                <FormDescription>
                  La categoria a cui appartiene il prodotto.
                </FormDescription>
                {errors.catSlug && (
                  <FormMessage>{errors.catSlug.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          {/* Campo de Evidencia */}
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
                  La categoria a cui appartiene il prodotto.
                </FormDescription>
                {errors.isFeatured && (
                  <FormMessage>{errors.isFeatured.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          {/* Campo de Upload de Imagem */}
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
                      field.onChange(e.target.files); // Atualiza o campo com os arquivos selecionados
                      if (e.target.files && e.target.files[0]) {
                        setImgURL(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Carica un&lsquo;immagine per il prodotto.
                </FormDescription>
                {errors.img && (
                  <FormMessage>{errors.img.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          {/* Botão de Submissão */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Aggiungi prodotto
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProductPage;
