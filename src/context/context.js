import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { useContext } from "react";

const rootUrl = "https://api.github.com";
const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const [requests, setRequests] = useState(0);

  const fetchRequests = async () => {
    const resp = await axios("https://api.github.com/rate_limit");
    setRequests(resp.data.rate.remaining);
  };

  useEffect(() => {
    fetchRequests();
  }, [githubUser]);

  const toggleError = (show, msg) => {
    setError({ show: show || true, msg: msg || "" });
  };

  const fetchUser = async (user) => {
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(error)
    );
    if (response) {
      setGithubUser(response.data);

      const { login } = response.data;

      if (login) {
        const resonse = await Promise.allSettled([
          axios(`${rootUrl}/users/${login}/followers`),
          axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        ]);
        const [followers, repos] = resonse;
        setFollowers(followers.value.data);
        setRepos(repos.value.data);
        setLoading(false);
      }
    }
  };

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        fetchUser,
        error,
        loading,
        requests,
        toggleError,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GithubContext);
};

export { GithubContext, GithubProvider };
