import crepe
import librosa
import pandas as pd
from music21 import stream, note, pitch, tablature, meter, tempo, instrument



standard_bass = ['E1', 'A1', 'D2', 'G2']

def stable_note_grouping(times, freqs, confs, threshold=0.7, stability=3):
    data = [
        (t, f, librosa.hz_to_note(f).replace("♯", "#").replace("♭", "b")) # cuz model can't read literal flat and sharp chars
        for t, f, c in zip(times, freqs, confs)
        if c > threshold
    ]

    groups = []
    cur_note, cur_start, candidate_note, count = None, None, None, 0
    for _, (t, _, note_str) in enumerate(data):
        if note_str == cur_note:
            candidate_note = None
            count = 0
            continue

        if note_str == candidate_note:
            count += 1
        else:
            candidate_note = note_str
            count = 1

        if count >= stability:
            if cur_note is not None:
                groups.append((cur_start, t, cur_note))
            cur_note = candidate_note
            cur_start = t
            candidate_note = None
            count = 0

    if cur_note is not None:
        groups.append((cur_start, data[-1][0], cur_note))

    return groups


def note_to_string_fret(note_str):
    midi = pitch.Pitch(note_str).midi
    for string_num, string_note in enumerate(standard_bass):
        string_midi = pitch.Pitch(string_note).midi
        fret = midi - string_midi
        if 0 <= fret <= 24:
            return (string_num + 1, fret) 
    return None  # not playable on bass standard tuning


def create_musicxml_from_notes(note_data, BPM):
    
    def seconds_to_quarter_length(start, end, bpm=BPM):
      duration_sec = end - start
      beats = duration_sec * (bpm / 60)
      note_lengths = [4, 2, 1, 0.5, 0.25]
      return min(note_lengths, key=lambda x: abs(x - beats))
    
    score = stream.Score()
    part = stream.Part()
    part.insert(0, instrument.ElectricBass())
    part.insert(0, tempo.MetronomeMark(number=BPM))
    part.insert(0, meter.TimeSignature('4/4'))

    current_measure = stream.Measure()
    current_measure_time = 0.0
    measure_number = 1

    for entry in note_data:
        string_fret = note_to_string_fret(entry['note'])
        if string_fret is None:
            continue

        dur = seconds_to_quarter_length(entry['start'], entry['end'], BPM)
        n = note.Note(entry['note'])
        n.quarterLength = dur

        if current_measure_time + dur > 4:
            part.append(current_measure)
            measure_number += 1
            current_measure = stream.Measure(number=measure_number)
            current_measure_time = 0.0

        current_measure.append(n)
        current_measure_time += dur

    if len(current_measure.notes) > 0:
        part.append(current_measure)

    score.append(part)
    score.write('musicxml', fp='bass_tab.xml')
    print("MusicXML file saved!'")


waveform, sample_rate = librosa.load("bass.wav", sr=16000)
track_tempo, beats = librosa.beat.beat_track(y=waveform, sr=sample_rate)
time, frequency, confidence, _ = crepe.predict(waveform, sample_rate, viterbi=True)
note_groups = stable_note_grouping(time, frequency, confidence)

note_data = [
    {"start": round(start, 2), "end": round(end, 2), "note": note}
    for start, end, note in note_groups
]

for entry in note_data:
    print(f"Start: {entry['start']:>5}s | End: {entry['end']:>5}s | Note: {entry['note']}")
print(beats)
create_musicxml_from_notes(note_data, track_tempo)
