import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { NavigationProgress } from "@/shared/components/navigation-progress";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return <>
        <NavigationProgress />
        <Header />
        {children}
        <Footer />
    </>
}