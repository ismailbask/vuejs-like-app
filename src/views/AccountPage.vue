<template>
  <AppHeader />
  <div class="flex flex-row">
    <SideBar />
    <!-- <component :is="$route.meta.componentName" /> -->
    <!-- <appBookmarkList v-if="bookmarkList.length > 0" :items="bookmarkList" /> -->
    <!-- <div v-else>Bookmark bulunmamaktadır...</div> -->
  </div>
</template>

<script>
import SideBar from "@/components/Account/SideBar";
// import io from "socket.io-client";

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      bookmarkList: [],
      socket: {},
    };
  },
  created() {
    this.$appAxios
      .get("/bookmarks?_expand=category&_expand=user")
      .then((bookmark_list_response) => {
        console.log(bookmark_list_response);
        this.bookmarkList = bookmark_list_response?.data || [];
        // console.log("asdasd", this.bookmarkList);
      })
      .catch((error) => console.log(error.response));
  },
};
</script>
