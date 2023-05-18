// https://github.com/okkey01/week1quiz.git

svg = document.getElementById('base-svg');
//Set its width and height to chosen numbers. 
let width = 800; 
let height = 800;
let upper = 255;
svg.setAttribute('width', width);
svg.setAttribute('height', height);

function randomInt(upper) {

    let output = Math.random();
    output *= upper ?? 1;
    output  = Math.round(output);
    // return Math.round(Math.random() * upper);
    return output;
    

}
  
function random(upper) {

    let output = Math.random();
    output *= upper ?? 1;
    // return Math.round(Math.random() * upper);
    return output;
    
}


//random color for my shapes
function makeRGB(redInputValue, greenInputValue, blueInputValue) {
    //Here, we test if there is a specific user input. If yes, then that value is assigned
    //to the output. Otherwise, a random value is generated. 

    // if(redInputValue == null){
    //     redOutputValue = Math.round(Math.random() * 255);
    // }else{
    //     redOutputValue = redInputValue;
    // }
    let redOutputValue = redInputValue ?? random(255);
    let greenOutputValue = greenInputValue ?? random(255);
    let blueOutputValue = blueInputValue ?? random(255);

   
    //Now we define a string and pass these output values into a string. 
    return `rgb(${redOutputValue},${greenOutputValue},${blueOutputValue})`;
}

// random odd number
function makeRandomOddNumber(upper){
    return (Math.round(Math.random()*(upper/2))*2)+1;
}
// random even number
function makeRandomEvenNumber(upper){
    return (Math.round(Math.random()*(upper/2))*2);
}

// according to input to get random even or odd r,g,b
function getOddorEvenColor(judge){
    if (judge % 2 == 0){
        r = makeRandomEvenNumber(upper);
        g = makeRandomEvenNumber(upper);
        b = makeRandomEvenNumber(upper);
        return [r,g,b];
    }
    else {
        r = makeRandomOddNumber(upper);
        g = makeRandomOddNumber(upper);
        b = makeRandomOddNumber(upper);
        return [r,g,b];
    }
}

//the function to draw the circle
function drawCircle(cx,cy,cr,r,g,b) {
    let X = cx ?? randomInt(width/2);
    let Y = cy ?? randomInt(height/2);
    let R = cr ?? randomInt(width/2);
    let C = makeRGB(r,g,b);

    let newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    newCircle.setAttribute("cx", X);
    newCircle.setAttribute("cy", Y);
    newCircle.setAttribute("r", R);
    newCircle.setAttribute('fill', C);

    svg.appendChild(newCircle);

}


let distance_of_rad_of_circles = 10;
let rad = random(10);

//draw 4 areas of 10 circles with even and odd adjacent colors
for (let i = 0; i < 50; i++){
    cx = random(1000);
    cy = random (1000);
    for (let y = 0; y < 50; y++){
        let [r,g,b] = getOddorEvenColor(y);
        drawCircle(cx,cy,rad,r,g,b);
        rad -= distance_of_rad_of_circles;
    }

}
window.addEventListener("resize", resizeSvg);

function resizeSvg(){
    let bbox = svg.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);
    for(let circle of svg.children){
        circle.setAttribute('r',  Math.min(bbox.width, bbox.height) * 0.05);
    }
}

resizeSvg();


