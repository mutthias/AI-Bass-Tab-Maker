import crepe
import librosa

waveform, sample_rate = librosa.load("bass.wav", sr=16000)  # CREPE works best at 16kHz
time, frequency, confidence, activation = crepe.predict(waveform, sample_rate, viterbi=True)

for t, f, c in zip(time, frequency, confidence):
    if 3.0 <= t <= 15.0 and c > 0.7:  # confidence threshold
        note = librosa.hz_to_note(f)
        print(f"Time: {t:.2f}s | Frequency: {f:.2f} Hz | Note: {note}")
