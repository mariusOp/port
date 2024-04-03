import cn from "classnames"

import { useAppSelector } from "../../../../../../app/hooks"
import { iPlaigroundStepsState } from "../../../../store/types"
import { MAP_ARROW_CODES } from "../../../../constants"
import { IMapArrowCodes } from "../../../../types"

import stylesCommon from "../../RandomKeys.module.css"
import styles from "./RandomArrows.module.css"

const RandomArrows: React.FC = () => {
  const state = useAppSelector(state => state.playground)

  const getStylesRandomKeys = (element: iPlaigroundStepsState): string => {
    return cn(
      element.succes && element.succes !== null && styles.iconSuccess,
      !element.succes && element.succes !== null && styles.iconUnsuccess,
      stylesCommon.icon,
    )
  }

  return (
    <div className={stylesCommon.wrapper}>
      {state.steps.map(element => (
        <span key={element.step} className={getStylesRandomKeys(element)}>
          {MAP_ARROW_CODES[element.currentValue as keyof IMapArrowCodes]}
        </span>
      ))}
    </div>
  )
}

export default RandomArrows
