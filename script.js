// ============ SPLASH SCREEN (Slow-motion text reveal) ============
(function splashReveal() {
    const titleEl = document.getElementById('splash-title');
    const lineEl = document.getElementById('splash-line');
    const subEl = document.getElementById('splash-sub');
    if (!titleEl) return;

    const word = 'Innocent';
    titleEl.textContent = '';
    word.split('').forEach((ch, i) => {
        const span = document.createElement('span');
        span.classList.add('splash-letter');
        span.textContent = ch;
        span.style.transitionDelay = (i * 0.15) + 's';
        titleEl.appendChild(span);
    });

    requestAnimationFrame(() => {
        titleEl.querySelectorAll('.splash-letter').forEach(l => l.classList.add('visible'));
    });

    const letterTime = word.length * 150;
    setTimeout(() => { if (lineEl) lineEl.classList.add('expand'); }, letterTime + 200);
    setTimeout(() => { if (subEl) subEl.classList.add('visible'); }, letterTime + 600);
    setTimeout(() => {
        const splash = document.getElementById('splash');
        if (splash) splash.classList.add('hide');
    }, letterTime + 2400);
})();

// ============ HERO CANVAS (Floating Shapes) ============
(function heroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, shapes = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['rgba(102,126,234,0.12)', 'rgba(118,75,162,0.1)', 'rgba(255,107,107,0.08)', 'rgba(78,205,196,0.08)', 'rgba(162,155,254,0.1)'];
    for (let i = 0; i < 20; i++) {
        shapes.push({
            x: Math.random() * w, y: Math.random() * h,
            size: Math.random() * 80 + 20,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            rotation: Math.random() * Math.PI * 2,
            dr: (Math.random() - 0.5) * 0.01,
            type: Math.random() > 0.5 ? 'circle' : 'rect',
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        shapes.forEach(s => {
            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.rotation);
            ctx.fillStyle = s.color;
            if (s.type === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
            }
            ctx.restore();
            s.x += s.dx; s.y += s.dy; s.rotation += s.dr;
            if (s.x < -100) s.x = w + 100;
            if (s.x > w + 100) s.x = -100;
            if (s.y < -100) s.y = h + 100;
            if (s.y > h + 100) s.y = -100;
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

// ============ TEXT ROTATION ============
(function textRotation() {
    const words = ['Everything', 'Powerful', 'Emotional', 'Strategic', 'Beautiful', 'Intentional'];
    const el = document.getElementById('rotating-text');
    if (!el) return;
    let i = 0;
    setInterval(() => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(10px)';
        setTimeout(() => {
            i = (i + 1) % words.length;
            el.textContent = words[i];
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, 300);
    }, 2500);
    el.style.transition = 'opacity 0.3s, transform 0.3s';
})();

// ============ NAVBAR ============
document.getElementById('nav-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'));
});

// ============ THEME DROPDOWN TOGGLE ============
(function themeDropdown() {
    const btn = document.getElementById('theme-toggle-btn');
    const menu = document.getElementById('theme-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== btn) {
            menu.classList.remove('open');
        }
    });
})();

// ============ THEME SWITCHER ============
(function themeInit() {
    const saved = localStorage.getItem('df-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    const savedContrast = localStorage.getItem('df-contrast') || '100';
    document.documentElement.style.setProperty('--contrast', savedContrast + '%');
    const slider = document.getElementById('contrast-slider');
    if (slider) slider.value = savedContrast;
    updateActiveThemeBtn(saved);
})();

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('df-theme', theme);
        updateActiveThemeBtn(theme);
    });
});

function updateActiveThemeBtn(theme) {
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    const active = document.querySelector(`.theme-btn[data-theme="${theme}"]`);
    if (active) active.classList.add('active');
}

document.getElementById('contrast-slider').addEventListener('input', (e) => {
    const val = e.target.value;
    document.documentElement.style.setProperty('--contrast', val + '%');
    localStorage.setItem('df-contrast', val);
});

