import Image from "next/image"
import Link from "next/link"

interface CategoryButtonProps {
  name: string
  image: string
}

export default function CategoryButton({ name, image }: CategoryButtonProps) {
  return (
    <Link href={`/category/${name.toLowerCase()}`} className="flex flex-col items-center group">
      <div className="relative size-44 rounded-full overflow-hidden mb-2">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <span className="text-md font-medium text-center">{name}</span>
    </Link>
  )
}
