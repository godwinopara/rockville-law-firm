import { ContactForm } from "@/components/contact-form";
import { EditorialHero } from "@/components/editorial-hero";
import { MotionReveal } from "@/components/motion-reveal";
import { contactDetails } from "@/lib/content";

export const metadata = { title: "Contact" };

export default function Contact() {
  return <>
    <EditorialHero eyebrow="Contact Rockville" title="Start with a conversation." description="Tell us about the matter you would like to discuss. We will begin with the context, the priorities, and the outcome you need." image="/images/lagos-tower.jpg" imageAlt="Modern architectural facade" />
    <section className="bg-paper"><div className="page-shell section-space grid gap-16 lg:grid-cols-[.65fr_1.35fr] lg:gap-24"><MotionReveal><p className="eyebrow gold-rule text-stone">Contact details</p><h2 className="display mt-8 text-4xl leading-tight">Rockville Legal Practitioners</h2><address className="mt-8 not-italic leading-8 text-stone"><p>{contactDetails.address}</p><p className="mt-6"><a className="hover:text-gold-dark" href="tel:+2348033064300">{contactDetails.phonePrimary}</a><br /><a className="hover:text-gold-dark" href="tel:+2348034616281">{contactDetails.phoneSecondary}</a><br /><a className="hover:text-gold-dark" href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></p></address></MotionReveal><MotionReveal><div className="border-t border-ink pt-7"><p className="eyebrow text-stone">Consultation request</p><h2 className="display mt-5 text-4xl md:text-5xl">Tell us what needs attention.</h2><ContactForm /></div></MotionReveal></div></section>
  </>;
}
