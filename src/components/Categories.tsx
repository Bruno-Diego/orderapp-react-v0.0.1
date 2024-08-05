import { useEffect, useState } from 'react'

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
      const data = await response.json()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
