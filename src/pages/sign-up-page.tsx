import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/use-sign-up";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function SignUpPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: signUp, isPending: isUseSignUpPending } = useSignUp({
        onError: (error) => {
            const message = generateErrorMessage(error);

            toast.error(message, {
                position: "top-center"
            })
        }
    });

    const handleSignUpClick = () => {
        signUp({
            email,
            password
        })
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="font-bold text-xl">회원가입</div>

            <div className="flex flex-col gap-2">
                <Input
                    disabled={isUseSignUpPending}
                    type="email"
                    placeholder="example@abc.com"
                    className="py-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    disabled={isUseSignUpPending}
                    type="password"
                    placeholder="********"
                    className="py-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <Button
                disabled={isUseSignUpPending}
                onClick={handleSignUpClick} className="w-full">회원가입</Button>

            <Link to={"/sign-in"} className="text-muted-foreground hover:underline">이미 계정이 있다면? 로그인</Link>
        </div>
    )
}