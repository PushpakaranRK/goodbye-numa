const stageStart = document.getElementById("stageStart");
const stageCountdown = document.getElementById("stageCountdown");
const stageReveal = document.getElementById("stageReveal");

const btnGo = document.getElementById("btnGo");
const btnReset = document.getElementById("btnReset");
const countNum = document.getElementById("countNum");
const surpriseImg = document.getElementById("surpriseImg");

function show(stage) {
  stageStart.classList.add("hidden");
  stageCountdown.classList.add("hidden");
  stageReveal.classList.add("hidden");
  stage.classList.remove("hidden");
}

function doShake() {
  document.body.classList.remove("shake");
  // restart animation reliably
  void document.body.offsetWidth;
  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 700);
}

btnGo.addEventListener("click", async () => {
  show(stageCountdown);

  let n = 3;
  countNum.textContent = n;

  const timer = setInterval(() => {
    n -= 1;
    countNum.textContent = n;
    if (n <= 0) clearInterval(timer);
  }, 1000);

  // wait 3 seconds, shake, then reveal
  await new Promise(r => setTimeout(r, 3000));
  doShake();
  await new Promise(r => setTimeout(r, 450));

  show(stageReveal);
});

// tap image to hide/show (optional fun)
surpriseImg.addEventListener("click", () => {
  surpriseImg.style.visibility =
    (surpriseImg.style.visibility === "hidden") ? "visible" : "hidden";
});

btnReset.addEventListener("click", () => {
  // ALWAYS go back to first page
  surpriseImg.style.visibility = "visible";
  show(stageStart);
});

// ensure first page always loads first
show(stageStart);
