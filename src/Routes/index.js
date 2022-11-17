import config from "~/Config";

import Home from "~/Pages/Home";
import Search from "~/Pages/Search";
import Collection from "~/Pages/Collection";
import PlayList from "~/Pages/PlayList";
import Tracks from "~/Pages/Tracks";
import Album from "~/Pages/Album";

const PublicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.search, component: Search },
  { path: config.routes.collection, component: Collection },
  { path: config.routes.playlist, component: PlayList },
  { path: config.routes.tracks, component: Tracks },
  { path: config.routes.album, component: Album },
];
const PrivateRoutes = [];

export { PublicRoutes, PrivateRoutes };
