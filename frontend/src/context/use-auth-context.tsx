"use client"


import React, { useState } from 'react'

type InitialValuesProps = {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const IntialValues: InitialValuesProps = {
    currentStep: 1,
    setCurrentStep: () => { }
}

const authContext = React.createContext<InitialValuesProps>(IntialValues)

const { Provider } = authContext

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<number>(IntialValues.currentStep)

    const values = {
        currentStep,
        setCurrentStep
    }
    return <Provider value={values}>
        {children}
    </Provider>
}

export const useAuthContextHook = () => {
    const state = React.useContext(authContext)
    return state
}