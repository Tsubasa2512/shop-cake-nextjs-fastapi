"use client";
import FormContact from "@/components/client/contact/form-contact";
import QuestionContact from "@/components/client/contact/question";
import MapsContact from "@/components/client/contact/maps";
export default function Contact() {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-8 w-full px-4 md:my-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FormContact />
          <QuestionContact />
        </div>
        <MapsContact />
      </div>
    </main>
  );
}

