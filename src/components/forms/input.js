import { forwardRef } from "react"
import classNames from "classnames"
import { FormLabel } from "./shared"
import styles from "./forms.module.css"

const FormInput = ({
  id,
  label,
  options,
  icon,
  register,
  isError,
  isDisabled,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <FormLabel htmlFor={id}>{label}</FormLabel>

      <div>
        <label htmlFor={id} className={styles.prefixIcon}>
          {icon}
        </label>
        <input
          id={id}
          className={classNames(
            styles.formItem,
            isError && styles.isError,
            isDisabled && styles.isDisabled,
            icon && styles.isIcon
          )}
          disabled={isDisabled}
          {...register(id, options)}
          {...props}
        />
      </div>
    </div>
  )
}

export default FormInput
