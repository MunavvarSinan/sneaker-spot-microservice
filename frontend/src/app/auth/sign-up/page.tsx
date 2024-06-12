import ButtonHandler from "@/components/form/sign-up/button-handler";
import SignUpFormProvider from "@/components/form/sign-up/form-provider";
import HighLightBar from "@/components/form/sign-up/highlight-bar";
import RegistrationSteps from "@/components/form/sign-up/registration-step";

export default function SignUp() {
    return (
        <div className="flex-1 py-36 md:px-16 w-full">
            <div className="flex flex-col h-full gap-3">
                <SignUpFormProvider>
                    <div className="flex flex-col gap-3">
                        <RegistrationSteps />
                        <ButtonHandler />
                    </div>
                    <HighLightBar />
                </SignUpFormProvider>
            </div>
        </div>
    )
}