<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="myplaylists">
      <ListView :playlistview="myplaylists" />
    </div>
    <router-link :to="{name: 'CreatePlaylist'}" class="btn">Create a new Playlist</router-link>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import ListView from "@/components/ListView";

export default {
  components: {
    ListView,
  },

  setup() {
    const { user } = getUser();
    const { documents: myplaylists } = getCollection("playlists", ["userId", "==", user.value.uid]);

    return {
      myplaylists,
    };
  },
};
</script>

<style></style>
