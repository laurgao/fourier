let time = 0;
let prevRe = [];
let prevIm = [];
// let slider;
// triangle:
// const pixelsRe = [-PI, (-3 * PI) / 4, -PI / 2, -PI / 4, 0, PI * 0.25, PI * 0.5, PI * 0.75, PI, PI, PI, PI, PI, PI, PI, PI, PI];
// const pixelsIm = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0, -0.25, -0.5, -0.75, -1];

function setup() {
    createCanvas(windowWidth, windowHeight);
    // slider = createSlider(1, 100, 10);
}

function draw() {
    const skip = 5;
    const pixelsRe = drawing.filter((p, idx) => idx % skip === 0).map((p) => p.x);
    const pixelsIm = drawing.filter((p, idx) => idx % skip === 0).map((p) => p.y);
    let fourierResult = [];
    const N = pixelsRe.length;
    for (let k = 1; k < N; k++) {
        let sumRe = 0;
        let sumIm = 0;
        for (let n = 0; n < N; n++) {
            let re = pixelsRe[n];
            let im = pixelsIm[n];
            let re2 = Math.cos((2 * Math.PI * n * k) / N);
            let im2 = -Math.sin((2 * Math.PI * n * k) / N);
            sumRe += re * re2 - im * im2;
            sumIm += re * im2 + im * re2;
        }
        // In order fourier returned values to become epicycles, I need amplitude frequency and phase.
        let amplitude = Math.sqrt(sumRe * sumRe + sumIm * sumIm);
        let phase = Math.atan2(sumIm, sumRe);
        let frequency = k;
        fourierResult.push({ amplitude, phase, frequency });
    }
    background(0);
    translate(windowWidth / 2, windowHeight / 2);

    // rn they're organized by frequency (k). now i want to sort them by amplitude.
    fourierResult = fourierResult.sort((a, b) => b.amplitude - a.amplitude);

    let prevX = 0;
    let prevY = 0;
    let x = 0;
    let y = 0;
    for (let i = 0; i < N - 1; i++) {
        let { amplitude, phase, frequency } = fourierResult[i];
        let normalization = Math.min(windowWidth, windowHeight) / (Math.max(...fourierResult.map((f) => f.amplitude)) * 5);
        let radius = amplitude * normalization;
        const offset = 0; // found experimentaly, no idea why it works.
        x += radius * cos(time * frequency + phase + offset);
        y += radius * sin(time * frequency + phase + offset);
        stroke(255);
        strokeWeight(2);
        noFill();
        stroke("rgba(100%,1000%,100%,0.2)");
        ellipse(prevX, prevY, radius * 2);
        stroke("rgba(100%,1000%,100%,0.5)");
        fill(255);
        line(prevX, prevY, x, y); // from center of circle to the dot
        prevX = x;
        prevY = y;
    }

    prevRe.unshift(x);
    prevIm.unshift(y);

    let prevXWave = prevRe[0];
    let prevYWave = prevIm[0];
    let opacity = 1;
    strokeWeight(2);
    for (let i = 0; i < prevRe.length; i++) {
        stroke(`rgba(100%,0%,100%,${opacity})`);
        line(prevXWave, prevYWave, prevRe[i], prevIm[i]);
        prevXWave = prevRe[i];
        prevYWave = prevIm[i];
        if (opacity > 0.1) {
            opacity -= 0.9 / N;
        }
    }
    const dt = (PI * 2) / N; // because 2pi is a full rotation
    time -= dt;
    if (time < -PI * 2) {
        // A full cycle has completed
        time = 0;
        prevRe.pop();
        prevIm.pop();
    }
}
