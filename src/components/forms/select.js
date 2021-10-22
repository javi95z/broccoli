import { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import classNames from "classnames"
import { CheckmarkIcon, ChevronDownIcon } from "../icons"
import { FormLabel, FormError } from "./shared"
import { parseSelectItem } from "../../utils"
import styles from "./forms.module.css"
import { useOnClickOutside } from "../../hooks"

const FormSelect = ({
  id,
  label,
  register,
  errors,
  items,
  options,
  defaultValue = false,
  isLoading = false,
  isDisabled = false
}) => {
  const [t] = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState({})
  const ref = useRef()
  useOnClickOutside(ref, () => setIsOpen(false))
  const isError = errors && errors[id]
  const defaultText = t(
    `common.placeholders.${isLoading ? "loading" : "selectOption"}`
  )

  const onSelectOption = selected => {
    setIsOpen(false)
    setSelected(selected)
  }

  // Set default value
  // useEffect(() => {
  //   defaultValue && onSelectOption(parseSelectItem(defaultValue))
  // }, [defaultValue])

  const onOpenSelect = () => {
    !isDisabled && setIsOpen(!isOpen)
  }

  const ItemDisplay = ({ children, image }) => (
    <div className="flex items-center">
      {/* TODO onError */}
      {image && <img src={image} onError={null} className="mr-2" width={20} />}
      <span className="truncate">{children}</span>
    </div>
  )

  const Chevrons = () => (
    <ChevronDownIcon
      width={20}
      className={classNames(isOpen && "transform rotate-180")}
    />
  )

  return (
    <div className="flex flex-col" ref={ref}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <div className="relative">
        <button
          id={id}
          type="button"
          onClick={onOpenSelect}
          className={classNames(
            "relative flex items-center justify-between cursor-pointer",
            styles.formItem,
            isOpen && "rounded-b-none",
            isDisabled && styles.isDisabled,
            isError && styles.isError,
            isLoading && styles.isLoading
          )}
        >
          <ItemDisplay image={selected.image}>
            {selected.value || defaultText}
          </ItemDisplay>
          {!isLoading && !isDisabled && <Chevrons />}
        </button>
        <div
          className={classNames(
            "absolute w-full overflow-auto rounded text-gray-200 -mt-4 max-h-48 z-10 bg-gray-800",
            !isOpen ? "hidden" : "rounded-t-none"
          )}
        >
          {items?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm cursor-defaul select-none relative cursor-pointer py-2 px-5 hover:bg-gray-700"
            >
              <input
                className="absolute inset-x-0 top-0 w-full opacity-0 cursor-pointer h-full z-10"
                name={id}
                type="radio"
                value={item.id}
                onClick={() => onSelectOption(item)}
                {...register(id, options)}
              />
              <ItemDisplay image={item.image}>{item.value}</ItemDisplay>
              {selected.id === item.id && <CheckmarkIcon width={20} />}
            </div>
          ))}
        </div>
      </div>

      {isError && <FormError>{errors[id].message}</FormError>}
    </div>
  )
}

export default FormSelect