// ============ SCROLL REVEAL ============
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============ CURSOR GLOW ============
document.addEventListener('mousemove', (e) => {
    const g = document.getElementById('cursor-glow');
    if (g) { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; }
});

// ============ TOOLS TABS ============
document.querySelectorAll('.tool-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tool).classList.add('active');
    });
});

// ============ COLOR PALETTE TOOL ============
function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1; if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => { const hex = Math.round(x * 255).toString(16); return hex.length === 1 ? '0' + hex : hex; };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generatePalette() {
    const hex = document.getElementById('base-color').value;
    const harmony = document.getElementById('color-harmony').value;
    const [h, s, l] = hexToHSL(hex);
    let colors = [];

    switch (harmony) {
        case 'complementary':
            colors = [
                hslToHex(h, s, l),
                hslToHex(h, Math.max(s - 15, 0), Math.min(l + 15, 90)),
                hslToHex((h + 180) % 360, s, l),
                hslToHex((h + 180) % 360, Math.max(s - 15, 0), Math.min(l + 15, 90)),
                hslToHex(h, Math.max(s - 30, 0), Math.min(l + 30, 95))
            ];
            break;
        case 'analogous':
            colors = [hslToHex((h - 30 + 360) % 360, s, l), hslToHex((h - 15 + 360) % 360, s, l), hslToHex(h, s, l), hslToHex((h + 15) % 360, s, l), hslToHex((h + 30) % 360, s, l)];
            break;
        case 'triadic':
            colors = [hslToHex(h, s, l), hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l), hslToHex(h, s, Math.min(l + 20, 90)), hslToHex((h + 120) % 360, s, Math.min(l + 20, 90))];
            break;
        case 'split':
            colors = [hslToHex(h, s, l), hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l), hslToHex(h, Math.max(s - 20, 0), Math.min(l + 20, 90)), hslToHex((h + 180) % 360, Math.max(s - 20, 0), l)];
            break;
    }

    for (let i = 0; i < 5; i++) {
        document.getElementById(`swatch-${i + 1}`).style.background = colors[i];
    }
    const codesEl = document.getElementById('palette-codes');
    codesEl.textContent = '';
    colors.forEach(c => {
        const span = document.createElement('span');
        span.textContent = c;
        codesEl.appendChild(span);
    });
}

document.getElementById('base-color').addEventListener('input', generatePalette);
document.getElementById('color-harmony').addEventListener('change', generatePalette);
document.getElementById('randomize-color').addEventListener('click', () => {
    document.getElementById('base-color').value = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    generatePalette();
});
generatePalette();

// ============ TYPOGRAPHY TOOL ============
function updateTypography() {
    const preview = document.querySelector('#typo-preview p');
    const ff = document.getElementById('font-family').value;
    const fs = document.getElementById('font-size').value;
    const fw = document.getElementById('font-weight').value;
    const ls = document.getElementById('letter-spacing').value;
    const lh = document.getElementById('line-height').value;
    const tc = document.getElementById('text-color').value;

    preview.style.fontFamily = ff;
    preview.style.fontSize = fs + 'px';
    preview.style.fontWeight = fw;
    preview.style.letterSpacing = ls + 'px';
    preview.style.lineHeight = lh;
    preview.style.color = tc;

    document.getElementById('fs-val').textContent = fs;
    document.getElementById('fw-val').textContent = fw;
    document.getElementById('ls-val').textContent = ls;
    document.getElementById('lh-val').textContent = lh;
}

['font-family', 'font-size', 'font-weight', 'letter-spacing', 'line-height', 'text-color'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateTypography);
});
updateTypography();

