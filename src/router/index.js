import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/singer",
  },
  {
    path: "/singer",
    component: () => import("../views/singer/Singer.vue"),
  },
  { path: "/song", component: () => import("../views/song/Song.vue") },
  { path: "/banner", component: () => import("../views/banners/Banners.vue") },
  {
    path: "/songlist",
    component: () => import("../views/songlist/SongList.vue"),
  },
  {
    path: "/updateinfo/:id",
    component: () => import("../views/singer/updateinfo/Update.vue"),
  },
  {
    path: "/insertsinger",
    component: () => import("../views/singer/insertsinger/InsertSinger.vue"),
  },
  {
    path: "/updatesong/:item",
    component: () => import("../views/song/updatesong/UpdateSong.vue"),
  },
  {
    path: "/insertsong",
    component: () => import("../views/song/insertsong/InsertSong.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "link-active",
});

export default router;

//push
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
//replace
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch((err) => err);
};
