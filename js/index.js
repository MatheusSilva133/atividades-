<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Surpresa</title>
  <style>
    html, body {
      margin: 0;
      height: 100%;
      background: #040915;
      display: grid;
      place-items: center;
      overflow: hidden;
    }

    canvas {
      width: min(92vw, 1200px);
      height: min(92vh, 850px);
      border-radius: 20px;
      box-shadow: 0 0 40px rgba(81, 121, 255, 0.35);
      background: #050a16;
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="art"></canvas>

  <script>
    const canvas = document.getElementById("art");
    const ctx = canvas.getContext("2d");
    const DPR = window.devicePixelRatio || 1;

    function resizeCanvas() {
      const w = Math.min(window.innerWidth * 0.92, 1200);
      const h = Math.min(window.innerHeight * 0.92, 850);
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const W = canvas.width / DPR;
    const H = canvas.height / DPR;

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function drawBackground() {
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#040915");
      bg.addColorStop(0.4, "#071526");
      bg.addColorStop(1, "#040915");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
    }

    function drawStars() {
      for (let i = 0; i < 280; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const r = Math.random() * 2 + 0.5;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.8 + 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawOrbitField() {
      const cx = W / 2;
      const cy = H / 2;

      for (let i = 0; i < 18; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${80 + i * 8}, ${120 + i * 10}, 255, ${0.08 + i * 0.02})`;
        ctx.lineWidth = 1.2;
        ctx.ellipse(cx, cy, 180 + i * 30, 110 + i * 18, i * 0.45, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function drawCore() {
      const cx = W / 2;
      const cy = H / 2;

      const g = ctx.createRadialGradient(cx, cy, 20, cx, cy, 260);
      g.addColorStop(0, "rgba(255,255,255,0.95)");
      g.addColorStop(0.15, "rgba(120,220,255,0.8)");
      g.addColorStop(0.4, "rgba(70,100,255,0.4)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 260, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 220; i++) {
        const ang = (Math.PI * 2 / 220) * i;
        const r = 30 + Math.sin(i * 0.9) * 18;
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;

        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawPetals() {
      const cx = W / 2;
      const cy = H / 2;

      for (let layer = 0; layer < 8; layer++) {
        const radius = 75 + layer * 35;
        const petals = 18 + layer * 3;

        for (let i = 0; i < petals; i++) {
          const ang = (Math.PI * 2 / petals) * i + layer * 0.38;
          const x1 = cx + Math.cos(ang) * radius;
          const y1 = cy + Math.sin(ang) * radius;
          const x2 = cx + Math.cos(ang + 0.35) * (radius + 85);
          const y2 = cy + Math.sin(ang + 0.35) * (radius + 85);

          const grad = ctx.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(0, `hsla(${190 + layer * 9}, 95%, 70%, 0.18)`);
          grad.addColorStop(0.5, `hsla(${210 + layer * 7}, 100%, 75%, 0.7)`);
          grad.addColorStop(1, `hsla(${245 + layer * 8}, 95%, 70%, 0.18)`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5 + layer * 0.3;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(
            cx + Math.cos(ang + 0.12) * (radius + 32),
            cy + Math.sin(ang + 0.12) * (radius + 32),
            x2, y2
          );
          ctx.stroke();
        }
      }
    }

    function drawRings() {
      const cx = W / 2;
      const cy = H / 2;

      for (let r = 90; r < 430; r += 16) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${90 + r * 0.18}, ${170 + r * 0.08}, 255, ${0.08 + r * 0.0004})`;
        ctx.lineWidth = 1.1;
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function drawSpokes() {
      const cx = W / 2;
      const cy = H / 2;

      for (let i = 0; i < 60; i++) {
        const ang = (Math.PI * 2 / 60) * i;
        const x1 = cx + Math.cos(ang) * 130;
        const y1 = cy + Math.sin(ang) * 130;
        const x2 = cx + Math.cos(ang) * 360;
        const y2 = cy + Math.sin(ang) * 360;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(120, 190, 255, ${0.08 + (i % 6) * 0.025})`;
        ctx.lineWidth = 1;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }

    function drawWaveMesh() {
      const cx = W / 2;
      const cy = H / 2;

      for (let layer = 0; layer < 50; layer++) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 14) {
          const y = cy + Math.sin((x * 0.02) + layer * 0.9) * (40 + layer * 1.5) + Math.cos((x * 0.03) + layer) * 18;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${200 + layer * 1.5}, 90%, 70%, ${0.03 + layer * 0.002})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let layer = 0; layer < 50; layer++) {
        ctx.beginPath();
        for (let y = 0; y <= H; y += 14) {
          const x = cx + Math.cos((y * 0.025) + layer * 0.9) * (40 + layer * 1.5) + Math.sin((y * 0.03) + layer) * 18;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${220 + layer * 1.2}, 90%, 70%, ${0.03 + layer * 0.002})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function drawGlowClusters() {
      const cx = W / 2;
      const cy = H / 2;

      for (let i = 0; i < 12; i++) {
        const ang = i * (Math.PI * 2 / 12) + Math.PI / 6;
        const radius = 170 + (i % 4) * 60;
        const x = cx + Math.cos(ang) * radius;
        const y = cy + Math.sin(ang) * radius;

        const g1 = ctx.createRadialGradient(x, y, 0, x, y, 95);
        g1.addColorStop(0, "rgba(140,220,255,0.8)");
        g1.addColorStop(0.35, "rgba(120,180,255,0.45)");
        g1.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g1;
        ctx.beginPath();
        ctx.arc(x, y, 95, 0, Math.PI * 2);
        ctx.fill();

        const g2 = ctx.createRadialGradient(x, y, 0, x, y, 55);
        g2.addColorStop(0, "rgba(250,150,255,0.75)");
        g2.addColorStop(0.3, "rgba(190,140,255,0.35)");
        g2.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.arc(x, y, 55, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawParticles() {
      for (let i = 0; i < 660; i++) {
        const ang = Math.random() * Math.PI * 2;
        const dist = rand(40, 420);
        const x = W / 2 + Math.cos(ang) * dist;
        const y = H / 2 + Math.sin(ang) * dist;

        ctx.fillStyle = `rgba(${180 + Math.random() * 50}, ${150 + Math.random() * 80}, 255, ${Math.random() * 0.8 + 0.15})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }

    function render() {
      drawBackground();
      drawStars();
      drawOrbitField();
      drawCore();
      drawGlowClusters();
      drawRings();
      drawPetals();
      drawSpokes();
      drawWaveMesh();
      drawParticles();
    }

    render();
  </script>
</body>
</html>