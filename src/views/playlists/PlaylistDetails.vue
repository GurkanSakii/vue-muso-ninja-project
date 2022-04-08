<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlistde" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlistde.coverUrl" />
      </div>
      <h2>{{ playlistde.title }}</h2>
      <p class="username">Created by {{ playlistde.userName }}</p>
      <p class="description">{{ playlistde.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </div>

    <div class="song-list">
      <div v-if="!playlistde.songs.length">No songs have been added to this playlist yet.</div>
      <div v-for="song in playlistde.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="songDelete(song.id)">Delete</button>
      </div>
      <AddSong v-if="ownership" :addplaylist="playlistde" />
    </div>
  </div>
</template>

<script>
import AddSong from "@/components/AddSong";
import useStorage from "@/composables/useStorage";
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["id"],
  components: {
    AddSong,
  },
  setup(props) {
    const { error, document: playlistde } = getDocument("playlists", props.id);
    const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
    const { user } = getUser();
    const { deleteImage } = useStorage();
    const router = useRouter();

    const ownership = computed(() => {
      return playlistde.value && user.value && user.value.uid == playlistde.value.userId;
    });

    const handleDelete = async () => {
      await deleteImage(playlistde.value.filePath);
      await deleteDoc();
      router.push({ name: "Home" });
    };

    const songDelete = async (id) => {
      const songs = playlistde.value.songs.filter((song) => song.id != id)
      await updateDoc({ songs })
    };

    return { error, playlistde, ownership, handleDelete, songDelete };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 80%;
  min-height: 80%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
