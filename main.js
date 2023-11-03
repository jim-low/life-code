const birthdateInput = document.getElementById("birthdate");
const suanButton = document.getElementById("suan-button");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - window.innerWidth * 0.2;
canvas.height = window.innerHeight * 0.8;

suanButton.addEventListener("click", (_) => {
    const birthdate = birthdateInput.value;
    const data = calculateLifeCode(birthdate);
    redrawCanvas(data);
});

window.addEventListener("resize", redrawCanvas);

function splitBirthdate(birthdate) {
    const monthDay = birthdate.substring(0, birthdate.length / 2);
    const month = monthDay.substring(0, monthDay.length / 2);
    const day = monthDay.substring(monthDay.length / 2, monthDay.length);
    const year = birthdate.substring(birthdate.length / 2, birthdate.length);
    const year1 = year.substring(0, year.length / 2);
    const year2 = year.substring(year.length / 2, year.length);
    return [month, day, year1, year2];
}

function addDigits(number) {
    number = number + "";
    let result = 0;

    while (number.length != 1) {
        result = +number[0] + +number[1];
        number = result + "";
    }

    return result;
}

function calculateLifeCode(birthdate) {
    const [month, day, year1, year2] = splitBirthdate(birthdate);
    const i = addDigits(day);
    const j = addDigits(month);
    const k = addDigits(year1);
    const l = addDigits(year2);
    const m = addDigits(i + "" + j);
    const n = addDigits(k + "" + l);
    const o = addDigits(m + "" + n);
    const p = addDigits(m + "" + o);
    const q = addDigits(n + "" + o);
    const r = addDigits(q + "" + p);
    const s = addDigits(j + "" + m);
    const t = addDigits(i + "" + m);
    const u = addDigits(t + "" + s);
    const v = addDigits(k + "" + n);
    const w = addDigits(l + "" + n);
    const x = addDigits(v + "" + w);

    // yes, this looks hideous, i know
    return {
        date: {
            day,
            month,
            year1,
            year2,
        },
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w,
        x,
    };
}

function redrawCanvas(data) {
    canvas.width = window.innerWidth - window.innerWidth * 0.2;
    canvas.height = window.innerHeight * 0.8;

    drawTriangle();
    insertLines();
    insertNumbers(data);
}

function drawTriangle() {
    const lineWidth = 7;
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.moveTo(lineWidth, lineWidth);
    ctx.lineTo(canvas.width - lineWidth, lineWidth);
    ctx.lineTo(canvas.width / 2, canvas.height - lineWidth);
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

function insertLines() {
    const lineWidth = 7;
    ctx.lineWidth = lineWidth;
    const triangleHeight = canvas.height - lineWidth;
    const sectionHeight = triangleHeight / 3;

    // straight line middle down
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, lineWidth);
    ctx.lineTo(canvas.width / 2, sectionHeight * 2);
    ctx.stroke();
    ctx.closePath();

    // straight line section 1
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.3, lineWidth);
    ctx.lineTo(canvas.width * 0.3, sectionHeight);
    ctx.stroke();
    ctx.closePath();

    // straight line section 2
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.7, lineWidth);
    ctx.lineTo(canvas.width * 0.7, sectionHeight);
    ctx.stroke();
    ctx.closePath();

    // horizontal line section 1
    ctx.beginPath();
    ctx.moveTo(canvas.width / 6, sectionHeight);
    ctx.lineTo((canvas.width / 6) * 5, sectionHeight);
    ctx.stroke();
    ctx.closePath();

    // horizontal line section 2
    ctx.beginPath();
    ctx.moveTo((canvas.width / 6) * 2, sectionHeight * 2);
    ctx.lineTo((canvas.width / 6) * 4, sectionHeight * 2);
    ctx.stroke();
    ctx.closePath();
}

function insertNumbers(data) {
    const fontSize = 7.8;
    const fontStyle = "sans-serif";
    ctx.font = `${fontSize}vw ${fontStyle}`;
    ctx.fillText(data.i, (canvas.width / 6) * 1, canvas.height / 6 + 85 / 3);
    ctx.fillText(
        data.j,
        (canvas.width / 6) * 2 + 85 / 4,
        canvas.height / 6 + 85 / 3,
    );
    ctx.fillText(
        data.k,
        (canvas.width / 6) * 3 + 85 / 2,
        canvas.height / 6 + 85 / 3,
    );
    ctx.fillText(
        data.l,
        (canvas.width / 6) * 5 - 85 / 2,
        canvas.height / 6 + 85 / 3,
    );
    ctx.fillText(data.m, canvas.width / 3 + 85 / 3, canvas.height / 2 + 85 / 3);
    ctx.fillText(data.n, canvas.width / 2 + 85 / 2, canvas.height / 2 + 85 / 3);
    ctx.fillText(data.o, canvas.width / 2 - 85 / 4, canvas.height - 85);
}

// auto test code
birthdateInput.value = "06202002";
const birthdate = birthdateInput.value;
const data = calculateLifeCode(birthdate);
redrawCanvas(data);
