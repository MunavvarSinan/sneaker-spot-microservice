import { useToast } from "@/components/ui/use-toast";
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignInForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast();

    const methods = useForm<UserLoginProps>({
        resolver: zodResolver(UserLoginSchema),
        mode: 'onChange'
    })

    const handleSubmit = methods.handleSubmit(
        async (values: UserLoginProps) => {
            setLoading(true);
            try {
                // add the sign-in actions later
                router.push('/')
            } catch (error: any) {
                toast({
                    title: 'Error',
                    description: 'An error occurred while signing in',
                })
            } finally {
                setLoading(false);
            }
        }
    )

    return {
        methods,
        handleSubmit,
        loading
    }
}