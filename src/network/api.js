import { get, post } from "./http";

/* 网易云主页  https://autumnfish.cn/homepage/block/page */

/**
 * api地址管理
 */
/**
 *    用户相关
 **/
// 登录
const login = (p) => get("/user/login", p);
// 注册
const register = (p) => post("/user/login", p);
// 登录之后 获取用户收藏歌单
const getUserCollectSongList = (p) => get("/user/collectsonglist", p);
// 用户收藏歌单
const collectsonglist = (p) => post("/user/insertcollectsonglist", p);
// 用户取消收藏歌单
const cancelsonglist = (p) => post("/user/deletecollectsonglist", p);
// 用户添加喜欢歌曲
const collectlikesong = (p) => post("/user/insertlikesong", p);
// 用户删除喜欢歌曲
const cancellikesong = (p) => post("/user/deletelikesong", p);
// 用户喜欢歌曲列表
const getuserlikesonglist = (p) => get("/user/selectlikesonglist", p);
/**
 *  非用户相关
 * */

// 获取轮播图
const banners = () => get("/home/banner/");
// 歌手列表
const singerList = (p) => get("/singer/getsinger", p);
// 歌手信息
const singerdetail = (p) => get("/singer/singerdetail", p);
// 歌单信息
const getsonglist = (p) => get("/home/songlist", p);
const gethomesonglist = () => get("/home/homesonglist");
// 单个歌单信息
const getsonglistbyid = (p) => get("home/songlistbyid", p);
// 首页模糊查询
const dimSerch = (p) => get("/home/serch", p);

/* 下载文件 */
// 下载
const download = (p) => get("/singer/download", p);

/* 管理员 */
const deletesinger = (p) => get("/admin/deletesinger", p);
const updateSinger = (p) => post("/admin/updatesinger", p);
const insertSinger = (p) => post("/admin/insertsinger", p);

const getAllSong = (p) => get("/admin/allsong", p);
const deleteSong = (p) => get("/admin/deletesong", p);
const getsinger = (p) => get("/admin/getsinger", p);
const insertsong = (p) => post("/admin/insertsong", p);
const updatetsong = (p) => post("/admin/updatetsong", p);

const allsongbysonglist = () => get("/admin/allsongbysonglist");
const insertsonglist = (p) => post("/admin/insertsonglist", p);
const deletesonglist = (p) => get("/admin/deletesonglist", p);
const getsongbysonglistid = (p) => get("/admin/getsongbysonglistid", p);
const updatesonglist = (p) => post("/admin/updatesonglist", p);

const alertbanner = (p) => post("/admin/alertbanner", p);
const deletebanner = (p) => get("/admin/deletebanner", p);
const updatebanner = (p) => post("/admin/updatebanner", p);

const adminlogin = (p) => get("/admin/login", p);

export default {
  login,
  register,
  banners,
  singerList,
  singerdetail,
  getsonglist,
  gethomesonglist,
  getsonglistbyid,
  getUserCollectSongList,
  collectsonglist,
  cancelsonglist,
  collectlikesong,
  cancellikesong,
  getuserlikesonglist,
  download,
  dimSerch,
  deletesinger,
  updateSinger,
  insertSinger,
  getAllSong,
  deleteSong,
  getsinger,
  insertsong,
  updatetsong,
  allsongbysonglist,
  insertsonglist,
  deletesonglist,
  getsongbysonglistid,
  updatesonglist,
  alertbanner,
  deletebanner,
  updatebanner,
  adminlogin,
};
