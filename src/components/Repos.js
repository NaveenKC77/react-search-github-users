import React from "react";
import styled from "styled-components";

import { Chart, Column3D, Bar3D, Doughnut2D } from "./Charts";
import { useGlobalContext } from "../context/context";

const Repos = () => {
  const { repos } = useGlobalContext();

  let languageData = repos.reduce((total, repo) => {
    const { language, stargazers_count } = repo;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, star: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        star: total[language].star + stargazers_count,
      };
    }
    return total;
  }, {});

  const mostUsedLanguages = Object.values(languageData)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostStarredLanguages = Object.values(languageData)
    .sort((a, b) => {
      return b.star - a.star;
    })
    .slice(0, 5)
    .map((item) => {
      return { ...item, value: item.star };
    });

  const projectData = repos.reduce((total, repo) => {
    const { name, stargazers_count, forks } = repo;
    if (name) {
      if (!total[name]) {
        total[name] = { label: name, value: stargazers_count, forks };
      } else {
        total[name] = {
          ...total[name],
          value: total[name].value + stargazers_count,
          forks: total[name].forks + forks,
        };
      }
    }
    return total;
  }, {});
  const mostPopularProject = Object.values(projectData)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostForkedProject = Object.values(projectData)
    .map((data) => {
      return { ...data, value: data.forks };
    })
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Chart data={mostUsedLanguages} />
        <Column3D data={mostPopularProject} />
        <Doughnut2D data={mostStarredLanguages} />
        <Bar3D data={mostForkedProject} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  text-align: center;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;

    border-radius: var(--radius) !important;
  }
  .chart {
    height: 500px;
    width: 100% !important;
  }
`;

export default Repos;
