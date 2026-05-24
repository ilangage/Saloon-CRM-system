const faqs = [
  {
    question: "Do I need to book before visiting?",
    answer:
      "Yes. Booking is recommended so we can reserve your time and avoid waiting."
  },
  {
    question: "Can I book through WhatsApp?",
    answer:
      "Yes. You can use the WhatsApp button if you prefer to chat before confirming."
  },
  {
    question: "What days are you open?",
    answer:
      "We are open Monday to Saturday from 9:00 AM to 6:00 PM. We are closed on Sunday."
  },
  {
    question: "How long does rebonding take?",
    answer:
      "Rebonding usually takes around 180 minutes. Exact time can depend on hair length and condition."
  },
  {
    question: "Can I change my appointment time?",
    answer:
      "Yes. Please message us on WhatsApp as early as possible to change your booking."
  }
];

export default function FAQ() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="faq-title">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose">
          FAQ
        </p>

        <h2 id="faq-title" className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">
          Common questions
        </h2>

        <div className="mt-8 divide-y divide-wine/10 rounded-[2rem] border border-wine/10 bg-cream/40">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="cursor-pointer list-none font-bold text-charcoal focus:outline-none group-open:text-wine">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-wine" aria-hidden="true">+</span>
                </span>
              </summary>

              <p className="mt-3 leading-7 text-charcoal/70">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
