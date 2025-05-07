import React from "react"

type Props = {
  children: React.ReactNode
}

// Контейнер для центрирования контента на странице
export const Container: React.FC<Props> = ({ children }) => {
  return <div className="flex max-w-screen-xl mx-auto mt-10">{children}</div>
}
