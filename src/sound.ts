const audioContext = new AudioContext()
const gain = audioContext.createGain()
gain.connect(audioContext.destination)

export const beep = (vol: number, freq: number, duration: number) => {
    gain.gain.value = vol * 0.01
    const oscillator = audioContext.createOscillator()
    oscillator.connect(gain)
    oscillator.frequency.value = freq
    oscillator.type = "square"
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration * 0.001)
}