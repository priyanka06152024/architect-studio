
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    try {
      const key = "shri-norris-local-visits";
      const previous = Number(localStorage.getItem(key) || 0);
      const next = previous + 1;

      localStorage.setItem(key, String(next));
      setVisits(next);
    } catch {
      setVisits(null);
    }
  }, []);

  return (
    <div className="inline-flex items-center gap-4 border border-[#002556]/15 bg-white px-5 py-4">
      <div className="flex h-11 w-11 items-center justify-center bg-[#002556] text-[#FEC73A]">
        <Eye size={19} strokeWidth={1.6} />
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#002556]/55">
          Website visits
        </p>

        <p className="mt-1 text-2xl font-semibold tracking-wider text-[#002556]">
          {visits === null
            ? "—"
            : String(visits).padStart(6, "0")}
        </p>
      </div>
    </div>
  );
}
