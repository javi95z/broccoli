import classNames from "classnames"
import { FormLabel, FormError, FormRootInput } from "./shared"
import styles from "./forms.module.css"

const FormInput = ({
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
      <div>
        <label htmlFor={id} className={styles.prefixIcon}>
          {icon}
        </label>
        <FormRootInput
          id={id}
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

export default FormInput
