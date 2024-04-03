import styles from "./Controls.module.css"

import { Button } from "../../../UI"

import { PlayArrow, Pause } from "@mui/icons-material"

export interface IControlsProps {
  isTimerActive: boolean
  setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Controls: React.FC<IControlsProps> = props => {
  const { isTimerActive, setIsTimerActive } = props

  return (
    <div>
      <Button
        onClick={() => setIsTimerActive(true)}
        disabled={isTimerActive}
        className={styles.button}
        endIcon={<PlayArrow />}
      >
        Play
      </Button>
      <Button
        onClick={() => setIsTimerActive(false)}
        disabled={!isTimerActive}
        className={styles.button}
        endIcon={<Pause />}
      >
        Pause
      </Button>
    </div>
  )
}

export default Controls
