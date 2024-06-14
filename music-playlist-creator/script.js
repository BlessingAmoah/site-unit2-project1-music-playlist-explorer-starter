document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModalButton = document.querySelector('.close-modal');
    const playlistCardsContainer = document.querySelector('.playlist-cards');
    const featuredLink = document.querySelector('.featured-link');
    const likeButtons = document.getElementById('likeButton')
    const editPlaylist = document.querySelector('.editPlaylists');

    // Function to create a playlist card
    function createPlaylistCard(playlist) {
        const card = document.createElement('div');
        card.classList.add('playlist-card');

        const img = document.createElement('img');
        img.src = playlist.playlist_art;
        img.alt = `Cover image for ${playlist.playlist_name}`;
        img.classList.add('playlist-cover');

        const title = document.createElement('h2');
        title.classList.add('playlist-title');
        title.textContent = playlist.playlist_name;

        const creator = document.createElement('p');
        creator.classList.add('playlist-creator');
        creator.textContent = `${playlist.playlist_creator}`;

        const displayModal = document.createElement('p');
        displayModal.classList.add('modal-clicked');
        displayModal.textContent = playlist.likeCount;

        const modalDisplay = document.createElement('i');
        modalDisplay.classList.add('modal-display');

        const likeButton = document.createElement('button');
        likeButton.classList.add('likeButton');
        likeButton.textContent = '👍🏻';
        const likeSpan = document.createElement('span');
        likeSpan.classList.add('likeCount');


        let likeCount = data.playlists[0].likeCount;
        likeSpan.innerHTML = likeCount;
        likeButton.addEventListener('click', () => {
            likeCount++;
            data.playlists[0].likeCount = likeCount;
            likeSpan.innerHTML = likeCount;
            });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(creator);
        card.appendChild(likeButton);
        card.appendChild(likeSpan);
        // Event listener to show modal on card click
        card.addEventListener('click', (event) => {
            // if we clicked on the like button, do nothing
            if (event.target === likeButton) {
                // don't open modal
                return;

            }
            if (event.target !== likeButton) {
                showModal(playlist);
            }
        });



        // Event listener to handle modal functionality
        modalDisplay.addEventListener('click', (event) => {
            event.stopPropagation();
            playlist.playlistClicked++;
            modalShow.textContent = playlist.like;
            modalDisplay.classList.add('clicked');
        });

        return card;
    }

    function openEditForm(playlist) {
        const editForm = document.querySelector('.editForm');
        const editPlaylistName = document.querySelector('.editPlaylist');
        const editPlaylistCreator = document.querySelector('.editPlaylistcreator');
        const editSongField = document.querySelector('.editSongField');

        editPlaylistName.value = playlist.playlist_name;
        editPlaylistCreator.value = playlist.playlist_creator;

        editSongField.innerHTML = '';

        playlist.songs.forEach(song => {
            const SongField = document.createElement('div');
            SongField.classList.add('song-field');
            songField.innerHTML = '<input type="text" class="song-title" name="songTitle[]" value="${song.title}" required >   <input type="text" class="song-artist" name="song-artist[]" value="${song.artist}" required >';
            editSongField.appendChild(songField);
    });

    editForm.style.display = 'block';

    const editPlaylistButton = document.querySelector('.edit-playlist');
    editPlaylistButton.addEventListener('click', () => {
        editForm.style.display = 'none';
    });
    }

    // Function to display the modal with playlist details
    function showModal(playlist) {
        const modalContent = document.querySelector('.modal-content');
        modalContent.querySelector('img.modal-cover').src = playlist.playlist_art;
        modalContent.querySelector('h2').textContent = playlist.playlist_name;
        modalContent.querySelector('.modal-creator').textContent = `${playlist.playlist_creator}`;


        const songList = modalContent.querySelector('.song-list');
        songList.innerHTML = ''; // Clear existing songs

        playlist.songs.forEach(song => {
            const div = document.createElement('div');
            div.classList.add('song-item');
            const image = document.createElement('img');
            image.src = song.cover_art;
            image.alt = 'Cover art for ' + song.title;
            div.appendChild(image);

            const artist = document.createElement('p');
            artist.textContent = song.artist;
            div.appendChild(artist);

            const duration = document.createElement('p');
            duration.textContent = song.duration;
            div.appendChild(duration);

            songList.appendChild(div);
          });

        modalOverlay.style.display = 'flex';

        const shuffleButton = modalContent.querySelector('.shuffle-button');
        shuffleButton.addEventListener('click', () => {
            shufflePlaylist(playlist);
            updateSongList(playlist.songs);
        });
    }

    //const featuredLink = document.querySelector('.featured-link');
        featuredLink.addEventListener('click', function(event) {
        event.preventDefault();
        // Navigate to the featured page
        window.location.href = this.getAttribute('href');
});
    // Function to update the song list in the modal
    function updateSongList(songs) {
        const songList = document.querySelector('.song-list');
        songList.innerHTML = '';

        songs.forEach(song => {
          const div = document.createElement('div');
          div.classList.add('song-item');

          // Create and append the image element
          const image = document.createElement('img');
          image.src = song.cover_art;
          image.alt = 'Cover art for ' + song.title;
          div.appendChild(image);

          // Add artist name
          const artist = document.createElement('p');
          artist.textContent = song.artist;
          div.appendChild(artist);

          // Add song duration
          const duration = document.createElement('p');
          duration.textContent = song.duration;
          div.appendChild(duration);

          // Append the complete div to the song list
          songList.appendChild(div);
        });
      }




    // Function to shuffle the playlist
    function shufflePlaylist(playlist) {
        for (let i = playlist.songs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [playlist.songs[i], playlist.songs[j]] = [playlist.songs[j], playlist.songs[i]];
        }
    }

    // Close modal event listener
    closeModalButton.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });

    // Iterate over the playlists data and create cards
    data.playlists.forEach(playlist => {
        const card = createPlaylistCard(playlist);
        playlistCardsContainer.appendChild(card);
    });

    // Function to update the song list on the Featured Playlist page
    function updateFeaturedSongList(songs) {
        const songList = document.querySelector('.featured-song-list');
        songList.innerHTML = ''; // Clear existing songs


        songs.forEach(song => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist}`;
            songList.appendChild(li);
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
    // Call displayRandomPlaylist function if on Featured page
    if (document.querySelector('.featured-card')) {
        displayRandomPlaylist();
    }
});
