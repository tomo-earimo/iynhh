document.addEventListener('DOMContentLoaded', () => {
    const playLeftBtn = document.getElementById('playLeftBtn');
    const playRightBtn = document.getElementById('playRightBtn');
    const statusText = document.getElementById('statusText');
    const earSymbol = document.getElementById('earSymbol');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // ステレオサウンドを作成する関数
    const createStereoSound = (panValue) => {
        const oscillator = audioContext.createOscillator();
        const panner = audioContext.createStereoPanner();
        const gainNode = audioContext.createGain();

        // オシレーター（発信機）でトーンを生成
        oscillator.type = 'sine'; // 正弦波
        oscillator.frequency.value = 440; // 440 Hz (A4)

        // パン設定
        panner.pan.setValueAtTime(panValue, audioContext.currentTime);

        // ゲイン（音量）を設定
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

        // 接続
        oscillator.connect(panner);
        panner.connect(gainNode);
        gainNode.connect(audioContext.destination);

        return oscillator;
    };

    // 音を再生する関数
    const playSound = (side) => {
        const panValue = side === 'left' ? -1 : 1;
        const oscillator = createStereoSound(panValue);

        // 音の再生を開始
        oscillator.start();

        // 1秒後に音を停止
        setTimeout(() => {
            oscillator.stop();
        }, 1000);
    };

    // ボタンクリックイベント
    playLeftBtn.addEventListener('click', () => {
        playSound('left');
        statusText.textContent = '左のイヤホンから音が聞こえますか？';
        earSymbol.textContent = 'L';
    });

    playRightBtn.addEventListener('click', () => {
        playSound('right');
        statusText.textContent = '右のイヤホンから音が聞こえますか？';
        earSymbol.textContent = 'R';
    });
});
