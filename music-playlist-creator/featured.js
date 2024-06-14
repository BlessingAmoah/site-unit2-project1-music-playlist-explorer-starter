document.addEventListener('DOMContentLoaded', () => {
    function updateFeaturedSongList(songs) {
        const songList = document.querySelector('.featured-song-list');
        songList.innerHTML = ''; // Clear existing songs

        songs.forEach(song => {
            const card = document.createElement('div');
            card.classList.add('card');
            const image = document.createElement('img');
            image.src = song.cover_art;
            card.appendChild(image);

            // Create a text node or another div for text content
            const text = document.createElement('div');
            text.textContent = `${song.title} - ${song.artist}`;
            card.appendChild(text);

            // Append the card to the song list
            songList.appendChild(card);
          });
    }

    // Function to select and display a random playlist on the Featured page
    function displayRandomPlaylist() {
        const randomIndex = Math.floor(Math.random() * data.playlists.length);
        const playlist = data.playlists[randomIndex];

        document.querySelector('.featured-image').src = playlist.playlist_art;
        document.querySelector('.featured-name').textContent = playlist.playlist_name;

        updateFeaturedSongList(playlist.songs);
    }

        displayRandomPlaylist();

});
