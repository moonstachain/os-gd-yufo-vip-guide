/* global React, ReactDOM, Furniture, ActionBar, OperatorDrawer,
   ScreenWelcome, ScreenVow, ScreenOffer, ScreenSeat, ScreenLight, ScreenEntrust */
const { useState: useS, useEffect: useE, useRef: useR } = React;

const STEPS = [
  { c: ScreenWelcome, next: "确认府上 · 开始引导", back: null },
  { c: ScreenVow, next: "采此祈福文 · 择供", back: "迎请" },
  { c: ScreenOffer, next: "确认供奉 · 安位", back: "发愿" },
  { c: ScreenSeat, next: "请贵宾亲手点亮", back: "择供" },
  { c: ScreenLight, next: "礼成 · 托付归档", back: "安位", gate: true },
  { c: ScreenEntrust, next: "圆满 · 回到迎请", back: "点亮" },
];

function App() {
  const [step, setStep] = useS(0);
  const [face, setFace] = useS("show");
  const [, force] = useS(0);
  const ctxRef = useR({});
  const ctx = ctxRef.current;

  const cur = STEPS[step];
  const Screen = cur.c;
  const gateOk = !cur.gate || ctx.lit;

  const next = () => {
    if (step === STEPS.length - 1) { ctxRef.current = {}; setStep(0); return; }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="scene-wrap" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <Furniture step={step} face={face} setFace={setFace} paper={false} />
      <div className="body-host" style={{ position: "relative", flex: 1, minHeight: 0 }}>
        <Screen key={step} ctx={ctx} onLit={() => force((n) => n + 1)} go={next} />
      </div>
      <ActionBar
        onBack={step > 0 ? back : null}
        backLabel={cur.back || "上一步"}
        onNext={next}
        nextLabel={cur.next}
        nextEnabled={gateOk}
        hint={cur.gate && !ctx.lit ? "请贵宾亲手长按点亮后继续" : (face === "op" ? "操作面已开启 · 金额仅知客可见" : null)}
      />
      <OperatorDrawer open={face === "op"} onClose={() => setFace("show")} />
    </div>
  );
}

/* 缩放：固定 1194×834 适配视口 */
function fit() {
  const bezel = document.getElementById("bezel");
  if (!bezel) return;
  const pad = 36;
  const s = Math.min((window.innerWidth - pad) / 1194, (window.innerHeight - pad) / 834);
  bezel.style.transform = "scale(" + Math.min(s, 1.18) + ")";
}
window.addEventListener("resize", fit);
setTimeout(fit, 30);

ReactDOM.createRoot(document.getElementById("app-root")).render(<App />);
setTimeout(fit, 80);
