import { Header } from "@/shared/components/header"
import { Hero } from "@/shared/components/hero"
import { About } from "@/shared/components/about"
import { Services } from "@/shared/components/services"
import { Products } from "@/shared/components/products"
import { Team } from "@/shared/components/team"
import { Contact } from "@/shared/components/contact"
import { StackingSection } from "@/shared/components/stacking-section"

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
