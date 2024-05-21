const songs = [
    { src: "https://www.youtube.com/watch?v=VIDEO_ID_1", answer: "Song Title 1" },
    { src: "https://www.youtube.com/watch?v=VIDEO_ID_2", answer: "Song Title 2" },
    // Ajoutez plus de chansons ici
];

let currentSongIndex = 0;
let score = 0;

const audioElement = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const answerInput = document.getElementById('answerInput');
const submitAnswerButton = document.getElementById('submitAnswer');
const scoreValue = document.getElementById('scoreValue');
const resultDiv = document.getElementById('result');

function loadSong(index) {
    if (index >= songs.length) {
        resultDiv.innerHTML = `<p>Félicitations ! Vous avez terminé le jeu avec un score de ${score}.</p>`;
        document.getElementById('game').style.display = 'none';
        return;
    }
    // Utilisation de l'API de YouTube pour intégrer la vidéo
    const videoId = new URL(songs[index].src).searchParams.get('v');
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`;
    audioElement.src = embedUrl;
}

playButton.addEventListener('click', () => {
    audioElement.src += '&autoplay=1';
});

submitAnswerButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = songs[currentSongIndex].answer.toLowerCase();
    if (userAnswer === correctAnswer) {
        score++;
        scoreValue.textContent = score;
        resultDiv.innerHTML = '<p>Bonne réponse !</p>';
    } else {
        resultDiv.innerHTML = `<p>Mauvaise réponse. La réponse correcte était "${songs[currentSongIndex].answer}".</p>`;
    }
    answerInput.value = '';
    currentSongIndex++;
    loadSong(currentSongIndex);
});

loadSong(currentSongIndex);
