import SnakeGame from "@/components/SnakeGame";

export const metadata = {
  title: "משחק סנייק יו | רונן וטמי איצ׳אקי",
  description: "פינת משחק מקצועית לשחרור היצירתיות – שלטו בנחש, צברו נקודות ושברו שיאים."
};

export default function SnakeGamePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <span className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
          הפסקה יצירתית
        </span>
        <h1 className="text-4xl font-semibold text-foreground">משחק סנייק יו מקצועי</h1>
        <p className="max-w-2xl text-lg text-foreground/70">
          קחו רגע של מיקוד, כוונו את התנועה והמשיכו לצבור השראה. פיתחנו גרסת סנייק מוקפדת שמתאימה לכל מי שאוהב עיצוב, סאונד וטכנולוגיה.
        </p>
        <ul className="list-disc space-y-2 pr-5 text-sm text-foreground/70">
          <li>השתמשו בחיצים או במקשי WASD כדי לכוון את הנחש.</li>
          <li>הכל מואץ בכל ביס – צברו מסלולים פתוחים מראש.</li>
          <li>לחיצה על רווח מביאה פאוזה מהירה, כך שתוכלו לענות לטלפון ולחזור לניקוד.</li>
        </ul>
      </div>
      <SnakeGame />
    </div>
  );
}
