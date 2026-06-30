/* global React, Icon, FAMILY */

/* ============================================================
   第三幕 · 择供 —— AI 推荐高规格供奉组合（规格卡）
   ============================================================ */
const SPECS = [
  {
    id: "changming", tier: "上等供奉", name: "长明灯", hall: "大雄宝殿", buddha: "释迦牟尼佛",
    seat: "长明灯位 · A区", period: "全年 · 日日供奉", mean: "破诸暗冥 · 光明长护",
    merit: "可询知客", rec: true, icon: "lamp",
  },
  {
    id: "lianwei", tier: "家族传承", name: "家族莲位", hall: "往生堂", buddha: "西方三圣",
    seat: "西序 · L11", period: "长期 · 世代延续", mean: "回向先慈 · 莲品增上",
    merit: "可询知客", rec: true, icon: "seat",
  },
  {
    id: "fahui", tier: "法会回向", name: "盂兰盆法会", hall: "法会坛场", buddha: "地藏菩萨",
    seat: "回向名单 · 上首", period: "七月 · 一期", mean: "孝亲报恩 · 超荐先亡",
    merit: "可询知客", rec: true, icon: "scroll",
  },
  {
    id: "wenshu", tier: "随愿增益", name: "文殊智慧灯", hall: "文殊殿", buddha: "文殊菩萨",
    seat: "B区 · 智慧灯位", period: "全年", mean: "学业精进 · 智慧开明",
    merit: "可询知客", rec: false, icon: "lamp",
  },
];
function ScreenOffer({ ctx }) {
  const [sel, setSel] = useState(ctx.picks || ["changming", "lianwei", "fahui"]);
  useEffect(() => { ctx.picks = sel; }, [sel]);
  const toggle = (id) => setSel((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  return (
    <div className="scene">
      <div className="paper-grain" style={{ position: "absolute", inset: 0 }} />
      <div className="body" style={{ flexDirection: "column", padding: "6px 36px 0", minHeight: 0 }}>
        <div className="fade-rise" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div className="kicker" style={{ marginBottom: 10 }}>第三幕 · 择　供</div>
            <div style={{ fontFamily: "var(--kai)", fontSize: 30, color: "var(--paper-50)", lineHeight: 1.3 }}>
              依心愿　荐上等供奉之组合
            </div>
          </div>
          <div style={{ textAlign: "right", maxWidth: 360 }}>
            <div className="pill gold" style={{ marginBottom: 8 }}><Icon.spark s={13} />AI 依「先慈安康 · 子女学业」推荐</div>
            <p style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.7, margin: 0 }}>功德金以「可询知客」克制呈现；明细于操作面查看，不在屏面示众。</p>
          </div>
        </div>

        <div className="thin-scroll" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, overflowY: "auto", minHeight: 0, paddingBottom: 8, alignContent: "start" }}>
          {SPECS.map((s, i) => {
            const on = sel.includes(s.id);
            return (
              <button key={s.id} onClick={() => toggle(s.id)} className="card paper-grain fade-rise" style={{ animationDelay: (i * 0.06) + "s", textAlign: "left", cursor: "pointer", padding: 0, overflow: "hidden", border: on ? "1.5px solid var(--gold-500)" : "1px solid rgba(255,255,255,0.5)", outline: on ? "3px solid rgba(200,164,77,0.16)" : "none", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 116, position: "relative", background: "linear-gradient(160deg, #1c2c49, #101a2d)", display: "grid", placeItems: "center", overflow: "hidden" }}>
                  <div className="lamp-glow" style={{ position: "absolute", width: 180, height: 180, opacity: on ? 0.5 : 0.28, transition: "opacity .3s" }} />
                  <div style={{ position: "relative", color: "var(--gold-300)", display: "grid", placeItems: "center", width: 60, height: 60, borderRadius: "50%", border: "1px solid var(--hairline)" }}>
                    {s.icon === "lamp" ? <Icon.lamp s={30} /> : s.icon === "seat" ? <Icon.seat s={30} /> : <Icon.scroll s={28} />}
                  </div>
                  <span className="pill" style={{ position: "absolute", top: 10, left: 10, fontSize: 10.5, color: "var(--gold-200)", borderColor: "var(--hairline-strong)", background: "rgba(16,26,45,0.6)" }}>{s.tier}</span>
                  {on && <span style={{ position: "absolute", top: 10, right: 10, width: 24, height: 24, borderRadius: "50%", background: "var(--gold-500)", color: "var(--ink-900)", display: "grid", placeItems: "center" }}><Icon.check s={15} /></span>}
                </div>
                <div style={{ padding: "13px 15px 15px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <b style={{ fontSize: 17, color: "var(--ink-900)", letterSpacing: "0.04em" }}>{s.name}</b>
                    {s.rec && <span style={{ fontSize: 10.5, color: "var(--gold-700)", letterSpacing: "0.1em" }}>荐</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 3 }}>{s.hall} · {s.buddha}</div>
                  <div className="gold-rule" style={{ margin: "11px 0", opacity: 0.5 }} />
                  <Row k="供位" v={s.seat} />
                  <Row k="周期" v={s.period} />
                  <Row k="寓意" v={s.mean} />
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(138,109,59,0.18)" }}>
                    <span style={{ fontSize: 11, color: "var(--ink-400)" }}>功德金</span>
                    <span style={{ fontSize: 12.5, color: "var(--gold-700)", fontFamily: "var(--kai)" }}>{s.merit}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 2px 4px", fontSize: 13, opacity: 0.7 }}>
          <span className="pill gold">已择 {sel.length} 项</span>
          <span style={{ opacity: 0.6 }}>组合：{sel.map((id) => SPECS.find((s) => s.id === id)?.name).join(" ＋ ")}</span>
        </div>
      </div>
    </div>
  );
}
function Row({ k, v }) {
  return (
    <div style={{ display: "flex", gap: 10, fontSize: 12.5, lineHeight: 1.9 }}>
      <span style={{ color: "var(--ink-400)", flex: "0 0 30px" }}>{k}</span>
      <span style={{ color: "var(--ink-800)" }}>{v}</span>
    </div>
  );
}

/* ============================================================
   第四幕 · 安位 —— 佛缘编号 · 1+1 双佛像绑定
   ============================================================ */
function ScreenSeat({ ctx }) {
  const [revealed, setRevealed] = useState(ctx.seated || false);
  const code = "YF·丙午·DX·A03-02";
  useEffect(() => {
    if (!revealed) { const t = setTimeout(() => { setRevealed(true); ctx.seated = true; }, 700); return () => clearTimeout(t); }
  }, []);

  return (
    <div className="scene">
      <div className="paper-grain" style={{ position: "absolute", inset: 0 }} />
      <Halo2 active={revealed} />
      <div className="body" style={{ alignItems: "center", justifyContent: "center", padding: "0 40px", gap: 60 }}>
        {/* 寺院像 */}
        <IdolColumn active={revealed} label="寺院殿堂佛像" sub="大雄宝殿 · 释迦牟尼佛" tag="日日供奉" delay="0s" />
        {/* 中：编号 */}
        <div className="fade-in" style={{ textAlign: "center", flex: "0 0 auto", animationDelay: ".4s" }}>
          <div className="kicker" style={{ marginBottom: 18 }}>第四幕 · 安　位</div>
          <div style={{ fontSize: 12.5, letterSpacing: "0.3em", opacity: 0.55, marginBottom: 14 }}>唯一佛缘编号</div>
          <div className="num" style={{ fontSize: 30, color: "var(--gold-300)", letterSpacing: "0.12em", padding: "0 4px", opacity: revealed ? 1 : 0, transform: revealed ? "none" : "translateY(8px)", transition: "all .8s var(--ease)" }}>{code}</div>
          <div style={{ width: 1, height: 64, background: "linear-gradient(var(--gold-500), transparent)", margin: "20px auto", opacity: revealed ? 0.6 : 0, transition: "opacity 1s .3s" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 11, justifyContent: "center", fontFamily: "var(--kai)", fontSize: 20, color: "var(--paper-100)" }}>
            <span>一灯双佛</span><span style={{ color: "var(--gold-400)" }}>·</span><span>同愿相应</span>
          </div>
          <p style={{ fontSize: 13, opacity: 0.55, lineHeight: 1.8, marginTop: 16, maxWidth: 280 }}>
            两尊佛像同源同号——寺院供奉一尊，贵宾身边陪伴一尊，纳入沈府家族功德档案。
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
            <span className="pill gold">现场领取迷你佛像</span>
            <span className="pill">登记邮寄</span>
          </div>
        </div>
        {/* 用户像 */}
        <IdolColumn active={revealed} label="贵宾迷你佛像" sub="随身佩戴 · 同号陪伴" tag="1 + 1" delay=".2s" mini />
      </div>
    </div>
  );
}
function IdolColumn({ active, label, sub, tag, delay, mini }) {
  return (
    <div className="fade-rise" style={{ textAlign: "center", flex: "0 0 200px", animationDelay: delay }}>
      <div style={{ position: "relative", width: mini ? 120 : 168, height: mini ? 168 : 220, margin: "0 auto 18px", borderRadius: 14, border: "1px solid var(--hairline)", background: "linear-gradient(180deg, rgba(28,44,73,0.6), rgba(16,26,45,0.9))", display: "grid", placeItems: "center", overflow: "hidden" }}>
        <div className="lamp-glow" style={{ position: "absolute", width: 200, height: 200, opacity: active ? (mini ? 0.4 : 0.55) : 0.1, transition: "opacity 1.2s var(--ease)" }} />
        <div style={{ position: "relative", color: "var(--gold-300)", opacity: active ? 1 : 0.4, transition: "all 1s var(--ease)" }}>
          <Icon.seat s={mini ? 52 : 76} />
        </div>
        <div style={{ position: "absolute", inset: 0, border: active ? "1px solid var(--hairline-strong)" : "none", borderRadius: 14, boxShadow: active ? "inset 0 0 40px rgba(200,164,77,0.15)" : "none", transition: "all 1s" }} />
        <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, fontSize: 10, letterSpacing: "0.3em", padding: "5px 0", background: "rgba(8,12,22,0.6)", color: "var(--gold-200)" }}>{tag}</span>
      </div>
      <b style={{ fontSize: 15, color: "var(--paper-50)", letterSpacing: "0.1em" }}>{label}</b>
      <div style={{ fontSize: 12, opacity: 0.55, marginTop: 5 }}>{sub}</div>
    </div>
  );
}
function Halo2({ active }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div className="lamp-glow" style={{ position: "absolute", top: "50%", left: "50%", width: 900, height: 900, transform: "translate(-50%,-50%)", opacity: active ? 0.1 : 0, transition: "opacity 1.5s", animation: "glowPulse 6s ease-in-out infinite" }} />
    </div>
  );
}

window.ScreenOffer = ScreenOffer;
window.ScreenSeat = ScreenSeat;