// ============ SHADOW TOOL ============
function updateShadow() {
    const x = document.getElementById('shadow-x').value;
    const y = document.getElementById('shadow-y').value;
    const b = document.getElementById('shadow-blur').value;
    const s = document.getElementById('shadow-spread').value;
    const c = document.getElementById('shadow-color').value;
    const o = document.getElementById('shadow-opacity').value;

    document.getElementById('sx-val').textContent = x;
    document.getElementById('sy-val').textContent = y;
    document.getElementById('sb-val').textContent = b;
    document.getElementById('ss-val').textContent = s;
    document.getElementById('so-val').textContent = o;

    const r = parseInt(c.slice(1, 3), 16), g = parseInt(c.slice(3, 5), 16), bl = parseInt(c.slice(5, 7), 16);
    const shadow = `${x}px ${y}px ${b}px ${s}px rgba(${r},${g},${bl},${o})`;
    document.getElementById('shadow-preview').style.boxShadow = shadow;
    document.getElementById('shadow-code').textContent = `box-shadow: ${shadow};`;
}

['shadow-x', 'shadow-y', 'shadow-blur', 'shadow-spread', 'shadow-color', 'shadow-opacity'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateShadow);
});
updateShadow();

// ============ GRADIENT TOOL ============
function updateGradient() {
    const c1 = document.getElementById('grad-color1').value;
    const c2 = document.getElementById('grad-color2').value;
    const dir = document.getElementById('grad-direction').value;
    const type = document.getElementById('grad-type').value;

    document.getElementById('gd-val').textContent = dir;

    let gradient;
    if (type === 'linear') {
        gradient = `linear-gradient(${dir}deg, ${c1}, ${c2})`;
    } else {
        gradient = `radial-gradient(circle, ${c1}, ${c2})`;
    }
    document.getElementById('gradient-preview').style.background = gradient;
    document.getElementById('gradient-code').textContent = `background: ${gradient};`;
}

['grad-color1', 'grad-color2', 'grad-direction', 'grad-type'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateGradient);
});
document.getElementById('randomize-grad').addEventListener('click', () => {
    document.getElementById('grad-color1').value = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    document.getElementById('grad-color2').value = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    document.getElementById('grad-direction').value = Math.floor(Math.random() * 360);
    updateGradient();
});
updateGradient();

// ============ SPACING TOOL ============
function updateSpacing() {
    const pad = document.getElementById('spacing-padding').value;
    const mar = document.getElementById('spacing-margin').value;
    const rad = document.getElementById('spacing-radius').value;
    const gap = document.getElementById('spacing-gap').value;

    document.getElementById('sp-val').textContent = pad;
    document.getElementById('sm-val').textContent = mar;
    document.getElementById('sr-val').textContent = rad;
    document.getElementById('sg-val').textContent = gap;

    const preview = document.getElementById('spacing-preview');
    preview.style.gap = gap + 'px';
    preview.querySelectorAll('.space-card').forEach(card => {
        card.style.padding = pad + 'px';
        card.style.margin = mar + 'px';
        card.style.borderRadius = rad + 'px';
    });
}

['spacing-padding', 'spacing-margin', 'spacing-radius', 'spacing-gap'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateSpacing);
});
updateSpacing();

// ============ EXERCISE: COLOR MATCHING ============
let targetRGB = { r: 0, g: 0, b: 0 };

function newTargetColor() {
    targetRGB = { r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256) };
    document.getElementById('target-color').style.background = `rgb(${targetRGB.r},${targetRGB.g},${targetRGB.b})`;
    document.getElementById('color-result').textContent = '';
    document.getElementById('color-result').className = 'exercise-result';
}

function updateGuessColor() {
    const r = document.getElementById('r-slider').value;
    const g = document.getElementById('g-slider').value;
    const b = document.getElementById('b-slider').value;
    document.getElementById('r-val').textContent = r;
    document.getElementById('g-val').textContent = g;
    document.getElementById('b-val').textContent = b;
    document.getElementById('guess-color').style.background = `rgb(${r},${g},${b})`;
}

['r-slider', 'g-slider', 'b-slider'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateGuessColor);
});

