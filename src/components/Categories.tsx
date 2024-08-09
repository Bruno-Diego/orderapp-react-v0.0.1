"use client"

import { useEffect, useState } from 'react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Category {
  id: number
  title: string
  desc: string
  color: string
  img: string
  slug: string
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories')
      console.log("response:" + response)
      const data = await response.json()
      console.log("data:" + data)
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <div className='text-white w-full'>
      <h1>Categories</h1>
      <Card className="w-1/2 bg-[url('https://res.cloudinary.com/dd8ske4ub/image/upload/v1723195766/m3_cgjwqu.png')] bg-cover bg-no-repeat bg-center">
        <CardHeader className="w-2/3 text-white">
          <CardTitle>Pizze</CardTitle>
          <CardDescription className="text-white">Autentiche Pizze Italiane! Scopri la nostra vasta gamma di pizze, realizzate con ingredienti di prima qualità e cotte alla perfezione. Dalla classica Margherita alla più avventurosa Zola e Mela, c`è una pizza per ogni palato. Goditi i ricchi sapori e le croste croccanti che rendono le nostre pizze irresistibili.</CardDescription>
        </CardHeader>
      </Card>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.title}</li>

        ))}
      </ul>
    </div>
  )
}

export default Categories
