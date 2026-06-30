/* global React, Icon, FAMILY, BLESSINGS */

/* ============================================================
   第五幕 · 亲手点亮 —— 全屏仪式（信众亲手，不可代点）
   ============================================================ */
function ScreenLight({ ctx, onLit }) {
  const [holding, setHolding] = useState(false);
  const [prog, setProg] = useState(0);
  const [lit, setLit] = useState(ctx.lit || false);
  const raf = useRef(0);
  const t0 = useRef(0);
  const DUR = 2200;

  const tick = (t) => {
    if (!t0.current) t0.current = t;
    const p = Math.min(1, (t - t0.current) / DUR);
    setProg(p);
    if (p >= 1) { ignite(); return; }
    raf.current = requestAnimationFrame(tick);
  };
  const start = () => { if (lit) return; setHolding(true); t0.current = 0; raf.current = requestAnimationFrame(tick); };
  const stop = () => { if (lit) return; setHolding(false); cancelAnimationFrame(raf.current); t0.current = 0; setProg(0); };
  const ignite = () => { cancelAnimationFrame(raf.current); setHolding(false); setLit(true); ctx.lit = true; onLit && onLit(); };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const blessing = (BLESSINGS && BLESSINGS[ctx.blessingIdx ?? 0]) || { text: "" };

  return (
    <div className="scene" style={{ alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div className="paper-grain" style={{ position: "absolute", inset: 0 }} />
      {/* 背景灯河 */}
      <LampRiver lit={lit} />
      {/* 主灯光晕 */}
      <div className="lamp-glow" style={{ position: "absolute", top: "44%", left: "50%", transform: "translate(-50%,-50%)", width: 760, height: 760, opacity: lit ? 0.5 : 0.08 + prog * 0.3, transition: lit ? "opacity 1.6s var(--ease)" : "none", animation: lit ? "glowPulse 5s ease-in-out infinite" : "none", pointerEvents: "none" }} />

      {!lit ? (
        <div style={{ position: "relative", textAlign: "center" }}>
          <div className="kicker fade-in" style={{ marginBottom: 26 }}>第五幕 · 亲手点亮</div>
          <p className="fade-in" style={{ fontFamily: "var(--kai)", fontSize: 27, color: "var(--paper-50)", lineHeight: 1.6, marginBottom: 44, letterSpacing: "0.06em" }}>
            请贵宾亲手长按<br /><span style={{ fontSize: 16, opacity: 0.6 }}>殿堂内对应琉璃灯将真实亮起 · 此刻不可代点</span>
          </p>
          {/* 点亮环 */}
          <div onMouseDown={start} onMouseUp={stop} onMouseLeave={stop} onTouchStart={start} onTouchEnd={stop}
            style={{ position: "relative", width: 220, height: 220, margin: "0 auto", cursor: "pointer", userSelect: "none", WebkitTapHighlightColor: "transparent" }}>
            <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(200,164,77,0.18)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--gold-400)" strokeWidth="2.5" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 46} strokeDashoffset={2 * Math.PI * 46 * (1 - prog)} style={{ transition: holding ? "none" : "stroke-dashoffset .4s" }} />
            </svg>
            <div style={{ position: "absolute", inset: 28, borderRadius: "50%", display: "grid", placeItems: "center", background: "radial-gradient(circle, rgba(200,164,77,"+(0.12+prog*0.4)+"), rgba(28,44,73,0.5))", border: "1px solid var(--hairline)", transform: holding ? "scale(0.96)" : "scale(1)", transition: "transform .3s" }}>
              <div style={{ color: "var(--gold-200)", textAlign: "center" }}>
                <Icon.lamp s={46} />
                <div style={{ fontSize: 13, letterSpacing: "0.2em", marginTop: 8, opacity: 0.85 }}>{holding ? "持灯…" : "长按点亮"}</div>
              </div>
            </div>
          </div>
          <div className="fade-in" style={{ marginTop: 32, fontSize: 12.5, opacity: 0.45, letterSpacing: "0.1em" }}>
            佛缘编号 · YF·丙午·DX·A03-02　|　大雄宝殿 · 释迦牟尼佛
          </div>
        </div>
      ) : (
        <div className="fade-in" style={{ position: "relative", textAlign: "center", maxWidth: 640, padding: "0 40px" }}>
          {/* 亮起的灯 */}
          <div style={{ position: "relative", width: 132, height: 132, margin: "0 auto 18px" }}>
            <div className="lamp-glow" style={{ position: "absolute", inset: -40, opacity: 0.8, animation: "glowPulse 3.5s ease-in-out infinite" }} />
            <div style={{ position: "relative", width: 132, height: 132, borderRadius: "50%", display: "grid", placeItems: "center", color: "#fff3d6", filter: "drop-shadow(0 0 18px rgba(230,205,138,0.9))" }}>
              <Icon.lamp s={64} />
            </div>
          </div>
          <div className="kicker" style={{ marginBottom: 14 }}>灯　已　亮</div>
          <p style={{ fontFamily: "var(--kai)", fontSize: 19, lineHeight: 2.1, color: "var(--paper-50)", margin: "0 auto 24px", maxWidth: 540 }}>
            {blessing.text}
          </p>
          <div style={{ display: "inline-flex", gap: 24, padding: "12px 26px", borderRadius: 99, border: "1px solid var(--hairline)", fontSize: 13, alignItems: "center" }}>
            <span className="num" style={{ color: "var(--gold-300)", letterSpacing: "0.1em" }}>YF·丙午·DX·A03-02</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span style={{ opacity: 0.7 }}>点亮于 {new Date().toLocaleDateString("zh-CN")} · 殿堂实灯闪烁寻位中</span>
          </div>
          <div style={{ marginTop: 18, display: "flex", gap: 12, justifyContent: "center" }}>
            <span className="pill jade"><span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--jade-dim)", animation: "blink 1.4s infinite" }} />殿堂灯位闪烁中</span>
            <span className="pill gold">生成专属（私密）纪念页</span>
          </div>
        </div>
      )}
    </div>
  );
}
function LampRiver({ lit }) {
  const lamps = React.useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    x: (i * 53) % 100 + (i % 3) * 4, y: 8 + ((i * 37) % 82), d: (i % 7) * 0.4, s: 2 + (i % 4),
  })), []);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {lamps.map((l, i) => (
        <div key={i} style={{ position: "absolute", left: l.x + "%", top: l.y + "%", width: l.s + 2, height: l.s + 2, borderRadius: "50%",
          background: "var(--gold-300)", opacity: lit ? 0.5 : 0.14, filter: "blur(0.4px)",
          boxShadow: lit ? "0 0 8px var(--gold-300)" : "none", transition: "opacity 1.6s " + l.d + "s, box-shadow 1.6s",
          animation: lit ? ("glowPulse " + (3 + l.s) + "s ease-in-out infinite " + l.d + "s") : "none" }} />
      ))}
    </div>
  );
}

