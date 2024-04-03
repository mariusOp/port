export interface iPlaigroundStepsState{
  succes: boolean | null
  step: number
  currentValue:string | null
  enteredValue: string | null
}
export interface PlaygroundState{
  currentStep: number,
  steps: iPlaigroundStepsState[],
  totalSuccessful: number,
  totalUnsuccessful: number,
}