import { useState, useRef, useEffect, useCallback } from "react"
import { UseFormSetValue, UseFormRegister, FieldValues } from "react-hook-form"
import { useTranslation } from "react-i18next"
import classNames from "classnames"
import { CheckmarkIcon, ChevronDownIcon } from "../icons"
import { FormLabel, FormError } from "../forms"
import { useOnClickOutside } from "../../hooks"
import { toast, useGetCoins } from "../../services"
import styles from "../../styles/forms.module.css"

/**
 * @param {Object} params
 * @param {String} params.id
 * @param {String} params.label
 * @param {UseFormSetValue<FieldValues>} params.setValue
 * @param {String} params.selectedValue
 * @param {UseFormRegister<FieldValues>} params.register
 * @param {Object} params.options
 * @param {Boolean} [params.isError]
 * @param {String} [params.errorMessage]
 * @param {Boolean} [params.isLoading]
 * @param {Boolean} [params.isDisabled]
 * @returns {JSX.Element}
 */
const CoinSelect = ({
  id,
  label,
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
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const initialHighlight = { id: "", image: "", value: "" }
  const [highlight, setHighlight] = useState(initialHighlight)
  const coinsSvc = useGetCoins()
  const ref = useRef(null)
  useOnClickOutside(ref, () => setIsOpen(false))
  const defaultText = t(
    `common.placeholders.${coinsSvc.loading ? "loading" : "selectOption"}`
  )

  useEffect(() => {
    fetchCoinsData()
  }, [page])

  /**
   * Set value and highlight item when selected value changes
   */
  useEffect(() => {
    if (!items) return
    const foundItem = items.find(x => x.id === selectedValue)
    setValue(id, selectedValue)
    foundItem ? setHighlight(foundItem) : setHighlight(initialHighlight)
  }, [items, selectedValue])

  const observer = useRef()
  const lastElementRef = useCallback(
    node => {
      if (coinsSvc.loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        entries[0].isIntersecting && setPage(prev => prev + 1)
      })
      if (node) observer.current.observe(node)
    },
    [coinsSvc.loading]
  )

  /**
   * Fetch coins information and
   * load it into form select
   */
  const fetchCoinsData = async () => {
    try {
      const response = await coinsSvc.attemptRequest({ page, size: 10 })
      response.error
        ? toast.error(t("transactions.message.noCoinsLoaded"))
        : setItems(prev => [...prev, ...mapCoinsData(response.data)])
    } catch (error) {
      // Do nothing
    }
  }

  const mapCoinsData = data =>
    data.map(c => {
      return { id: c._id, value: c.name, image: c.image }
    })

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
    setValue(id, selected.id, { shouldDirty: true })
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
          {items?.map((item, index) => {
            const isLastElement = items.length === index + 1
            return (
              <div
                key={index}
                ref={isLastElement ? lastElementRef : undefined}
                className={classNames(
                  "flex items-center justify-between text-sm cursor-defaul select-none relative cursor-pointer py-2 px-5 hover:bg-gray-700",
                  highlight.id === item.id && "bg-gray-700"
                )}
                onClick={() => onSelectOption(item)}
              >
                <ItemDisplay image={item.image}>{item.value}</ItemDisplay>
                {highlight.id === item.id && <CheckmarkIcon width={20} />}
              </div>
            )
          })}
          {/* {coinsSvc.loading && <Loader />} */}
        </div>
      </div>
      {isError && <FormError>{errorMessage}</FormError>}
    </div>
  )
}

export default CoinSelect
