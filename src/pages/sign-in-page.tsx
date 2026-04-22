import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router";
import gitHubLogo from '@/assets/github-mark.svg'
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useSignInWithOAuth } from "@/hooks/mutations/use-sign-in-with-oauth";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function SignInPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } = useSignInWithPassword({
        onError: (error) => {
            const message = generateErrorMessage(error)

            toast.error(message, {
                position: "top-center"
            });
        }
    });
    const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } = useSignInWithOAuth();

    const handleSignInWithPasswordClick = () => {
        if (email.trim() === "") return;
        if (password.trim() === "") return;

        signInWithPassword({
            email,
            password
        })
    };

    const handleSignInWithGitHubClick = () => {
        signInWithOAuth("github")
    }

    const insPending = isSignInWithPasswordPending || isSignInWithOAuthPending

    return (
        <div className="flex flex-col gap-8">
            <div className="font-bold text-xl">로그인</div>

            <div className="flex flex-col gap-2">
                <Input
                    disabled={insPending}
                    type="email"
                    placeholder="example@abc.com"
                    className="py-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    disabled={insPending}
                    type="password"
                    placeholder="********"
                    className="py-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Button
                    disabled={insPending}
                    onClick={handleSignInWithPasswordClick} className="w-full">로그인</Button>
                <Button
                    disabled={insPending}
                    onClick={handleSignInWithGitHubClick} className="w-full" variant={"outline"}>
                    <img className="h-4" src={gitHubLogo} alt="githubLogo" />
                    GitHub 계정으로 로그인
                </Button>
            </div>

            <Link to={"/sign-up"} className="text-muted-foreground hover:underline">계정이 없으시다면? 회원가입</Link>
        </div>
    )
}