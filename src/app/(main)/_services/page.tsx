
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Scissors, Gift, Leaf, Shirt, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Services | Premium Care",
    description: "Experience our bespoke services designed to elevate your style and extend the life of your wardrobe.",
};

const services = [
    {
        title: "Personal Styling",
        description:
            "Unlock your potential with a wardrobe that truly reflects who you are. Our expert stylists provide one-on-one consultations to curate looks that inspire confidence and elegance for any occasion.",
        icon: Shirt,
        price: "Complimentary with purchase",
        image: "bg-stone-100", // Placeholder for an actual image
    },
    {
        title: "Master Tailoring",
        description:
            "Precision is the ultimate luxury. Our in-house master tailors ensure every garment fits you like a second skin. From subtle adjustments to complex restructuring, we honor the craft of perfect fit.",
        icon: Scissors,
        price: "Services start at $15",
        image: "bg-zinc-100",
    },
    {
        title: "Signature Gift Wrapping",
        description:
            "The art of giving begins with the presentation. Elevate your gifts with our signature wrapping service, featuring artisanal papers, satin ribbons, and a personalized note for that unforgettable touch.",
        icon: Gift,
        price: "$5 per item",
        image: "bg-orange-50",
    },
    {
        title: "Sustainable Wardrobe Consultation",
        description:
            "Embrace the future of fashion. Our sustainability experts guide you in building a timeless, eco-conscious wardrobe, focusing on quality materials and ethical choices that last a lifetime.",
        icon: Leaf,
        price: "$50 per session",
        image: "bg-green-50",
    },
];

export default function ServicesPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-background to-background dark:from-slate-900/20"></div>
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-foreground">
                        Elevated Services
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                        Beyond exceptional clothing, we offer a suite of bespoke services designed to enhance your lifestyle and celebrate the art of dressing well.
                    </p>
                </div>
            </section>

            {/* Services List */}
            <section className="container mx-auto px-4 py-12 md:py-24 space-y-24 md:space-y-32">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex flex-col gap-12 md:gap-24 items-center",
                            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        )}
                    >
                        {/* Visual Side */}
                        <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                            <div className={cn("absolute inset-0 flex items-center justify-center", service.image)}>
                                <service.icon className="w-32 h-32 text-foreground/10" strokeWidth={1} />
                            </div>
                            {/* In a real app, use <Image /> here */}
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
                            <div className="inline-flex items-center justify-center md:justify-start gap-3 text-sm font-medium tracking-wider uppercase text-muted-foreground">
                                <service.icon className="w-5 h-5" />
                                <span>Service {index + 1}</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                                {service.title}
                            </h2>

                            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0">
                                {service.description}
                            </p>

                            <div className="pt-4">
                                <div className="text-xl font-medium mb-6">{service.price}</div>
                                <Button asChild size="lg" className="rounded-full px-8 text-base h-12">
                                    <Link href="/contact">
                                        Book Appointment <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* CTA Section */}
            <section className="py-24 md:py-32 bg-secondary/30 mt-12">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                        Bespoke Requests
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                        Our commitment to your satisfaction knows no bounds. If you require a service not listed here, please inquire. We delight in fulfilling unique requests.
                    </p>
                    <Button asChild size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg border-2">
                        <Link href="/contact">Contact Concierge</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
