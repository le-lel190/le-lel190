import React from 'react';
import styled from 'styled-components';
import { skills } from '../data/profile';

const Section = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  gap: 0 48px;
  padding: 72px 0 0;
  > * { min-width: 0; }
  @media (max-width: 960px) { grid-template-columns: 1fr; gap: 40px; padding-top: 56px; }
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 2px solid ${props => props.theme.borderStrong};
  h2 {
    font-family: ${props => props.theme.fontDisplay};
    font-size: ${props => props.theme.sectionTitle};
    font-weight: 700;
    font-stretch: 80%;
    text-transform: uppercase;
    letter-spacing: -0.015em;
    line-height: 1.05;
  }
  span { color: ${props => props.theme.textMuted}; font: 400 0.64rem/1.6 ${props => props.theme.fontMono}; letter-spacing: 0.16em; text-transform: uppercase; white-space: nowrap; }
`;
const Toolbox = styled.div`
  > p { color: ${props => props.theme.textDim}; font-size: 0.92rem; line-height: 1.75; max-width: 58ch; margin: 16px 0 22px; }
`;
const Buses = styled.dl`
  border-top: 1px solid ${props => props.theme.border};
  > div {
    display: grid;
    grid-template-columns: 8.5em minmax(0, 1fr);
    gap: 16px;
    padding: 14px 0;
    border-bottom: 1px solid ${props => props.theme.border};
  }
  dt {
    color: ${props => props.theme.accentDim};
    font: 500 0.68rem/1.9 ${props => props.theme.fontMono};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    b { display: block; color: ${props => props.theme.textMuted}; font-weight: 400; letter-spacing: 0.06em; }
  }
  dd { font: 400 0.82rem/1.9 ${props => props.theme.fontMono}; color: ${props => props.theme.text}; }
  ul { list-style: none; display: flex; flex-wrap: wrap; gap: 0 0; }
  li { display: inline-flex; align-items: center; }
  li + li::before {
    content: '/';
    padding: 0 9px;
    color: ${props => props.theme.borderStrong};
  }
  @media (max-width: 420px) {
    > div { grid-template-columns: 1fr; gap: 4px; }
    dt b { display: inline; margin-left: 8px; }
    dd { font-size: 0.8rem; }
  }
`;
const Personal = styled.aside`
  align-self: start;
  border: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.panel};
`;
const PersonalLabel = styled.div`
  padding: 9px 16px;
  border-bottom: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.surface};
  color: ${props => props.theme.textMuted};
  font: 400 0.64rem/1.6 ${props => props.theme.fontMono};
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;
const PersonalBody = styled.div`
  padding: 20px 16px 22px;
  > p { color: ${props => props.theme.textDim}; font: 400 0.86rem/1.8 ${props => props.theme.fontBody}; margin-top: 14px; }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border: 1px solid ${props => props.theme.borderStrong};
    filter: grayscale(0.35) contrast(1.05);
  }
  h3 {
    font-family: ${props => props.theme.fontDisplay};
    font-size: 1.5rem;
    font-weight: 700;
    font-stretch: 82%;
    text-transform: uppercase;
    line-height: 1.05;
  }
  p { color: ${props => props.theme.accent}; font: 400 0.72rem/1.6 ${props => props.theme.fontMono}; margin-top: 6px; }
`;
const Stencils = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.border};
  li {
    padding: 3px 8px;
    border: 1px solid ${props => props.theme.borderStrong};
    color: ${props => props.theme.textDim};
    font: 400 0.68rem/1.7 ${props => props.theme.fontMono};
    letter-spacing: 0.04em;
    &:first-child { color: ${props => props.theme.accent}; border-color: ${props => props.theme.accentDim}; }
  }
`;

const Skills = () => (
  <Section id="skills" aria-labelledby="skills-heading">
    <Toolbox>
      <Head>
        <h2 id="skills-heading">The toolbox.</h2>
        <span>section 02 / bus table</span>
      </Head>
      <p>From web services to reverse-engineering experiments. Security coursework at CUHK and CTF competitions are part of the mix, too.</p>
      <Buses>
        {skills.map(({ category, items }, index) => (
          <div key={category}>
            <dt>{`bus ${index}`} <b>{category}</b></dt>
            <dd><ul>{items.map(skill => <li key={skill}>{skill}</li>)}</ul></dd>
          </div>
        ))}
      </Buses>
    </Toolbox>
    <Personal aria-labelledby="personal-heading">
      <PersonalLabel>J1 · /home/lel190</PersonalLabel>
      <PersonalBody>
        <Profile>
          <img src={`${process.env.PUBLIC_URL}/images/avatar.jpg`} alt="lel190's avatar" width="56" height="56" loading="lazy" />
          <div>
            <h3 id="personal-heading">Off the clock.</h3>
            <p>Anson / lel190</p>
          </div>
        </Profile>
        <p>Anime, rhythm games, and a bit of casual gaming. I once made the top 100 in Hong Kong in osu!mania. Yes, I'm still bringing that up.</p>
        <p>Usually following some new rabbit hole. Occasionally remembering to finish the last one.</p>
        <Stencils aria-label="Personal interests"><li>Linux enjoyer</li><li>Anime</li><li>osu!mania</li></Stencils>
      </PersonalBody>
    </Personal>
  </Section>
);

export default Skills;