document.getElementById('check-color').addEventListener('click', () => {
    const r = parseInt(document.getElementById('r-slider').value);
    const g = parseInt(document.getElementById('g-slider').value);
    const b = parseInt(document.getElementById('b-slider').value);
    const diff = Math.abs(r - targetRGB.r) + Math.abs(g - targetRGB.g) + Math.abs(b - targetRGB.b);
    const result = document.getElementById('color-result');

    if (diff < 30) {
        result.textContent = `🎉 Excellent! Difference: ${diff} — Almost perfect!`;
        result.className = 'exercise-result success';
    } else if (diff < 80) {
        result.textContent = `👍 Good job! Difference: ${diff} — Getting close!`;
        result.className = 'exercise-result info';
    } else {
        result.textContent = `🔄 Keep trying! Difference: ${diff} — Adjust your sliders.`;
        result.className = 'exercise-result fail';
    }
});

document.getElementById('new-color').addEventListener('click', newTargetColor);
newTargetColor();
updateGuessColor();

// ============ EXERCISE: ALIGNMENT PUZZLE ============
function makeDraggableInContainer(el, container) {
    let startX, startY, origLeft, origTop;

    el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        origLeft = el.offsetLeft;
        origTop = el.offsetTop;

        function onMove(e) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const rect = container.getBoundingClientRect();
            let newLeft = Math.max(0, Math.min(origLeft + dx, rect.width - el.offsetWidth));
            let newTop = Math.max(0, Math.min(origTop + dy, rect.height - el.offsetHeight));
            el.style.left = newLeft + 'px';
            el.style.top = newTop + 'px';
        }

        function onUp() {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });
}

const alignGrid = document.getElementById('alignment-grid');
document.querySelectorAll('.drag-box').forEach(box => makeDraggableInContainer(box, alignGrid));

document.getElementById('check-align').addEventListener('click', () => {
    const targets = document.querySelectorAll('.grid-target');
    const boxes = document.querySelectorAll('.drag-box');
    let totalDist = 0;

    for (let i = 0; i < 3; i++) {
        const dx = parseInt(boxes[i].style.left) - parseInt(targets[i].style.left);
        const dy = parseInt(boxes[i].style.top) - parseInt(targets[i].style.top);
        totalDist += Math.hypot(dx, dy);
    }

    const result = document.getElementById('align-result');
    if (totalDist < 30) {
        result.textContent = '🎉 Perfect alignment! Great precision!';
        result.className = 'exercise-result success';
    } else if (totalDist < 80) {
        result.textContent = `👍 Close! Total offset: ${Math.round(totalDist)}px`;
        result.className = 'exercise-result info';
    } else {
        result.textContent = `🔄 Keep adjusting! Total offset: ${Math.round(totalDist)}px`;
        result.className = 'exercise-result fail';
    }
});

document.getElementById('reset-align').addEventListener('click', () => {
    document.getElementById('drag1').style.left = '50px';
    document.getElementById('drag1').style.top = '120px';
    document.getElementById('drag2').style.left = '150px';
    document.getElementById('drag2').style.top = '20px';
    document.getElementById('drag3').style.left = '100px';
    document.getElementById('drag3').style.top = '60px';
    document.getElementById('align-result').textContent = '';
});

// ============ EXERCISE: TYPOGRAPHY PAIRING ============
document.getElementById('heading-font').addEventListener('change', (e) => {
    document.getElementById('typo-heading').style.fontFamily = e.target.value;
});
document.getElementById('body-font').addEventListener('change', (e) => {
    document.getElementById('typo-body').style.fontFamily = e.target.value;
});

const goodPairings = [
    { heading: "'Playfair Display', serif", body: "'Inter', sans-serif" },
    { heading: "'Georgia', serif", body: "'Inter', sans-serif" },
    { heading: "'Arial Black', sans-serif", body: "'Georgia', serif" },
];

