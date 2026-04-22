import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png"
import { SunIcon } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.png"

export default function GlobalLayout() {
    return (
        <div className="min-h-[100vh] flex flex-col">
            <header className="h-15 border-b">
                <div className="flex h-full justify-between items-center max-w-175 w-full m-auto px-4">
                    <Link to={"/"} className="flex items-center gap-2">
                        <img className="h-5" src={logo} alt="logo" />
                        <div className="font-bold">smlee-log</div>
                    </Link>

                    <div className="flex gap-5 items-center">
                        <div className="hover:bg-muted cursor-pointer rounded-full p-2"><SunIcon /></div>
                        <img className="h-6" src={defaultAvatar} alt="defaultAvatar" />
                    </div>
                </div>
            </header>

            <main className="flex-1 border-x px-4 py-6 m-auto max-w-175 w-full">
                <Outlet />
            </main>

            <footer className="py-10 text-muted-foreground text-center border-t">
                @smlee
            </footer>
        </div>
    )
}