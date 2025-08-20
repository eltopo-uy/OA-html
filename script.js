// -- base de datos de las misiones--
const missions = [
    {
        id: 1,
        title: "Misión 1: El título principal",
        description: "El título más importante de una página se define con la etiqueta h1. ¡Restaura el título principal!",
        brokenCode: '... El Planeta Digital ...',
        correctAnswer: '<h1>El Planeta Digital</h1>',
        badge: '🏆 Maestro de Títulos',
        isCompleted: false
    },
    {
        id: 2,
        title: "Misión 2: El párrafo informativo",
        description: "Los párrafos de texto se encierran en etiquetas p. Arregla este párrafo para que se muestre correctamente.",
        brokenCode: '... HTML es el esqueleto de la web ...',
        correctAnswer: '<p>HTML es el esqueleto de la web</p>',
        badge: '✍️ Arquitecto Textual',
        isCompleted: false
    },
    {
        id: 3,
        title: "Misión 3: La imagen perdida",
        description: "Para mostrar una imagen, se usa la etiqueta img con el atributo src. ¡Inserta la imagen del cohete!",
        brokenCode: '... imagen.png ...',
        correctAnswer: [ // <-- Ahora es un array de strings
    '<img src="imagen.png">',
    '<img src="imagen.png"/>',
    "<img src='imagen.png'>",
    '<img src="imagen.png" alt="cohete">',
    '<img alt="imagen" src="imagen.png">'
  ],
        badge: '🖼️ Curador Visual',
        isCompleted: false
    },
     {
        id: 4,
        title: "Misión 4: El enlace roto",
        description: "Los enlaces o hipervínculos se crean con la etiqueta a y el atributo href. Repara el enlace a la base de datos.",
        brokenCode: '... Ir a la Base de Datos ...',
        correctAnswer: '<a href="#">Ir a la Base de Datos</a>',
        badge: '🔗 Conector de Mundos',
        isCompleted: false
    }
];

// --- ESTADO DEL JUEGO ---
let currentMissionIndex = 0;
let completedMissions = 0;

// --- ELEMENTOS DEL DOM ---
const missionTitleEl = document.getElementById('mission-title');
const missionDescriptionEl = document.getElementById('mission-description');
const brokenCodeEl = document.getElementById('broken-code');
const userInputEl = document.getElementById('user-input');
const checkButton = document.getElementById('check-button');
const feedbackMessageEl = document.getElementById('feedback-message');
const progressBar = document.getElementById('progress-bar');
const badgesContainer = document.getElementById('badges-container');
const missionContainer = document.getElementById('mission-container');

// -- lógica del juego--

/**
 * crga una misión en la interfaz de usuario.
 * @param {number} index - el índice de la misión a cargar.
 */
function loadMission(index) {
    const mission = missions[index];
    missionTitleEl.textContent = mission.title;
    missionDescriptionEl.textContent = mission.description;
    brokenCodeEl.textContent = mission.brokenCode;
    userInputEl.value = ''; // limpiar input
    userInputEl.focus(); // poner el foco en el input
}

/**
 * Verifica la respuesta del usuario.
 */
function checkAnswer() {
    const mission = missions[currentMissionIndex];
    // limpiar y normalizar la respuesta del usuario y la correcta
    const userAnswer = userInputEl.value.trim();
    const correctAnswer = mission.correctAnswer;

    // quitar la animación de shake si existe
    userInputEl.classList.remove('shake');
    
    if (userAnswer === correctAnswer) {
        handleCorrectAnswer(mission);
    } else {
        handleIncorrectAnswer();
    }
}

/**
 * maneja la lógica cuando la respuesta es correcta.
 * @param {object} mission - la misión que fue completada
 */
function handleCorrectAnswer(mission) {
    feedbackMessageEl.textContent = "¡Código correcto! Sistema restaurado.";
    feedbackMessageEl.style.color = '#34D399'; // Verde
    mission.isCompleted = true;
    completedMissions++;
    
    updateProgressBar();
    addBadge(mission.badge);

    // deshabilitar el botón para evitar envíos múltiples
    checkButton.disabled = true;

    // esperar un momento antes de pasar a la siguiente misión
    setTimeout(() => {
        currentMissionIndex++;
        if (currentMissionIndex < missions.length) {
            loadMission(currentMissionIndex);
            feedbackMessageEl.textContent = ''; // Limpiar mensaje
            checkButton.disabled = false; // Rehabilitar botón
        } else {
            showFinalMessage();
        }
    }, 1500);
}

/**
 * maneja la lógica cuando la respuesta es incorrecta.
 */
function handleIncorrectAnswer() {
    feedbackMessageEl.textContent = "Error en el código. Revisa la sintaxis e inténtalo de nuevo.";
    feedbackMessageEl.style.color = '#F87171'; // Rojo
    userInputEl.classList.add('shake'); // Añadir animación
}

/**
 * Actualiza la barra de progreso.
 */
function updateProgressBar() {
    const progress = (completedMissions / missions.length) * 100;
    progressBar.value = progress;
}

/**
 * Agrega una medalla a la sección de medallas.
 * @param {string} badgeText - el texto de la medalla a añadir.
 */
function addBadge(badgeText) {
    if (completedMissions === 1) {
        badgesContainer.innerHTML = ''; // limpiar el mensaje inicial
    }
    const badgeEl = document.createElement('span');
    badgeEl.className = 'badge'; // uso una clase para estilizarla en CSS
    badgeEl.style.backgroundColor = '#064E3B';
    badgeEl.style.color = '#A7F3D0';
    badgeEl.style.fontSize = '0.875rem';
    badgeEl.style.fontWeight = '700';
    badgeEl.style.padding = '0.25rem 0.75rem';
    badgeEl.style.borderRadius = '9999px';
    badgeEl.style.border = '1px solid #047857';
    badgeEl.textContent = badgeText;
    badgesContainer.appendChild(badgeEl);
}

/**
 * muestra el mensaje final cuando todas las misiones están completas.
 */
function showFinalMessage() {
    missionContainer.innerHTML = `
        <div style="text-align: center;">
            <h2 style="font-size: 1.875rem; font-weight: 700; color: #6EE7B7; margin-bottom: 1rem;">¡Misión Cumplida, Agente!</h2>
            <p style="color: #D1D5DB; font-size: 1.125rem;">Has restaurado con éxito todos los sistemas. El código web es estable gracias a vos.</p>
            <p style="font-size: 3rem; margin-top: 1.5rem;">🎉</p>
        </div>
    `;
}

// --- inicialización ---

// cargar la primera misión al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    loadMission(currentMissionIndex);
});

// agregar event listener al botón
checkButton.addEventListener('click', checkAnswer);

// permitir enviar con la tecla Enter
userInputEl.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});