document.getElementById('rate-pairing').addEventListener('click', () => {
    const h = document.getElementById('heading-font').value;
    const b = document.getElementById('body-font').value;
    const result = document.getElementById('pairing-result');

    if (h === b) {
        result.textContent = '⚠️ Using the same font for both isn\'t a pairing. Try mixing serif + sans-serif!';
        result.className = 'exercise-result fail';
    } else if (goodPairings.some(p => p.heading === h && p.body === b)) {
        result.textContent = '🎉 Excellent pairing! This combination creates great contrast and readability.';
        result.className = 'exercise-result success';
    } else {
        result.textContent = '👍 Interesting choice! A classic tip: pair serif headings with sans-serif body text.';
        result.className = 'exercise-result info';
    }
});

// ============ EXERCISE: WHITESPACE ============
function updateWSExercise() {
    const pad = document.getElementById('ws-padding').value;
    const gap = document.getElementById('ws-gap').value;
    document.getElementById('ws-p-val').textContent = pad;
    document.getElementById('ws-g-val').textContent = gap;

    const card = document.getElementById('ws-card');
    card.style.padding = pad + 'px';
    card.style.gap = gap + 'px';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
}

['ws-padding', 'ws-gap'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateWSExercise);
});

document.getElementById('score-ws').addEventListener('click', () => {
    const pad = parseInt(document.getElementById('ws-padding').value);
    const gap = parseInt(document.getElementById('ws-gap').value);
    const result = document.getElementById('ws-result');

    // Optimal: padding 25-40, gap 12-20
    const padScore = (pad >= 25 && pad <= 40) ? 50 : Math.max(0, 50 - Math.abs(pad - 32) * 2);
    const gapScore = (gap >= 12 && gap <= 20) ? 50 : Math.max(0, 50 - Math.abs(gap - 16) * 3);
    const total = padScore + gapScore;

    if (total >= 85) {
        result.textContent = `🎉 Score: ${total}/100 — Beautiful whitespace! The layout breathes perfectly.`;
        result.className = 'exercise-result success';
    } else if (total >= 50) {
        result.textContent = `👍 Score: ${total}/100 — Good, but try adding a bit more breathing room.`;
        result.className = 'exercise-result info';
    } else {
        result.textContent = `🔄 Score: ${total}/100 — Elements feel cramped or too spread out. Aim for balance.`;
        result.className = 'exercise-result fail';
    }
});

updateWSExercise();

// ============ EXERCISE: CONTRAST CHECKER ============
function getLuminance(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const toLinear = c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function updateContrast() {
    const fg = document.getElementById('contrast-fg').value;
    const bg = document.getElementById('contrast-bg').value;
    const preview = document.getElementById('contrast-preview');
    const text = document.getElementById('contrast-text');

    preview.style.backgroundColor = bg;
    text.style.color = fg;

    const l1 = getLuminance(fg);
    const l2 = getLuminance(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    document.getElementById('contrast-ratio').textContent = ratio.toFixed(2) + ':1';
    const grade = document.getElementById('contrast-grade');

    if (ratio >= 7) {
        grade.textContent = 'AAA ✓';
        grade.className = 'contrast-pass';
    } else if (ratio >= 4.5) {
        grade.textContent = 'AA ✓';
        grade.className = 'contrast-pass';
    } else {
        grade.textContent = 'Fail ✗';
        grade.className = 'contrast-fail';
    }
}

['contrast-fg', 'contrast-bg'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateContrast);
});
updateContrast();

// ============ EXERCISE: GRID BUILDER ============
function updateGridBuilder() {
    const cols = document.getElementById('grid-cols').value;
    const gap = document.getElementById('grid-gap').value;
    document.getElementById('gc-val').textContent = cols;
    document.getElementById('gg-val').textContent = gap;
    const grid = document.getElementById('grid-builder');
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gap = gap + 'px';
}

['grid-cols', 'grid-gap'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateGridBuilder);
});
updateGridBuilder();

