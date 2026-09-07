import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 70px;
  padding: 10px 0 80px;
  > * { min-width: 0; }
  h2 { font: 600 2rem/1.2 ${props => props.theme.fontDisplay}; letter-spacing: -0.02em; margin-bottom: 24px; }
  @media (max-width: 850px) { gap: 40px; }
  @media (max-width: 720px) { grid-template-columns: 1fr; padding-bottom: 56px; }
`;
const Toolbox = styled.div`
  > p { color: ${props => props.theme.textDim}; font-size: 0.9rem; margin-bottom: 23px; }
`;
const SkillList = styled.dl`
  > div {
    display: grid;
    grid-template-columns: 90px 1fr;
    gap: 20px;
    padding: 18px 0;
    border-top: 1px solid ${props => props.theme.border};
    &:last-child { border-bottom: 1px solid ${props => props.theme.border}; }
  }
  dt { color: ${props => props.theme.textMuted}; font: 0.7rem/1.9 ${props => props.theme.fontMono}; }
  dd { color: ${props => props.theme.text}; font: 0.74rem/1.9 ${props => props.theme.fontMono}; }
  ul { display: flex; flex-wrap: wrap; gap: 4px 18px; list-style: none; }
  @media (max-width: 380px) { > div { grid-template-columns: 76px 1fr; gap: 12px; } }
`;
const PersonalCorner = styled.aside`
  border: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.surface};
  align-self: start;
`;
const FileLabel = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid ${props => props.theme.borderStrong};
  font: 0.64rem ${props => props.theme.fontMono};
  color: ${props => props.theme.textMuted};
  display: flex;
  justify-content: space-between;
  span { color: ${props => props.theme.warning}; }
`;
const PersonalContent = styled.div`
  padding: 24px;
  > p { color: ${props => props.theme.textDim}; font-size: 0.87rem; line-height: 1.8; margin-top: 20px; }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  img { width: 76px; height: 76px; object-fit: cover; border: 1px solid ${props => props.theme.borderStrong}; }
  h3 { font: 600 1.5rem/1.2 ${props => props.theme.fontDisplay}; }
  p { color: ${props => props.theme.accent}; font: 0.68rem ${props => props.theme.fontMono}; margin-top: 8px; }
`;
const Stickers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
  span {
    display: inline-block;
    border: 1px solid ${props => props.theme.borderStrong};
    padding: 4px 9px;
    font: 500 0.61rem ${props => props.theme.fontMono};
    color: ${props => props.theme.accent};
    background: ${props => props.theme.panel};
    &:nth-child(2) { color: ${props => props.theme.warning}; }
    &:nth-child(3) { color: ${props => props.theme.info}; }
  }
`;

const skillsData = [
  { category: 'Languages', skills: ['Python', 'C/C++', 'Java', 'R', 'SQL'] },
  { category: 'Web', skills: ['React', 'Node.js', 'Express.js', 'JavaScript', 'HTML/CSS'] },
  { category: 'Tools', skills: ['Git', 'Linux', 'Docker'] },
];

const Skills = () => (
  <Section id="skills" aria-labelledby="skills-heading">
    <Toolbox>
      <h2 id="skills-heading">The toolbox.</h2>
      <p>Languages, frameworks, and tools I build with.</p>
      <SkillList>
        {skillsData.map(category => (
          <div key={category.category}>
            <dt>{category.category}</dt>
            <dd><ul>{category.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></dd>
          </div>
        ))}
      </SkillList>
    </Toolbox>
    <PersonalCorner aria-labelledby="personal-heading">
      <FileLabel>~/personal/README.txt<span>( ͡° ͜ʖ ͡°)</span></FileLabel>
      <PersonalContent>
        <Profile>
          <img src={`${process.env.PUBLIC_URL}/images/avatar.jpg`} alt="lel190's avatar" width="76" height="76" loading="lazy" />
          <div><h3 id="personal-heading">Behind the shell.</h3><p>Anson / lel190</p></div>
        </Profile>
        <p>Cybersecurity, CTFs, and reverse engineering on one side. Anime, rhythm game enjoyer (??? I was top 100 in HK in osu!mania before though), and a casual gamer.</p>
        <p>And I have to say it was Cheat Engine who taught me so many stuff.</p>
        <Stickers aria-label="Personal interests"><span>LINUX ENJOYER</span><span>TINY BIT OF ANIME</span><span>AVERAGE CHEAT ENGINE ENJOYER</span></Stickers>
      </PersonalContent>
    </PersonalCorner>
  </Section>
);

export default Skills;
