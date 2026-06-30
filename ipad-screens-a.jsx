/* global React, Icon, FAMILY */
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

/* ============================================================
   第一幕 · 迎请 —— 家族识别与概览
   ============================================================ */
function ScreenWelcome({ go, ctx }) {
  const [phase, setPhase] = useState(ctx.identified ? "found" : "search");
  const [q, setQ] = useState("");
  const identify = () => { ctx.identified = true; setPhase("loading"); setTimeout(() => setPhase("found"), 900); };

  if (phase === "search" || phase === "loading") {
    return (
      <div className="scene" style={{ alignItems: "center", justifyContent: "center" }}>
        <div className="paper-grain" style={{ position: "absolute", inset: 0 }} />
        <Halo />
        <div className="fade-rise" style={{ position: "relative", textAlign: "center", maxWidth: 560, padding: "0 40px" }}>
          <div className="kicker" style={{ marginBottom: 22 }}>迎　请</div>
          <div style={{ fontFamily: "var(--kai)", fontSize: 40, letterSpacing: "0.12em", lineHeight: 1.5, color: "var(--paper-50)" }}>
            知客检索府上<br />恭迎贵宾回寺
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 2, opacity: 0.6, margin: "20px auto 34px", maxWidth: 420 }}>
            以姓名、手机后四位或家族号检索家族功德档案；新贵宾可即时建档。识别后不在屏面显示金额明细。
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center", background: "rgba(255,255,255,0.05)", border: "1px solid var(--hairline)", borderRadius: 99, padding: "6px 6px 6px 20px", maxWidth: 480, margin: "0 auto" }}>
            <Icon.search s={20} />
            <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="沈廷璋 / 8866 / YF-0087"
              style={{ background: "transparent", border: 0, padding: "12px 0", flex: 1 }}
              onKeyDown={(e) => e.key === "Enter" && identify()} />
            <button className="btn btn-gold" style={{ padding: "12px 26px" }} onClick={identify}>
              {phase === "loading" ? "检索中…" : "检索"}
            </button>
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 22, fontSize: 12.5, opacity: 0.5 }}>
            <button className="btn-text" onClick={identify}>＋ 为新贵宾建档</button>
            <span>·</span><span>离场自动锁屏清场</span>
          </div>
        </div>
      </div>
    );
  }

  // found
  return (
    <div className="scene">
      <div className="paper-grain" style={{ position: "absolute", inset: 0 }} />
      <div className="body" style={{ padding: "4px 34px 0", gap: 26 }}>
        {/* 左：迎请词 */}
        <div className="fade-rise" style={{ flex: "0 0 372px", display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: 8 }}>
          <div className="kicker" style={{ marginBottom: 16 }}>第一幕 · 迎　请</div>
          <div style={{ fontFamily: "var(--kai)", fontSize: 50, lineHeight: 1.35, color: "var(--paper-50)", letterSpacing: "0.06em" }}>
            沈府<br /><span style={{ fontSize: 31, opacity: 0.85 }}>欢迎回到玉佛禅寺</span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 2.05, opacity: 0.66, marginTop: 22, maxWidth: 330 }}>
            府上自 <span className="num" style={{ color: "var(--gold-300)" }}>2019</span> 年与寺结缘，
            对口知客 <b style={{ color: "var(--gold-200)", fontWeight: 500 }}>释德正</b> 已照应六载。
            上次回寺 <span className="num">{FAMILY.lastVisit}</span>。
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 22 }}>
            {FAMILY.memorials.map((m) => (
              <span key={m} className="pill gold"><Icon.cal s={13} />{m}</span>
            ))}
          </div>
        </div>
        {/* 右：家族概览 */}
        <div className="fade-rise" style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 14, paddingTop: 14, paddingBottom: 8, minHeight: 0, animationDelay: ".12s" }}>
          <div style={{ display: "flex", gap: 14 }}>
            <StatCard k="家族成员" v="5" sub="含传承人 沈知微" />
            <StatCard k="在供奉项" v="2" sub="长明灯 · 家族莲位" jade />
            <StatCard k="即将到期" v="1" sub="观音殿平安灯 · 18 天" warn />
            <StatCard k="家族号" v="YF-0087" small sub="一户一档 · 不串号" />
          </div>
          <div className="card paper-grain thin-scroll" style={{ padding: "16px 20px", overflowY: "auto", minHeight: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <b style={{ fontSize: 14, letterSpacing: "0.14em", color: "var(--ink-800)" }}>家族供奉概览</b>
              <span style={{ fontSize: 11.5, color: "var(--ink-500)", display: "flex", alignItems: "center", gap: 6 }}><Icon.shield s={13} />隐私模式 · 金额隐去</span>
            </div>
            {FAMILY.offerings.map((o) => (
              <div key={o.code} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderTop: "1px solid rgba(138,109,59,0.18)" }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, display: "grid", placeItems: "center", color: "var(--gold-700)", background: "rgba(200,164,77,0.12)" }}><Icon.lamp s={18} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, color: "var(--ink-900)", fontWeight: 500 }}>{o.name}<span style={{ fontWeight: 400, opacity: 0.55, marginLeft: 10, fontSize: 13 }}>{o.where}</span></div>
                  <div className="num" style={{ fontSize: 12, color: "var(--ink-400)", letterSpacing: "0.1em" }}>{o.code}</div>
                </div>
                <span className={"pill " + (o.warn ? "warn" : "jade")}>{o.status}</span>
                <span className="num" style={{ fontSize: 13, color: "var(--ink-500)", width: 86, textAlign: "right" }}>{o.until}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function StatCard({ k, v, sub, jade, warn, small }) {
  return (
    <div className="card paper-grain" style={{ flex: 1, padding: "13px 16px" }}>
      <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--ink-500)" }}>{k}</div>
      <div className="num" style={{ fontSize: small ? 21 : 33, color: warn ? "var(--cinnabar)" : jade ? "var(--jade)" : "var(--gold-700)", margin: "2px 0", lineHeight: 1.1 }}>{v}</div>
      <div style={{ fontSize: 11, color: "var(--ink-400)", lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}
function Halo() {
  return (
    <div style={{ position: "absolute", top: "44%", left: "50%", transform: "translate(-50%,-50%)", width: 620, height: 620, pointerEvents: "none" }}>
      <div className="lamp-glow" style={{ position: "absolute", inset: 0, opacity: 0.16, animation: "glowPulse 5s ease-in-out infinite" }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", inset: 80 + i * 90, borderRadius: "50%", border: "1px solid var(--hairline)", opacity: 0.4 - i * 0.1 }} />
      ))}
    </div>
  );
}

