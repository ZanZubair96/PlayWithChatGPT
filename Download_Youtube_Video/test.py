from pytube import YouTube

# Replace this URL with the YouTube video URL you want to download
video_url = 'https://youtu.be/G3e-cpL7ofc'

try:
    # Create a YouTube object
    yt = YouTube(video_url)

    # Get the highest resolution stream
    video_stream = yt.streams.get_highest_resolution()

    # Download the video to the current directory
    video_stream.download()

    print(f"Downloaded: {yt.title}")

except Exception as e:
    print(f"An error occurred: {e}")
