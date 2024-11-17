document.addEventListener('DOMContentLoaded', function () {

        console.log("MADE BY ANIMESH")
    const playlist = [
        { name: 'AFSANAY', artist: 'Talha Anjum, Talha Yunus', src: 'audio/1.mp3', image: 'album1.jpg' },
        { name: 'RAABTA', artist: 'Young Stunners', src: 'audio/2.mp3', image: 'album2.jpg' },
        { name: 'REGRETS', artist: 'Jevin Gill, Umair, Talha Anjum', src: 'audio/3.mp3', image: 'album3.jpg' },
        { name: 'DOWNERS AT DUSK', artist: 'Umair,Talha Anjum', src: 'audio/4.mp3', image: 'album4.jpg' },
        { name: 'KAUN TALHA', artist: 'Umair,Talha Anjum', src: 'audio/5.mp3', image: 'album5.jpg' },
        { name: 'GLASS HALF FULL', artist: 'Umair,Talha Anjum,Talha Yunus,JJ47', src: 'audio/6.mp3', image: 'album4.jpg' },
        { name: 'TASWEER', artist: 'Jhokay,Talha Anjum', src: 'audio/7.mp3', image: 'album6.jpg' },
        { name: 'YE DUNYA', artist: 'Karakoram, Faris, Talha Anjum', src: 'audio/8.mp3', image: 'album7.jpg' },
        { name: 'KARDA KOI', artist: 'Abdullah, Talha Anjum', src: 'audio/9.mp3', image: 'album8.jpg' },
        { name: 'KHATTA FLOW', artist: 'Seedhe Maut, KR$NA', src: 'audio/10.mp3', image: 'album9.jpg' },
        { name: 'NAANCHAKU', artist: 'Stan, Seedhe Maut', src: 'audio/11.mp3', image: 'album10.jpg' },
        { name: 'SHUTDOWN', artist: 'Seedhe Maut', src: 'audio/12.mp3', image: 'album11.jpg' },
        { name: 'TT', artist: 'Seedhe Maut', src: 'audio/13.mp3', image: 'album12.jpg' },
        { name: 'NAMASTUTE', artist: 'Seedhe Maut', src: 'audio/14.mp3', image: 'album13.jpg' },
        { name: 'KODAK', artist: 'Seedhe Maut, King', src: 'audio/15.mp3', image: 'album14.jpg' },
        { name: 'SHAYAR', artist: 'Seedhe Maut, Bharat Chauhan', src: 'audio/16.mp3', image: 'album15.jpg' },
        { name: 'MAINA', artist: 'Seedhe Maut', src: 'audio/17.mp3', image: 'album16.jpg' },
        { name: 'ASAL G', artist: 'Seedhe Maut', src: 'audio/18.mp3', image: 'album9.jpg' },
        { name: 'FEIN', artist: 'Travis Scott', src: 'audio/19.mp3', image: 'album18.jpg' },
        { name: 'GOOSEBUMPS', artist: 'Travis Scott', src: 'audio/20.mp3', image: 'album19.jpg' },
        { name: 'GOD\'S PLAN', artist: 'Drake', src: 'audio/21.mp3', image: 'album20.jpg' },
        { name: 'HUMAN', artist: 'Rag\'n\'Bone Man', src: 'audio/22.mp3', image: 'album21.jpg' },
        { name: 'PEOPLE', artist: 'Libiciana', src: 'audio/23.mp3', image: 'album22.jpg' },
        { name: 'HOPE', artist: 'XXXTentacion', src: 'audio/24.mp3', image: 'album23.jpg' },
    ];

    let currentTrackIndex = 0; 
    let audio = new Audio(playlist[currentTrackIndex].src); 
    let isPlaying = false;

    const playButton = document.querySelector('.play');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const progressBar = document.querySelector('.progress');
    const albumImage = document.querySelector('.album-info img');
    const albumDetails = document.querySelector('.album-info div');

    // Update track details in the music player
    function updateTrackDetails() {
        albumDetails.innerHTML = `
            <p>${playlist[currentTrackIndex].name}</p>
            <p>${playlist[currentTrackIndex].artist}</p>
        `;
        albumImage.src = playlist[currentTrackIndex].image;
        audio.src = playlist[currentTrackIndex].src;
    }

    // Play or Pause the current track
    playButton.addEventListener('click', function () {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = '<i class="fa fa-play"></i>';
        } else {
            audio.play();
            playButton.innerHTML = '<i class="fa fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // Play next track
    nextButton.addEventListener('click', function () {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        updateTrackDetails();
        audio.play();
        playButton.innerHTML = '<i class="fa fa-pause"></i>';
        isPlaying = true;
    });

    // Play previous track
    prevButton.addEventListener('click', function () {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        updateTrackDetails();
        audio.play();
        playButton.innerHTML = '<i class="fa fa-pause"></i>';
        isPlaying = true;
    });

    // Update progress bar as the song plays
    audio.addEventListener('timeupdate', function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    });

    // Allow the user to seek through the track
    progressBar.addEventListener('input', function () {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    // Volume control
    const volumeControl = document.querySelector('.volume');
    audio.volume = 1;

    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value / 100;
    });

    // Play a track based on album card clicked
    function playTrackFromAlbum(trackIndex) {
        currentTrackIndex = trackIndex;
        updateTrackDetails();
        audio.play();
        playButton.innerHTML = '<i class="fa fa-pause"></i>';
        isPlaying = true;
    }

    // Add event listeners to album cards to play tracks when clicked
    const albumCards = document.querySelectorAll('.card');
    albumCards.forEach((card, index) => {
        card.querySelector('.play-btn').addEventListener('click', function () {
            playTrackFromAlbum(index);
        });
    });

    // Event listener to automatically play next track when the current track ends
    audio.addEventListener('ended', function () {
        nextButton.click();
    });

    // Initialize the first track on page load
    updateTrackDetails();
});
