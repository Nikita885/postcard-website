
// Пастельные цвета заката
const pastelColors = [
    'rgba(255, 200, 220, 0.4)', // розовый
    'rgba(255, 220, 180, 0.4)', // персиковый
    'rgba(200, 180, 255, 0.4)', // сиреневый
    'rgba(255, 240, 200, 0.4)', // светло-желтый
    'rgba(210, 210, 255, 0.4)', // голубой
    'rgba(255, 210, 230, 0.4)'  // светло-розовый
];

const CLOUDS_COUNT = 8;
const cloudsArea = document.getElementById('clouds-area');
const petalsArea = document.getElementById('petals-area');
const clouds = [];

// --- Sakura Petals ---
const PETAL_IMAGES = ['png/4.png', 'png/5.png'];
const PETALS_COUNT = 40;

function randomPetalImage() {
    return PETAL_IMAGES[Math.floor(Math.random() * PETAL_IMAGES.length)];
}

function createPetal() {
    const img = document.createElement('img');
    img.src = randomPetalImage();
    img.className = 'petal';
    // Стартовая позиция
    img.style.left = `${Math.random() * 100}vw`;
    img.style.top = `-40px`;
    img.style.opacity = 0.85;
    petalsArea.appendChild(img);

    // Анимация падения
    const duration = 7000 + Math.random() * 4000; // 7-11 сек
    const swing = 30 + Math.random() * 30; // амплитуда покачивания
    const swingSpeed = 2 + Math.random() * 1.5; // скорость покачивания
    const scale = 0.7 + Math.random() * 0.7;
    img.style.transform = `scale(${scale})`;

    let start = null;
    let y = -40;
    let x = parseFloat(img.style.left);
    let angle = Math.random() * Math.PI * 2;
    let stopped = false;

    function fallPetal(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        if (stopped) return;
        // Путь вниз
        y = (window.innerHeight + 40) * (elapsed / duration) - 40;
        // Покачивание
        const sway = Math.sin(angle + elapsed / 400 * swingSpeed) * swing;
        img.style.top = `${y}px`;
        img.style.left = `calc(${x}vw + ${sway}px)`;
        img.style.transform = `scale(${scale}) rotate(${Math.sin(elapsed/500)*18}deg)`;

        if (y < window.innerHeight - 48) {
            requestAnimationFrame(fallPetal);
        } else {
            // Зависание на "дне"
            stopped = true;
            img.style.top = `${window.innerHeight - 48}px`;
            setTimeout(() => {
                img.style.opacity = 0;
                setTimeout(() => {
                    petalsArea.removeChild(img);
                }, 700);
            }, 1200 + Math.random() * 1200);
        }
    }
    requestAnimationFrame(fallPetal);
}

function petalsLoop() {
    createPetal();
    setTimeout(petalsLoop, 250 + Math.random() * 350);
}

function randomPastelColor() {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
}

function createCloud(i) {
    const img = document.createElement('img');
    img.src = 'png/1.png';
    img.className = 'cloud';
    img.style.top = `${10 + Math.random() * 70}%`;
    img.style.left = `${Math.random() * 100}%`;
    img.style.opacity = 0.7 + Math.random() * 0.3;
    img.dataset.direction = Math.random() > 0.5 ? 'right' : 'left';
    // Уменьшена скорость движения облаков
    img.dataset.speed = 0.08 + Math.random() * 0.06; // px/ms
    // Рандомная ширина (scaleX), сохраняем в data-атрибут
    img.dataset.scale = 0.8 + Math.random() * 0.8;
    img.dataset.width = 0.8 + Math.random() * 0.7; // ширина (scaleX)
    // Рандомный z-index: -1 или 1
    img.style.zIndex = Math.random() > 0.5 ? 3 : 1;
    img.style.transform = `scale(${img.dataset.scale}, 1) scaleX(${img.dataset.width})`;
    img.style.filter = `drop-shadow(0 0 60px ${randomPastelColor()})`;
    cloudsArea.appendChild(img);
    clouds.push(img);
    animateCloudDeform(img);
}

