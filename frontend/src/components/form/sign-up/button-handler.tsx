"use client"


import Link from 'next/link'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'

import { useAuthContextHook } from '@/context/use-auth-context'

import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'


const ButtonHandler = () => {
    const { setCurrentStep, currentStep } = useAuthContextHook()
    const { formState, getFieldState, getValues } = useFormContext();
    const { onGenerateOTP } = useSignUpForm()

    const { isDirty: isName } = getFieldState('name', formState)
    const { isDirty: isEmail } = getFieldState('email', formState)
    const { isDirty: isPassword } = getFieldState('password', formState)
    const { isDirty: isConfirmPassword } = getFieldState('confirmPassword', formState)
    const password = getValues('password')
    const confirmPassword = getValues('confirmPassword')
    const isPasswordMatch = password === confirmPassword

    if (currentStep === 2) {
        return (
            <div className="w-full flex flex-col gap-3 items-center">
                <Button
                    type="submit"
                    className="w-full"
                >
                    Create an account
                </Button>
                <p>
                    Already have an account?
                    <Link
                        href="/auth/sign-in"
                        className="font-bold"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        )
    }
    return (
        <div className="w-full flex flex-col gap-3 items-center">
            <Button
                type="submit"
                className="w-full"
                {...(isName &&
                    isEmail &&
                    isPassword && isPasswordMatch && {
                    onClick: () =>
                        onGenerateOTP(
                            getValues('email'),
                            getValues('password'),
                            setCurrentStep
                        ),

                })}
                disabled={!isName || !isEmail || !isPassword || !isPasswordMatch}
            >
                Continue
            </Button>
            <p>
                Already have an account?{' '}
                <Link
                    href="/auth/sign-in"
                    className="font-bold"
                >
                    Sign In
                </Link>
            </p>
        </div>
    )
}

export default ButtonHandler