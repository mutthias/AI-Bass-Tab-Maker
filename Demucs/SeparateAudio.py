import subprocess
import os
import sys

def separate_audio(input_file, output_dir="demucs_output"):
    os.makedirs(output_dir, exist_ok=True)

    command = [
        "demucs",
        "--out", output_dir,
        input_file
    ]

    print("Running Demucs...")
    subprocess.run(command)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python demucs_extract.py path_to_audio_file")
        sys.exit(1)

    input_audio = sys.argv[1]
    separate_audio(input_audio)