// ============ EXERCISE: BUTTON DESIGNER ============
function updateBtnDesigner() {
    const btn = document.getElementById('designed-btn');
    const bg = document.getElementById('btn-bg').value;
    const tc = document.getElementById('btn-text-color').value;
    const px = document.getElementById('btn-px').value;
    const py = document.getElementById('btn-py').value;
    const br = document.getElementById('btn-br').value;
    const fs = document.getElementById('btn-fs').value;

    document.getElementById('btn-px-val').textContent = px;
    document.getElementById('btn-py-val').textContent = py;
    document.getElementById('btn-br-val').textContent = br;
    document.getElementById('btn-fs-val').textContent = fs;

    btn.style.background = bg;
    btn.style.color = tc;
    btn.style.padding = `${py}px ${px}px`;
    btn.style.borderRadius = br + 'px';
    btn.style.fontSize = fs + 'px';

    document.getElementById('btn-code').textContent =
        `background: ${bg}; color: ${tc}; padding: ${py}px ${px}px; border-radius: ${br}px; font-size: ${fs}px;`;
}
['btn-bg','btn-text-color','btn-px','btn-py','btn-br','btn-fs'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateBtnDesigner);
});
updateBtnDesigner();

// ============ EXERCISE: CARD BUILDER ============
function updateCardBuilder() {
    const card = document.getElementById('built-card');
    const header = document.getElementById('built-card-header');
    const bg = document.getElementById('card-bg').value;
    const hbg = document.getElementById('card-header-bg').value;
    const br = document.getElementById('card-br').value;
    const sh = document.getElementById('card-shadow').value;
    const pad = document.getElementById('card-pad').value;

    document.getElementById('card-br-val').textContent = br;
    document.getElementById('card-shadow-val').textContent = sh;
    document.getElementById('card-pad-val').textContent = pad;

    card.style.background = bg;
    card.style.borderRadius = br + 'px';
    card.style.boxShadow = `0 4px ${sh}px rgba(0,0,0,0.3)`;
    header.style.background = hbg;
    header.style.padding = pad + 'px';
    card.querySelector('.built-card-body').style.padding = pad + 'px';

    document.getElementById('card-code').textContent =
        `background: ${bg}; border-radius: ${br}px; box-shadow: 0 4px ${sh}px rgba(0,0,0,0.3);`;
}
['card-bg','card-header-bg','card-br','card-shadow','card-pad'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateCardBuilder);
});
updateCardBuilder();

// ============ EXERCISE: COLOR HARMONY QUIZ ============
let currentHarmony = '';

function generateHarmonyQuiz() {
    const baseHue = Math.floor(Math.random() * 360);
    const types = ['complementary', 'analogous', 'triadic', 'monochromatic'];
    currentHarmony = types[Math.floor(Math.random() * types.length)];

    let hues = [];
    switch (currentHarmony) {
        case 'complementary': hues = [baseHue, (baseHue + 180) % 360]; break;
        case 'analogous': hues = [baseHue, (baseHue + 30) % 360, (baseHue + 60) % 360]; break;
        case 'triadic': hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360]; break;
        case 'monochromatic': hues = [baseHue]; break;
    }

    const palette = document.getElementById('harmony-quiz-palette');
    palette.innerHTML = '';

    if (currentHarmony === 'monochromatic') {
        [30, 45, 60, 75, 90].forEach(l => {
            const s = document.createElement('span');
            s.style.background = `hsl(${baseHue}, 70%, ${l}%)`;
            palette.appendChild(s);
        });
    } else {
        hues.forEach(h => {
            const s = document.createElement('span');
            s.style.background = `hsl(${h}, 70%, 55%)`;
            palette.appendChild(s);
            if (hues.length < 4) {
                const s2 = document.createElement('span');
                s2.style.background = `hsl(${h}, 50%, 75%)`;
                palette.appendChild(s2);
            }
        });
    }

    document.getElementById('harmony-result').textContent = '';
    document.getElementById('harmony-result').className = 'exercise-result';
    document.querySelectorAll('.harmony-opt').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
    });
}

