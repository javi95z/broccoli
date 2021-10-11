import classNames from "classnames"
import { FormLabel, FormError } from "./shared"
import styles from "./forms.module.css"

const FormInput = ({
  id,
  label,
  register,
  errors,
  options,
  icon,
  isDisabled,
  ...props
}) => {
  const isError = errors && errors[id]

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
      {isError && <FormError>{errors[id].message}</FormError>}
    </div>
  )
}

export default FormInput
