const audioContext = new AudioContext()
const gain = audioContext.createGain()
gain.connect(audioContext.destination)

let beeping = false

export const beep = (vol: number, freq: number, duration: number): void => {
    if (!beeping) {
        beeping = true
        gain.gain.value = vol * 0.01
        const oscillator = audioContext.createOscillator()
        oscillator.addEventListener('ended', () => beeping = false)
        oscillator.connect(gain)
        oscillator.frequency.value = freq
        oscillator.type = "square"
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration * 0.001)
    }
}