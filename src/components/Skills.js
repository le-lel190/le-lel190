import React from 'react';
import styled from 'styled-components';
import { skills } from '../data/profile';

const Section = styled.section`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  padding: 0 0 80px;
  > * { min-width: 0; }
  h2 { font: 600 ${props => props.theme.sectionTitle}/1.2 ${props => props.theme.fontDisplay}; letter-spacing: -0.02em; margin-bottom: 20px; }
  @media (max-width: 900px) { gap: 32px; }
  @media (max-width: 720px) { grid-template-columns: 1fr; gap: 40px; padding-bottom: 56px; }
`;
const Toolbox = styled.div`
  > p { color: ${props => props.theme.textDim}; font-size: 0.95rem; line-height: 1.8; margin-bottom: 24px; max-width: 48ch; }
`;
const SkillList = styled.dl`
  > div {
    display: grid;
    grid-template-columns: 92px 1fr;
    gap: 20px;
    padding: 20px 0;
    border-top: 1px solid ${props => props.theme.borderStrong};
    &:last-child { border-bottom: 1px solid ${props => props.theme.borderStrong}; }
  }
  dt { color: ${props => props.theme.textMuted}; font: 0.75rem/1.9 ${props => props.theme.fontMono}; }
  dd { color: ${props => props.theme.text}; font: 0.8rem/1.9 ${props => props.theme.fontMono}; }
  ul { display: flex; flex-wrap: wrap; gap: 4px 16px; list-style: none; }
  @media (max-width: 380px) { > div { grid-template-columns: 1fr; gap: 8px; } }
`;
const PersonalCorner = styled.aside`
  align-self: start;
  margin-top: 8px;
  border: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.surface};
`;
const FileLabel = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid ${props => props.theme.borderStrong};
  color: ${props => props.theme.textMuted};
  font: 0.75rem ${props => props.theme.fontMono};
`;
const PersonalContent = styled.div`
  padding: 28px;
  > p { color: ${props => props.theme.textDim}; font-size: 0.95rem; line-height: 1.8; margin-top: 20px; }
  @media (max-width: 380px) { padding: 24px; }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  img { width: 64px; height: 64px; object-fit: cover; border: 1px solid ${props => props.theme.borderStrong}; }
  h3 { font: 600 1.8rem/1.2 ${props => props.theme.fontDisplay}; }
  p { color: ${props => props.theme.accent}; font: 0.8rem ${props => props.theme.fontMono}; margin-top: 8px; }
`;
const Stickers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
  span {
    display: inline-block;
    border: 1px solid ${props => props.theme.borderStrong};
    padding: 4px 8px;
    font: 0.75rem/1.6 ${props => props.theme.fontMono};
    color: ${props => props.theme.accent};
    background: ${props => props.theme.panel};
    &:nth-child(2) { color: ${props => props.theme.warning}; }
    &:nth-child(3) { color: ${props => props.theme.info}; }
  }
`;

const Skills = () => (
  <Section id="skills" aria-labelledby="skills-heading">
    <Toolbox>
      <h2 id="skills-heading">The toolbox.</h2>
      <p>From web services to reverse-engineering experiments. Security coursework at CUHK and CTF competitions are part of the mix, too.</p>
      <SkillList>
        {skills.map(({ category, items }) => (
          <div key={category}>
            <dt>{category}</dt>
            <dd><ul>{items.map(skill => <li key={skill}>{skill}</li>)}</ul></dd>
          </div>
        ))}
      </SkillList>
    </Toolbox>
    <PersonalCorner aria-labelledby="personal-heading">
      <FileLabel>~/personal/README.md</FileLabel>
      <PersonalContent>
        <Profile>
          <img src={`${process.env.PUBLIC_URL}/images/avatar.jpg`} alt="lel190's avatar" width="64" height="64" loading="lazy" />
          <div><h3 id="personal-heading">Off the clock.</h3><p>Anson / lel190</p></div>
        </Profile>
        <p>Anime, rhythm games, and a bit of casual gaming. I once made the top 100 in Hong Kong in osu!mania. Yes, I'm still bringing that up.</p>
        <p>Usually following some new rabbit hole. Occasionally remembering to finish the last one.</p>
        <Stickers aria-label="Personal interests"><span>Linux enjoyer</span><span>Anime</span><span>osu!mania</span></Stickers>
      </PersonalContent>
    </PersonalCorner>
  </Section>
);

export default Skills;
