const questions = [
    {
        question: "Quelle marque est connue pour sa voiture 'Model S' électrique ?",
        answers: [
            "Tesla",
            "Toyota",
            "BMW"
        ],
        correct: 0
    },
    {
        question: "Quel constructeur automobile est célèbre pour son logo avec un cheval cabré ?",
        answers: [
            "Ferrari",
            "Lamborghini",
            "Porsche"
        ],
        correct: 0
    },
    {
        question: "Quelle est l'origine de la marque automobile Peugeot ?",
        answers: [
            "Allemagne",
            "France",
            "Italie"
        ],
        correct: 1
    },
    {
        question: "Quelle voiture est surnommée 'La Coccinelle' ?",
        answers: [
            "Fiat 500",
            "Volkswagen Beetle",
            "Mini Cooper"
        ],
        correct: 1
    },
    {
        question: "Quel constructeur produit la série de voitures 'Mustang' ?",
        answers: [
            "Ford",
            "Chevrolet",
            "Dodge"
        ],
        correct: 0
    },
    {
        question: "Quelle entreprise est connue pour ses voitures hybrides comme la Prius ?",
        answers: [
            "Toyota",
            "Nissan",
            "Honda"
        ],
        correct: 0
    },
    {
        question: "Quelle marque de voitures de luxe est allemande ?",
        answers: [
            "Lexus",
            "Mercedes-Benz",
            "Jaguar"
        ],
        correct: 1
    },
    {
        question: "Comment appelle-t-on le type de moteur utilisé dans une Tesla ?",
        answers: [
            "Moteur thermique",
            "Moteur électrique",
            "Moteur hybride"
        ],
        correct: 1
    },
    {
        question: "Quel modèle de Bugatti est célèbre pour sa vitesse ?",
        answers: [
            "Chiron",
            "Veyron",
            "Both"
        ],
        correct: 2
    },
    {
        question: "Quel constructeur est connu pour le slogan 'Das Auto' ?",
        answers: [
            "Volkswagen",
            "BMW",
            "Audi"
        ],
        correct: 0
    }
];

const quiz = document.querySelector('#quiz');
const scoreMessage = document.querySelector('#score');
let correctAnswers = 0;
let selectedAnswers = Array(questions.length).fill(null);

// Check if scoreMessage is found
if (!scoreMessage) {
    console.error('Error: #score element not found in the DOM');
}

if (!quiz) {
    console.error('Error: #quiz element not found in the DOM');
}

// Render the questions and answers dynamically
questions.forEach((item, index) => {
    const quizItem = document.createElement('div');
    quizItem.className = 'quiz-item';

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = item.question;
    quizItem.appendChild(questionTitle);

    const answerList = document.createElement('dl');
    item.answers.forEach((answer, idx) => {
        const option = document.createElement('dt');

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `question-${index}`;
        radio.value = idx;

        radio.addEventListener('change', () => {
            selectedAnswers[index] = parseInt(radio.value);
            checkAnswersFilled();  // Check if all answers are filled
        });

        const label = document.createElement('span');
        label.textContent = answer;

        option.appendChild(radio);
        option.appendChild(label);
        answerList.appendChild(option);
    });

    quizItem.appendChild(answerList);
    quiz.appendChild(quizItem);
});

// Create and add the finish button
const finishButton = document.createElement('button');
finishButton.textContent = 'Terminer le quiz';
finishButton.style.marginTop = '20px';
finishButton.disabled = true; 

finishButton.addEventListener('click', () => {

    const allAnswered = selectedAnswers.every(answer => answer !== null);

    if (allAnswered) {

        correctAnswers = 0;
        selectedAnswers.forEach((answer, index) => {
            if (answer === questions[index].correct) {
                correctAnswers++;
            }
        });

            if (correctAnswers <= 5) {
                scoreMessage.style.color = 'red';
            } else {
                scoreMessage.style.color = 'green';    
            }



        if (scoreMessage) {
            scoreMessage.style.visibility = 'visible';
            scoreMessage.textContent = `Votre score est : ${correctAnswers} / ${questions.length}`;
        }


        window.scrollTo({ top: 0, behavior: 'smooth' });

    } else {

        if (scoreMessage) {
            scoreMessage.style.visibility = 'visible';
            scoreMessage.textContent = 'Veuillez remplir toutes les questions avant de terminer.';
        }
    }


    const quizItems = document.querySelectorAll('.quiz-item');
    quizItems.forEach(item => {
        item.style.filter = 'blur(8px)';
    });


    finishButton.disabled = true;
});


const checkAnswersFilled = () => {
    const allAnswered = selectedAnswers.every(answer => answer !== null); 
    finishButton.disabled = !allAnswered;
};


quiz.appendChild(finishButton);
