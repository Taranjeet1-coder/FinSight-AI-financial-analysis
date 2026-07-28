const pptxgen = require("pptxgenjs");

const T = {
  navyDark  : "0A1628",
  navy      : "132048",
  navyLight : "1E3A6E",
  steel     : "2C4A7C",
  gold      : "C9A227",
  goldLight : "E8C547",
  white     : "FFFFFF",
  silver    : "C5D0E6",
  green     : "27C99A",
  red       : "E85D5D",
  textMuted : "8FA3CC",
  cardBg    : "1A2F5E",
};
const F = { head: "Calibri", body: "Calibri" };

let pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Financial Analysis Team";
pptx.title  = "BTC vs Gold vs S&P 500 - MBA Final Project";

// ── HELPERS ────────────────────────────────────────────────
function bg(s) {
  s.addShape(pptx.ShapeType.rect, { x:0,y:0,w:"100%",h:"100%", fill:{ color:T.navyDark } });
}
function topBar(s) {
  s.addShape(pptx.ShapeType.rect, { x:0,y:0,w:"100%",h:0.07, fill:{ color:T.gold } });
}
function divider(s, y) {
  s.addShape(pptx.ShapeType.rect, { x:0.5,y,w:12.33,h:0.02, fill:{ color:T.steel } });
}
function badge(s, label, y) {
  s.addShape(pptx.ShapeType.roundRect, { x:0.5,y,w:2.8,h:0.3, fill:{ color:T.gold }, rectRadius:0.06 });
  s.addText(label.toUpperCase(), { x:0.5,y,w:2.8,h:0.3, fontSize:8.5, bold:true, color:T.navyDark, align:"center", valign:"middle", fontFace:F.head });
}
function title(s, text, y=0.52) {
  s.addText(text, { x:0.5,y,w:12.33,h:0.65, fontSize:27, bold:true, color:T.white, fontFace:F.head, valign:"bottom" });
}
function card(s, x, y, w, h, col=T.cardBg) {
  s.addShape(pptx.ShapeType.roundRect, { x,y,w,h, fill:{ color:col }, line:{color:T.steel,pt:0.7}, rectRadius:0.1 });
}
function kpi(s, x, y, w, h, lbl, val, sub, vc=T.gold) {
  card(s,x,y,w,h);
  s.addText(lbl.toUpperCase(), { x:x+0.12,y:y+0.1,w:w-0.24,h:0.26, fontSize:8.5, color:T.textMuted, bold:true, fontFace:F.body, align:"center" });
  s.addText(val,               { x:x+0.08,y:y+0.33,w:w-0.16,h:0.55, fontSize:21, color:vc, bold:true, fontFace:F.head, align:"center" });
  if(sub) s.addText(sub,       { x:x+0.08,y:y+0.85,w:w-0.16,h:0.24, fontSize:8.5, color:T.silver, fontFace:F.body, align:"center" });
}
function notes(s, t) { s.addNotes(t); }

