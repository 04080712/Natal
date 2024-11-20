const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const pixelRatio = window.devicePixelRatio || 1;
const snowflakes = [];

class Snowflake {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    const maxSize = 3;
    this.size = Math.random() * (maxSize - 1) + 1;
    this.velocity = this.size * 0.35;
    const opacity = this.size / maxSize;
    this.fill = `rgb(255 255 255 / ${opacity})`;
    this.windSpeed = (Math.random() - 0.5) * 0.1;
    this.windAngle = Math.random() * Math.PI * 2;
  }

  isOutsideCanvas() {
    return this.y > canvas.height + this.size;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -this.size;
  }

  update() {
    this.windAngle += this.windSpeed;
    this.wind = Math.cos(this.windAngle) * 0.5;
    this.x += this.wind;
    this.y += this.velocity;
    if (this.isOutsideCanvas()) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.fill;
    ctx.fill();
    ctx.closePath();
  }
}

const createSnowflakes = () => {
  const snowflakeCount = Math.floor(window.innerWidth * window.innerHeight / 1400);
  for (let i = 0; i < snowflakeCount; i++) {
    snowflakes.push(new Snowflake());
  }
};

const resizeCanvas = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(pixelRatio, pixelRatio);
  snowflakes.length = 0;
  createSnowflakes();
};

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const render = () => {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach(snowflake => {
    snowflake.update();
    snowflake.draw();
  });
};

render();

const messages = [
  'Que o nascimento de Jesus renove em nossos corações a esperança e o amor! Um abençoado Natal para você e sua família!',
  'Natal em família é uma bênção que devemos celebrar com muita gratidão e amor no coração.',
  'Natal é tempo de celebrar o amor de Deus e a bênção de estarmos juntos como família. Feliz Natal!',
  'Jesus nasceu para nos trazer vida e esperança. Feliz Natal!'
];

let messageIndex = 0;
let messageInterval;

const startMessageRotation = () => {
  messageInterval = setInterval(() => {
    const messageElement = document.getElementById('message');
    messageElement.classList.add('fadeOut');
    setTimeout(() => {
      messageElement.textContent = messages[messageIndex];
      messageElement.classList.remove('fadeOut');
      messageElement.classList.add('fadeInText');
      messageIndex = (messageIndex + 1) % messages.length;
    }, 100);
  }, 4100);
};

const stopMessageRotation = () => {
  clearInterval(messageInterval);
};

document.getElementById('openButton').addEventListener('click', () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'flex';
  startMessageRotation();
});

document.getElementById('closeButton').addEventListener('click', () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
  stopMessageRotation();
});