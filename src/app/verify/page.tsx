import type { Metadata } from "next";
import { VerifyLot } from "@/components/product/VerifyLot";
import { LabTicker } from "@/components/ui/LabTicker";

export const metadata: Metadata = {
  title: "Verify your serum",
  description: "Enter the lot code on your carton to read its potency certificate and track its freshness window.",
};

export default function VerifyPage({ searchParams }: { searchParams: { lot?: string } }) {
  return (
    <>
      <section className="celestial text-white">
        <div className="shell py-16 lg:py-20">
          <p className="mono-label text-teal-glow">Verify your serum</p>
          <h1 className="h-display mt-3 max-w-3xl font-display">Every bottle has a <span className="italic text-metallic text-metallic-dark">paper trail.</span></h1>
          <p className="mt-5 max-w-lg text-white/75">Type the lot code from your carton to read the certificate behind it — assay, pH, bottling date — and see how much of its potency window is left.</p>
        </div>
        <LabTicker />
      </section>
      <section className="mesh-light">
        <div className="shell py-14">
          <VerifyLot initial={searchParams.lot ?? ""} />
        </div>
      </section>
    </>
  );
}
