import { FormLabel, FormError, FormRootInput } from "./shared"
import styles from "./forms.module.css"
import { CalendarIcon } from "../icons"

const FormDateInput = ({
  id,
  label,
  options,
  icon,
  register,
  isError = false,
  errorMessage,
  isDisabled = false,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <div className="relative">
        {icon && (
          <label htmlFor={id} className={styles.prefixIcon}>
            {icon}
          </label>
        )}
        <label htmlFor={id} className={styles.suffixIcon}>
          <CalendarIcon width={20} className="text-white fill-current" />
        </label>
        <FormRootInput
          id={id}
          type="date"
          hasicon={icon}
          isError={isError}
          isDisabled={isDisabled}
          register={register}
          options={options}
          {...props}
        />
      </div>
      {isError && <FormError>{errorMessage}</FormError>}
    </div>
  )
}

export default FormDateInput
