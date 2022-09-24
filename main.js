var array_1 = ["alarm clock","apple","axe","backpack","banana","basket","basketball","bee","birthday cake","blackberry","blueberry","book","bread","bridge","broom","bucket","bus","bush","butterfly","cactus","cake","camera","candle","car","carrot","castle","cat","circle","cloud","coffee cup","compass","computer","cookie","crayon","crown","cup","donut","door","drums","envelope","eraser","eye","fan","feather","fish","flower","foot","fork","frog","giraffe","grapes","grass","guitar","hat","headphones","hexagon","hot air balloon","hot dog","house","house plant","hurricane","ice cream","jacket","jail","kangaroo","key","keyboard","knife","laptop","leaf","light bulb","line","lipstick","map","marker","matches","moon","mosquito","mug","mushroom","nail","necklace","nose","ocean","octagon","octopus","onion","oven","owl","paintbrush","paint can","palm tree","panda","pants","pear","peas","pencil","penguin","piano","pillow","pineapple","pizza","rabbit","rainbow","scissors","smiley face","telephone","television","tennis racquet","tent","toothbrush","toothpaste","tree","triangle","umbrella","wheel","windmill","zigzag"];

function preload(){
    classifier= ml5.imageClassifier('DoodleNet');
}

rubber = 'off';


function setup(){
  canvas= createCanvas(400,400);  
  canvas.position(430,500);
  background('white');
  canvas.mouseReleased(classifyCanvas);
  synth= window.speechSynthesis;
}

function draw(){
    check_sketch();
    strokeWeight(8);
    if(mouseIsPressed && rubber == 'off'){
        stroke('black');
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

    if (mouseIsPressed && rubber == 'on'){
        stroke('white');
        rect(mouseX, mouseY, 30, 30);
    }
}

function erase(){
    rubber = 'on' ;  
}

function make(){
    rubber= 'off';
    strokeWeight(8);
    stroke('black');
}

random_no = Math.floor((Math.random()*array_1.length)+1)
console.log(array_1[random_no]);
sketch= array_1[random_no];
document.getElementById("stbd").innerHTML= 'Sketch to be drawn- '+ sketch;

///Variables///
timer_count= 0;
timer_check= " ";
drawn_sketch= " ";
answer_holder= " ";
score= 0;

 function classifyCanvas(){
    classifier.classify(canvas, gotResult);
 }

 function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        drawn_sketch= results[0].label;
        document.getElementById('doodle').innerHTML= "Your sketch is a " + drawn_sketch;
        document.getElementById('confidence').innerHTML= "Confidence: " +  Math.floor((results[0].confidence)*100) +"%";
    }
 }

function updateCanvas(){
    background('white');
    random_no = Math.floor((Math.random()*array_1.length)+1)
    console.log(array_1[random_no]+1);
    sketch= array_1[random_no]+1;
    document.getElementById("stbd").innerHTML= 'Sketch to be drawn- '+ sketch;
    document.getElementById('doodle').innerHTML="Doodle: ";
    document.getElementById('confidence').innerHTML="Confidence: ";
}

function check_sketch(){
timer_count= timer_count+1;
document.getElementById("time").innerHTML= timer_count;
console.log(timer_count);
if(timer_count>5000){
    timer_count= 0;
    timer_check= "completed"
    if(timer_check=="completed"){
        timer_check= " ";
        answer_holder= " ";
        updateCanvas();
    }
}
}

if (drawn_sketch == sketch){
    answer_holder= "set";
    score= score+1;
    document.getElementById('point').innerHTML= score;
    updateCanvas();
    timer_check= " ";
    timer_count= 0;
    answer_holder= " ";
}


else if(answer_holder=="set"){
    timer_check= " ";
    answer_holder= " ";
    updateCanvas();
}



