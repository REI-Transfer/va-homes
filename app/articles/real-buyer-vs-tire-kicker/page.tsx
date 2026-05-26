import { ArticleShell, H2, P, UL, ArticleImage } from "@/components/article/article-shell"
import { ContactCTA } from "@/components/article/contact-cta"
import config from "@/lib/adv"

export const metadata = {
  title: "How to Tell a Real Local Home Buyer From a Tire-Kicker | VA Homes",
  description:
    "A simple five-minute checklist for sizing up any cash home buyer in Virginia before you share details or sign anything.",
}

export default function Page() {
  const area = config.marketName || "the areas we serve"
  return (
    <ArticleShell
      title="How to Tell a Real Local Home Buyer From a Tire-Kicker in About 5 Minutes"
      dek="A simple checklist for sizing up any cash buyer and keeping yourself safe before you share anything or sign a thing."
      companyName={config.companyName}
    >
      <P>
        The call came in, or maybe it was a postcard. Somebody wants to buy your house for cash. As it
        stands. No repairs, no showings, no agents. And one part of you thinks, wonderful, that is
        exactly what I am after. Then the other part, the part that has been around the block a few
        times, says hold on a second. Who is this person? Are they the real deal, or are they about to
        tie up my house for a month and then vanish?
      </P>
      <P>
        If that is where your head landed, good. That instinct is not paranoia. It is wisdom. After 45
        years and then some on this earth, you have learned that the folks who push hardest to move
        fast are usually the ones you ought to slow down with. So let us put that wisdom to work the
        right way.
      </P>
      <P>
        Here is what nobody bothers to tell you. You do not have to be a real estate expert to spot a
        flake. You do not need a lawyer on speed-dial just to ask a few honest questions. You need five
        questions and about five minutes. Ask them out loud, over the phone or at your kitchen table,
        and watch what the buyer does. The serious ones answer plainly. The tire-kickers start
        squirming. That difference is the whole game.
      </P>

      <ArticleImage
        src="/images/adv-local-team.jpg"
        alt="A real local home-buying team"
        caption="A genuine local buyer has a name, a face, and a team you can actually get hold of. Tire-kickers tend to stay faceless."
      />

      <H2>1. Do You Genuinely Buy In My Area, And Can I Look You Up?</H2>
      <P>
        Start right here, because this one thins out half the field by itself. A real buyer who works
        in {area} has bought houses near you, and they can tell you about it. Ask which neighborhoods
        they have closed in lately. Ask how long they have been doing this around here.
      </P>
      <P>
        Green flag: they name actual neighborhoods, they bring up recent purchases, and they are happy
        for you to look them up online and read what other sellers had to say. A track record is
        something they are proud to put in your hands.
      </P>
      <P>
        Warning sign: foggy answers like we buy all over, or they cannot point you to a single review,
        a single past seller, or anything you can verify on your own. If their entire history lives only
        in their own mouth, that is not history. That is a sales pitch.
      </P>

      <H2>2. Can You Prove You Actually Have The Money?</H2>
      <P>
        This is the polite question that scares off the people who ought to be scared off. A real cash
        buyer has the funds standing ready, and they can show you. Ask them flat out: can you prove the
        money is there before we take this any further?
      </P>
      <P>
        Green flag: they say yes without a flinch and offer to show you proof of funds. They do not take
        offense. They expect the question, because every careful seller asks it.
      </P>
      <P>
        Warning sign: they dodge, they say just trust me, or they admit they have to round up a partner
        or an investor first. That last one is the giant tell. A so-called buyer who has to go shop your
        house to someone else is not the buyer at all. They are a middleman hoping to lock you up while
        they scramble. If the money is not theirs and ready, the deal is not real.
      </P>

      <ArticleImage
        src="/images/adv-buyer-at-door.jpg"
        alt="A local buyer greeting a homeowner at the front door"
        caption="A funded buyer shows up, looks you in the eye, and answers your questions on the porch. No hiding behind a web form."
      />

      <H2>3. Will You Explain How You Reached Your Number?</H2>
      <P>
        Anybody can blurt out a price. The question is whether they can stand behind it. A real buyer
        will walk you through how they arrived at their offer. What homes near you have sold for, what
        shape yours is in, what they expect to sink into it. It does not have to be complicated. It just
        has to add up.
      </P>
      <P>
        Green flag: they break it down in plain English and stay patient as you ask follow-up questions.
        You hang up understanding the number, even if you still want to mull it over.
      </P>
      <P>
        Warning sign: the offer is a riddle, or worse, it is suspiciously high. Here is the trap to
        watch for. Some operators dangle a big number to win your signature, then carve thousands off
        once you are committed and worn down. They call it a price change after the inspection. A buyer
        who shows the math up front has far less room to pull that stunt on you later. So make them show
        their work.
      </P>

      <H2>4. Are You A Real Person, Local, With A Real Address?</H2>
      <P>
        You are about to discuss your home, your timeline, maybe your finances. You deserve to know who
        is on the other end. So ask the simple stuff. Where is your office? Can I reach an actual person
        when I call back? What is your name, and who else is on your team?
      </P>
      <P>
        Green flag: a local presence, a phone number a human actually picks up, and a person who gives
        you their name and stays with you through the whole conversation. It feels like you are dealing
        with a neighbor, not a call center three time zones off.
      </P>
      <P>
        Warning sign: no address, just a web form, a number that always rolls to voicemail, or a
        revolving door of strangers who do not know your situation. If you cannot easily find them
        today, picture how tough they will be to reach on closing day when something needs sorting out.
      </P>

      <H2>5. Will You Give Me Time, Put It In Writing, And Drop The Pressure?</H2>
      <P>
        This is the final filter, and maybe the most important of the bunch. A trustworthy buyer wants
        you to feel good about this. They will hand you the offer in writing so you can read it slowly,
        share it with your kids or your attorney, and sit with it. They will not rush you.
      </P>
      <P>
        Green flag: the offer arrives in writing, the terms are clear, and no clock is ticking down on
        you. They tell you to take your time. And they mean it.
      </P>
      <P>
        Warning sign: this offer is only good today. Sign now or lose it. You do not need a lawyer, just
        trust me. Every one of those lines is engineered to get you moving before you can think. Real
        buyers know a good offer holds up in daylight. Only the shaky ones need you in a hurry.
      </P>

      <ArticleImage
        src="/images/adv-couple-kitchen.jpg"
        alt="An older couple weighing a buyer at the kitchen table"
        caption="The right buyer hands you the offer in writing and tells you to take your time. The decision should feel calm, not rushed."
      />

      <H2>The Thing That Makes All Five Work</H2>
      <P>
        Notice what these five questions share. Not one of them asks you to know anything about real
        estate. They are not tests you can flunk. They are simply honest questions any decent person
        would answer without a fuss.
      </P>
      <P>
        And here is the part that should lift a weight off your shoulders. A real buyer welcomes every
        last one of these questions. They are glad you asked about their track record, their funds,
        their math, their address, and their timeline, because answering well is how they earn your
        trust and your business. Vetting them is not rude. It is the very thing that sorts the real
        buyers from the tire-kickers, all by itself.
      </P>
      <P>
        Think about it. A flake hates these questions, so the questions run them off. A serious buyer
        loves these questions, so the questions draw them in. You do not have to figure out who is
        legit. You just have to ask, then watch how they react. The five minutes does the sorting for
        you. Quick recap of what you are listening for:
      </P>
      <UL>
        <li>A local track record you can look up, not just words.</li>
        <li>Proof of funds, handed over without a fuss.</li>
        <li>A number they can explain in plain English.</li>
        <li>A real name, a real address, a human who picks up.</li>
        <li>A written offer and no pressure to sign today.</li>
      </UL>
      <P>
        So the next time someone offers to buy your house for cash, do not feel like you have to be an
        expert or hire a team to keep yourself safe. Pour a cup of coffee, run them through these five
        questions, and trust what you see. If they pass with a smile, you may have found a buyer worth
        talking to. If they squirm, you just spared yourself a world of headache.
      </P>
      <P>
        You have spent decades reading people. This is just one more conversation where that skill pays
        off. Slow down, ask, and let the answers tell you the truth.
      </P>

      <ContactCTA
        phoneDisplay={config.phoneDisplay}
        phoneHref={config.phoneHref}
        smsKeyword={config.smsKeyword}
        heading="Put us through the checklist"
        subheading="Text us the word OFFER or call. Ask us anything before you share a single private detail."
      />
    </ArticleShell>
  )
}
