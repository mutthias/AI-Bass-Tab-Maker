import crepe
import librosa
import pandas as pd
from music21 import stream, note, pitch

# Step 1: Group stable notes
def stable_note_grouping(times, freqs, confs, threshold=0.7, stability=3):
    data = [
        (t, f, librosa.hz_to_note(f).replace("♯", "#").replace("♭", "b"))
        for t, f, c in zip(times, freqs, confs)
        if c > threshold
    ]

    groups = []
    current_note = None
    current_start_time = None
    candidate_note = None
    candidate_count = 0

    for i, (t, f, note_str) in enumerate(data):
        if note_str == current_note:
            candidate_note = None
            candidate_count = 0
            continue

        if note_str == candidate_note:
            candidate_count += 1
        else:
            candidate_note = note_str
            candidate_count = 1

        if candidate_count >= stability:
            if current_note is not None:
                groups.append((current_start_time, t, current_note))
            current_note = candidate_note
            current_start_time = t
            candidate_note = None
            candidate_count = 0

    if current_note is not None:
        groups.append((current_start_time, data[-1][0], current_note))

    return groups

# Step 2: Convert note to string + fret for standard bass
standard_bass = ['E1', 'A1', 'D2', 'G2']  # 4-string bass

def note_to_string_fret(note_str):
    midi = pitch.Pitch(note_str).midi
    for string_num, string_note in enumerate(standard_bass):
        string_midi = pitch.Pitch(string_note).midi
        fret = midi - string_midi
        if 0 <= fret <= 24:
            return (string_num + 1, fret)  # String 1 = E string
    return None  # Not playable on standard tuning

# Step 3: Create music21 stream with notes
def create_musicxml_from_notes(note_data):
    s = stream.Part()
    s.id = 'Bass'

    for entry in note_data:
        string_fret = note_to_string_fret(entry['note'])
        if string_fret is None:
            continue  # Skip out-of-range notes

        n = note.Note(entry['note'])
        n.quarterLength = 1  # Fixed quarter note duration for simplicity
        n.addLyric(f"String {string_fret[0]}, Fret {string_fret[1]}")
        s.append(n)

    s.write('musicxml', fp='bass_tab.xml')
    print("MusicXML file saved as 'bass_tab.xml'")

# Step 4: Load audio and run everything
waveform, sample_rate = librosa.load("bass.wav", sr=16000)
time, frequency, confidence, _ = crepe.predict(waveform, sample_rate, viterbi=True)
note_groups = stable_note_grouping(time, frequency, confidence)

# Convert to list of dicts
note_data = [
    {"start": round(start, 2), "end": round(end, 2), "note": note}
    for start, end, note in note_groups
]

# Print to console
for entry in note_data:
    print(f"Start: {entry['start']:>5}s | End: {entry['end']:>5}s | Note: {entry['note']}")

# Generate and save MusicXML
create_musicxml_from_notes(note_data)
