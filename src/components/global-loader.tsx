import logo from "@/assets/logo.png"

export default function GlobalLoader() {
    return <div className="h-[100vh] w-[100vw] bg-muted flex flex-col items-center justify-center">
        <div className="flex items-center gap-5 mb-15 animate-bounce">
            <img className="w-10" src={logo} alt="onebite-log의 로고" />
            <div className="text-2xl font-bold">onebite-log</div>
        </div>
    </div>
}