/* ============================================================
   第六幕 · 托付 —— 电子功德证书 · 续供管家 · 隐私
   ============================================================ */
function ScreenEntrust({ ctx }) {
  const [onBoard, setOnBoard] = useState("anon"); // public / anon / private
  const [steward, setSteward] = useState(true);
  return (
    <div className="scene">
      <div className="paper-grain" style={{ position: "absolute", inset: 0 }} />
      <div className="body" style={{ padding: "4px 40px 0", gap: 36, alignItems: "stretch" }}>
        {/* 证书 */}
        <div className="fade-rise" style={{ flex: "0 0 452px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Certificate ctx={ctx} />
        </div>
        {/* 托付事项 */}
        <div className="fade-rise" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", animationDelay: ".1s" }}>
          <div className="kicker" style={{ marginBottom: 12 }}>第六幕 · 托　付</div>
          <div style={{ fontFamily: "var(--kai)", fontSize: 30, color: "var(--paper-50)", lineHeight: 1.4, marginBottom: 8 }}>
            归档家族 · 续供有人 · 隐私自主
          </div>
          <p style={{ fontSize: 13.5, opacity: 0.6, lineHeight: 1.9, marginBottom: 22, maxWidth: 440 }}>
            本次供奉已生成电子功德证书并归入沈府家族功德档案。续供不弹窗、不催缴，一律由对口知客主动跟进。
          </p>

          {/* 续供管家 */}
          <div className="card-dim" style={{ padding: "16px 18px", marginBottom: 14, display: "flex", alignItems: "center", gap: 14 }}>
            <div className="kt-ava" style={{ width: 44, height: 44, fontSize: 18 }}>德</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, color: "var(--paper-50)" }}>续供管家 · 释德正</div>
              <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>节气 · 佛诞 · 家族纪念日主动关怀 · 续供可远程代办</div>
            </div>
            <button onClick={() => setSteward(!steward)} className="pill" style={{ borderColor: steward ? "var(--hairline-strong)" : "var(--hairline)", color: steward ? "var(--gold-300)" : "inherit", cursor: "pointer" }}>
              {steward ? <><Icon.check s={13} />已指定</> : "指定对口"}
            </button>
          </div>

          {/* 隐私/上榜 */}
          <div style={{ fontSize: 12.5, letterSpacing: "0.14em", opacity: 0.6, marginBottom: 10 }}>功德榜显示方式（由贵宾自主选择）</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[["private", "不公开", "默认 · 仅家族档案可见"], ["anon", "某善信", "匿名上榜 · 不显姓名"], ["public", "具名", "经贵宾同意后具名"]].map(([k, t, d]) => (
              <button key={k} onClick={() => setOnBoard(k)} style={{ flex: 1, textAlign: "left", cursor: "pointer", borderRadius: 10, padding: "13px 15px", fontFamily: "var(--serif)", color: "inherit", border: onBoard === k ? "1.5px solid var(--gold-400)" : "1px solid var(--hairline)", background: onBoard === k ? "rgba(200,164,77,0.08)" : "rgba(255,255,255,0.03)", transition: "all .2s" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <b style={{ fontSize: 15, color: onBoard === k ? "var(--gold-200)" : "var(--paper-100)" }}>{t}</b>
                  {onBoard === k ? <Icon.check s={15} /> : k === "private" ? <Icon.lock s={14} /> : null}
                </div>
                <div style={{ fontSize: 11, opacity: 0.55, marginTop: 5, lineHeight: 1.5 }}>{d}</div>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
            <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}><Icon.scroll s={16} />发送电子证书</button>
            <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>另出纸质凭证</button>
          </div>
        </div>
      </div>
    </div>
  );
}
function Certificate({ ctx }) {
  const blessing = (window.BLESSINGS && window.BLESSINGS[ctx.blessingIdx ?? 0]) || { text: "" };
  return (
    <div className="card scene-paper paper-grain" style={{ padding: "30px 34px 26px", position: "relative", borderRadius: 12, boxShadow: "var(--shadow-soft)" }}>
      <div style={{ position: "absolute", inset: 10, border: "1px solid var(--hairline-strong)", borderRadius: 8, pointerEvents: "none" }} />
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 4 }}>
          <div className="seal on-paper" style={{ width: 30, height: 30, fontSize: 17 }}>佛</div>
          <span style={{ fontSize: 13, letterSpacing: "0.3em", color: "var(--ink-700)" }}>玉佛禅寺 · 觉群</span>
        </div>
        <div style={{ fontFamily: "var(--kai)", fontSize: 27, letterSpacing: "0.3em", color: "var(--ink-900)", margin: "10px 0 4px" }}>功德证书</div>
        <div className="gold-rule" style={{ margin: "12px 0 18px" }} />
        <p style={{ fontFamily: "var(--kai)", fontSize: 14.5, lineHeight: 2.2, color: "var(--ink-800)", textAlign: "left", margin: 0 }}>
          沈府善信，于丙午年仲夏，于本寺敬设长明灯、家族莲位、盂兰盆法会回向。慈心供养，功德圆满，特此为证。
        </p>
        <div style={{ background: "rgba(138,109,59,0.07)", border: "1px solid var(--hairline)", borderRadius: 8, padding: "12px 16px", margin: "18px 0", textAlign: "left" }}>
          <p style={{ fontFamily: "var(--kai)", fontSize: 13, lineHeight: 1.95, color: "var(--ink-700)", margin: 0 }}>{blessing.text}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 10.5, color: "var(--ink-400)", letterSpacing: "0.1em" }}>佛缘编号</div>
            <div className="num" style={{ fontSize: 15, color: "var(--gold-700)", letterSpacing: "0.08em" }}>YF·丙午·DX·A03-02</div>
            <div style={{ fontSize: 10.5, color: "var(--ink-400)", marginTop: 6 }}>证书号 GD-2026-008701</div>
          </div>
          <div style={{ position: "relative", width: 62, height: 62, borderRadius: 6, display: "grid", placeItems: "center", color: "#fff", background: "var(--cinnabar)", fontFamily: "var(--kai)", fontSize: 13, lineHeight: 1.3, textAlign: "center", opacity: 0.92, transform: "rotate(-6deg)", boxShadow: "0 4px 12px rgba(154,59,46,0.3)" }}>
            玉佛<br />禅寺
          </div>
        </div>
      </div>
    </div>
  );
}

window.ScreenLight = ScreenLight;
window.ScreenEntrust = ScreenEntrust;
