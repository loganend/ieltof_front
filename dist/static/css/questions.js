let questionContent1 = document.getElementById("question-content-1")
let questionContent2 = document.getElementById("question-content-2")
let questionContent3 = document.getElementById("question-content-3")

document.getElementById("title-1").addEventListener("click", function(){
    console.log("question-content-1")
    if(questionContent1.style.display === "none"){
        questionContent1.style.display = "block";
    }else{
        questionContent1.style.display = "none";
    }
},false);


document.getElementById("title-2").addEventListener("click", function(){
    if(questionContent2.style.display === "none"){
        questionContent2.style.display = "block";
    }else{
        questionContent2.style.display = "none";
    }
},false);


document.getElementById("title-3").addEventListener("click", function(){
    if(questionContent3.style.display === "none"){
        questionContent3.style.display = "block";
    }else{
        questionContent3.style.display = "none";
    }
},false);


function insertTest(test){
    console.log("LAlAKLEFLKJFDskljlasjf;lksadf");
    console.log(test.part1.questions[0])
    var lis = document.getElementById("question-test-1").getElementsByTagName("li");
    console.log(lis[0])

    lis[0].innerHTML = test.part1.questions[0];
    lis[1].innerHTML = test.part1.questions[1];
    lis[2].innerHTML = test.part1.questions[2];     
    lis[3].innerHTML = test.part1.questions[3];

    console.log("donw")


}