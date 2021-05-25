import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/singer",
  },
  {
    path: "/adminlogin",
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/singer",
    component: () => import("../views/singer/Singer.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/song",
    component: () => import("../views/song/Song.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/banner",
    component: () => import("../views/banners/Banners.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/songlist",
    component: () => import("../views/songlist/SongList.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/updateinfo/:id",
    component: () => import("../views/singer/updateinfo/Update.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/insertsinger",
    component: () => import("../views/singer/insertsinger/InsertSinger.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/updatesong/:item",
    component: () => import("../views/song/updatesong/UpdateSong.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/insertsong",
    component: () => import("../views/song/insertsong/InsertSong.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/insertsonglist",
    component: () =>
      import("../views/songlist/insertsonglist/InsertSongList.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/updatesonglist/:item",
    component: () =>
      import("../views/songlist/updatesonglist/UpdateSongList.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/insertbanner",
    component: () => import("../views/banners/insertbanner/InsertBanner.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/updatebanner/:item",
    component: () => import("../views/banners/updatebanner/UpdateBanner.vue"),
    meta: {
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "link-active",
});

router.beforeEach((to, from, next) => {
  const session = sessionStorage.getItem("admin");
  console.log(to);
  if (to.meta.requireAuth) {
    if (session !== null) {
      console.log("不为空");
      next();
    } else {
      console.log("weikong");
      next({
        path: "/adminlogin",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

// router.afterEach((to, from, next) => {
//   window, scrollTo(0, 0);
// });

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
