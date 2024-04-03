import styles from "./TyphographyText.module.css"
import cn from "classnames"

import {
  Stack,
  Typography as MaterialTyphography,
  ButtonProps as MaterialTyphographyProps,
} from "@mui/material"

export interface ITypographyTextProps extends MaterialTyphographyProps {
  //
}

const TypographyText: React.FC<ITypographyTextProps> = props => {
  const { children, className = "" } = props

  return (
    <MaterialTyphography {...props} className={cn(styles.text, className)}>
      {children}
    </MaterialTyphography>
  )
}

export default TypographyText
