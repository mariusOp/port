// import styles from "./ResultMessage.module.css"

import { TyphographyText } from "../../../../../UI"

export interface IResultMessageProps {
  isSuccessEndGame: boolean
}

const ResultMessage: React.FC<IResultMessageProps> = props => {
  const { isSuccessEndGame } = props
  return isSuccessEndGame ? (
    <TyphographyText>
      Congratulations! <br /> you win
    </TyphographyText>
  ) : (
    <TyphographyText>
      My regrets. <br /> You have a lost this game
    </TyphographyText>
  )
}

export default ResultMessage
