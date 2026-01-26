import { Footer } from "@/components/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return <>{children}
        <Footer />
    </>
}