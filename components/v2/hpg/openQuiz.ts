// Shared trigger for the "Get My Cash Offer" action. Scrolls to the form
// and broadcasts an event so any future panel listener can react.
// Wire this to any CTA on the page so the behavior is consistent.
export const START_QUIZ_EVENT = "va-homes:start-quiz"

export function openQuiz() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(START_QUIZ_EVENT))
  // Small defer so any mount happens before the scroll lands on it.
  requestAnimationFrame(() => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth", block: "start" })
  })
}
