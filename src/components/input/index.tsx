import React from "react"
import { Control, useController } from "react-hook-form"
import { Input as NextInput } from "@heroui/react"

type Props = {
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any>
  required?: string
  id?: string
  endContent?: React.ReactElement
}

export const Input: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type,
  id = name,
  control,
  required = "",
  endContent,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required },
  })

  return (
    <NextInput
      {...field}
      id={id}
      label={label}
      type={type}
      placeholder={placeholder}
      isInvalid={invalid}
      errorMessage={`${errors[name]?.message ?? ""}`}
      endContent={endContent}
    />
  )
}
