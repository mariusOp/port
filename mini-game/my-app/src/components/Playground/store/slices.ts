import { createSlice } from "@reduxjs/toolkit";
import { PlaygroundState } from "./types";
import { ARR_ARROW_CODES } from "../constants";
export const initialState : PlaygroundState = {
  currentStep:0,
  steps:[],
  totalSuccessful: 0,
  totalUnsuccessful: 0,
}
export const playgroundSlice = createSlice({
  name: "playground",
  initialState,
  reducers:{
    setCurrentStep: (state)=>{
      state.currentStep +=1
    },
    setSteps: (state)=>{
      const randomKeys = Math.floor(Math.random()*ARR_ARROW_CODES.length)
      state.steps.push({
        succes: null,
        step: state.currentStep,
        currentValue: ARR_ARROW_CODES[randomKeys],
        enteredValue: null,
      })
    },
    setEnteredValue:(state, action)=>{
      if(state.steps.length){
      const step = state.steps[state.currentStep-1]
      const isSucces = step.currentValue === action.payload

      if(step.enteredValue === null){
state.steps[state.currentStep-1]={
        ...step,
        enteredValue: action.payload,
        succes: isSucces
      }
      }
      if(isSucces){
        state.totalSuccessful +=1
      }else{
        state.totalUnsuccessful +=1
        state.totalSuccessful =0
      }
      }
    },
    setUnsuccess:(state)=>{
      if(state.steps.length){
        const step = state.steps[state.currentStep-1]
        if(step.enteredValue == null){
          state.totalUnsuccessful +=1
          state.totalSuccessful =0

          state.steps[state.currentStep-1]={
         ...step,
         succes: false
      }
        }
      }
    },
    resetStore: () => initialState,
  }
})

export const {setCurrentStep, setSteps, setEnteredValue, setUnsuccess, resetStore} = playgroundSlice.actions
export default playgroundSlice.reducer