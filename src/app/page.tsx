"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { products, competitors, categoryInsights } from "@/lib/data";

function StatusBadge({ status }: { status: string }) {
  if (status === "Single Source")
    return <Badge className="bg-red-600 hover:bg-red-700 text-white">{status}</Badge>;
  if (status === "Near Single Source")
    return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">{status}</Badge>;
  return <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">{status}</Badge>;
}

function FDABadge({ cleared }: { cleared: boolean }) {
  return cleared ? (
    <Badge variant="outline" className="border-emerald-500 text-emerald-600">FDA Cleared</Badge>
  ) : (
    <Badge variant="outline" className="border-gray-400 text-gray-500">Not Cleared</Badge>
  );
}

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const totalQty = products.reduce((a, b) => a + b.qty, 0);
  const singleSourceCount = Object.values(categoryInsights).filter(
    (i) => i.status === "Single Source"
  ).length;
  const competitiveCount = Object.values(categoryInsights).filter(
    (i) => i.status === "Competitive"
  ).length;

  const filteredCompetitors = selectedCategory
    ? competitors.filter((c) => c.category === selectedCategory)
    : competitors;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-lg">
              X
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Xodus Medical
              </h1>
              <p className="text-xs text-slate-400">
                Wound Care Intelligence Dashboard
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500">
            7 Product Categories &middot; 21 Competitors Tracked
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10 backdrop-blur">
            <CardContent className="pt-5 pb-4 px-5">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Product Categories
              </p>
              <p className="text-3xl font-bold text-white mt-1">7</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur">
            <CardContent className="pt-5 pb-4 px-5">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Total Units (Tender)
              </p>
              <p className="text-3xl font-bold text-white mt-1">
                {totalQty.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur">
            <CardContent className="pt-5 pb-4 px-5">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Single Source
              </p>
              <p className="text-3xl font-bold text-red-400 mt-1">
                {singleSourceCount}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur">
            <CardContent className="pt-5 pb-4 px-5">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Competitive
              </p>
              <p className="text-3xl font-bold text-emerald-400 mt-1">
                {competitiveCount}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-400"
            >
              Product Catalog
            </TabsTrigger>
            <TabsTrigger
              value="competitors"
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-400"
            >
              Competitor Intel
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-400"
            >
              Strategic Insights
            </TabsTrigger>
          </TabsList>

          {/* ── PRODUCTS TAB ── */}
          <TabsContent value="products" className="space-y-4">
            {products.map((p) => {
              const insight = categoryInsights[p.id];
              return (
                <Card
                  key={p.id}
                  className="bg-white/5 border-white/10 backdrop-blur hover:bg-white/[0.07] transition-colors"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-500">
                            FT-{p.ft}
                          </span>
                          <StatusBadge status={insight.status} />
                        </div>
                        <CardTitle className="text-lg text-white">
                          {p.category}
                        </CardTitle>
                        <p className="text-sm text-cyan-300">{p.englishName}</p>
                        <p className="text-xs text-slate-500 italic">
                          {p.spanishName}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-2xl font-bold text-white">
                          {p.qty.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">units</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {p.specs}
                    </p>
                    <Separator className="my-3 bg-white/10" />
                    <p className="text-xs text-slate-500">{insight.detail}</p>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* ── COMPETITORS TAB ── */}
          <TabsContent value="competitors" className="space-y-6">
            {/* Filter bar */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === null
                    ? "bg-cyan-600 text-white"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"
                }`}
              >
                All Categories
              </button>
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedCategory(p.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === p.id
                      ? "bg-cyan-600 text-white"
                      : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {p.id}. {p.category}
                </button>
              ))}
            </div>

            {/* Competitor table */}
            <Card className="bg-white/5 border-white/10 backdrop-blur overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-slate-400">Cat</TableHead>
                      <TableHead className="text-slate-400">Company</TableHead>
                      <TableHead className="text-slate-400">Product</TableHead>
                      <TableHead className="text-slate-400">Country</TableHead>
                      <TableHead className="text-slate-400">Website</TableHead>
                      <TableHead className="text-slate-400">FDA</TableHead>
                      <TableHead className="text-slate-400">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompetitors.map((c, i) => (
                      <TableRow
                        key={i}
                        className={`border-white/5 hover:bg-white/5 ${
                          c.isPrimaryMatch ? "bg-cyan-950/30" : ""
                        }`}
                      >
                        <TableCell className="text-slate-500 font-mono text-xs">
                          {c.category}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium text-sm">
                              {c.company}
                            </span>
                            {c.isPrimaryMatch && (
                              <Badge className="bg-cyan-600/20 text-cyan-300 text-[10px] border border-cyan-500/30">
                                Primary
                              </Badge>
                            )}
                            {c.isSingleSource && (
                              <Badge className="bg-red-600/20 text-red-300 text-[10px] border border-red-500/30">
                                Sole
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300 text-sm">
                          {c.product}
                        </TableCell>
                        <TableCell className="text-slate-400 text-sm">
                          {c.country}
                        </TableCell>
                        <TableCell>
                          <a
                            href={`https://${c.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-2"
                          >
                            {c.website}
                          </a>
                        </TableCell>
                        <TableCell>
                          <FDABadge cleared={c.fdaCleared} />
                        </TableCell>
                        <TableCell className="text-slate-400 text-xs max-w-xs">
                          {c.notes}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Company links grid */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">
                Quick Links — All Competitors
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Array.from(
                  new Map(competitors.map((c) => [c.company, c])).values()
                ).map((c) => (
                  <a
                    key={c.company}
                    href={`https://${c.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.07] transition-all"
                  >
                    <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                      {c.company}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {c.country} &middot; {c.website}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ── INSIGHTS TAB ── */}
          <TabsContent value="insights" className="space-y-6">
            {/* Single Source Alert */}
            <Card className="bg-red-950/30 border-red-500/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-red-300 text-base">
                  Single-Source Products
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-300">
                  These product specifications are so specific that only one
                  manufacturer&apos;s product matches. Common in Latin American
                  government procurement when specs are written around a preferred vendor.
                </p>
                <div className="space-y-3">
                  {[2, 5, 6].map((cat) => {
                    const p = products.find((pr) => pr.id === cat)!;
                    const primary = competitors.find(
                      (c) => c.category === cat && c.isPrimaryMatch
                    )!;
                    return (
                      <div
                        key={cat}
                        className="p-3 rounded-lg bg-white/5 border border-red-500/20"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-red-400">
                            Cat {cat}
                          </span>
                          <span className="text-white font-medium text-sm">
                            {p.category}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1">
                          Sole manufacturer:{" "}
                          <span className="text-cyan-300 font-medium">
                            {primary.company}
                          </span>{" "}
                          &mdash; {primary.product}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Near Single Source */}
            <Card className="bg-amber-950/20 border-amber-500/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-amber-300 text-base">
                  Near Single-Source Products
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[3, 4].map((cat) => {
                  const p = products.find((pr) => pr.id === cat)!;
                  const primary = competitors.find(
                    (c) => c.category === cat && c.isPrimaryMatch
                  )!;
                  const insight = categoryInsights[cat];
                  return (
                    <div
                      key={cat}
                      className="p-3 rounded-lg bg-white/5 border border-amber-500/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-amber-400">
                          Cat {cat}
                        </span>
                        <span className="text-white font-medium text-sm">
                          {p.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Primary match:{" "}
                        <span className="text-cyan-300 font-medium">
                          {primary.company} — {primary.product}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {insight.detail}
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Competitive */}
            <Card className="bg-emerald-950/20 border-emerald-500/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-emerald-300 text-base">
                  Competitive Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 7].map((cat) => {
                  const p = products.find((pr) => pr.id === cat)!;
                  const catCompetitors = competitors.filter(
                    (c) => c.category === cat
                  );
                  return (
                    <div
                      key={cat}
                      className="p-3 rounded-lg bg-white/5 border border-emerald-500/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-emerald-400">
                          Cat {cat}
                        </span>
                        <span className="text-white font-medium text-sm">
                          {p.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        {catCompetitors.length} manufacturers:{" "}
                        {catCompetitors.map((c) => c.company).join(", ")}
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Tender context */}
            <Card className="bg-white/5 border-white/10 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white text-base">
                  Tender Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-300">
                <p>
                  This appears to be a <strong className="text-white">Latin American government procurement tender</strong> (likely Panama, based on the IEA — Instituto Especializado de Analisis — reference).
                </p>
                <p>
                  Total quantity across all categories:{" "}
                  <strong className="text-white">{totalQty.toLocaleString()} units</strong>,
                  suggesting a national health system contract.
                </p>
                <p>
                  Categories 2, 5, and 6 have specifications so narrow they
                  effectively mandate a single vendor. Categories 1 and 7 have the
                  most room for competitive bidding.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-slate-600">
          Xodus Medical &middot; Wound Care Intelligence &middot; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
