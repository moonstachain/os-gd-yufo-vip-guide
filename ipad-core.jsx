/* global React */
const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================
   图标（极简线性，几何构成）
   ============================================================ */
const Icon = {
  search: (p) => (<svg viewBox="0 0 24 24" width={p.s||18} height={p.s||18} fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4" strokeLinecap="round"/></svg>),
  sound: (p) => (<svg viewBox="0 0 24 24" width={p.s||18} height={p.s||18} fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 9v6h3l5 4V5L7 9H4z" strokeLinejoin="round"/><path d="M16 8.5a4 4 0 010 7M18.5 6a7.5 7.5 0 010 12" strokeLinecap="round"/></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" width={p.s||18} height={p.s||18} fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  back: (p) => (<svg viewBox="0 0 24 24" width={p.s||18} height={p.s||18} fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  lock: (p) => (<svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>),
  edit: (p) => (<svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 20h4L19 9l-4-4L4 16v4z" strokeLinejoin="round"/></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  spark: (p) => (<svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" strokeLinecap="round"/><circle cx="12" cy="12" r="2.4"/></svg>),
  mic: (p) => (<svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3" strokeLinecap="round"/></svg>),
  lamp: (p) => (<svg viewBox="0 0 24 24" width={p.s||18} height={p.s||18} fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3c-3 0-5 2.2-5 5 0 2.2 1.3 3.6 2.2 4.6.5.6.8 1.1.8 1.9h4c0-.8.3-1.3.8-1.9C15.7 11.6 17 10.2 17 8c0-2.8-2-5-5-5z"/><path d="M9.5 18h5M10.5 21h3" strokeLinecap="round"/></svg>),
  seat: (p) => (<svg viewBox="0 0 24 24" width={p.s||18} height={p.s||18} fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 4l2 3.5L18 8l-3 2.8.8 4.2L12 13l-3.8 2 .8-4.2L6 8l4-.5L12 4z" strokeLinejoin="round"/></svg>),
  scroll: (p) => (<svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="6" y="4" width="12" height="16" rx="1.5"/><path d="M9 9h6M9 12h6M9 15h4" strokeLinecap="round"/></svg>),
  shield: (p) => (<svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round"/></svg>),
  cal: (p) => (<svg viewBox="0 0 24 24" width={p.s||15} height={p.s||15} fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4" strokeLinecap="round"/></svg>),
};

/* ============================================================
   家族功德档案（演示数据）—— 沈府
   ============================================================ */
const FAMILY = {
  id: "YF-0087", title: "沈府", patron: "沈廷璋", firstYear: 2019,
  steward: "释德正", stewardYears: 5,
  members: [
    { n: "沈廷璋", r: "功德主 · 护持居士", note: "寿诞 农历八月十六" },
    { n: "王淑芬", r: "夫人", note: "" },
    { n: "沈知微", r: "长女 · 拟传承人", note: "学业回向" },
    { n: "沈知行", r: "长子", note: "" },
    { n: "周　氏", r: "先慈 · 回向", note: "忌日 农历七月初九", memorial: true },
  ],
  offerings: [
    { name: "长明灯", where: "大雄宝殿 · 释迦牟尼佛", code: "YF-DX-A03-02", status: "供奉中", until: "2026.12.31", jade: true },
    { name: "家族莲位", where: "往生堂 · 西序", code: "YF-WS-L11", status: "供奉中", until: "长期", jade: true },
    { name: "平安灯", where: "观音殿 · A区 15排", code: "YF-GY-A15-04", status: "即将到期", until: "剩 18 天", warn: true },
  ],
  amount: "286,400", lastVisit: "2025.腊月廿三",
  memorials: ["先慈周氏忌日 · 七月初九", "沈廷璋寿诞 · 八月十六"],
};

/* 顶部七幕 */
const ACTS = ["迎请", "发愿", "择供", "安位", "点亮", "托付", "长伴"];

/* ============================================================
   顶部陈设
   ============================================================ */
function Furniture({ step, face, setFace, paper }) {
  const [now, setNow] = useState("");
  useEffect(() => {
    const t = () => setNow(new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }));
    t(); const id = setInterval(t, 1000 * 20); return () => clearInterval(id);
  }, []);
  return (
    <div className="furniture">
      <div className="brand">
        <div className={"seal" + (paper ? " on-paper" : "")}>佛</div>
        <div className="brand-tt"><b>玉佛禅寺</b><span>觉群 · 智慧供灯</span></div>
      </div>
      <div className="acts">
        {ACTS.map((a, i) => (
          <div key={a} className={"act " + (i < step ? "done" : i === step ? "now" : "todo")}>
            <span className="act-dot" />{a}
          </div>
        ))}
      </div>
      <div className="crumb-right">
        <div className="face-toggle">
          <button className={face === "show" ? "active" : ""} onClick={() => setFace("show")}>展示面</button>
          <button className={face === "op" ? "active" : ""} onClick={() => setFace("op")}>操作面</button>
        </div>
        <div className="kt-chip"><span className="kt-ava">德</span>知客 · 释德正</div>
        <div className="clock num">{now}</div>
      </div>
    </div>
  );
}

/* 底部操作条 */
function ActionBar({ onBack, onNext, nextLabel = "继续引导", nextEnabled = true, hint, backLabel = "上一步" }) {
  return (
    <div className="actions">
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {onBack && (<button className="btn-text" onClick={onBack}><Icon.back s={15} />{backLabel}</button>)}
        {hint && <span style={{ fontSize: 12.5, opacity: 0.5, letterSpacing: "0.06em" }}>{hint}</span>}
      </div>
      {onNext && (
        <button className="btn btn-gold" disabled={!nextEnabled} onClick={onNext}>
          {nextLabel}<Icon.arrow s={17} />
        </button>
      )}
    </div>
  );
}

/* 操作面抽屉：知客师专用（金额/收款/备注） */
function OperatorDrawer({ open, onClose }) {
  return (
    <>
      <div className={"op-scrim" + (open ? " open" : "")} onClick={onClose} />
      <div className={"op-drawer thin-scroll" + (open ? " open" : "")}>
        <div style={{ padding: "20px 22px 14px", borderBottom: "1px solid var(--hairline)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Icon.lock s={15} /><b style={{ fontSize: 14, letterSpacing: "0.16em" }}>操作面 · 仅知客师可见</b>
          </div>
          <button className="btn-text" onClick={onClose} style={{ opacity: 0.7 }}>收起 ›</button>
        </div>
        <div className="thin-scroll" style={{ flex: 1, overflowY: "auto", padding: "18px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
          <OpBlock label="家族累计功德金" value={"¥ " + FAMILY.amount} sub={"自 " + FAMILY.firstYear + " 年结缘 · 前 1% 重点家族"} />
          <div className="gold-rule" style={{ opacity: 0.4 }} />
          <OpRow k="本次供奉合计" v="¥ 36,800" />
          <OpRow k="长明灯 · 全年" v="¥ 19,800" />
          <OpRow k="家族莲位回向" v="¥ 9,000" />
          <OpRow k="盂兰盆法会回向" v="¥ 8,000" />
          <div className="gold-rule" style={{ opacity: 0.4 }} />
          <div style={{ fontSize: 12.5, letterSpacing: "0.1em", opacity: 0.6 }}>收款方式</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["现场扫码", "对公转账", "挂账客堂"].map((m, i) => (
              <span key={m} className={"pill " + (i === 0 ? "gold" : "")} style={{ fontSize: 11.5 }}>{m}</span>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12.5, letterSpacing: "0.1em", opacity: 0.6, marginBottom: 8 }}>内部备注</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.85, background: "rgba(255,255,255,0.04)", border: "1px solid var(--hairline)", borderRadius: 8, padding: "12px 14px" }}>
              重视私密，勿在展示面显示金额；先慈周氏忌日临近，建议法会回向优先。客群标签：家族功德主 · 企业护持。
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button className="btn btn-ghost" style={{ flex: 1, fontSize: 12.5, padding: "10px 0", justifyContent: "center" }}>改单 / 退单</button>
            <button className="btn btn-ghost" style={{ flex: 1, fontSize: 12.5, padding: "10px 0", justifyContent: "center" }}>转交同事</button>
          </div>
        </div>
      </div>
    </>
  );
}
function OpBlock({ label, value, sub }) {
  return (
    <div>
      <div style={{ fontSize: 12, letterSpacing: "0.1em", opacity: 0.55 }}>{label}</div>
      <div className="num" style={{ fontSize: 34, color: "var(--gold-300)", margin: "3px 0 4px" }}>{value}</div>
      <div style={{ fontSize: 11.5, opacity: 0.5 }}>{sub}</div>
    </div>
  );
}
function OpRow({ k, v }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 13.5 }}>
      <span style={{ opacity: 0.7 }}>{k}</span><span className="num" style={{ fontSize: 16, color: "var(--paper-100)" }}>{v}</span>
    </div>
  );
}

Object.assign(window, { React, useState, useEffect, useRef, useCallback, Icon, FAMILY, ACTS, Furniture, ActionBar, OperatorDrawer });
