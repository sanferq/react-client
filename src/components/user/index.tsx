import React from "react"
import { User as HeroUiUser } from "@heroui/react"
import {  VITE_API_URL } from "../../constants"
type Props = {
  name: string
  avatarUrl: string
  description?: string
  className?: string
}

export const User: React.FC<Props> = ({
  name = "",
  avatarUrl = "",
  description = "",
  className = "",
}) => {
  return (
    <HeroUiUser
      name={name}
      className={className}
      description={description}
      avatarProps={{
        src: `${VITE_API_URL}${avatarUrl}`,
      }}
    />
  )
}
