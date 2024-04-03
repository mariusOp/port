import styles from "./Button.module.css"
import cn from "classnames"
import {
  Stack,
  Button as MaterialButton,
  ButtonProps as MaterialButtonProps,
} from "@mui/material"

export interface IButtonProps extends MaterialButtonProps {
  //
}

const Button: React.FC<IButtonProps> = props => {
  const { children, className = "" } = props

  return (
    <MaterialButton
      size="small"
      variant="contained"
      {...props}
      className={cn(styles.button, className)}
    >
      {children}
    </MaterialButton>
  )
}

export default Button
