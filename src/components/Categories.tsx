"use client"

import { useEffect, useState } from 'react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

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
    <div className='w-full my-4 md:flex md:flex-wrap'>
      
        {categories.map((category) => (
          <div key={category.id} className='w-full max-h-full my-4 lg:w-1/2 lg:px-4'>
            <Link href={`/menu/${category.slug}`}>
              <Card 
              className={`w-full lg:min-h-full bg-white bg-cover bg-left bg-no-repeat md:bg-center`}
              style={{ backgroundImage: `url(${category.img})` }}
              >
                <CardHeader className={`text-${category.color} md:w-1/2 w-5/6`}>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription className={`text-${category.color} text-xs md:text-base`}>{category.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

        ))}
    </div>
  )
}

export default Categories
