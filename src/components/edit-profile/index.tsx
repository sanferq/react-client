import { useContext, useState } from "react"
import { ThemeContext } from "../theme-provider"
import { useUpdateUserMutation } from "../../app/services/userApi"
import { useParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { User } from "../../app/types"
import { hasErrorField } from "../../utils/has-error-field"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react"
import { MdOutlineEmail, MdCloudUpload } from "react-icons/md"
import { Input } from "../input"
import { ErrorMessage } from "../error-message"

type Props = {
  isOpen: boolean //открытия модального окна
  onClose: () => void
  user?: User
}

export const EditProfile: React.FC<Props> = ({
  isOpen = false,
  onClose = () => null,
  user,
}) => {
  const { theme } = useContext(ThemeContext) // Текущая тема приложения
  const [updateUser, { isLoading }] = useUpdateUserMutation() // Мутация для обновления данных пользователя
  const [error, setError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>() // ID пользователя из URL

  // Инициализация формы с валидацией
  const { handleSubmit, control } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: user || {}, // Установка начальных значений из props
  })

  // Обработчик выбора файла аватара
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0]

      // Валидация типа файла
      if (!file.type.startsWith("image/")) {
        setError("Пожалуйста, выберите файл изображения")
        return
      }

      // Валидация размера файла
      if (file.size > 5 * 1024 * 1024) {
        setError("Файл слишком большой (максимум 5MB)")
        return
      }

      setSelectedFile(file)
      setError("")
    }
  }

  // Обработчик отправки формы
  const onSubmit = async (data: User) => {
    if (!id) {
      setError("Не указан ID пользователя")
      return
    }

    try {
      const formData = new FormData()

      data.name && formData.append("name", data.name)
      data.email &&
        data.email !== user?.email &&
        formData.append("email", data.email)
      data.dateOfBirth &&
        formData.append("dateOfBirth", new Date(data.dateOfBirth).toISOString())
      data.bio && formData.append("bio", data.bio)
      data.location && formData.append("location", data.location)
      selectedFile && formData.append("avatar", selectedFile)

      await updateUser({ userData: formData, id }).unwrap()
      onClose()
    } catch (err) {
      console.error(err)
      if (hasErrorField(err)) {
        setError(err.data.error)
      } else {
        setError("Произошла неизвестная ошибка")
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
      backdrop="blur"
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            Изменения профиля
          </ModalHeader>

          <ModalBody className="flex flex-col gap-4">
            <Input
              control={control}
              name="email"
              id="edit-profile-email"
              label="Email"
              type="email"
              endContent={<MdOutlineEmail />}
            />

            <Input
              control={control}
              name="name"
              id="edit-profile-name"
              label="Имя"
              type="text"
            />

            <div className="flex flex-col gap-2">
              <Button
                as="label"
                variant="bordered"
                startContent={<MdCloudUpload />}
                className="cursor-pointer"
                htmlFor="edit-profile-avatar"
              >
                {selectedFile ? selectedFile.name : "Загрузить аватар"}
                <input
                  id="edit-profile-avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Button>
              {selectedFile && (
                <p className="text-sm text-gray-500">
                  Размер: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>

            <Input
              control={control}
              name="dateOfBirth"
              id="edit-profile-birthdate"
              label="Дата рождения"
              type="date"
            />

            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="edit-profile-bio"
                  name="bio"
                  rows={4}
                  placeholder="Расскажите о себе"
                  label="Биография"
                  labelPlacement="outside"
                />
              )}
            />

            <Input
              control={control}
              name="location"
              id="edit-profile-location"
              label="Местоположение"
              type="text"
            />

            <ErrorMessage error={error} />
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Закрыть
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Сохранить изменения
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