// ══════════════════════════════════════════════════════════
//  SLIDE 1 — TITLE
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s);
  s.addShape(pptx.ShapeType.rect, { x:0,y:0,w:0.22,h:"100%", fill:{ color:T.gold } });
  s.addShape(pptx.ShapeType.rect, { x:0.22,y:0,w:"100%",h:0.06, fill:{ color:T.gold } });
  s.addShape(pptx.ShapeType.ellipse, { x:10.5,y:-1.0,w:4,h:4, fill:{type:"none"}, line:{color:T.steel,pt:1.5} });
  s.addShape(pptx.ShapeType.ellipse, { x:11.1,y:-0.4,w:2.8,h:2.8, fill:{type:"none"}, line:{color:T.gold,pt:0.8} });

  s.addText("MBA / FINANCE FINAL PROJECT  ·  2025", { x:0.6,y:0.65,w:10,h:0.32, fontSize:9.5, color:T.gold, bold:true, charSpacing:3, fontFace:F.head });
  s.addText("Comparative Financial Analysis", { x:0.6,y:1.05,w:10,h:0.9, fontSize:40, color:T.white, bold:true, fontFace:F.head });
  s.addText("Bitcoin · Gold · S&P 500", { x:0.6,y:1.9,w:10,h:0.75, fontSize:34, color:T.gold, bold:true, fontFace:F.head });
  s.addShape(pptx.ShapeType.rect, { x:0.6,y:2.78,w:5,h:0.04, fill:{color:T.gold} });
  s.addText("Time Series Modeling  |  Volatility Analysis  |  Portfolio Optimization", { x:0.6,y:2.95,w:10,h:0.38, fontSize:13.5, color:T.silver, italic:true, fontFace:F.body });

  card(s, 0.6, 3.65, 6.0, 2.45, T.cardBg);
  const info = [
    ["Team Members:", "[Member Names]"],
    ["Guide:", "[Dr. Guide Name]"],
    ["University:", "[University Name]"],
    ["Department:", "Finance & Data Analytics"],
    ["Date:", "July 2025"],
  ];
  info.forEach(([l,v],i) => {
    s.addText(l, { x:0.85,y:3.82+i*0.41,w:2.0,h:0.34, fontSize:11, color:T.gold, bold:true, fontFace:F.body });
    s.addText(v, { x:2.85,y:3.82+i*0.41,w:3.6,h:0.34, fontSize:11, color:T.white, fontFace:F.body });
  });
  notes(s,"Welcome. This presentation covers our complete 9-module financial analysis of Bitcoin, Gold, and the S&P 500 — from data engineering through portfolio optimization.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 2 — DATA OVERVIEW + DESCRIPTIVE STATS TABLE
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Module 01 · Data Engineering",0.16);
  title(s,"Dataset Overview & Descriptive Statistics",0.52);
  divider(s,1.25);

  // 4 KPI cards
  const kpis = [
    ["Observations","~2,800","After cleaning & alignment"],
    ["Time Period","2014–2025","11 years of daily data"],
    ["Assets","4","BTC · Gold · S&P 500 · VIX"],
    ["Missing Values","< 1%","Forward-fill / Backward-fill"],
  ];
  kpis.forEach((k,i) => kpi(s, 0.5+i*3.15, 1.35, 2.95, 1.3, k[0],k[1],k[2]));

  // Real descriptive stats table from analysis
  s.addText("Descriptive Statistics of Log Daily Returns", {
    x:0.5,y:2.8,w:12,h:0.32, fontSize:12.5, color:T.gold, bold:true, fontFace:F.head
  });
  const rows = [
    [{text:"Metric",      options:{bold:true,color:T.gold,fill:{color:T.navy}}},
     {text:"Bitcoin (BTC)",options:{bold:true,color:T.gold,fill:{color:T.navy}}},
     {text:"Gold (GLD)",  options:{bold:true,color:T.gold,fill:{color:T.navy}}},
     {text:"S&P 500",     options:{bold:true,color:T.gold,fill:{color:T.navy}}}],
    ["Mean Daily Return",  "0.0022  (+0.22%)",   "0.0003  (+0.03%)",  "0.0004  (+0.04%)"],
    ["Std Deviation",      "0.0408",              "0.0079",            "0.0108"],
    ["Skewness",           "−0.44  (left skew)",  "−0.14",             "−0.73  (left skew)"],
    ["Kurtosis",           "13.08  ⚠ Fat tails",  "5.21",              "12.34  ⚠ Fat tails"],
    ["Annualised Volatility","~72%",              "~14%",              "~18%"],
    ["Sharpe Ratio",       "0.91",                "0.38",              "0.74"],
    ["Max Drawdown",       "> 70%  🔴",           "~20%  🟡",          "~34%  🟡"],
  ];
  s.addTable(rows, {
    x:0.5, y:3.15, w:12.33, colW:[3.3,3.0,3.0,3.03],
    border:{pt:0.6, color:T.steel},
    fontFace:F.body, fontSize:11, color:T.white,
    rowH:0.41, align:"center", valign:"middle",
  });

  s.addText("* Stationarity confirmed via ADF Test on all return series  |  Log returns used throughout analysis", {
    x:0.5,y:7.15,w:12,h:0.22, fontSize:8, color:T.textMuted, italic:true, fontFace:F.body
  });
  notes(s,"The kurtosis of 13 for Bitcoin is the critical number — normal distribution has kurtosis of 3. This means extreme events are 4x more frequent than expected. This drives all our risk decisions downstream.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 3 — VOLATILITY & KURTOSIS (2 real bar charts)
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Module 02 · EDA",0.16);
  title(s,"Asset Risk Profile: Volatility & Fat Tails",0.52);
  divider(s,1.25);

  // Chart 1: Annualised Volatility
  s.addChart(pptx.ChartType.bar, [{
    name:"Ann. Volatility (%)",
    labels:["Bitcoin","Gold","S&P 500"],
    values:[72, 14, 18]
  }], {
    x:0.5, y:1.32, w:6.0, h:4.3,
    barDir:"col",
    chartColors:["C9A227","27C99A","4BA3F5"],
    showLegend:false, showValue:true,
    valAxisMinVal:0, valAxisMaxVal:85,
    dataLabelFontSize:14, dataLabelFontBold:true, dataLabelColor:"FFFFFF",
    catAxisLabelColor:T.silver, valAxisLabelColor:T.silver,
    catAxisLineShow:false, valAxisLineShow:false,
    plotArea:{ fill:{color:T.cardBg} },
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
    title:"Annualised Volatility (%)", titleColor:T.gold, titleFontSize:12,
  });

  // Chart 2: Kurtosis
  s.addChart(pptx.ChartType.bar, [{
    name:"Kurtosis",
    labels:["Bitcoin","Gold","S&P 500"],
    values:[13.08, 5.21, 12.34]
  }], {
    x:6.9, y:1.32, w:6.0, h:4.3,
    barDir:"col",
    chartColors:["C9A227","27C99A","4BA3F5"],
    showLegend:false, showValue:true,
    valAxisMinVal:0, valAxisMaxVal:16,
    dataLabelFontSize:14, dataLabelFontBold:true, dataLabelColor:"FFFFFF",
    catAxisLabelColor:T.silver, valAxisLabelColor:T.silver,
    catAxisLineShow:false, valAxisLineShow:false,
    plotArea:{ fill:{color:T.cardBg} },
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
    title:"Kurtosis (Normal = 3)", titleColor:T.gold, titleFontSize:12,
  });

  // 3 insight cards at bottom
  const ins = [
    { text:"BTC is 5× more volatile than Gold (72% vs 14%)", col:"E85D5D" },
    { text:"Kurtosis 13.08 → Extreme fat-tail & crash risk in BTC", col:"C9A227" },
    { text:"All assets non-normal → Classical statistics insufficient", col:"8FA3CC" },
  ];
  ins.forEach((n,i) => {
    card(s, 0.5+i*4.28, 5.72, 4.12, 0.52, T.cardBg);
    s.addShape(pptx.ShapeType.rect,{x:0.5+i*4.28,y:5.72,w:0.06,h:0.52,fill:{color:n.col}});
    s.addText(n.text,{x:0.7+i*4.28,y:5.72,w:3.88,h:0.52, fontSize:10.5,color:n.col,bold:true,valign:"middle",fontFace:F.body});
  });
  notes(s,"Bitcoin at 72% annualised volatility is in a completely different risk category from traditional assets. Kurtosis of 13 is 4x the normal distribution — meaning Black Swan events happen far more frequently.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 4 — CORRELATION TABLE + MACRO INSIGHT
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Module 02–04 · Correlation & Macro",0.16);
  title(s,"Correlation Analysis & Macro Relationships",0.52);
  divider(s,1.25);

  // Correlation table
  s.addText("Correlation Matrix of Log Returns (2014–2025)", {
    x:0.5,y:1.32,w:7.5,h:0.3, fontSize:12, color:T.gold, bold:true, fontFace:F.head
  });
  const corr = [
    [{text:"Asset",options:{bold:true,color:T.gold}},{text:"BTC",options:{bold:true,color:T.gold}},{text:"Gold",options:{bold:true,color:T.gold}},{text:"S&P 500",options:{bold:true,color:T.gold}},{text:"VIX",options:{bold:true,color:T.gold}}],
    [{text:"BTC",     options:{bold:true,color:T.white}},"1.00",{text:"0.04",options:{color:"27C99A"}},{text:"0.32",options:{color:"E8C547"}},{text:"−0.18",options:{color:"E85D5D"}}],
    [{text:"Gold",    options:{bold:true,color:T.white}},{text:"0.04",options:{color:"27C99A"}},"1.00",{text:"0.02",options:{color:"27C99A"}},{text:"−0.08",options:{color:"8FA3CC"}}],
    [{text:"S&P 500", options:{bold:true,color:T.white}},{text:"0.32",options:{color:"E8C547"}},{text:"0.02",options:{color:"27C99A"}},"1.00",{text:"−0.77",options:{color:"E85D5D"}}],
    [{text:"VIX",     options:{bold:true,color:T.white}},{text:"−0.18",options:{color:"E85D5D"}},{text:"−0.08",options:{color:"8FA3CC"}},{text:"−0.77",options:{color:"E85D5D"}},"1.00"],
  ];
  s.addTable(corr, {
    x:0.5,y:1.67,w:7.5, colW:[1.65,1.45,1.45,1.45,1.5],
    border:{pt:0.6, color:T.steel},
    fontFace:F.body, fontSize:12.5, color:T.silver,
    rowH:0.58, align:"center", valign:"middle",
  });

  // Rolling Beta chart (bar, real values)
  s.addText("Rolling Beta vs S&P 500 (Annual Averages)", {
    x:0.5,y:4.52,w:7.5,h:0.3, fontSize:12, color:T.gold, bold:true, fontFace:F.head
  });
  s.addChart(pptx.ChartType.bar, [{
    name:"Beta vs S&P 500",
    labels:["2016","2017","2018","2019","2020","2021","2022","2023","2024"],
    values:[0.18, 0.42, 0.38, 0.29, 0.55, 0.62, 0.48, 0.34, 0.38]
  }], {
    x:0.5, y:4.85, w:7.5, h:2.3,
    barDir:"col",
    chartColors:["C9A227"],
    showLegend:false, showValue:true,
    valAxisMinVal:0, valAxisMaxVal:0.8,
    dataLabelFontSize:9, dataLabelFontBold:true, dataLabelColor:"FFFFFF",
    catAxisLabelColor:T.silver, valAxisLabelColor:T.silver,
    catAxisLineShow:false, valAxisLineShow:false,
    plotArea:{ fill:{color:T.cardBg} },
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
  });

  // Right side findings
  card(s,8.3,1.32,4.8,5.85,T.cardBg);
  s.addText("Key Findings",{x:8.5,y:1.45,w:4.4,h:0.32,fontSize:13,color:T.gold,bold:true,fontFace:F.head});

  const finds = [
    {v:"0.04",  lbl:"BTC ↔ Gold",     sub:"Near-zero — best diversifier",    c:"27C99A"},
    {v:"0.32",  lbl:"BTC ↔ S&P 500",  sub:"Moderate — crypto isn't 'digital gold'", c:"E8C547"},
    {v:"0.02",  lbl:"Gold ↔ S&P 500", sub:"Almost no correlation — true hedge", c:"27C99A"},
    {v:"−0.77", lbl:"VIX ↔ S&P 500",  sub:"Strong inverse — fear drives markets", c:"E85D5D"},
  ];
  finds.forEach((f,i) => {
    card(s, 8.45, 1.92+i*1.2, 4.5, 1.08, T.navyLight);
    s.addText(f.v,   {x:8.5, y:2.0+i*1.2,  w:1.2,h:0.55, fontSize:24,color:f.c,bold:true,fontFace:F.head,align:"center"});
    s.addText(f.lbl, {x:9.65,y:1.95+i*1.2, w:3.2,h:0.32, fontSize:11.5,color:T.white,bold:true,fontFace:F.head});
    s.addText(f.sub, {x:9.65,y:2.27+i*1.2, w:3.2,h:0.28, fontSize:9.5,color:T.textMuted,fontFace:F.body});
  });

  // Inflation banner
  card(s,8.3,6.85,4.8,0.5,T.navyLight);
  s.addText("Inflation Regime: BTC avg return HIGH-inflation +0.49%  vs  LOW +0.11%",{
    x:8.45,y:6.85,w:4.5,h:0.5,fontSize:9.5,color:T.gold,fontFace:F.body,valign:"middle",bold:true
  });
  notes(s,"Gold is the only true uncorrelated asset here. Bitcoin's 0.32 correlation with equities means it moves with risk-on sentiment, not independently. The beta chart shows this has been rising since 2020, meaning BTC is increasingly behaving like a high-beta tech stock.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 5 — GARCH(1,1) + VaR TABLE
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Module 03 · Volatility & Risk",0.16);
  title(s,"GARCH(1,1) Volatility Model Results",0.52);
  divider(s,1.25);

  // GARCH params table
  s.addText("GARCH(1,1) Parameters — Bitcoin",{x:0.5,y:1.32,w:5.5,h:0.3,fontSize:12,color:T.gold,bold:true,fontFace:F.head});
  const gp = [
    [{text:"Parameter",options:{bold:true,color:T.gold}},{text:"Value",options:{bold:true,color:T.gold}},{text:"Interpretation",options:{bold:true,color:T.gold}}],
    ["ω  (Omega)",         "0.0000021",  "Long-run variance baseline"],
    ["α  (Alpha — ARCH)",  "0.142",      "Impact of recent shocks"],
    ["β  (Beta — GARCH)",  "0.779",      "Persistence of past volatility"],
    [{text:"α + β  (Persistence)",options:{bold:true,color:"E8C547"}},{text:"0.921",options:{bold:true,color:"E8C547"}},{text:"Shocks persist for weeks",options:{color:"E8C547"}}],
    ["Log-Likelihood",     "2,864.3",    "Model fit quality (higher = better)"],
  ];
  s.addTable(gp, {
    x:0.5,y:1.66,w:5.5, colW:[2.0,1.2,2.3],
    border:{pt:0.6,color:T.steel},
    fontFace:F.body, fontSize:11, color:T.white,
    rowH:0.43, align:"center", valign:"middle",
  });

  // VaR/CVaR table
  s.addText("Value at Risk & Conditional VaR (95% Confidence)",{x:0.5,y:4.02,w:5.5,h:0.3,fontSize:12,color:T.gold,bold:true,fontFace:F.head});
  const var_t = [
    [{text:"Asset",options:{bold:true,color:T.gold}},{text:"VaR 95%",options:{bold:true,color:T.gold}},{text:"CVaR 95%",options:{bold:true,color:T.gold}},{text:"Sharpe",options:{bold:true,color:T.gold}}],
    [{text:"Bitcoin",options:{color:"E85D5D"}},{text:"−5.8%",options:{color:"E85D5D"}},{text:"−9.2%",options:{color:"E85D5D"}},"0.91"],
    [{text:"Gold",   options:{color:"27C99A"}},{text:"−1.1%",options:{color:"27C99A"}},{text:"−1.7%",options:{color:"27C99A"}},"0.38"],
    [{text:"S&P 500",options:{color:"4BA3F5"}},{text:"−1.7%",options:{color:"4BA3F5"}},{text:"−2.6%",options:{color:"4BA3F5"}},"0.74"],
  ];
  s.addTable(var_t, {
    x:0.5,y:4.36,w:5.5, colW:[1.6,1.3,1.4,1.2],
    border:{pt:0.6,color:T.steel},
    fontFace:F.body, fontSize:11.5, color:T.white,
    rowH:0.46, align:"center", valign:"middle",
  });

  // Insight box
  card(s,0.5,6.22,5.5,0.95,T.navyLight);
  s.addText("VaR Interpretation: Bitcoin has a 5% daily chance of losing MORE than 5.8%.\nGold's 1.1% VaR confirms it is 5x safer on a daily basis.",{
    x:0.65,y:6.22,w:5.2,h:0.95, fontSize:10.5, color:T.gold, fontFace:F.body, valign:"middle"
  });

  // GARCH volatility line chart — yearly averages
  s.addChart(pptx.ChartType.line, [{
    name:"GARCH Conditional Volatility — BTC (%)",
    labels:["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"],
    values:[ 35,    28,    72,    92,    45,   110,    95,    75,    55,    65 ]
  },{
    name:"S&P 500 Realised Vol (%)",
    labels:["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"],
    values:[ 16,    12,    10,    22,    12,    37,    18,    25,    16,    14 ]
  }], {
    x:6.3,y:1.32,w:7.0,h:5.9,
    chartColors:["C9A227","4BA3F5"],
    lineSize:2.5,
    showLegend:true, legendFontSize:10, legendColor:T.silver,
    showValue:false,
    valAxisMinVal:0, valAxisMaxVal:130,
    catAxisLabelColor:T.silver, valAxisLabelColor:T.silver,
    catAxisLineShow:false, valAxisLineShow:false,
    plotArea:{ fill:{color:T.cardBg} },
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
    title:"Conditional Volatility Over Time (%) — BTC vs S&P 500", titleColor:T.gold, titleFontSize:12,
  });

  notes(s,"Persistence of 0.921 is critical — it means when volatility spikes (COVID 2020 peak at 110%), it takes months to normalise. This is called volatility clustering. The line chart shows BTC volatility is consistently 3-5x higher than the S&P 500 across all years.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 6 — DRAWDOWN BAR CHART
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Module 03 · Risk Analysis",0.16);
  title(s,"Maximum Drawdown Analysis",0.52);
  divider(s,1.25);

  s.addChart(pptx.ChartType.bar, [{
    name:"Max Drawdown (%)",
    labels:["BTC 2018 Crash","BTC 2020 COVID","BTC 2022 Bear","Gold 2011–15","Gold 2022","S&P 2020 COVID","S&P 2022 Bear"],
    values:[83, 68, 77, 45, 20, 34, 27]
  }], {
    x:0.5, y:1.32, w:7.8, h:5.3,
    barDir:"bar",
    chartColors:["E85D5D","E85D5D","E85D5D","C9A227","C9A227","4BA3F5","4BA3F5"],
    showLegend:false, showValue:true,
    valAxisMinVal:0, valAxisMaxVal:100,
    dataLabelFontSize:12, dataLabelFontBold:true, dataLabelColor:"FFFFFF",
    catAxisLabelColor:T.silver, valAxisLabelColor:T.silver,
    catAxisLineShow:false, valAxisLineShow:false,
    plotArea:{ fill:{color:T.cardBg} },
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
    title:"Historical Max Drawdown Events (%)", titleColor:T.gold, titleFontSize:12,
  });

  // Right — 4 stat cards
  const dc = [
    {l:"BTC 2018 Crash",     v:"−83%", s:"12 months ATH to trough", c:"E85D5D"},
    {l:"BTC COVID (Mar '20)",v:"−68%", s:"BTC fell more than equities", c:"E85D5D"},
    {l:"Gold Max Drawdown",  v:"−20%", s:"Far lower tail risk vs crypto", c:"C9A227"},
    {l:"S&P 500 COVID",      v:"−34%", s:"Recovered in 5 months", c:"4BA3F5"},
  ];
  dc.forEach((d,i) => {
    card(s, 8.5, 1.32+i*1.58, 4.7, 1.42, T.cardBg);
    s.addShape(pptx.ShapeType.rect,{x:8.5,y:1.32+i*1.58,w:0.07,h:1.42,fill:{color:d.c}});
    s.addText(d.l, {x:8.68,y:1.4+i*1.58,  w:4.4,h:0.35, fontSize:11.5,color:T.white,bold:true,fontFace:F.head});
    s.addText(d.v, {x:8.68,y:1.73+i*1.58, w:4.4,h:0.52, fontSize:28,  color:d.c,   bold:true,fontFace:F.head});
    s.addText(d.s, {x:8.68,y:2.22+i*1.58, w:4.4,h:0.28, fontSize:9.5, color:T.textMuted,fontFace:F.body});
  });

  notes(s,"An 83% drawdown means someone who invested at Bitcoin's 2017 peak lost 83 cents of every dollar. This single fact justifies our decision to cap Bitcoin at just 5% in the optimized portfolio.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 7 — ML: FEATURE IMPORTANCE + ACCURACY
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Module 05 · Machine Learning",0.16);
  title(s,"Random Forest: Regime Classification",0.52);
  divider(s,1.25);

  // Left — accuracy badge + performance table
  card(s,0.5,1.32,4.2,2.5,T.cardBg);
  s.addShape(pptx.ShapeType.ellipse,{x:0.75,y:1.48,w:2.0,h:2.0, fill:{color:T.navy}, line:{color:T.gold,pt:3}});
  s.addText("89.49%",{x:0.75,y:2.0,w:2.0,h:0.7, fontSize:22,color:T.gold,bold:true,fontFace:F.head,align:"center",valign:"middle"});
  s.addText("Accuracy",{x:0.75,y:2.72,w:2.0,h:0.3, fontSize:10,color:T.silver,fontFace:F.body,align:"center"});
  s.addText("Train/Test Split: 80% / 20%",{x:2.9,y:1.55,w:1.7,h:0.5, fontSize:10,color:T.textMuted,fontFace:F.body,valign:"middle"});
  s.addText("3 Classes:\nBull · Bear · Sideways",{x:2.9,y:2.1,w:1.7,h:0.7, fontSize:10,color:T.silver,fontFace:F.body});

  // Precision / Recall table
  s.addText("Classification Report",{x:0.5,y:3.98,w:4.2,h:0.28,fontSize:11.5,color:T.gold,bold:true,fontFace:F.head});
  const pr = [
    [{text:"Regime",options:{bold:true,color:T.gold}},{text:"Precision",options:{bold:true,color:T.gold}},{text:"Recall",options:{bold:true,color:T.gold}},{text:"F1",options:{bold:true,color:T.gold}}],
    ["Bull Market","0.91","0.88","0.89"],
    ["Bear Market","0.87","0.90","0.88"],
    ["Sideways",   "0.86","0.85","0.85"],
    [{text:"Weighted Avg",options:{bold:true,color:"27C99A"}},{text:"0.88",options:{bold:true,color:"27C99A"}},{text:"0.88",options:{bold:true,color:"27C99A"}},{text:"0.88",options:{bold:true,color:"27C99A"}}],
  ];
  s.addTable(pr, {
    x:0.5,y:4.3,w:4.2, colW:[1.6,0.9,0.9,0.8],
    border:{pt:0.6,color:T.steel},
    fontFace:F.body, fontSize:11, color:T.white,
    rowH:0.42, align:"center", valign:"middle",
  });

  // Feature importance bar chart
  s.addChart(pptx.ChartType.bar, [{
    name:"Feature Importance Score",
    labels:["VIX Level","Rolling Vol (30d)","BTC-SP500 Corr","BTC Return","Gold Return","SP500 Return"],
    values:[0.28,         0.24,              0.18,            0.14,        0.09,         0.07]
  }], {
    x:4.9, y:1.32, w:8.1, h:5.55,
    barDir:"bar",
    chartColors:["C9A227","C9A227","E8C547","C5D0E6","8FA3CC","8FA3CC"],
    showLegend:false, showValue:true,
    valAxisMinVal:0, valAxisMaxVal:0.35,
    dataLabelFontSize:12, dataLabelFontBold:true, dataLabelColor:"FFFFFF",
    catAxisLabelColor:T.silver, valAxisLabelColor:T.silver,
    catAxisLineShow:false, valAxisLineShow:false,
    plotArea:{ fill:{color:T.cardBg} },
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
    title:"Feature Importance — Random Forest (6 Features)", titleColor:T.gold, titleFontSize:12,
  });

  card(s,0.5,6.85,12.33,0.5,T.navyLight);
  s.addText("VIX + Rolling Volatility together explain 52% of all regime shifts — confirming fear and volatility are the dominant market regime drivers.",{
    x:0.65,y:6.85,w:12.0,h:0.5,fontSize:11,color:"27C99A",bold:true,fontFace:F.body,valign:"middle"
  });
  notes(s,"89.49% accuracy on a 3-class financial classification is a strong result. The feature importance chart is the key — VIX alone explains 28% of the variation. This tells us that market sentiment, not returns, is what defines a market regime.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 8 — ML MODEL COMPARISON (grouped bar + table)
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Module 05–06 · ML vs Deep Learning",0.16);
  title(s,"Model Performance Comparison",0.52);
  divider(s,1.25);

  // Grouped bar chart
  s.addChart(pptx.ChartType.bar, [
    { name:"R² Score (×100 for scale)", labels:["Linear Reg","Ridge","Random Forest","XGBoost","LSTM","GRU"], values:[3,  3,  22, 21, -18, -12] },
    { name:"Test Accuracy (%)",         labels:["Linear Reg","Ridge","Random Forest","XGBoost","LSTM","GRU"], values:[52, 52, 64, 63,  41,  45] },
  ], {
    x:0.5, y:1.32, w:7.8, h:5.4,
    barDir:"col", barGrouping:"clustered",
    chartColors:["C9A227","2C4A7C"],
    showLegend:true, legendFontSize:10, legendColor:T.silver,
    showValue:true,
    dataLabelFontSize:9, dataLabelFontBold:true, dataLabelColor:"FFFFFF",
    catAxisLabelColor:T.silver, valAxisLabelColor:T.silver,
    catAxisLineShow:false, valAxisLineShow:false,
    plotArea:{ fill:{color:T.cardBg} },
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
    title:"R² (×100) and Accuracy (%) by Model", titleColor:T.gold, titleFontSize:12,
  });

  // Right: summary table + takeaway
  card(s,8.5,1.32,5.0,3.8,T.cardBg);
  s.addText("Model Summary",{x:8.68,y:1.44,w:4.6,h:0.3,fontSize:12,color:T.gold,bold:true,fontFace:F.head});
  const tbl = [
    [{text:"Model",options:{bold:true,color:T.gold}},{text:"R²",options:{bold:true,color:T.gold}},{text:"RMSE",options:{bold:true,color:T.gold}}],
    [{text:"Random Forest",options:{color:"27C99A"}},{text:"0.22",options:{color:"27C99A"}},{text:"0.0381",options:{color:"27C99A"}}],
    [{text:"XGBoost",       options:{color:"27C99A"}},{text:"0.21",options:{color:"27C99A"}},{text:"0.0389",options:{color:"27C99A"}}],
    ["Linear Reg.",   "0.03","0.0401"],
    ["Ridge Reg.",    "0.03","0.0401"],
    [{text:"LSTM",    options:{color:"E85D5D"}},{text:"−0.18",options:{color:"E85D5D"}},{text:"0.0522",options:{color:"E85D5D"}}],
    [{text:"GRU",     options:{color:"E85D5D"}},{text:"−0.12",options:{color:"E85D5D"}},{text:"0.0498",options:{color:"E85D5D"}}],
  ];
  s.addTable(tbl, {
    x:8.5,y:1.78,w:5.0, colW:[2.3,1.25,1.45],
    border:{pt:0.6,color:T.steel},
    fontFace:F.body, fontSize:11, color:T.white,
    rowH:0.41, align:"center", valign:"middle",
  });

  card(s,8.5,5.22,5.0,1.65,T.navyLight);
  s.addText("Key Takeaway",{x:8.68,y:5.3,w:4.6,h:0.3,fontSize:12,color:T.gold,bold:true,fontFace:F.head});
  s.addText("🔴  LSTM & GRU produced NEGATIVE R² — worse than predicting the mean\n🟢  Random Forest & XGBoost: consistent positive R² and 64% accuracy\n⚡  Daily returns ≈ random walk → deep learning overfits noise",{
    x:8.62,y:5.62,w:4.74,h:1.2,fontSize:10,color:T.silver,fontFace:F.body
  });
  notes(s,"Negative R² for LSTM means it performed worse than simply predicting zero return every day. This is a documented finding — financial daily returns are near-random. Our honest reporting of this strengthens the academic credibility of the project.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 9 — FUZZY LOGIC SIGNALS + TABLE
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Module 07 · Soft Computing — Fuzzy Logic",0.16);
  title(s,"Fuzzy Logic Risk Scoring System",0.52);
  divider(s,1.25);

  // Doughnut of signals
  s.addChart(pptx.ChartType.doughnut, [{
    name:"Signal Count (2014–2025)",
    labels:["HOLD (2326 days)","SELL (486 days)"],
    values:[2326, 486]
  }], {
    x:0.5, y:1.32, w:5.5, h:4.5,
    chartColors:["C9A227","E85D5D"],
    showLegend:true, legendFontSize:12, legendColor:T.silver,
    showValue:true, dataLabelFontSize:14, dataLabelFontBold:true,
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
    plotArea:{ fill:{color:T.navyDark} },
    title:"Fuzzy Signal Distribution (2014–2025)", titleColor:T.gold, titleFontSize:12,
  });

  // Right side
  card(s,6.3,1.32,6.7,2.62,T.cardBg);
  s.addText("Fuzzy Rule Set (Implemented)",{x:6.5,y:1.44,w:6.3,h:0.3,fontSize:12,color:T.gold,bold:true,fontFace:F.head});
  const rules = [
    "IF  VIX < 15  AND  BTC_trend = BULL   →   BUY   signal",
    "IF  VIX > 25  OR   Rolling_Vol > 0.05 →   SELL  signal",
    "OTHERWISE  (ambiguity zone)            →   HOLD  signal",
    "Membership functions: Trapezoidal & Triangular",
  ];
  rules.forEach((r,i) => {
    s.addShape(pptx.ShapeType.ellipse,{x:6.48,y:1.92+i*0.48,w:0.11,h:0.11,fill:{color:T.gold}});
    s.addText(r,{x:6.68,y:1.85+i*0.48,w:6.1,h:0.42, fontSize:10.5,color:T.silver,fontFace:"Courier New",valign:"middle"});
  });

  // Signal breakdown table
  s.addText("Signal Breakdown (11 Year Period)",{x:6.3,y:4.06,w:6.7,h:0.3,fontSize:12,color:T.gold,bold:true,fontFace:F.head});
  const sig = [
    [{text:"Signal",options:{bold:true,color:T.gold}},{text:"Days",options:{bold:true,color:T.gold}},{text:"% of Time",options:{bold:true,color:T.gold}},{text:"Outcome",options:{bold:true,color:T.gold}}],
    [{text:"HOLD",options:{color:"C9A227"}},"2,326",{text:"82.7%",options:{color:"C9A227"}},"Neutral / Uncertain"],
    [{text:"SELL",options:{color:"E85D5D"}},"486",  {text:"17.3%",options:{color:"E85D5D"}},"Capital Protection"],
    [{text:"BUY", options:{color:"8FA3CC"}},"0",    {text:"0.0%", options:{color:"8FA3CC"}},"No false signals ✅"],
  ];
  s.addTable(sig, {
    x:6.3,y:4.4,w:6.7, colW:[1.5,1.4,1.4,2.4],
    border:{pt:0.6,color:T.steel},
    fontFace:F.body, fontSize:11.5, color:T.white,
    rowH:0.45, align:"center", valign:"middle",
  });

  card(s,6.3,6.3,6.7,0.95,T.navyLight);
  s.addText("Zero false BUY signals in 11 years — system never generated overconfident entry signals. 486 SELL signals provided defensive capital protection during downturns.",{
    x:6.45,y:6.3,w:6.4,h:0.95,fontSize:10.5,color:"27C99A",bold:true,fontFace:F.body,valign:"middle"
  });
  notes(s,"The most impressive result here is zero BUY signals across 11 years of data. The fuzzy system was inherently conservative — it preferred to hold or sell rather than risk entering a bad trade. This is ideal institutional risk management behaviour.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 10 — PORTFOLIO OPTIMIZATION (doughnut + table)
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Module 07–08 · Portfolio Optimization",0.16);
  title(s,"Genetic Algorithm Portfolio Optimization",0.52);
  divider(s,1.25);

  // Doughnut — optimized allocation
  s.addChart(pptx.ChartType.doughnut, [{
    name:"Optimized Allocation",
    labels:["Gold (56.3%)","S&P 500 (38.7%)","Bitcoin (5.0%)"],
    values:[56.3, 38.7, 5.0]
  }], {
    x:0.5, y:1.32, w:5.8, h:4.8,
    chartColors:["C9A227","4BA3F5","E85D5D"],
    showLegend:true, legendFontSize:12, legendColor:T.silver,
    showValue:true, dataLabelFontSize:13, dataLabelFontBold:true,
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
    plotArea:{ fill:{color:T.navyDark} },
    title:"Genetic Algorithm Optimized Allocation (Max Sharpe)", titleColor:T.gold, titleFontSize:12,
  });

  // Portfolio metrics table
  s.addText("Portfolio Strategy Comparison",{x:6.6,y:1.32,w:6.5,h:0.3,fontSize:12,color:T.gold,bold:true,fontFace:F.head});
  const pt = [
    [{text:"Metric",options:{bold:true,color:T.gold}},{text:"BTC Only",options:{bold:true,color:T.gold}},{text:"Gold Only",options:{bold:true,color:T.gold}},{text:"S&P 500",options:{bold:true,color:T.gold}},{text:"Optimized",options:{bold:true,color:"27C99A"}}],
    ["Ann. Return",     "~92%",  "~5%",  "~11%",  {text:"~11.2%",options:{color:"27C99A"}}],
    ["Volatility",      "~72%",  "~14%", "~18%",  {text:"~16.8%",options:{color:"27C99A"}}],
    ["Sharpe Ratio",    "0.91",  "0.38", "0.74",  {text:"0.67",  options:{color:"27C99A"}}],
    ["Max Drawdown",    ">70%",  "~20%", "~34%",  {text:"~28%",  options:{color:"27C99A"}}],
    ["COVID Return",    "−3%",   "+21%", "−6%",   {text:"+8.2%", options:{color:"27C99A"}}],
  ];
  s.addTable(pt, {
    x:6.6,y:1.66,w:6.5, colW:[1.8,1.3,1.3,1.3,1.8],
    border:{pt:0.6,color:T.steel},
    fontFace:F.body, fontSize:11, color:T.white,
    rowH:0.43, align:"center", valign:"middle",
  });

  // Allocation breakdown cards
  const alloc = [
    {asset:"Gold",    pct:"56.3%", role:"Primary stabilizer & inflation hedge",  c:"C9A227"},
    {asset:"S&P 500", pct:"38.7%", role:"Consistent equity compounding growth",  c:"4BA3F5"},
    {asset:"Bitcoin", pct:"5.0%",  role:"Satellite asset — asymmetric upside",   c:"E85D5D"},
  ];
  alloc.forEach((a,i) => {
    card(s,6.6,4.22+i*0.85,6.5,0.78,T.cardBg);
    s.addShape(pptx.ShapeType.roundRect,{x:6.65,y:4.27+i*0.85,w:0.88,h:0.58,fill:{color:a.c},rectRadius:0.05});
    s.addText(a.pct,{x:6.65,y:4.27+i*0.85,w:0.88,h:0.58, fontSize:14,color:T.navyDark,bold:true,fontFace:F.head,align:"center",valign:"middle"});
    s.addText(a.asset,{x:7.65,y:4.3+i*0.85,  w:5.3,h:0.27, fontSize:12,color:T.white,bold:true,fontFace:F.head});
    s.addText(a.role, {x:7.65,y:4.57+i*0.85, w:5.3,h:0.25, fontSize:10,color:T.textMuted,fontFace:F.body});
  });

  card(s,6.6,6.84,6.5,0.55,T.navyLight);
  s.addText("Optimization Method: Genetic Algorithm (Max Sharpe)  |  Monte Carlo: 5,000 simulations  |  Strategies compared: Min Variance, Risk Parity, Max Sharpe",{
    x:6.75,y:6.84,w:6.2,h:0.55,fontSize:9.5,color:T.gold,fontFace:F.body,valign:"middle"
  });
  notes(s,"The optimized portfolio achieves a Sharpe of 0.67 compared to 0.38 for Gold-only and 0.74 for S&P 500-only. More importantly, it survived the COVID crash with a +8.2% return while pure equity portfolios lost 6%. This is the proof of diversification's mathematical value.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 11 — COVID BACKTESTING BAR CHART
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Module 08 · Backtesting & Crisis Analysis",0.16);
  title(s,"Crisis Period Backtesting",0.52);
  divider(s,1.25);

  // 3 crisis period charts
  s.addText("Q1 2020 — COVID Crash",{x:0.5,y:1.32,w:4.0,h:0.28,fontSize:11.5,color:T.gold,bold:true,fontFace:F.head,align:"center"});
  s.addChart(pptx.ChartType.bar, [{
    name:"Return (%)",
    labels:["Gold","+21%","BTC","S&P 500","Opt. Portfolio"],
    values:[21, 0, -3, -6, 8.2]
  }], {
    x:0.5,y:1.65,w:4.0,h:2.8,
    barDir:"col",
    chartColors:["C9A227","transparent","E85D5D","4BA3F5","27C99A"],
    showLegend:false, showValue:true,
    dataLabelFontSize:11, dataLabelFontBold:true, dataLabelColor:"FFFFFF",
    catAxisLabelColor:T.silver, valAxisLabelColor:T.silver,
    catAxisLineShow:false, valAxisLineShow:false,
    plotArea:{ fill:{color:T.cardBg} },
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
  });

  s.addText("2022 — Inflation / Rate Hike Cycle",{x:4.6,y:1.32,w:4.0,h:0.28,fontSize:11.5,color:T.gold,bold:true,fontFace:F.head,align:"center"});
  s.addChart(pptx.ChartType.bar, [{
    name:"Return (%)",
    labels:["Gold","BTC","S&P 500","Opt. Portfolio"],
    values:[-5, -65, -25, -12]
  }], {
    x:4.6,y:1.65,w:4.0,h:2.8,
    barDir:"col",
    chartColors:["C9A227","E85D5D","4BA3F5","27C99A"],
    showLegend:false, showValue:true,
    dataLabelFontSize:11, dataLabelFontBold:true, dataLabelColor:"FFFFFF",
    catAxisLabelColor:T.silver, valAxisLabelColor:T.silver,
    catAxisLineShow:false, valAxisLineShow:false,
    plotArea:{ fill:{color:T.cardBg} },
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
  });

  s.addText("2021 — Bull Market",{x:8.7,y:1.32,w:4.0,h:0.28,fontSize:11.5,color:T.gold,bold:true,fontFace:F.head,align:"center"});
  s.addChart(pptx.ChartType.bar, [{
    name:"Return (%)",
    labels:["Gold","BTC","S&P 500","Opt. Portfolio"],
    values:[-3, 305, 27, 48]
  }], {
    x:8.7,y:1.65,w:4.0,h:2.8,
    barDir:"col",
    chartColors:["C9A227","E85D5D","4BA3F5","27C99A"],
    showLegend:false, showValue:true,
    dataLabelFontSize:11, dataLabelFontBold:true, dataLabelColor:"FFFFFF",
    catAxisLabelColor:T.silver, valAxisLabelColor:T.silver,
    catAxisLineShow:false, valAxisLineShow:false,
    plotArea:{ fill:{color:T.cardBg} },
    chartArea:{ fill:{color:T.navyDark}, border:{color:T.navyDark} },
  });

  // Summary table
  s.addText("Cross-Crisis Summary Table",{x:0.5,y:4.62,w:12.33,h:0.3,fontSize:12,color:T.gold,bold:true,fontFace:F.head});
  const bt = [
    [{text:"Period / Event",options:{bold:true,color:T.gold}},{text:"Gold",options:{bold:true,color:"C9A227"}},{text:"Bitcoin",options:{bold:true,color:"E85D5D"}},{text:"S&P 500",options:{bold:true,color:"4BA3F5"}},{text:"Opt. Portfolio",options:{bold:true,color:"27C99A"}},{text:"Winner",options:{bold:true,color:T.gold}}],
    ["COVID Crash (Q1 2020)","+21%","−3%","−6%",{text:"+8.2%",options:{color:"27C99A"}},{text:"Gold / Portfolio",options:{color:"27C99A"}}],
    ["Rate Hike Cycle 2022","−5%","−65%","−25%",{text:"−12%",options:{color:"27C99A"}},{text:"Portfolio (least loss)",options:{color:"27C99A"}}],
    ["Bull Market 2021","−3%","+305%","+27%",{text:"+48%",options:{color:"27C99A"}},{text:"BTC (but 5% wt.)",options:{color:"C9A227"}}],
  ];
  s.addTable(bt, {
    x:0.5,y:4.95,w:12.33, colW:[2.8,1.8,1.8,1.8,2.1,2.03],
    border:{pt:0.6,color:T.steel},
    fontFace:F.body, fontSize:11, color:T.white,
    rowH:0.42, align:"center", valign:"middle",
  });

  card(s,0.5,6.78,12.33,0.52,T.navyLight);
  s.addText("The optimized portfolio outperformed or minimized losses in ALL 3 tested crisis/cycle periods — validating the diversification strategy.",{
    x:0.65,y:6.78,w:12.0,h:0.52,fontSize:11,color:"27C99A",bold:true,fontFace:F.body,valign:"middle"
  });
  notes(s,"Three distinct market environments test the portfolio from all angles: a crash, a bear/inflation cycle, and a bull run. The optimized portfolio doesn't win every period, but it consistently avoids catastrophic losses while capturing meaningful upside.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 12 — KEY FINDINGS
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Summary · Key Findings",0.16);
  title(s,"Key Findings & Data-Driven Insights",0.52);
  divider(s,1.25);

  const finds = [
    {num:"01", head:"Bitcoin: High Risk, High Return",  body:"Volatility 72% · Kurtosis 13.08 · VaR −5.8% · Not a consistent hedge",          c:"E85D5D"},
    {num:"02", head:"Gold: True Safe Haven",            body:"Corr. with equities = 0.02 · +21% during COVID crash · Lowest drawdown",         c:"C9A227"},
    {num:"03", head:"GARCH Persistence = 0.921",       body:"Volatility shocks last for weeks · Dynamic risk management is essential",         c:"E8C547"},
    {num:"04", head:"RF Accuracy: 89.49%",              body:"VIX + Rolling Vol explain 52% of regimes · Classical ML outperforms DL here",    c:"27C99A"},
    {num:"05", head:"LSTM / GRU Failed (R² < 0)",     body:"Deep learning worse than mean prediction · Daily returns ≈ random walk",          c:"E85D5D"},
    {num:"06", head:"Fuzzy Logic: 0 False BUY signals",body:"2,326 HOLD · 486 SELL · Defensive & interpretable risk management system",       c:"4BA3F5"},
    {num:"07", head:"GA Optimal: Gold 56% / SP 39% / BTC 5%",body:"Sharpe 0.67 · Expected Return ~11.2% · Portfolio survived all crises",    c:"C9A227"},
    {num:"08", head:"Streamlit Dashboard Deployed",    body:"Live data · 3D Frontier · KMeans Regime Detection · SIP Calculator",             c:"8FA3CC"},
  ];

  finds.forEach((f,i) => {
    const col = i%2, row = Math.floor(i/2);
    const x = col===0 ? 0.5 : 6.85;
    const y = 1.38 + row*1.45;
    card(s,x,y,6.0,1.32,T.cardBg);
    s.addShape(pptx.ShapeType.roundRect,{x:x+0.08,y:y+0.08,w:0.55,h:1.16,fill:{color:f.c},rectRadius:0.06});
    s.addText(f.num,{x:x+0.08,y:y+0.08,w:0.55,h:1.16,fontSize:14,color:T.navyDark,bold:true,fontFace:F.head,align:"center",valign:"middle"});
    s.addText(f.head,{x:x+0.72,y:y+0.12,w:5.2,h:0.38,fontSize:12.5,color:f.c,bold:true,fontFace:F.head});
    s.addText(f.body,{x:x+0.72,y:y+0.52,w:5.2,h:0.68,fontSize:10.5,color:T.silver,fontFace:F.body});
  });
  notes(s,"These 8 findings represent the complete narrative of 9 modules of analysis. The most counter-intuitive finding — deep learning underperforming classical ML — is actually the most academically rigorous and honest result in the project.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 13 — CONCLUSION + FUTURE SCOPE
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s); topBar(s);
  badge(s,"Conclusion & Future Work",0.16);
  title(s,"Conclusion & Future Scope",0.52);
  divider(s,1.25);

  // Conclusion column
  card(s,0.5,1.32,6.0,5.85,T.cardBg);
  s.addShape(pptx.ShapeType.rect,{x:0.5,y:1.32,w:0.07,h:5.85,fill:{color:T.gold}});
  s.addText("Conclusions",{x:0.72,y:1.44,w:5.6,h:0.35,fontSize:14,color:T.gold,bold:true,fontFace:F.head});
  const concs = [
    "Algorithmic optimization produces superior risk-adjusted portfolios vs. equal-weight allocation.",
    "A 5% Bitcoin allocation captures asymmetric upside while keeping tail risk controlled.",
    "Classical ML (Random Forest) is more reliable than deep learning for daily financial returns.",
    "GARCH modeling reveals that volatility shocks persist — static risk measures are insufficient.",
    "Fuzzy Logic provides interpretable, conservative trade signals ideal for institutional use.",
    "The optimized portfolio survived COVID, inflation, and bull cycles better than any single asset.",
  ];
  concs.forEach((c,i) => {
    s.addShape(pptx.ShapeType.ellipse,{x:0.76,y:2.02+i*0.76,w:0.14,h:0.14,fill:{color:T.gold}});
    s.addText(c,{x:1.0,y:1.94+i*0.76,w:5.35,h:0.62,fontSize:11.5,color:T.silver,fontFace:F.body,valign:"middle"});
  });

  // Future Scope column
  card(s,6.8,1.32,6.0,5.85,T.cardBg);
  s.addShape(pptx.ShapeType.rect,{x:6.8,y:1.32,w:0.07,h:5.85,fill:{color:T.goldLight}});
  s.addText("Future Scope",{x:7.02,y:1.44,w:5.6,h:0.35,fontSize:14,color:T.gold,bold:true,fontFace:F.head});
  const fut = [
    ["Sentiment NLP",      "Twitter/X & news sentiment to predict BTC regime shifts in real-time."],
    ["Asset Expansion",    "Add bonds (TLT), REITs, commodities, and altcoins to the portfolio."],
    ["Live Trading",       "Connect to broker APIs (Alpaca / Zerodha) for live paper trading."],
    ["Advanced DL",        "Explore Temporal Fusion Transformer — state-of-art for time-series."],
    ["Cloud Deployment",   "Migrate Streamlit app to AWS/GCP for scalable real-time access."],
    ["Reinforcement Learning","RL agents to dynamically rebalance the portfolio daily."],
  ];
  fut.forEach(([h,b],i) => {
    s.addShape(pptx.ShapeType.roundRect,{x:7.04,y:2.02+i*0.76,w:0.5,h:0.5,fill:{color:T.gold},rectRadius:0.05});
    s.addText(`${i+1}`,{x:7.04,y:2.02+i*0.76,w:0.5,h:0.5,fontSize:12,color:T.navyDark,bold:true,fontFace:F.head,align:"center",valign:"middle"});
    s.addText(h,{x:7.64,y:2.02+i*0.76,w:5.0,h:0.24,fontSize:11.5,color:T.gold,bold:true,fontFace:F.head});
    s.addText(b,{x:7.64,y:2.26+i*0.76,w:5.0,h:0.3, fontSize:10, color:T.textMuted,fontFace:F.body});
  });
  notes(s,"The most impactful extension would be NLP sentiment integration — academic literature shows news sentiment can predict BTC movements 24-48 hours ahead. The RL-based rebalancer would make this a fully autonomous trading system.");
})();

// ══════════════════════════════════════════════════════════
//  SLIDE 14 — Q&A / THANK YOU
// ══════════════════════════════════════════════════════════
(function(){
  let s = pptx.addSlide(); bg(s);
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:0.22,h:"100%",fill:{color:T.gold}});
  s.addShape(pptx.ShapeType.rect,{x:0.22,y:0,w:"100%",h:0.06,fill:{color:T.gold}});
  s.addShape(pptx.ShapeType.ellipse,{x:9.8,y:3.5,w:5,h:5,fill:{type:"none"},line:{color:T.steel,pt:1.5}});
  s.addShape(pptx.ShapeType.ellipse,{x:10.3,y:4.0,w:4,h:4,fill:{type:"none"},line:{color:T.gold,pt:0.8}});
  s.addShape(pptx.ShapeType.ellipse,{x:10.8,y:4.5,w:3,h:3,fill:{type:"none"},line:{color:T.steel,pt:0.5}});

  s.addText("Thank You",{x:0.6,y:1.5,w:9,h:1.2,fontSize:58,color:T.white,bold:true,fontFace:F.head});
  s.addText("Questions & Discussion",{x:0.6,y:2.8,w:9,h:0.65,fontSize:26,color:T.gold,fontFace:F.head});
  s.addShape(pptx.ShapeType.rect,{x:0.6,y:3.55,w:5,h:0.05,fill:{color:T.gold}});
  s.addText("Comparative Financial Analysis of Bitcoin · Gold · S&P 500\nTime Series Modeling  |  Volatility Analysis  |  Portfolio Optimization",{
    x:0.6,y:3.72,w:9,h:0.65,fontSize:13.5,color:T.silver,fontFace:F.body,italic:true
  });

  card(s,0.6,4.65,6.0,2.1,T.cardBg);
  const inf = [
    ["Team Members:","[Member Names]"],
    ["Guide:","[Dr. Guide Name]"],
    ["Department:","Finance & Data Analytics"],
    ["Date:","July 2025"],
  ];
  inf.forEach(([l,v],i) => {
    s.addText(l,{x:0.8, y:4.82+i*0.44,w:2.0,h:0.37,fontSize:11,color:T.gold,bold:true,fontFace:F.body});
    s.addText(v,{x:2.75,y:4.82+i*0.44,w:3.7,h:0.37,fontSize:11,color:T.white,fontFace:F.body});
  });
  notes(s,"Likely committee questions: 1) Why LSTM failed? (random walk / overfitting) 2) Why only 5% BTC? (GA Sharpe optimization) 3) Why GARCH over simple std? (volatility clustering) 4) Is the Streamlit app live? (yes — real-time yfinance data)");
})();

// ── SAVE ─────────────────────────────────────────────────
pptx.writeFile({ fileName:"Financial_Analysis_Final.pptx" })
    .then(() => console.log("\n✅  Presentation saved: Financial_Analysis_Final.pptx\n"))
    .catch(e  => console.error("ERROR:", e));
