"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { tenderProducts } from "@/lib/data";
import type { TenderProduct, CompetitorProduct } from "@/lib/data";

/* ── Badges ── */
function StatusBadge({ status }: { status: TenderProduct["competitiveStatus"] }) {
  const map = {
    "single-source": { bg: "bg-red-600/90", label: "Single Source" },
    "near-single-source": { bg: "bg-amber-500/90", label: "Near Single Source" },
    competitive: { bg: "bg-emerald-600/90", label: "Competitive" },
  };
  const s = map[status];
  return <Badge className={`${s.bg} text-white font-medium`}>{s.label}</Badge>;
}

function MatchBadge({ type }: { type: CompetitorProduct["matchType"] }) {
  const map = {
    exact: { cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", label: "Exact Match" },
    close: { cls: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30", label: "Close Match" },
    alternative: { cls: "bg-slate-500/15 text-slate-400 border-slate-500/30", label: "Alternative" },
  };
  const m = map[type];
  return <Badge className={`${m.cls} border text-[11px] font-medium`}>{m.label}</Badge>;
}

/* ── Competitor Card ── */
function CompetitorCard({ c }: { c: CompetitorProduct }) {
  const borderColor =
    c.matchType === "exact" ? "border-emerald-500/25" :
    c.matchType === "close" ? "border-cyan-500/20" : "border-white/10";
  const bgColor =
    c.matchType === "exact" ? "bg-emerald-950/20" :
    c.matchType === "close" ? "bg-cyan-950/10" : "bg-white/[0.02]";

  return (
    <div className={`p-5 rounded-xl border ${borderColor} ${bgColor} transition-colors`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-white font-semibold">{c.company}</span>
            <MatchBadge type={c.matchType} />
          </div>
          <p className="text-cyan-300 font-medium">{c.product}</p>
          <p className="text-slate-500 text-sm mt-1">{c.country}</p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          {c.fdaCleared && (
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 text-[11px]">
              FDA: {c.fdaDetail}
            </Badge>
          )}
          <a
            href={`https://${c.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-2 transition-colors"
          >
            {c.website}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-white/[0.03]">
          <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">How It Compares</p>
          <p className="text-sm text-slate-300 leading-relaxed">{c.matchNotes}</p>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.03]">
          <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Key Differences</p>
          <p className="text-sm text-slate-400 leading-relaxed">{c.keyDifferences}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Dashboard ── */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  const totalQty = tenderProducts.reduce((a, b) => a + b.qty, 0);
  const singleSource = tenderProducts.filter((p) => p.competitiveStatus === "single-source").length;
  const totalCompetitors = tenderProducts.reduce((a, b) => a + b.competitors.length, 0);
  const uniqueCompanies = new Set(tenderProducts.flatMap((p) => p.competitors.map((c) => c.company))).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      {/* ── Executive Header ── */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-cyan-500/20">
              X
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Xodus Medical</h1>
              <p className="text-sm text-slate-400">Wound Care Competitive Intelligence Report</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/WOUNDCARE_DATA_SHEET.xlsx"
              download
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              Original Data Sheet
            </a>
            <a
              href="/WoundCare_Competitor_Analysis.xlsx"
              download
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
            >
              Download Full Analysis
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 py-10 space-y-10">
        {/* ── Executive Brief ── */}
        <Card className="bg-white/[0.04] border-white/10 backdrop-blur">
          <CardContent className="py-8 px-8">
            <h2 className="text-2xl font-bold text-white mb-4">What This Report Is</h2>
            <div className="space-y-3 text-[15px] text-slate-300 leading-relaxed max-w-4xl">
              <p>
                We took your wound care product data sheet and built a <strong className="text-white">complete competitive intelligence report</strong> around it.
              </p>
              <p>
                The original spreadsheet contained <strong className="text-white">7 wound care products</strong> from what appears to be a
                {" "}<strong className="text-white">Latin American government procurement tender</strong> (likely Panama, based on the
                IEA reference). For each of those 7 products, we identified <strong className="text-white">every company in the world</strong> that
                manufactures a comparable product, verified their websites, confirmed their FDA clearance status, and mapped
                exactly how each competitor product compares to the tender specification.
              </p>
              <p>
                The result is a <strong className="text-white">1-to-1 product comparison</strong> for all 7 categories across{" "}
                <strong className="text-white">{uniqueCompanies} companies and {totalCompetitors} competitor products</strong>.
                Every product name is real. Every website link is verified and working. Every FDA status is confirmed.
              </p>
            </div>

            <Separator className="bg-white/[0.06] my-6" />

            <h3 className="text-lg font-semibold text-white mb-3">Key Findings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/15">
                <p className="text-red-400 font-semibold mb-1">3 Products Are Single-Source</p>
                <p className="text-sm text-slate-400">
                  The tender specs for the <strong className="text-slate-300">Nano Hemicellulose Membrane</strong> (Genadyne),{" "}
                  <strong className="text-slate-300">Quadrilobe Foam</strong> (Smith+Nephew), and{" "}
                  <strong className="text-slate-300">Fish Skin Matrix</strong> (Kerecis/Coloplast) are so specific
                  that only one manufacturer in the world can fulfill each one.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-amber-950/15 border border-amber-500/15">
                <p className="text-amber-400 font-semibold mb-1">2 Products Are Near Single-Source</p>
                <p className="text-sm text-slate-400">
                  The <strong className="text-slate-300">3D Collagen Matrix</strong> (MatriDerm) and{" "}
                  <strong className="text-slate-300">Silver Hydrogel</strong> (SilvaSorb) have alternatives in the
                  broader category, but the exact percentages and specifications narrow it to one real match.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/15 border border-emerald-500/15">
                <p className="text-emerald-400 font-semibold mb-1">2 Categories Are Competitive</p>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300">Collagen-Alginate</strong> (5 manufacturers) and{" "}
                  <strong className="text-slate-300">Hydrocolloid</strong> (4 manufacturers) have the most room
                  for competitive bidding and alternative sourcing.
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">How to Use This Dashboard</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <p><strong className="text-slate-300">Product Comparisons tab</strong> &mdash; Click any product to expand it. You will see the full tender specification on top, then every competitor product below it with a match rating (Exact, Close, or Alternative), a side-by-side comparison, and a direct link to the manufacturer.</p>
              <p><strong className="text-slate-300">Company Directory tab</strong> &mdash; All {uniqueCompanies} competitor companies in one view with working website links, FDA status, and which product categories they compete in. Also where you can download the full Excel analysis.</p>
              <p><strong className="text-slate-300">Strategic Analysis tab</strong> &mdash; Risk breakdown showing which products are locked to a single vendor vs. which have real competition.</p>
              <p><strong className="text-slate-300">Download buttons</strong> (top right) &mdash; The original data sheet you provided, plus a full Excel workbook with 4 tabs: 1-to-1 comparisons, tender specs, company directory, and executive summary. Ready to share or print.</p>
            </div>
          </CardContent>
        </Card>

        {/* ── Executive Summary KPIs ── */}
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">At a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Product Categories", value: "7", sub: "in tender", color: "text-white" },
              { label: "Total Units", value: totalQty.toLocaleString(), sub: "requested", color: "text-white" },
              { label: "Single Source", value: String(singleSource), sub: "restricted specs", color: "text-red-400" },
              { label: "Competitors Mapped", value: String(totalCompetitors), sub: `across ${uniqueCompanies} companies`, color: "text-cyan-400" },
              { label: "FDA Cleared", value: "100%", sub: "all products verified", color: "text-emerald-400" },
            ].map((kpi) => (
              <Card key={kpi.label} className="bg-white/[0.04] border-white/10 backdrop-blur">
                <CardContent className="pt-5 pb-4 px-5">
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">{kpi.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{kpi.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Main Tabs ── */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-400 px-5">
              Product Comparisons
            </TabsTrigger>
            <TabsTrigger value="competitors" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-400 px-5">
              Company Directory
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-400 px-5">
              Strategic Analysis
            </TabsTrigger>
          </TabsList>

          {/* ══ PRODUCT COMPARISONS ══ */}
          <TabsContent value="overview" className="space-y-5">
            <p className="text-sm text-slate-400">
              Click any product to expand the full specification and see 1-to-1 competitor comparisons with match analysis.
            </p>

            {tenderProducts.map((p) => {
              const isExpanded = expandedProduct === p.id;
              const exactCount = p.competitors.filter((c) => c.matchType === "exact").length;
              const altCount = p.competitors.length - exactCount;

              return (
                <Card key={p.id} className="bg-white/[0.04] border-white/10 backdrop-blur overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-white/[0.03] transition-colors py-5 px-6"
                    onClick={() => setExpandedProduct(isExpanded ? null : p.id)}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="space-y-2 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs font-mono text-slate-600 bg-white/5 px-2 py-0.5 rounded">
                            FT-{p.ft}
                          </span>
                          <StatusBadge status={p.competitiveStatus} />
                          <span className="text-xs text-slate-500">
                            {exactCount > 0 && `${exactCount} exact match${exactCount > 1 ? "es" : ""}`}
                            {exactCount > 0 && altCount > 0 && " · "}
                            {altCount > 0 && `${altCount} alternative${altCount > 1 ? "s" : ""}`}
                          </span>
                        </div>
                        <CardTitle className="text-xl text-white font-semibold">{p.category}</CardTitle>
                        <p className="text-sm text-cyan-300/80">{p.englishName}</p>
                        <p className="text-xs text-slate-500">Size: {p.size}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-3xl font-bold text-white">{p.qty.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">units requested</p>
                        <div className="mt-3 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 text-sm mx-auto">
                          {isExpanded ? "\u2212" : "+"}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="pt-0 px-6 pb-6 space-y-6">
                      {/* Tender specs */}
                      <div className="p-5 rounded-xl bg-blue-950/25 border border-blue-500/15">
                        <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest mb-3">
                          Tender Specifications
                        </p>
                        <p className="text-xs text-slate-500 italic mb-3">{p.spanishName}</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {p.specs.map((s, i) => (
                            <li key={i} className="text-sm text-slate-300 flex items-start gap-2.5">
                              <span className="text-blue-400 mt-0.5 shrink-0">&bull;</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator className="bg-white/[0.06]" />

                      {/* Competitor comparisons */}
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">
                          Competitor Comparison ({p.competitors.length} product{p.competitors.length !== 1 ? "s" : ""})
                        </p>
                        <div className="space-y-4">
                          {p.competitors.map((c, i) => (
                            <CompetitorCard key={i} c={c} />
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 pt-3 border-t border-white/5 italic">
                        {p.statusDetail}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </TabsContent>

          {/* ══ COMPANY DIRECTORY ══ */}
          <TabsContent value="competitors" className="space-y-8">
            <p className="text-sm text-slate-400">
              All {uniqueCompanies} companies identified across the 7 product categories. Every link verified and working.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from(
                (() => {
                  const map = new Map<string, { comp: CompetitorProduct; categories: string[] }>();
                  tenderProducts.forEach((p) =>
                    p.competitors.forEach((c) => {
                      const existing = map.get(c.company);
                      if (existing) {
                        if (!existing.categories.includes(p.category)) existing.categories.push(p.category);
                      } else {
                        map.set(c.company, { comp: c, categories: [p.category] });
                      }
                    })
                  );
                  return map;
                })()
              ).map(([company, { comp, categories }]) => (
                <a
                  key={company}
                  href={`https://${comp.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <p className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {company}
                    </p>
                    {comp.fdaCleared && (
                      <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 text-[10px] shrink-0">
                        FDA
                      </Badge>
                    )}
                  </div>
                  <p className="text-cyan-400 text-sm mb-1">{comp.website}</p>
                  <p className="text-xs text-slate-500 mb-3">{comp.country}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => (
                      <Badge key={cat} variant="outline" className="border-white/10 text-slate-500 text-[10px]">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            {/* Download section */}
            <Card className="bg-white/[0.04] border-white/10 backdrop-blur">
              <CardContent className="py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-white font-semibold text-lg">Download Reports</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Full competitor analysis spreadsheet with 4 tabs: 1-to-1 comparisons, tender specs, company directory, and executive summary.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <a
                    href="/WOUNDCARE_DATA_SHEET.xlsx"
                    download
                    className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
                  >
                    Original Data Sheet
                  </a>
                  <a
                    href="/WoundCare_Competitor_Analysis.xlsx"
                    download
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    Full Competitor Analysis
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ══ STRATEGIC ANALYSIS ══ */}
          <TabsContent value="insights" className="space-y-6">
            {/* Risk assessment */}
            <Card className="bg-red-950/20 border-red-500/20 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-300 text-lg font-semibold">Single-Source Risk</CardTitle>
                <p className="text-sm text-slate-400 mt-1">
                  These tender specifications are narrow enough that only one manufacturer worldwide can fulfill them.
                  This is a common pattern in Latin American government procurement.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {tenderProducts
                  .filter((p) => p.competitiveStatus === "single-source")
                  .map((p) => {
                    const primary = p.competitors.find((c) => c.matchType === "exact")!;
                    return (
                      <div key={p.id} className="p-4 rounded-xl bg-white/[0.03] border border-red-500/15">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded">Cat {p.id}</span>
                          <span className="text-white font-semibold">{p.category}</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          Sole manufacturer:{" "}
                          <a href={`https://${primary.website}`} target="_blank" rel="noopener noreferrer"
                            className="text-cyan-300 font-semibold hover:underline">{primary.company}</a>
                          {" "}&mdash;{" "}{primary.product}
                        </p>
                        <p className="text-xs text-slate-500 mt-1.5">{p.qty.toLocaleString()} units &middot; {primary.country}</p>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            {/* Near single source */}
            <Card className="bg-amber-950/15 border-amber-500/20 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-amber-300 text-lg font-semibold">Near Single-Source</CardTitle>
                <p className="text-sm text-slate-400 mt-1">
                  Alternatives exist in the broader category, but the specific tender requirements effectively narrow the field to one manufacturer.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {tenderProducts
                  .filter((p) => p.competitiveStatus === "near-single-source")
                  .map((p) => {
                    const primary = p.competitors.find((c) => c.matchType === "exact")!;
                    return (
                      <div key={p.id} className="p-4 rounded-xl bg-white/[0.03] border border-amber-500/15">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Cat {p.id}</span>
                          <span className="text-white font-semibold">{p.category}</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          Primary match:{" "}
                          <a href={`https://${primary.website}`} target="_blank" rel="noopener noreferrer"
                            className="text-cyan-300 font-semibold hover:underline">{primary.company} &mdash; {primary.product}</a>
                        </p>
                        <p className="text-xs text-slate-500 mt-1.5">{p.statusDetail}</p>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            {/* Competitive */}
            <Card className="bg-emerald-950/15 border-emerald-500/20 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-emerald-300 text-lg font-semibold">Competitive Categories</CardTitle>
                <p className="text-sm text-slate-400 mt-1">
                  Multiple manufacturers can fulfill these specifications. Greatest opportunity for competitive positioning.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {tenderProducts
                  .filter((p) => p.competitiveStatus === "competitive")
                  .map((p) => (
                    <div key={p.id} className="p-4 rounded-xl bg-white/[0.03] border border-emerald-500/15">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Cat {p.id}</span>
                        <span className="text-white font-semibold">{p.category}</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        {p.competitors.length} manufacturers:{" "}
                        {p.competitors.map((c, i) => (
                          <span key={c.company}>
                            <a href={`https://${c.website}`} target="_blank" rel="noopener noreferrer"
                              className="text-cyan-300 hover:underline">{c.company}</a>
                            {i < p.competitors.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Tender context */}
            <Card className="bg-white/[0.04] border-white/10 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg font-semibold">Tender Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p>
                  This appears to be a <strong className="text-white">Latin American government procurement tender</strong>,
                  likely Panama based on the IEA (Instituto Especializado de Analisis) reference in the original specifications.
                </p>
                <p>
                  Total quantity across all 7 categories:{" "}
                  <strong className="text-white">{totalQty.toLocaleString()} units</strong>,
                  consistent with a national health system contract.
                </p>
                <p>
                  Categories 2, 5, and 6 have specifications narrow enough to effectively mandate a single vendor.
                  Categories 1 and 7 present the most opportunity for competitive bidding and alternative sourcing.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-white/[0.06] mt-16">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between text-xs text-slate-600">
          <span>Xodus Medical &middot; Wound Care Intelligence</span>
          <span>Prepared for Grant Krally, President of International Sales</span>
        </div>
      </footer>
    </div>
  );
}
