import librosa
import librosa.display
import numpy as np
import matplotlib.pyplot as plt

waveform, sample_rate = librosa.load("bass.wav")

pitches, magnitudes = librosa.piptrack(y=waveform, sr=sample_rate, fmin=20, fmax=300)  # bass range

times = librosa.frames_to_time(np.arange(pitches.shape[1]), sr=sample_rate)
bass_frequencies = [pitches[magnitudes[:, i].argmax(), i] for i in range(pitches.shape[1])]
bass_frequencies = np.array(bass_frequencies)

bass_frequencies = bass_frequencies[bass_frequencies > 0]

# Convert to notes
notes = [librosa.hz_to_note(freq) for freq in bass_frequencies]


for time, freq in zip(times, bass_frequencies):
    if 3.0 <= time <= 15.0:  # filter time range
        if freq > 0:
            note = librosa.hz_to_note(freq)
            print(f"Time: {time:.2f}s | Frequency: {freq:.2f} Hz | Note: {note}")
        else:
            print(f"Time: {time:.2f}s | Frequency: 0.00 Hz | Note: Silence")