function animateCloudDeform(cloud) {
    // Только смена цвета, ширина (scaleX) не меняется
    const color = randomPastelColor();
    cloud.style.transition = 'filter 2.5s';
    cloud.style.transform = `scale(${cloud.dataset.scale}, 1) scaleX(${cloud.dataset.width})`;
    cloud.style.filter = `drop-shadow(0 0 60px ${color})`;
    setTimeout(() => animateCloudDeform(cloud), 2000 + Math.random() * 2000);
}

function animateCloudsMove() {
    const now = Date.now();
    clouds.forEach(cloud => {
        let left = parseFloat(cloud.style.left);
        const dir = cloud.dataset.direction;
        const speed = parseFloat(cloud.dataset.speed);
        if (dir === 'right') {
            left += speed;
            if (left > 110) left = -20;
        } else {
            left -= speed;
            if (left < -20) left = 110;
        }
        cloud.style.left = `${left}%`;
    });
    requestAnimationFrame(animateCloudsMove);
}


// --- Video Player ---
const videoFiles = [
    'video/1.MP4',
    'video/2.MP4',
    'video/3.MP4',
    'video/4.MP4',
    'video/5.MP4',
    'video/6.MP4',
    'video/7.MP4',
    'video/8.MP4',
    'video/9.MP4',
    'video/10.MP4',
    'video/11.MP4',
    'video/12.MP4',
    'video/13.MP4',
    'video/14.MP4',
];
let currentVideo = 0;

function setVideo(idx) {
    const video = document.getElementById('custom-video');
    if (!videoFiles[idx]) return;
    video.src = videoFiles[idx];
    video.load();
    video.play();
}

function nextVideo() {
    currentVideo = (currentVideo + 1) % videoFiles.length;
    setVideo(currentVideo);
}
function prevVideo() {
    currentVideo = (currentVideo - 1 + videoFiles.length) % videoFiles.length;
    setVideo(currentVideo);
}

function setupVideoPlayer() {
    document.getElementById('video-next').onclick = nextVideo;
    document.getElementById('video-prev').onclick = prevVideo;
    document.getElementById('video-close').onclick = function() {
        document.getElementById('video-player-container').style.display = 'none';
        document.getElementById('video-player-overlay').style.display = 'flex';
        const video = document.getElementById('custom-video');
        video.pause();
        video.currentTime = 0;
    };

    // Swipe support for mobile
    let startX = null;
    const video = document.getElementById('custom-video');
    video.addEventListener('touchstart', e => {
        if (e.touches.length === 1) startX = e.touches[0].clientX;
    });
    video.addEventListener('touchend', e => {
        if (startX === null) return;
        const endX = e.changedTouches[0].clientX;
        const dx = endX - startX;
        if (Math.abs(dx) > 40) {
            if (dx < 0) nextVideo();
            else prevVideo();
        }
        startX = null;
    });

    // Стартовая кнопка "Подарок"
    document.getElementById('gift-start-btn').onclick = function() {
        document.getElementById('video-player-overlay').style.display = 'none';
        document.getElementById('video-player-container').style.display = 'flex';
        setVideo(currentVideo);
    };
}

window.onload = function() {
    for (let i = 0; i < CLOUDS_COUNT; i++) {
        createCloud(i);
    }
    animateCloudsMove();
    // Запуск лепестков сакуры
    for (let i = 0; i < PETALS_COUNT; i++) {
        setTimeout(createPetal, i * 400 + Math.random() * 400);
    }
    petalsLoop();
    // Видео плеер
    setupVideoPlayer();
    // Не показываем видео сразу
    document.getElementById('video-player-container').style.display = 'none';
    document.getElementById('video-player-overlay').style.display = 'flex';
};
