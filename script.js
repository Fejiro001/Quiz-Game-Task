const totalQuestions=document.querySelector(".question-total");
const questionNumber=document.querySelector(".question-num");
const question=document.querySelector(".question");
const option=document.querySelector(".options").children;
const opt1=document.querySelector(".option1");
const opt2=document.querySelector(".option2");
const opt3=document.querySelector(".option3");
const opt4=document.querySelector(".option4");
const answerTrackerHouse=document.querySelector(".answers-tracker");
const correctlyAnswered=document.querySelector(".answered-correctly");
const totalQuestions2=document.querySelector(".question-total2");
let questionId;
//index is for the question number
let index=0;
let myArray=[];
let myArr=[];
let score=0;

//Questions and options to be displayed
const questions=[
	{
		q:'Where are the CPU and memory located?',
		options:['Expansion board', 'Motherboard', 'Storage device', 'Output device'],
		answer:1
	},
	{
		q:'What language does computer use to process data?',
		options:['Kilobyte', 'Representational', 'Processing', 'Binary'],
		answer:3
	},
	{
		q:'Servers are computers that provide resources to other computers connected to?',
		options:['Network', 'Mainframe', 'Client', 'Super Computer'],
		answer:0
	},
	{
		q:'Which of the following is not a computer language?',
		options:['BASIC', 'Go', 'Fast', 'Pascal'],
		answer:2
	},
	{
		q:'The first computer language developed for programming is?',
		options:['C++', 'Fortran', 'C', 'BASIC'],
		answer:1
	}
]

//total number of questions is equal to length of the questions
totalQuestions.innerHTML=questions.length;
function display(){
	questionNumber.innerHTML=index+1;
	//shows HTML from the questions array and puts them in the browser window
	question.innerHTML=questions[questionId].q;
	opt1.innerHTML=questions[questionId].options[0];
	opt2.innerHTML=questions[questionId].options[1];
	opt3.innerHTML=questions[questionId].options[2];
	opt4.innerHTML=questions[questionId].options[3];
	index++;
}

//Clicking an option as answer to question
function scan(element){
	//If clicked option is correct, display the css style for it
	if (element.id==questions[questionId].answer) {
		element.classList.add("correct");
		syncAnswerTracker("correct")
		score++;
		console.log(score);
	}
	else{
		//If clicked option is wrong, display the css style for it
		element.classList.add("wrong");
		syncAnswerTracker("wrong")
	}
	disableOptions()
}

//Stops user from selecting another option after their first selection
function disableOptions(){
	for (let i = 0; i < option.length; i++) {
		option[i].classList.add("disable");
		if (option[i].id==questions[questionId].answer) {
			option[i].classList.add("correct");
		}
	}
}

//Enable clicking an option after the next button is clicked
function enableOptions(){
	for (let i = 0; i < option.length; i++) {
		option[i].classList.remove("correct","disable","wrong");
	}
}

//To generate random questions when reloaded
function randomQuestions(){
	//randomNumbers is equal to random integers from 0 to 4 (5 questions) 
	let randomNumber=Math.floor(Math.random()*questions.length);
	let foundDuplicate=0;
	if (index==questions.length) {
		quizOver();
	}
	else{
		//if length of the array is greater than 0,
		if (myArray.length>0) {
			//then for k=(0 to 4)
			for (let k = 0; k < myArray.length; k++) {
				/*if myArray[k] is equal to randomNumber then duplicate 
				is found, then foundDuplicate=1 and break loop*/
				if(myArray[k]==randomNumber) {
					foundDuplicate=1;
					break;
				}
			}
			//if duplicate is found return to randomQuestion function
			if(foundDuplicate==1){
				randomQuestions();
			}
			else{
				questionId=randomNumber;
				display();
				myArr.push(questionId);
			}
		}
		//if the length of the array is equal to zero, display
		if (myArray.length==0) {
			questionId=randomNumber;
			display();
			myArr.push(questionId);
		}
		myArray.push(randomNumber);
	}	
}

//Visual display of score when an answering
function answerTracker(){
	for (let j = 0; j < questions.length; j++) {
		const div=document.createElement("div")
			answerTrackerHouse.appendChild(div);
	}
}

//sync with the selected ootion
function syncAnswerTracker(classNam){
	answerTrackerHouse.children[index-1].classList.add(classNam);
}

/*Check for if the user selected an option
before clicking next*/
function validate(){
	//if the first child does not have class disabled
	if(!option[0].classList.contains("disable")){
		alert("No option selected")
	}
	else{
		enableOptions();
		randomQuestions();
	}
}

//on clicking the next button
function next(){
	validate();
}

//When the quiz is over and next button is clicked
function quizOver(){
	document.querySelector(".quiz-over").classList.add("show");
	correctlyAnswered.innerHTML=score;
	totalQuestions2.innerHTML=questions.length;
}

//When the start over button is clicked, browser window will reload
function startOver(){
	window.location.reload();
}

//Loaded on the browser
window.onload=function(){
	randomQuestions();
	answerTracker();
}