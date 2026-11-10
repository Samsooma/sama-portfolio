"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { D, type ShowStatus } from "./tasteGraphData";
import styles from "./TasteGraph.module.css";

// Ported from taste-graph.html. Logic, data and colors are unchanged.

type Mode = "themes" | "creators" | "networks";
type NodeType = "show" | Mode;
type GNode = d3.SimulationNodeDatum & {
  id: string;
  type: NodeType;
  s?: ShowStatus;
};
type GLink = d3.SimulationLinkDatum<GNode> & {
  source: string | GNode;
  target: string | GNode;
  kind: Mode | "spin";
};
type ResolvedLink = GLink & { source: GNode; target: GNode };

const DEFAULT_INFO = "Tap or hover a show or hub to see what connects.";

export function TasteGraph() {
  const rootRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = rootRef.current;
    const graphEl = graphRef.current;
    const infoEl = infoRef.current;
    if (!rootEl || !graphEl || !infoEl) return;

    const st: Record<string, ShowStatus> = {};
    D.shows.forEach(([n, s]) => (st[n] = s));
    const liked = (s: string) => ["fav", "re", "once"].includes(st[s]);
    const col: Record<Mode, string> = {
      themes: "#5DCAA5",
      creators: "#EF9F27",
      networks: "#85B7EB",
    };
    const lbl: Record<ShowStatus, string> = {
      fav: "favorite",
      re: "rewatch",
      once: "loved once",
      fine: "fine",
      unfin: "didn't finish",
      no: "dropped",
    };
    const W = 1000;
    let H = 760;
    const svg = d3.select(graphEl).append("svg");
    const root = svg.append("g");
    let sim: d3.Simulation<GNode, GLink> | undefined;
    let focus: string | null = null;
    let mode: Mode = "themes";
    let nodeSel: d3.Selection<SVGGElement, GNode, SVGGElement, unknown> | undefined;
    let linkSel: d3.Selection<SVGLineElement, ResolvedLink, SVGGElement, unknown>;
    let data: { nodes: GNode[]; links: ResolvedLink[] };

    svg.on("click", () => {
      focus = null;
      paint();
      setInfo();
    });

    function setInfo(t?: string) {
      infoEl!.textContent = t || DEFAULT_INFO;
    }
    function rad(s?: ShowStatus) {
      return s === "fav" ? 11 : s === "re" ? 7.5 : s === "no" ? 6 : 5.5;
    }
    function build() {
      const nodes: GNode[] = D.shows.map(([id, s]) => ({ id, type: "show", s }));
      const links: GLink[] = [];
      Object.entries(D[mode]).forEach(([h, m]) => {
        if (m.length < 2) return;
        nodes.push({ id: h, type: mode });
        m.forEach((x) => links.push({ source: h, target: x, kind: mode }));
      });
      D.spins.forEach(([a, b]) => links.push({ source: a, target: b, kind: "spin" }));
      return { nodes, links };
    }
    function render() {
      if (sim) sim.stop();
      root.selectAll("*").remove();
      const built = build();
      // forceLink resolves source/target ids to node objects in place
      data = built as unknown as typeof data;
      // Taller canvas and stronger centering keep nodes off the edges
      H = Math.max(800, Math.round(500 + data.nodes.length * 4.5));
      svg.attr("viewBox", `0 0 ${W} ${H}`);
      linkSel = root
        .append("g")
        .selectAll<SVGLineElement, ResolvedLink>("line")
        .data(data.links)
        .join("line")
        .attr("stroke", (d) => (d.kind === "spin" ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.16)"))
        .attr("stroke-width", (d) => (d.kind === "spin" ? 1.2 : 0.8))
        .attr("stroke-dasharray", (d) => (d.kind === "spin" ? "4 4" : null));
      const g = root
        .append("g")
        .selectAll<SVGGElement, GNode>("g")
        .data(data.nodes)
        .join("g")
        .style("cursor", "pointer")
        .on("click", (e: MouseEvent, d) => {
          e.stopPropagation();
          focus = d.id;
          paint();
          describe(d);
        })
        .on("mouseenter", (_e, d) => {
          if (focus) return;
          describe(d);
        });
      g.each(function (d) {
        const el = d3.select(this);
        if (d.type !== "show") {
          el.append("rect").attr("x", -6).attr("y", -6).attr("width", 12).attr("height", 12).attr("rx", 2).attr("fill", col[d.type]);
          return;
        }
        const c = el.append("circle").attr("r", rad(d.s));
        if (d.s === "fav") c.attr("fill", "#7F77DD");
        else if (d.s === "re") c.attr("fill", "#AFA9EC");
        else if (d.s === "once") c.attr("fill", "#3C3489").attr("stroke", "#AFA9EC").attr("stroke-width", 1);
        else if (d.s === "fine") c.attr("fill", "#888780");
        else if (d.s === "unfin") c.attr("fill", "#141414").attr("stroke", "#888780").attr("stroke-width", 1.2).attr("stroke-dasharray", "2 2");
        else c.attr("fill", "#E24B4A");
      });
      g.append("text")
        .text((d) => d.id)
        .attr("x", (d) => (d.type === "show" ? rad(d.s) + 4 : 10))
        .attr("y", 4)
        .style("font-size", (d) => (d.type === "show" ? "12px" : "13px"))
        .style("font-weight", (d) => (d.type !== "show" || d.s === "fav" ? 600 : 400))
        .style("fill", (d) =>
          d.type !== "show" ? col[d.type] : ["fav", "re"].includes(d.s!) ? "#f2f0ea" : "#9a978f"
        )
        .style("pointer-events", "none");
      nodeSel = g;
      sim = d3
        .forceSimulation<GNode, GLink>(data.nodes)
        .force(
          "link",
          d3
            .forceLink<GNode, GLink>(built.links)
            .id((d) => d.id)
            .distance((d) => (d.kind === "spin" ? 34 : 60))
            .strength(0.45)
        )
        .force("charge", d3.forceManyBody().strength(-130))
        .force("x", d3.forceX(W / 2).strength(0.07))
        .force("y", d3.forceY(H / 2).strength(0.07))
        .force("collide", d3.forceCollide<GNode>((d) => (d.type === "show" ? 18 : 16)))
        .on("tick", () => {
          data.nodes.forEach((d) => {
            const maxX = d.type === "themes" ? W - 170 : W - 80;
            d.x = Math.max(14, Math.min(maxX, d.x!));
            d.y = Math.max(14, Math.min(H - 14, d.y!));
          });
          linkSel
            .attr("x1", (d) => d.source.x!)
            .attr("y1", (d) => d.source.y!)
            .attr("x2", (d) => d.target.x!)
            .attr("y2", (d) => d.target.y!);
          nodeSel!.attr("transform", (d) => `translate(${d.x},${d.y})`);
        });
      rootEl!
        .querySelectorAll<HTMLButtonElement>("button[data-m]")
        .forEach((b) => b.classList.toggle("on", b.dataset.m === mode));
      paint();
    }
    function nbrs(id: string) {
      const s = new Set([id]);
      data.links.forEach((l) => {
        if (l.source.id === id) s.add(l.target.id);
        if (l.target.id === id) s.add(l.source.id);
      });
      return s;
    }
    function paint() {
      if (!nodeSel) return;
      if (!focus) {
        nodeSel.style("opacity", 1);
        linkSel.style("opacity", 1);
        return;
      }
      const n = nbrs(focus);
      nodeSel.style("opacity", (d) => (n.has(d.id) ? 1 : 0.12));
      linkSel.style("opacity", (l) => (l.source.id === focus || l.target.id === focus ? 1 : 0.04));
    }
    function describe(d: GNode) {
      if (d.type === "show") {
        const hs = data.links.filter((l) => l.kind !== "spin" && l.target.id === d.id).map((l) => l.source.id);
        const sp = data.links
          .filter((l) => l.kind === "spin" && (l.source.id === d.id || l.target.id === d.id))
          .map((l) => (l.source.id === d.id ? l.target.id : l.source.id));
        setInfo(
          d.id + " (" + lbl[d.s!] + "). " +
            (hs.length ? "Connected to " + hs.join(", ") : "No shared hub in this view") +
            (sp.length ? ". Spinoff link with " + sp.join(", ") : "") + "."
        );
      } else {
        const m = [...nbrs(d.id)].filter((x) => x !== d.id);
        const l = m.filter(liked).length,
          no = m.filter((x) => st[x] === "no").length;
        setInfo(d.id + " connects " + m.length + " shows. " + l + " liked, " + no + " dropped.");
      }
    }

    const buttons = rootEl.querySelectorAll<HTMLButtonElement>("button[data-m]");
    const onButton = (e: Event) => {
      e.stopPropagation();
      mode = (e.currentTarget as HTMLButtonElement).dataset.m as Mode;
      focus = null;
      setInfo();
      render();
    };
    buttons.forEach((b) => b.addEventListener("click", onButton));
    render();

    return () => {
      if (sim) sim.stop();
      buttons.forEach((b) => b.removeEventListener("click", onButton));
      svg.remove();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.widget}>
      <div className={styles.controls}>
        <button data-m="themes" className="on">Themes</button>
        <button data-m="creators">Creators</button>
        <button data-m="networks">Networks</button>
      </div>
      <div className={styles.legend}>
        <span><span className={styles.dot} style={{ width: 12, height: 12, background: "#7F77DD" }} />Favorite</span>
        <span><span className={styles.dot} style={{ width: 10, height: 10, background: "#AFA9EC" }} />Rewatch</span>
        <span><span className={styles.dot} style={{ width: 8, height: 8, background: "#3C3489", border: "1px solid #AFA9EC" }} />Loved once</span>
        <span><span className={styles.dot} style={{ width: 8, height: 8, background: "#888780" }} />Fine</span>
        <span><span className={styles.dot} style={{ width: 8, height: 8, border: "1px dashed #888780" }} />Didn&apos;t finish</span>
        <span><span className={styles.dot} style={{ width: 8, height: 8, background: "#E24B4A" }} />Dropped</span>
        <span><span className={styles.sq} style={{ background: "#5DCAA5" }} />Theme</span>
        <span><span className={styles.sq} style={{ background: "#EF9F27" }} />Creator</span>
        <span><span className={styles.sq} style={{ background: "#85B7EB" }} />Network</span>
        <span>- - - Spinoff</span>
      </div>
      <div ref={graphRef} className={styles.graph} />
      <div ref={infoRef} className={styles.info}>{DEFAULT_INFO}</div>
      <div className={styles.note}>
        Real ratings and connections. Show, creator and network names are replaced with placeholders.
      </div>
    </div>
  );
}
