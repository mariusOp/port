import { Chip, Stack } from "@mui/material"
import { useAppSelector } from "../../../../app/hooks"
import { TyphographyText, TypographyHeader } from "../../../UI"
import styles from "./Score.module.css"

const Score: React.FC = () => {
  const state = useAppSelector(state => state.playground)

  return (
    <div>
      <TypographyHeader>Score</TypographyHeader>
      <TyphographyText>
        On error, the "Consultative successful hits" value is reset to zero{" "}
      </TyphographyText>

      <Stack direction="row" spacing={1}>
        <Chip
          className={styles.chipUnsuccess}
          label={
            <TyphographyText>
              Errors:{" "}
              <span className={styles.counter}>{state.totalUnsuccessful}</span>
            </TyphographyText>
          }
          variant="outlined"
        />
        <Chip
          className={styles.chipSuccessful}
          label={
            <TyphographyText>
              Successful:{" "}
              <span className={styles.counter}>{state.totalSuccessful}</span>
            </TyphographyText>
          }
          variant="outlined"
        />
      </Stack>
    </div>
  )
}

export default Score
