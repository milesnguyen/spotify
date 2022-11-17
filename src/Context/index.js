import { createContext } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const Context = createContext({});

export const AppProvider = ({ children }) => {
  const location = useLocation();
  const data = location.pathname;

  const [playList, setPlayList] = useState([]);

  useEffect(() => {
    fetch(
      `https://apizingmp3.herokuapp.com/api/detailplaylist?id=${data.slice(4)}`
    )
      .then((response) => response.json())
      .then((json) => setPlayList(json));
  });

  return <Context.Provider value={playList}>{children}</Context.Provider>;
};
