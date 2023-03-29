status="";
objects = [];

 function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture (VIDEO);
    video.size(500, 400);
    video.hide();
 }

 function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Object";
    name = document.getElementById('input1').value;
 }

 function modelLoaded()
 {
    console.log("Model Loaded!");
    status = true;
 }

 function draw() {
    image(video, 0, 0, 500, 400);
    if (status !="")
    {
      objectDetector.detect(gotResults);
      for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
           document.getElementById("number_of_objects").innerHTML = " Objects detected are : " + objects.length;
           
           fill("#FF0000");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x,  objects[i].y, objects[i].width, objects[i].height);
    }

    
   
 }
}

 function gotResults(error, results) {
   if (error) {
      console.log(error);
   }
   console.log(results);
   objects = results
 }