import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Products } from "@/components/products"
import { Team } from "@/components/team"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { StackingSection } from "@/components/stacking-section"

const TOTAL_SECTIONS = 6

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <StackingSection index={0} totalSections={TOTAL_SECTIONS}>
        <Hero />
      </StackingSection>
      <StackingSection index={1} totalSections={TOTAL_SECTIONS}>
        <About />
      </StackingSection>
      <StackingSection index={2} totalSections={TOTAL_SECTIONS}>
        <Services />
      </StackingSection>
      <StackingSection index={3} totalSections={TOTAL_SECTIONS}>
        <Products />
      </StackingSection>
      <StackingSection index={4} totalSections={TOTAL_SECTIONS}>
        <Team />
      </StackingSection>
      <StackingSection index={5} totalSections={TOTAL_SECTIONS}>
        <Contact />
      </StackingSection>
    </div>
  )
}
