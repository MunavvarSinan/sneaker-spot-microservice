"use client"

import { useAuthContextHook } from '@/context/use-auth-context'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import AccountDetailsForm from './account-details-form'
import dynamic from 'next/dynamic'
import { Spinner } from '@/components/spinner'

const OTPForm = dynamic(() => import('./otp-form'), {
    ssr: false,
    loading: Spinner,
})

type Props = {
}

const RegistrationSteps = (props: Props) => {
    const {
        register,
        formState: { errors },
        setValue } = useFormContext()
    const { currentStep } = useAuthContextHook()
    const [otp, setOtp] = React.useState<string>('')
    setValue('otp', otp)

    switch (currentStep) {
        case 1:
            return (
                <AccountDetailsForm
                    register={register}
                    errors={errors}
                />
            )
        case 2:
            return (
                <OTPForm
                    otp={otp}
                    setOTP={setOtp}
                />
            )
    }
    return (
        <div>RegistrationSteps</div>
    )
}

export default RegistrationSteps