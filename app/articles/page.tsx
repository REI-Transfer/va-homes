import Image from "next/image"
import Link from "next/link"
import config from "@/lib/adv"
import { ARTICLES } from "@/lib/articles"

export const metadata = {
  title: "Articles for Virginia Homeowners | VA Homes",
  description:
    "Straight, plain-English reads for Virginia homeowners weighing a sale. What happens after you ask for an offer, the real story on lowball offers, how to size up a buyer, and cash compared to listing.",
}

export default function ArticlesIndexPage() {
  const area = config.marketName || "the areas we serve"
  return (
    <div className="bg-white text-[#1a1a1a]">
      <main className="mx-auto max-w-[760px] px-6 pt-12 pb-24">
        <p className="text-xs tracking-[0.14em] uppercase text-center text-[#6b6b6b] mb-[18px]">
          Advertorial
        </p>
        <h1 className="text-[30px] md:text-[40px] leading-[1.16] font-extrabold text-center mb-[14px] tracking-[-0.01em]">
          Straight Answers for Virginia Homeowners
        </h1>
        <p className="text-center text-[18px] text-[#444] mb-[40px] max-w-[620px] mx-auto">
          Plain-English reads for anyone weighing a home sale in {area}. No hype, no arm-twisting, just honest talk.
        </p>

        <div className="grid grid-cols-1 gap-5">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={a.slug}
              className="group flex flex-col sm:flex-row overflow-hidden rounded-[14px] border border-[#e5e5e5] transition-colors hover:border-[#1a4d8f] hover:bg-[#f5f9ff] no-underline"
            >
              <Image
                src={a.image}
                alt={a.title}
                width={260}
                height={180}
                className="h-[180px] w-full sm:h-auto sm:w-[200px] shrink-0 object-cover bg-gray-100"
              />
              <div className="p-6">
                <h2 className="text-[20px] md:text-[23px] leading-[1.28] font-extrabold text-[#1a1a1a] mb-2">
                  {a.title}
                </h2>
                <p className="text-[15px] text-[#555] mb-3">{a.teaser}</p>
                <span className="text-[15px] font-semibold text-[#1a4d8f]">Read the article →</span>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-12 pt-6 border-t border-[#e5e5e5] text-[13px] text-[#6b6b6b] text-center">
          <p className="mb-2">
            {config.companyName} buys homes as-is for cash across {area}. No cost, no obligation.
          </p>
          <p>
            <Link href="/privacy" className="text-[#1a4d8f] underline">
              Privacy
            </Link>
            {" · "}
            <Link href="/terms" className="text-[#1a4d8f] underline">
              Terms
            </Link>
          </p>
        </footer>
      </main>
    </div>
  )
}
