import { TypographyHeader, TyphographyText } from "../../../UI"

const Description: React.FC = () => {
  return (
    <div>
      <TypographyHeader>↑↓→← Arrow-game description</TypographyHeader>
      <TyphographyText>
        Player's goal is to press the keyboard arrow key that was shown to him
        before the next one appears.
      </TyphographyText>
      <TyphographyText>
        After three consecutive successful hits - game won, after three errors -
        lost.
      </TyphographyText>
    </div>
  )
}

export default Description
