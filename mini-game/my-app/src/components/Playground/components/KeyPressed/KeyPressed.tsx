import { useCallback, useEffect } from "react"
import { useAppDispatch } from "../../../../app/hooks"
import { setEnteredValue } from "../../store/slices"
import { MAP_ARROW_CODES } from "../../constants"
import { useKeyPressedElement } from "./hooks"
import { TypographyHeader, TyphographyText } from "../../../UI"
import styles from "./keyPressed.module.css"

export interface IKeyPressedProps {
  isTimerActive: boolean
}

const KeyPressed: React.FC<IKeyPressedProps> = props => {
  const { isTimerActive } = props
  const keyPressedElements = useKeyPressedElement()
  const dispatch = useAppDispatch()
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (MAP_ARROW_CODES.hasOwnProperty(e.key) && isTimerActive) {
        dispatch(setEnteredValue(e.key))
      }
    },
    [dispatch, isTimerActive],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })
  return (
    <div>
      <TypographyHeader>KeyPressed</TypographyHeader>
      <div className={styles.container}>
        <TyphographyText>
          Press the key corresponding to the in "Random Keys"
        </TyphographyText>
        <div className={styles.wrapper}>
          <span className={styles.icon}>{keyPressedElements}</span>
        </div>
      </div>
    </div>
  )
}

export default KeyPressed
