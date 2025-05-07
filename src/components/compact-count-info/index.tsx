import React from "react"

type Props = {
  count: number
  className?: string
}

export const CompactCountInfo: React.FC<Props> = ({
  count,
  className = "",
}) => {
  return (
    <span
      className={`
      ml-2 
      inline-flex 
      h-5 w-5 
      items-center 
      justify-center 
      rounded-full 
      bg-gray-200 
      dark:bg-gray-600 
      text-xs 
      font-medium 
      text-gray-700 
      dark:text-gray-200
      ${className}
    `}
    >
      {count}
    </span>
  )
}
