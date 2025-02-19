
"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
export default function QuestionContact() {

    const faqs = [
        {
            question: "How to buy a single custom service?",
            answer: "You can purchase a single custom service directly through our website by selecting the desired service and following the checkout process.",
        },
        {
            question: "How to become a VIP customer in your store?",
            answer: "To become a VIP customer, you need to make regular purchases and maintain an active account. VIP status is awarded based on purchase history and engagement.",
        },
        {
            question: "Is it possible to request personalized projects?",
            answer: "Yes, we welcome personalized project requests. You can submit your requirements through our contact form or reach out to our customer service team.",
        },
        {
            question: "How can you become your trusted partner?",
            answer: "We establish trusted partnerships through consistent communication, reliable service delivery, and mutual understanding of business goals.",
        },
        {
            question: "Do you sell also custom cake decorations?",
            answer: "Yes, we offer custom cake decorations. Each piece is carefully crafted to meet your specific requirements and design preferences.",
        },
    ];
    return (
        <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-medium">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}