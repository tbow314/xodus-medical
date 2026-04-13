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
    "single-source": { bg: "bg-red-600 hover:bg-red-700", label: "Single Source" },
    "near-single-source": { bg: "bg-amber-500 hover:bg-amber-600", label: "Near Single Source" },
    competitive: { bg: "bg-emerald-600 hover:bg-emerald-700", label: "Competitive" },
  };
  const s = map[status];
  return <Badge className={`${s.bg} text-white`}>{s.label}</Badge>;
}

function MatchBadge({ type }: { type: CompetitorProduct["matchType"] }) {
  const map = {
    exact: { cls: "bg-emerald-600/20 text-emerald-300 border-emerald-500/30", label: "Exact Match" },
    close: { cls: "bg-cyan-600/20 text-cyan-300 border-cyan-500/30", label: "Close Match" },
    alternative: { cls: "bg-slate-600/20 text-slate-300 border-slate-500/30", label: "Alternative" },
  };
  const m = map[type];
  return <Badge className={`${m.cls} border text-xs`}>{m.label}</Badge>;
}

/* ── Competitor comparison card ── */

function CompetitorCard({ c, tenderSize }: { c: CompetitorProduct; tenderSize: string }) {
  return (
    <div
      className={`p-4 rounded-lg border transition-colors ${
        c.matchType === "exact"
          ? "bg-emerald-950/20 border-emerald-500/20"
          : c.matchType === "close"
          ? "bg-cyan-950/10 border-cyan-500/15"
          : "bg-white/[0.02] border-white/10"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-semibold text-sm">{c.company}</span>
            <MatchBadge type={c.matchType} />
          </div>
          <p className="text-cyan-300 font-medium text-sm">{c.product}</p>
          <p className="text-slate-500 text-xs mt-0.5">{c.country}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {c.fdaCleared ? (
            <Badge variant="outline" className="border-emerald-500 text-emerald-500 text-[10px]">
              FDA {c.fdaDetail}
            </Badge>
          ) : (
            <Badge variant="outline" className="border-gray-500 text-gray-500 text-[10px]">
              Not FDA Cleared
            </Badge>
          )}
          <a
            href={`https://${c.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 text-xs underline underline-offset-2"
          >
            {c.website}
          </a>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div>
          <span className="text-slate-500 font-medium">How it compares: </span>
          <span className="text-slate-300">{c.matchNotes}</span>
        </div>
        <div>
          <span className="text-slate-500 font-medium">Key differences: </span>
          <span className="text-slate-400">{c.keyDifferences}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  const totalQty = tenderProducts.reduce((a, b) => a + b.qty, 0);
  const singleSource = tenderProducts.filter((p) => p.competitiveStatus === "single-source").length;
  const totalCompetitors = tenderProducts.reduce((a, b) => a + b.competitors.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-lg">
              X
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Xodus Medical</h1>
              <p className="text-xs text-slate-400">Wound Care Competitive Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/WOUNDCARE_DATA_SHEET.xlsx"
              download
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-colors"
            >
              Original Spreadsheet
            </a>
            <a
              href="/WoundCare_Competitor_Analysis.xlsx"
              download
              className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-medium hover:bg-cyan-500 transition-colors"
            >
              Download Competitor Analysis
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Products", value: "7", color: "text-white" },
            { label: "Total Units", value: totalQty.toLocaleString(), color: "text-white" },
            { label: "Single Source", value: String(singleSource), color: "text-red-400" },
            { label: "Competitors Mapped", value: String(totalCompetitors), color: "text-cyan-400" },
            { label: "All FDA Cleared", value: "Yes", color: "text-emerald-400" },
          ].map((kpi) => (
            <Card key={kpi.label} className="bg-white/5 border-white/10 backdrop-blur">
              <CardContent className="pt-4 pb-3 px-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                <p className={`text-2xl font-bold mt-0.5 ${kpi.color}`}>{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-400">
              Product Comparisons
            </TabsTrigger>
            <TabsTrigger value="competitors" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-400">
              All Competitor Links
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-400">
              Strategic Insights
            </TabsTrigger>
          </TabsList>

          {/* ══ PRODUCT COMPARISONS TAB ══ */}
          <TabsContent value="overview" className="space-y-6">
            {tenderProducts.map((p) => {
              const isExpanded = expandedProduct === p.id;
              return (
                <Card key={p.id} className="bg-white/5 border-white/10 backdrop-blur overflow-hidden">
                  {/* Product header — always visible */}
                  <CardHeader
                    className="cursor-pointer hover:bg-white/[0.03] transition-colors"
                    onClick={() => setExpandedProduct(isExpanded ? null : p.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-slate-500">FT-{p.ft}</span>
                          <StatusBadge status={p.competitiveStatus} />
                          <span className="text-xs text-slate-600">
                            {p.competitors.length} competitor{p.competitors.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <CardTitle className="text-lg text-white">{p.category}</CardTitle>
                        <p className="text-sm text-cyan-300">{p.englishName}</p>
                        <p className="text-xs text-slate-500">Size: {p.size}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-2xl font-bold text-white">{p.qty.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">units</p>
                        <div className="mt-2 text-slate-500 text-lg">
                          {isExpanded ? "−" : "+"}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Expanded: specs + 1-to-1 comparisons */}
                  {isExpanded && (
                    <CardContent className="pt-0 space-y-5">
                      {/* Tender specs */}
                      <div className="p-4 rounded-lg bg-blue-950/30 border border-blue-500/15">
                        <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
                          Tender Specifications
                        </p>
                        <p className="text-xs text-slate-500 italic mb-2">{p.spanishName}</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                          {p.specs.map((s, i) => (
                            <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                              <span className="text-blue-400 mt-0.5 shrink-0">&#x2022;</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator className="bg-white/10" />

                      {/* 1-to-1 competitor comparisons */}
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                          Competitor Product Comparisons ({p.competitors.length})
                        </p>
                        <div className="space-y-3">
                          {p.competitors.map((c, i) => (
                            <CompetitorCard key={i} c={c} tenderSize={p.size} />
                          ))}
                        </div>
                      </div>

                      {/* Status note */}
                      <div className="text-xs text-slate-500 pt-2 border-t border-white/5">
                        {p.statusDetail}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </TabsContent>

          {/* ══ ALL COMPETITOR LINKS TAB ══ */}
          <TabsContent value="competitors" className="space-y-6">
            {/* Unique companies grid with links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from(
                new Map(
                  tenderProducts.flatMap((p) =>
                    p.competitors.map((c) => [c.company, { ...c, categories: [] as string[] }])
                  )
                )
              )
                .map(([company, c]) => {
                  // find all categories this company competes in
                  const cats = tenderProducts
                    .filter((p) => p.competitors.some((comp) => comp.company === company))
                    .map((p) => p.category);
                  return { ...c, categories: cats };
                })
                .map((c) => (
                  <a
                    key={c.company}
                    href={`https://${c.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.07] transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {c.company}
                      </p>
                      {c.fdaCleared && (
                        <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 text-[10px] shrink-0">
                          FDA
                        </Badge>
                      )}
                    </div>
                    <p className="text-cyan-400 text-xs mb-2">{c.website}</p>
                    <p className="text-xs text-slate-500">{c.country}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {c.categories.map((cat) => (
                        <Badge key={cat} variant="outline" className="border-white/10 text-slate-500 text-[10px]">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </a>
                ))}
            </div>

            {/* Download section */}
            <Card className="bg-white/5 border-white/10 backdrop-blur">
              <CardContent className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-white font-semibold text-sm">Download Spreadsheets</p>
                  <p className="text-slate-400 text-xs mt-1">Get the raw data for your own analysis</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="/WOUNDCARE_DATA_SHEET.xlsx"
                    download
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors"
                  >
                    Original Data Sheet
                  </a>
                  <a
                    href="/WoundCare_Competitor_Analysis.xlsx"
                    download
                    className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-500 transition-colors"
                  >
                    Competitor Analysis
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ══ INSIGHTS TAB ══ */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-red-950/30 border-red-500/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-red-300 text-base">Single-Source Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-300">
                  These specifications are so specific that only one manufacturer&apos;s product matches.
                  Common in Latin American government procurement when specs are written around a preferred vendor.
                </p>
                {tenderProducts
                  .filter((p) => p.competitiveStatus === "single-source")
                  .map((p) => {
                    const primary = p.competitors.find((c) => c.matchType === "exact")!;
                    return (
                      <div key={p.id} className="p-3 rounded-lg bg-white/5 border border-red-500/20">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-red-400">Cat {p.id}</span>
                          <span className="text-white font-medium text-sm">{p.category}</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1">
                          Sole manufacturer:{" "}
                          <a href={`https://${primary.website}`} target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-medium hover:underline">
                            {primary.company}
                          </a>
                          {" "}&mdash; {primary.product}
                        </p>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            <Card className="bg-amber-950/20 border-amber-500/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-amber-300 text-base">Near Single-Source Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tenderProducts
                  .filter((p) => p.competitiveStatus === "near-single-source")
                  .map((p) => {
                    const primary = p.competitors.find((c) => c.matchType === "exact")!;
                    return (
                      <div key={p.id} className="p-3 rounded-lg bg-white/5 border border-amber-500/20">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-amber-400">Cat {p.id}</span>
                          <span className="text-white font-medium text-sm">{p.category}</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1">
                          Primary match:{" "}
                          <a href={`https://${primary.website}`} target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-medium hover:underline">
                            {primary.company} — {primary.product}
                          </a>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{p.statusDetail}</p>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            <Card className="bg-emerald-950/20 border-emerald-500/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-emerald-300 text-base">Competitive Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tenderProducts
                  .filter((p) => p.competitiveStatus === "competitive")
                  .map((p) => (
                    <div key={p.id} className="p-3 rounded-lg bg-white/5 border border-emerald-500/20">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-emerald-400">Cat {p.id}</span>
                        <span className="text-white font-medium text-sm">{p.category}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        {p.competitors.length} manufacturers:{" "}
                        {p.competitors.map((c, i) => (
                          <span key={c.company}>
                            <a href={`https://${c.website}`} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">
                              {c.company}
                            </a>
                            {i < p.competitors.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white text-base">Tender Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-300">
                <p>
                  This appears to be a <strong className="text-white">Latin American government procurement tender</strong> (likely Panama, based on the IEA — Instituto Especializado de Analisis — reference).
                </p>
                <p>
                  Total quantity: <strong className="text-white">{totalQty.toLocaleString()} units</strong> across 7 categories, suggesting a national health system contract.
                </p>
                <p>
                  Categories 2, 5, and 6 have specifications so narrow they effectively mandate a single vendor. Categories 1 and 7 offer the most room for competitive bidding.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-slate-600">
          Xodus Medical &middot; Wound Care Intelligence &middot; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
