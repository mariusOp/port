import { useState, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setCurrentStep, setSteps, setUnsuccess } from "./store/slices"

import { INTERVAL_TIME, END_GAME_CONDITIONS } from "./constants"

import Controls from "./components/Controls"
import RandomKeys from "./components/RandomKeys"
import KeyPressed from "./components/KeyPressed"
import Score from "./components/Score"
import Modal from "./components/Modal"
import Description from "./components/Description"

import styles from "./Playground.module.css"

const Playground: React.FC = () => {
  const state = useAppSelector(state => state.playground)
  const dispatch = useAppDispatch()

  const refrashIntervalId = useRef<ReturnType<typeof setInterval> | null>(null)

  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [isSuccessEndGame, setIsSuccessEndGame] = useState<boolean>(true)
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false)

  useEffect(() => {
    if (isTimerActive) {
      refrashIntervalId.current = setInterval(() => {
        dispatch(setUnsuccess())
        dispatch(setCurrentStep())
        dispatch(setSteps())
      }, INTERVAL_TIME)
    } else {
      clearInterval(refrashIntervalId.current as NodeJS.Timeout)
    }
  }, [isTimerActive, dispatch])

  useEffect(() => {
    const isSuccessful =
      state.totalSuccessful === END_GAME_CONDITIONS.SUCCESS_COUNT
    const isUnSuccessful =
      state.totalUnsuccessful === END_GAME_CONDITIONS.UNSUCCESS_COUNT
    if (isSuccessful) {
      setIsSuccessEndGame(true)
    } else setIsSuccessEndGame(false)

    if (isUnSuccessful || isSuccessful) {
      setIsShowModal(true)
      setIsTimerActive(false)
    }
  }, [state.totalSuccessful, state.totalUnsuccessful])
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <RandomKeys isTimerActive={isTimerActive} />
        <KeyPressed isTimerActive={isTimerActive} />
        <Score />
      </div>
      <div className={styles.column}>
        {" "}
        <Description />{" "}
        <Controls
          isTimerActive={isTimerActive}
          setIsTimerActive={setIsTimerActive}
        />
      </div>

      {isShowModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          isSuccessEndGame={isSuccessEndGame}
        />
      )}
    </div>
  )
}

export default Playground
