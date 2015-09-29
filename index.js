'use strict'

const pico = require('node-pico')

const msToSamples = ms =>
	Math.floor(ms / 1000 * pico.sampleRate)

const fadeInMs = 50
const fadeInSamples = msToSamples(fadeInMs)
const fadeOutMs = 250
const fadeOutSamples = msToSamples(fadeOutMs)
const lenMs = fadeInMs + fadeOutMs
const lenSamples = fadeInSamples + fadeOutSamples

const bing = () => {
	const hz_lo = 440 / pico.sampleRate
	const hz_hi = hz_lo * 4
	const dx_lo = 2 * Math.PI * hz_lo
	const dx_hi = 2 * Math.PI * hz_hi
	const ddx = (dx_hi - dx_lo) / lenSamples

	let x = 0
	let dx = dx_lo

	let fadeIn = 0
	let fadeOut = fadeOutSamples

	return e => {
		for (let i = 0; i < e.bufferSize; i++) {
			const base = Math.sin(x) + (Math.sin(x * 3) / 3) + (Math.sin(x * 5) / 5)

			let volume
			if (fadeIn < fadeInSamples) {
				volume = fadeIn / fadeInSamples
				fadeIn = fadeIn + 1
			} else {
				volume = fadeOut / fadeOutSamples
				if (fadeOut !== 0)
					fadeOut = fadeOut - 1
			}

			const amp = base * volume
			e.buffers[0][i] = amp
			e.buffers[1][i] = amp

			x = x + dx
			dx = dx + ddx
		}
	}
}

module.exports = () => {
	pico.play(bing())
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			pico.pause()
			resolve()
		}, lenMs)
	})
}