/* ============================================================
   第二幕 · 发愿 —— 口语心愿 → AI 庄重祈福文
   ============================================================ */
const WISH_RAW = "想为母亲身体好一点，也保佑孩子读书顺利";
const BLESSINGS = [
  { tone: "回向 · 先慈", text: "愿以此供灯功德，回向先慈沈母王太夫人，身心安康、福慧增长、远离病苦、诸事顺遂；并祈合家康宁，子女学业精进、智慧开明。愿佛光护佑，善愿圆满。" },
  { tone: "祈福 · 合家", text: "伏愿三宝慈光，护佑沈氏阖府老幼，慈亲色身康泰、寿算绵长，子女读书明理、学业有成。以此灯明，破诸暗冥，所求如愿，吉祥安乐。" },
  { tone: "简约 · 端正", text: "愿此一灯，上奉诸佛，回向母亲身康体健、福寿绵长，子女慧根增长、学有所成。光明所照，愿善愿成就。" },
];
function ScreenVow({ ctx }) {
  const [raw, setRaw] = useState(ctx.wishRaw || "");
  const [gen, setGen] = useState(!!ctx.blessing);
  const [busy, setBusy] = useState(false);
  const [pick, setPick] = useState(ctx.blessingIdx ?? 0);
  const run = () => { setBusy(true); ctx.wishRaw = raw; setTimeout(() => { setBusy(false); setGen(true); ctx.blessing = true; }, 1100); };
  useEffect(() => { ctx.blessingIdx = pick; }, [pick]);

  return (
    <div className="scene">
      <div className="paper-grain" style={{ position: "absolute", inset: 0 }} />
      <div className="body" style={{ padding: "2px 36px 0", gap: 30 }}>
        {/* 左：录入 */}
        <div className="fade-rise" style={{ flex: "0 0 392px", display: "flex", flexDirection: "column", paddingTop: 12 }}>
          <div className="kicker" style={{ marginBottom: 14 }}>第二幕 · 发　愿</div>
          <div style={{ fontFamily: "var(--kai)", fontSize: 34, lineHeight: 1.5, color: "var(--paper-50)" }}>倾听心愿　代为成文</div>
          <p style={{ fontSize: 14, lineHeight: 1.95, opacity: 0.6, margin: "14px 0 18px" }}>
            请贵宾以日常话语说出心愿，知客代为录入或语音转写；原话将作为档案备注长久留存。
          </p>
          <div style={{ position: "relative" }}>
            <textarea className="field" value={raw} onChange={(e) => setRaw(e.target.value)} rows={4}
              placeholder="例如：想为母亲身体好一点，也保佑孩子读书顺利…"
              style={{ resize: "none", lineHeight: 1.8, fontFamily: "var(--kai)" }} />
            <button className="btn-text" style={{ position: "absolute", right: 12, bottom: 10 }}><Icon.mic s={15} />语音转写</button>
          </div>
          <button className="btn-text" style={{ alignSelf: "flex-start", marginTop: 12 }} onClick={() => setRaw(WISH_RAW)}>↺ 载入示例口述</button>
          <div style={{ flex: 1 }} />
          <button className="btn btn-gold" style={{ alignSelf: "stretch", justifyContent: "center", marginTop: 12 }} disabled={!raw || busy} onClick={run}>
            <Icon.spark s={17} />{busy ? "AI 润色中…" : gen ? "重新生成祈福文" : "生成庄重祈福文"}
          </button>
        </div>
        {/* 右：AI 成文 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: 12, paddingBottom: 10, minHeight: 0 }}>
          {!gen ? (
            <div style={{ flex: 1, display: "grid", placeItems: "center", border: "1px dashed var(--hairline)", borderRadius: 14, opacity: 0.5, textAlign: "center" }}>
              <div><Icon.scroll s={30} /><p style={{ fontSize: 13.5, marginTop: 12, letterSpacing: "0.1em" }}>祈福文将在此呈现 · 多版本可选可改可朗读</p></div>
            </div>
          ) : (
            <div className="fade-in" style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 12.5, letterSpacing: "0.14em", opacity: 0.6 }}>AI 依寺院文风模板生成 · 共 3 版</span>
                <span className="pill gold"><Icon.shield s={12} />须知客审定后呈现</span>
              </div>
              <div className="thin-scroll" style={{ display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", minHeight: 0, paddingRight: 4 }}>
                {BLESSINGS.map((b, i) => (
                  <button key={i} onClick={() => setPick(i)} style={{ textAlign: "left", cursor: "pointer", border: i === pick ? "1px solid var(--gold-400)" : "1px solid var(--hairline)", background: i === pick ? "rgba(200,164,77,0.08)" : "rgba(255,255,255,0.03)", borderRadius: 12, padding: "15px 18px", color: "inherit", fontFamily: "var(--serif)", transition: "all .2s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
                      <span className="pill" style={{ fontSize: 11, borderColor: "var(--hairline)" }}>{b.tone}</span>
                      <span style={{ display: "flex", gap: 14, fontSize: 12, opacity: 0.6 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Icon.sound s={14} />朗读</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Icon.edit s={13} />手改</span>
                        {i === pick && <span style={{ color: "var(--gold-300)", display: "inline-flex", alignItems: "center", gap: 4 }}><Icon.check s={14} />选用</span>}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--kai)", fontSize: 16.5, lineHeight: 2.0, margin: 0, color: i === pick ? "var(--paper-50)" : "var(--paper-200)" }}>{b.text}</p>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 12, opacity: 0.45, marginTop: 10, display: "flex", alignItems: "center", gap: 7 }}>
                <Icon.scroll s={13} />原话备注：「{ctx.wishRaw || WISH_RAW}」
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.ScreenWelcome = ScreenWelcome;
window.ScreenVow = ScreenVow;
