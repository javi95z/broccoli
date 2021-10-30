import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import classNames from "classnames"
import { CheckmarkIcon, ChevronDownIcon } from "../icons"
import { FormLabel, FormError } from "./shared"
import { useOnClickOutside } from "../../hooks"
import styles from "../forms/forms.module.css"

const SelectTest = ({
  id,
  label,
  items,
  setValue,
  selectedValue,
  register,
  options,
  isError = false,
  errorMessage,
  isLoading = false,
  isDisabled = false
}) => {
  const [t] = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const initialHighlight = { id: "", image: "", value: "" }
  const [highlight, setHighlight] = useState(initialHighlight)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setIsOpen(false))
  const defaultText = t(
    `common.placeholders.${isLoading ? "loading" : "selectOption"}`
  )

  /**
   * Set value and highlight item when selected value changes
   */
  useEffect(() => {
    if (!items) return
    const foundItem = items.find(x => x.id === selectedValue)
    setValue(id, selectedValue)
    foundItem ? setHighlight(foundItem) : setHighlight(initialHighlight)
  }, [items, selectedValue])

  /**
   * Actions to perform when select is opened
   */
  const onOpenSelect = () => {
    !isDisabled && setIsOpen(!isOpen)
  }

  /**
   * Actions to perform when item is selected
   */
  const onSelectOption = selected => {
    setValue(id, selected.id)
    setHighlight(selected)
    setIsOpen(false)
  }

  const ItemDisplay = ({ image, children }) => (
    <div className="flex items-center">
      {/* TODO onError */}
      {image && <img src={image} onError={null} className="mr-2" width={20} />}
      <span className="truncate">{children}</span>
    </div>
  )

  const Chevrons = () => (
    <ChevronDownIcon
      width={20}
      className={classNames(
        isOpen && "transform rotate-180",
        (isLoading || isDisabled) && "hidden"
      )}
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
          <ItemDisplay image={highlight?.image}>
            {highlight?.value || defaultText}
          </ItemDisplay>
          <Chevrons />
        </button>
        <select id={id} className="hidden" {...register(id, options)}></select>
        <div
          className={classNames(
            "absolute w-full overflow-auto rounded text-gray-200 -mt-4 max-h-48 z-50 bg-gray-800",
            !isOpen ? "hidden" : "rounded-t-none"
          )}
        >
          {items?.map((item, index) => (
            <div
              key={index}
              className={classNames(
                "flex items-center justify-between text-sm cursor-defaul select-none relative cursor-pointer py-2 px-5 hover:bg-gray-700",
                highlight.id === item.id && "bg-gray-700"
              )}
              onClick={() => onSelectOption(item)}
            >
              <ItemDisplay image={item.image}>{item.value}</ItemDisplay>
              {highlight.id === item.id && <CheckmarkIcon width={20} />}
            </div>
          ))}
        </div>
      </div>
      {isError && <FormError>{errorMessage}</FormError>}
    </div>
  )
}

export default SelectTest