document.querySelectorAll('.harmony-opt').forEach(btn => {
    btn.addEventListener('click', () => {
        const result = document.getElementById('harmony-result');
        if (btn.dataset.answer === currentHarmony) {
            result.textContent = `Correct! This is a ${currentHarmony} palette.`;
            result.className = 'exercise-result success';
        } else {
            result.textContent = `Not quite. This is a ${currentHarmony} palette. Try the next one!`;
            result.className = 'exercise-result fail';
        }
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-outline');
    });
});

document.getElementById('new-quiz').addEventListener('click', generateHarmonyQuiz);
generateHarmonyQuiz();

// ============ EXERCISE: RESPONSIVE TESTER ============
document.querySelectorAll('.resp-size').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.resp-size').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const frame = document.getElementById('responsive-frame');
        const w = btn.dataset.width;
        if (w === '100%') {
            frame.style.width = '100%';
            frame.removeAttribute('data-width');
        } else {
            frame.style.width = w + 'px';
            frame.setAttribute('data-width', w);
        }
        document.getElementById('resp-width-val').textContent = w === '100%' ? '100%' : w + 'px';
    });
});

// ============ DESIGN PRACTICE BOARD ============
(function designBoard() {
    const canvas = document.getElementById('board-canvas');
    const tempCanvas = document.getElementById('board-temp-canvas');
    const gridCanvas = document.getElementById('board-grid-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const tempCtx = tempCanvas.getContext('2d');
    const gridCtx = gridCanvas.getContext('2d');

    let currentTool = 'brush';
    let isDrawing = false;
    let startX = 0, startY = 0;
    let undoStack = [];
    const MAX_UNDO = 30;

    // Init canvas background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();

    function saveState() {
        if (undoStack.length >= MAX_UNDO) undoStack.shift();
        undoStack.push(canvas.toDataURL());
    }

    function getColor() { return document.getElementById('board-color').value; }
    function getSize() { return parseInt(document.getElementById('board-size').value); }
    function getOpacity() { return parseFloat(document.getElementById('board-opacity').value); }

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    // Tool selection
    document.querySelectorAll('.board-tool').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.board-tool').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTool = btn.dataset.tool;
            document.getElementById('board-tool-name').textContent =
                btn.getAttribute('title') || currentTool;
            canvas.style.cursor = currentTool === 'text' ? 'text' : 'crosshair';
        });
    });

    // Quick colors
    document.querySelectorAll('.qcolor').forEach(c => {
        c.addEventListener('click', () => {
            document.getElementById('board-color').value = c.dataset.color;
        });
    });

    // Size & opacity display
    document.getElementById('board-size').addEventListener('input', e => {
        document.getElementById('board-size-val').textContent = e.target.value + 'px';
    });
    document.getElementById('board-opacity').addEventListener('input', e => {
        document.getElementById('board-opacity-val').textContent = Math.round(e.target.value * 100) + '%';
    });

    // Canvas background
    document.getElementById('board-canvas-bg').addEventListener('change', e => {
        const val = e.target.value;
        if (val === 'transparent') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = val;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        saveState();
    });

    // Grid toggle
    document.getElementById('board-grid-toggle').addEventListener('change', e => {
        if (e.target.checked) drawGrid();
        else gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    });

    function drawGrid() {
        gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
        gridCtx.strokeStyle = 'rgba(150,150,150,0.15)';
        gridCtx.lineWidth = 0.5;
        const step = 25;
        for (let x = 0; x <= gridCanvas.width; x += step) {
            gridCtx.beginPath(); gridCtx.moveTo(x, 0); gridCtx.lineTo(x, gridCanvas.height); gridCtx.stroke();
        }
        for (let y = 0; y <= gridCanvas.height; y += step) {
            gridCtx.beginPath(); gridCtx.moveTo(0, y); gridCtx.lineTo(gridCanvas.width, y); gridCtx.stroke();
        }
    }

    // Drawing
    canvas.addEventListener('mousedown', e => {
        const pos = getPos(e);
        isDrawing = true;
        startX = pos.x;
        startY = pos.y;

        if (currentTool === 'brush' || currentTool === 'eraser') {
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.lineWidth = getSize();
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.globalAlpha = getOpacity();
            if (currentTool === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
            } else {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = getColor();
            }
        }

        if (currentTool === 'fill') {
            ctx.globalAlpha = getOpacity();
            ctx.fillStyle = getColor();
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
            isDrawing = false;
            saveState();
        }

        if (currentTool === 'text') {
            isDrawing = false;
            const text = prompt('Enter text:');
            if (text) {
                ctx.globalAlpha = getOpacity();
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = getColor();
                ctx.font = `${getSize() * 4}px Inter, sans-serif`;
                ctx.fillText(text, pos.x, pos.y);
                ctx.globalAlpha = 1;
                saveState();
            }
        }
    });

    canvas.addEventListener('mousemove', e => {
        const pos = getPos(e);
        document.getElementById('board-pos').textContent = `${Math.round(pos.x)}, ${Math.round(pos.y)}`;

        if (!isDrawing) return;

        if (currentTool === 'brush' || currentTool === 'eraser') {
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }

        if (currentTool === 'rect' || currentTool === 'circle' || currentTool === 'line') {
            tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            tempCtx.strokeStyle = getColor();
            tempCtx.lineWidth = getSize();
            tempCtx.globalAlpha = getOpacity();
            tempCtx.beginPath();

            if (currentTool === 'rect') {
                tempCtx.strokeRect(startX, startY, pos.x - startX, pos.y - startY);
            } else if (currentTool === 'circle') {
                const rx = Math.abs(pos.x - startX) / 2;
                const ry = Math.abs(pos.y - startY) / 2;
                const cx = startX + (pos.x - startX) / 2;
                const cy = startY + (pos.y - startY) / 2;
                tempCtx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
                tempCtx.stroke();
            } else if (currentTool === 'line') {
                tempCtx.moveTo(startX, startY);
                tempCtx.lineTo(pos.x, pos.y);
                tempCtx.stroke();
            }
        }
    });

    function endDraw(e) {
        if (!isDrawing) return;
        isDrawing = false;

        if (currentTool === 'brush' || currentTool === 'eraser') {
            ctx.closePath();
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
            saveState();
        }

        if (currentTool === 'rect' || currentTool === 'circle' || currentTool === 'line') {
            const pos = getPos(e);
            ctx.strokeStyle = getColor();
            ctx.lineWidth = getSize();
            ctx.globalAlpha = getOpacity();
            ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();

            if (currentTool === 'rect') {
                ctx.strokeRect(startX, startY, pos.x - startX, pos.y - startY);
            } else if (currentTool === 'circle') {
                const rx = Math.abs(pos.x - startX) / 2;
                const ry = Math.abs(pos.y - startY) / 2;
                const cx = startX + (pos.x - startX) / 2;
                const cy = startY + (pos.y - startY) / 2;
                ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
                ctx.stroke();
            } else if (currentTool === 'line') {
                ctx.moveTo(startX, startY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            }

            ctx.globalAlpha = 1;
            tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            saveState();
        }
    }

    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mouseleave', endDraw);

    // Undo
    document.getElementById('board-undo').addEventListener('click', () => {
        if (undoStack.length > 1) {
            undoStack.pop();
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
            img.src = undoStack[undoStack.length - 1];
        }
    });

    // Clear
    document.getElementById('board-clear').addEventListener('click', () => {
        const bgSelect = document.getElementById('board-canvas-bg').value;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (bgSelect !== 'transparent') {
            ctx.fillStyle = bgSelect;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        saveState();
    });

    // Download
    document.getElementById('board-download').addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'innocent-canvas.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
})();
