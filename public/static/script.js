const img = document.getElementById("myImg");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('models'),
    faceapi.nets.faceExpressionNet.loadFromUri('models'),
    faceapi.nets.ageGenderNet.loadFromUri("models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("models")
]).then(console.log("12345 loaded"));

//console.log(faceapi.nets);

var loadFile = function(event) {
	img.src = URL.createObjectURL(event.target.files[0]);
};


img.addEventListener("load",function(){
    const canvas = faceapi.createCanvasFromMedia(img);
    document.body.append(canvas);
    const displaySize = {width: img.width, height: img.height}
    faceapi.matchDimensions(canvas, displaySize);
    
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender();
        //const detectionsWithAgeAndGender = await faceapi.detectAllFaces(img).withFaceLandmarks().withAgeAndGender()
        //const detection = await faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, 'models'));
        //const detections = await faceapi.detectAllFaces(img).withFaceLandmarks();
        //const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
        console.log(detections);
        //console.log(detectionsWithAgeAndGender);

        const duygu = detections[0].expressions;

        const age = Math.floor(detections[0].age) ;
        const gender = detections[0].gender;
        const genderProbability = Math.round((detections[0].genderProbability*10000)/100) ;

      
        

        

        console.log(age+" "+gender+" "+ genderProbability);
        
        
        
        //console.log(duygu); 
        /* let dizi = Object.values(duygu);
        let min = Math.min(...dizi);
        let max = Math.max(...dizi); */

        //console.log("MİN : "+ min + " MAX : "+ max);
        //console.log("dizi"+dizi);

        

        const resizedDetections =  faceapi.resizeResults(detections,displaySize);

       /*  resizedDetections.forEach(result => {
            const { age, gender, genderProbability } = result;
            new faceapi.draw.DrawTextField(
              [
                `${age, 0} years`,
                `${gender} (${genderProbability})`
              ],
              result.detection.box.bottomRight
            ).draw(canvas);
          }); */

         /*  const text = [
            'This is a textline!',
            'This is another textline!'
          ]
          const anchor = { x: 200, y: 200 }

          const drawOptions = {
            anchorPosition: 'TOP_LEFT',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
 */
          
        //const ageResizedDetections = faceapi.resizeResults(detectionsWithAgeAndGender,displaySize);
        canvas.getContext("2d").clearRect(0,0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas,resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        document.getElementById("ageAndGenderDisplayer").innerHTML = "Age: "+age+ ", Gender: %" +genderProbability+" "+ gender;
        //faceapi.draw.DrawTextField()
        //faceapi.draw.drawFaceExpressions(canvas,ageResizedDetections);
     /*    const drawBox = new faceapi.draw.DrawTextField(text, anchor, drawOptions);
        drawBox.draw(document.getElementById("myImg")); */


       
    },1000 )


});




/* function cember () {
    img.src="pics/boga.png"
}

cember()
 */
