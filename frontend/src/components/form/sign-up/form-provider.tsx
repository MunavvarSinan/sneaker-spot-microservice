"use client"
import { AuthContextProvider } from '@/context/use-auth-context';
import React from 'react'
import { FormProvider } from 'react-hook-form';
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import { Loader } from '@/components/loader';
type Props = {
    children: React.ReactNode;
}
const SignUpFormProvider = ({ children }: Props) => {
    const { methods, handleSubmit, loading } = useSignUpForm()
    return (
        <AuthContextProvider>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit}
                    className='h-full'
                >
                    <div className='flex flex-col justify-between gap-3 h-full'>
                        <Loader loading={loading}>{children}</Loader>
                    </div>
                </form>
            </FormProvider>
        </AuthContextProvider>
    )
}

export default SignUpFormProvider