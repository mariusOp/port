import styles from "./TypographyHeader.module.css"
import cn from "classnames"

import {
  Stack,
  Typography as MaterialTyphography,
  ButtonProps as MaterialTyphographyProps,
} from "@mui/material"

export interface ITypographyHeaderProps extends MaterialTyphographyProps {
  //
}

const TypographyHeader: React.FC<ITypographyHeaderProps> = props => {
  const { children, className = "" } = props

  return (
    <MaterialTyphography
      variant="h3"
      {...props}
      className={cn(styles.text, className)}
    >
      {children}
    </MaterialTyphography>
  )
}

export default TypographyHeader
