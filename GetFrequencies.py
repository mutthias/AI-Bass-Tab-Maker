import crepe
import librosa
import pandas as pd
import matplotlib.pyplot as plt

def stable_note_grouping(times, freqs, confs, threshold=0.7, stability=3):
    data = [
        (t, f, librosa.hz_to_note(f))
        for t, f, c in zip(times, freqs, confs)
        if c > threshold
    ]

    groups = []
    current_note = None
    current_start_time = None
    candidate_note = None
    candidate_count = 0

    for i, (t, f, note) in enumerate(data):
        if note == current_note:
            candidate_note = None
            candidate_count = 0
            continue

        if note == candidate_note:
            candidate_count += 1
        else:
            candidate_note = note
            candidate_count = 1

        if candidate_count >= stability:
            if current_note is not None:
                groups.append((current_start_time, t, current_note))
            current_note = candidate_note
            current_start_time = t
            candidate_note = None
            candidate_count = 0

    # Final group
    if current_note is not None:
        groups.append((current_start_time, data[-1][0], current_note))

    return groups

# Load and predict
waveform, sample_rate = librosa.load("bass.wav", sr=16000)
time, frequency, confidence, _ = crepe.predict(waveform, sample_rate, viterbi=True)

# Get grouped notes
note_groups = stable_note_grouping(time, frequency, confidence)

# Save to CSV
df = pd.DataFrame(note_groups, columns=["Start", "End", "Note"])
df.to_csv("note_segments.csv", index=False)
print("Saved note segments to note_segments.csv")

# Plot
plt.figure(figsize=(12, 5))
for start, end, note in note_groups:
    plt.hlines(note, start, end, linewidth=5)

plt.xlabel("Time (s)")
plt.ylabel("Note")
plt.title("Note Timeline (CREPE + Librosa)")
plt.grid(True)
plt.tight_layout()
plt.savefig("note_timeline.png")
plt.show()
