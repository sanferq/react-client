import React from "react"
import { useCurrentQuery } from "../../app/services/userApi"
import { Spinner } from "@heroui/react"

export const AuthGuard = ({ children }: { children: React.ReactElement }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner />
  }
  return children
}
