const dino = document.querySelector('.dino');
const background = document.querySelector('.fundo');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactos() {
  const cactos = document.createElement('div');
  let cactosPosition = 1000;
  let randomTime = Math.random() * 7000;

  if (isGameOver) return;

  cactos.classList.add('cactos');
  background.appendChild(cactos);
  cactos.style.left = cactosPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactosPosition < -60) {
                                  // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactos);
    } else if (cactosPosition > 0 && cactosPosition < 70 && position < 70) {
                                  // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Gamer Over</h1>';
      } else {
      cactosPosition -= 10;
      cactos.style.left = cactosPosition + 'px';
    }
    
  }, 20);

  setTimeout(createCactos, randomTime);
}

createCactos();
document.addEventListener('keypress', handleKeyUp);
