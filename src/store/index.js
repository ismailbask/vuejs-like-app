import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    user: null,
    saltKey: "booklike12!?",
  },
  mutations: {
    //kullanıcı giriş yapınca state.user içindeki bilgiler güncellenir.
    setUser(state, user) {
      state.user = user;
    },
    logoutUser(state) {
      state.user = null;
    },
    setLikes(state, bookmarkIds) {
      state.user.likes = bookmarkIds;
    },
    setBookmarks(state, bookmarkIds) {
      state.user.bookmarks = bookmarkIds;
    },
  },
  getters: {
    _isAuthenticated: (state) => state.user !== null,
    _getCurrentUser(state) {
      // const user = state.user;
      const user = state.user;
      //iki yöntemde olur. hatamız user'ın o an null olması ve password değerini silmek istememiz.
      // if (user !== null && user.hasOwnPropery("Password")) {
      //   delete user.password;
      // }
      delete user?.password;
      return user;
    },
    _currentUserID: (state) => state?.user?.id,
    _userLikes: (state) => state?.user?.likes || [],
    _userBookmarks: (state) => state?.user?.bookmarks || [],
    _saltKey: (state) => state.saltKey,
  },
  plugins: [
    createPersistedState({
      //storagede şifreli saklanması için ayarlamalar yapıldı.
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
