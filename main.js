const birthdateInput = document.getElementById("birthdate");
const suanButton = document.getElementById("suan-button");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const margin = {
    x: 300,
    y: 250
};

suanButton.addEventListener('click', e => {
    const birthdate = birthdateInput.value;
    calculateLifeCode(birthdate);
})

function splitBirthdate(birthdate)
{
    const monthDay = birthdate.substring(0, birthdate.length / 2)
    const month = monthDay.substring(0, monthDay.length / 2)
    const day = monthDay.substring(monthDay.length / 2, monthDay.length)
    const year = birthdate.substring(birthdate.length / 2, birthdate.length)
    const year1 = year.substring(0, year.length / 2)
    const year2 = year.substring(year.length / 2, year.length)
    return [month, day, year1, year2];
}

function addDigits(number)
{
    number = number + ""
    let result = 0;

    while (number.length != 1)
    {
        result = (+number[0] + +number[1]);
        number = result + "";
    }

    return result;
}

function calculateLifeCode(birthdate)
{
    const [month, day, year1, year2] = splitBirthdate(birthdate)
    const i = addDigits(month);
    const j = addDigits(day);
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

    initializeCanvas();
    drawTriangle();
    insertLines();
}

function initializeCanvas()
{
    canvas.width = window.innerWidth - margin.x;
    canvas.height = window.innerHeight;
}

function drawTriangle()
{

    ctx.beginPath();
    ctx.moveTo(margin.x, 10);
    ctx.lineTo(canvas.width - margin.x, 10);
    ctx.lineTo(canvas.width / 2, canvas.height - margin.y);
    ctx.closePath();

    ctx.lineWidth = 7;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

function insertLines()
{
    const triangleHeight = canvas.height - margin.y;
    const sectionHeight = triangleHeight / 3;

    // straight line middle down
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 10);
    ctx.lineTo(canvas.width / 2, sectionHeight * 2);
    ctx.stroke();
    ctx.closePath();

    // horizontal line section 1
    ctx.beginPath();
    ctx.moveTo(120, sectionHeight);
    ctx.lineTo(canvas.width - 120, sectionHeight);
    ctx.stroke();
    ctx.closePath();

    // horizontal line section 2
    ctx.beginPath();
    ctx.moveTo(240, sectionHeight * 2);
    ctx.lineTo(canvas.width - 240, sectionHeight * 2);
    ctx.stroke();
    ctx.closePath();
}

// auto test code
birthdateInput.value = "06202002";
const birthdate = birthdateInput.value;
calculateLifeCode(birthdate);
