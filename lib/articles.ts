// Single source of truth for the advertorial article library.
// Used by the /articles index and the "keep reading" loop at the bottom of every article.

export interface ArticleMeta {
  slug: string // full path, e.g. "/articles/whats-the-catch"
  title: string
  teaser: string
  image: string
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "/articles/what-happens-next",
    title:
      "What Really Happens After You Ask for a Cash Offer (Most Virginia Homeowners Get It Wrong)",
    teaser:
      "A calm, step-by-step look at the whole process, so nothing surprises you and no one ever leans on you to decide.",
    image: "/images/adv-keys-couple.jpg",
  },
  {
    slug: "/articles/the-truth-about-lowball-offers",
    title:
      "The Honest Truth About So-Called Lowball Cash Offers, From the People Who Write Them",
    teaser:
      "How a fair cash number is actually built, and why the money you keep matters far more than the headline price.",
    image: "/images/adv-handshake.jpg",
  },
  {
    slug: "/articles/real-buyer-vs-tire-kicker",
    title:
      "How to Tell a Real Local Home Buyer From a Tire-Kicker in About 5 Minutes",
    teaser:
      "A simple five-point checklist for sizing up any cash buyer and protecting yourself before you sign a thing.",
    image: "/images/adv-local-team.jpg",
  },
  {
    slug: "/articles/cash-offer-vs-agent",
    title:
      "Cash Offer or List With an Agent? An Honest Look at What You Actually Keep",
    teaser:
      "An even-handed comparison of both routes side by side, so you choose the one that fits your home and your life.",
    image: "/images/adv-strangers-open-house.jpg",
  },
  {
    slug: "/articles/whats-the-catch",
    title:
      "What Is the Catch With a Cash Offer? A Straight Answer to Why It Sounds Too Good to Be True",
    teaser:
      "No repairs, no fees, no showings. Here is exactly where the money comes from, and what the real trade-off is.",
    image: "/images/adv-couple-kitchen.jpg",
  },
  {
    slug: "/articles/fix-up-before-selling",
    title:
      "Should You Fix Up the House Before Selling? The Math Most Virginia Homeowners Read Wrong",
    teaser:
      "The instinct is to renovate first. Here is why fixing up so often costs more than it ever pays back.",
    image: "/images/adv-homeowner-repair.jpg",
  },
  {
    slug: "/articles/real-cash-buyer-vs-scam",
    title:
      "How to Tell a Real Cash Buyer From a Scam: 5 Questions That Expose the Difference",
    teaser:
      "Five plain questions a legitimate buyer answers without hesitating, so you can keep yourself safe.",
    image: "/images/adv-phone-vetting.jpg",
  },
  {
    slug: "/articles/wait-for-better-market",
    title:
      "Is Now a Bad Time to Sell? Why Waiting for a Better Market Can Quietly Drain You",
    teaser:
      "Holding out for a higher price feels patient. Here is the bill the waiting itself quietly runs up.",
    image: "/images/adv-couple-window.jpg",
  },
  {
    slug: "/articles/sell-it-yourself",
    title:
      "Why Not Just Sell It Yourself and Skip the Middleman? The Hidden Cost of Going Solo",
    teaser:
      "Selling on your own sounds like keeping every dollar. Here is what it truly demands, and where it goes sideways.",
    image: "/images/adv-paperwork-alone.jpg",
  },
]
