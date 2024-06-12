"use client"
import { useToast } from "@/components/ui/use-toast"
import { UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignUpForm = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    // add the sign-up actions later

    const router = useRouter();
    const methods = useForm<UserRegistrationProps>({
        resolver: zodResolver(UserRegistrationSchema),
        defaultValues: {
            type: 'user',
        },
        mode: 'onChange'
    })

    const onGenerateOTP = async (
        email: string,
        password: string,
        onNext: React.Dispatch<React.SetStateAction<number>>
    ) => {
        setLoading(true);
        try {
            // add the sign-up actions later
            toast({
                title: 'Success',
                description: 'OTP send successfully',
            })
            onNext((prev) => prev + 1);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: 'An error occurred while generating OTP',
            })
        } finally {
            setLoading(false);
        }
    }

    const onVerifyOTP = async (
        otp: string,
    ) => {
        setLoading(true);
        try {
            // add the sign-up actions later
            if (otp === '123456') {
                return true
            }
            return false;
        } catch (error: any) {
            toast({
                title: 'Error',
                description: 'An error occurred while verifying OTP',
            })
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = methods.handleSubmit(
        async (values: UserRegistrationProps) => {
            setLoading(true);
            try {
                // add the sign-up actions later
                const completeSignup = await onVerifyOTP(values.otp)
                //check if the OTP verification was successful
                if (!completeSignup) {
                    toast({
                        title: 'Error',
                        description: 'Invalid OTP',
                    })
                    return;
                }
                // add the sign-up actions later
                // TODO: Add the sign-up actions later
                toast({
                    title: 'Success',
                    description: 'Sign up successful',
                })
                router.push('/auth/sign-in');
            } catch (error: any) {
                toast({
                    title: 'Error',
                    description: 'An error occurred while signing up',
                })
            } finally {
                setLoading(false);
            }
        }
    )
    return {
        methods,
        loading,
        onGenerateOTP,
        onVerifyOTP,
        handleSubmit,
    }
}
