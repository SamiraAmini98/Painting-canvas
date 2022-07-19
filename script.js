const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasOverlay = document.getElementById("canvas-overlay");
const ctxOverlay = canvasOverlay.getContext("2d");
const { width, height } = canvas.getBoundingClientRect();
const { widthOverlay, heightOverlay } = canvasOverlay.getBoundingClientRect();
const colors = document.querySelectorAll("#colorPiker div");
const toolDraw = document.querySelectorAll("#tool-draw div");
const drawCircle1 = document.querySelector(".draw-circle");
const trash = document.querySelector(".trash");
const pen1 = document.querySelector(".pen-1");
const eraser = document.querySelector(".eraser");

// let state = false;
// let stateCircle = false;
// let stateEraser = false;
const state = {
    drawMod: false,
    drawTool: "pencil",
    startPoint: [0, 0],
};

fixedCanvasSize();
const mousePosition = document.getElementById("mousePosition");
canvasOverlay.addEventListener("mousemove", (e) => {
    const { startPoint } = state;
    if (state.drawMod) {
        switch (state.drawTool) {
            //
            case "circle":
                ctxOverlay.beginPath();
                ctxOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
                ctxOverlay.ellipse(
                    startPoint[0],
                    startPoint[1],
                    Math.abs(e.clientX - startPoint[0]),
                    Math.abs(e.clientY - startPoint[1]),
                    0,
                    0,
                    2 * Math.PI
                );
                ctxOverlay.stroke();
                break;

            default:
                drawCircle(e.clientX, e.clientY);
                break;
        }
    }
});
document.body.addEventListener("mouseup", (e) => {
    ctx.beginPath();

    state.drawMod = false;
    switch (state.drawTool) {
        //
        case "circle":
            ctx.drawImage(canvasOverlay, 0, 0);
    }

    //
});
canvasOverlay.addEventListener("mousedown", (e) => {
    state.startPoint = [e.clientX, e.clientY];

    state.drawMod = true;
});

const drawPoint = function(x, y) {
    ctx.fillRect(x, y, 1, 1);
};
const drawCircle = function(x, y) {
    ctx.arc(x, y, 1, 0, 0);
    // ctx.beginPath();
    ctx.stroke();
    // ctx.fill();
};

colors.forEach((element) => {
    element.addEventListener("click", (event) => {
        ctx.beginPath();
        ctx.strokeStyle = element.style.backgroundColor;
        ctxOverlay.strokeStyle = element.style.backgroundColor;

        document.querySelector(".colors.color-select").className = "colors";
        event.target.className += " color-select";
    });
});
toolDraw.forEach((element) => {
    element.addEventListener("click", (event) => {
        const selectTool = document.querySelector(".tool.active");
        selectTool.className = selectTool.className.replace("active", "");
        event.target.className += " active";
        state.drawTool = event.target.id;
        console.log(state.drawTool);
    });
});
trash.addEventListener("click", () => {
    ctxOverlay.clearRect(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);
});

eraser.addEventListener("click", () => {
    square();
});
window.addEventListener("resize", fixedCanvasSize);

function fixedCanvasSize() {
    const { width, height } = canvas.getBoundingClientRect();
    // create a temporary canvas obj to cache the pixel data //
    const temp_canvas = document.createElement("canvas");
    const temp_ctx = temp_canvas.getContext("2d");
    // set it to the new width & height and draw the current canvas data into it //
    temp_canvas.width = width;
    temp_canvas.height = height;
    temp_ctx.fillStyle = "#fff"; // the original canvas's background color
    temp_ctx.fillRect(0, 0, width, height);
    temp_ctx.drawImage(canvas, 0, 0);
    // resize & clear the original canvas and copy back in the cached pixel data //
    canvas.width = width;
    canvas.height = height;
    canvasOverlay.width = width;
    canvasOverlay.height = height;
    ctx.drawImage(temp_canvas, 0, 0);
    temp_canvas.remove();
}

const square = function(x, y) {
    ctx.fillRect(x, y, 20, 20);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    // ctx.strokeStyle = "#fff";
    console.log("Ssss");
};