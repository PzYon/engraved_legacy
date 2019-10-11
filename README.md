[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
<a href="https://github.com/PzYon/engraved/actions?workflow=CI"><img alt="GitHub Actions status" src="https://github.com/PzYon/engraved/workflows/CI/badge.svg"></a>


# engraved.

## What engraved does?
It allows you to store information snippets (URLs, code, notes, etc.) and add keywords to find and access them again later. Try it out yourself using your Google account: https://engraved.herokuapp.com/

Please note that this is running on a free Heroku Dyno, so it might take a while to wake up :sleeping:. 

In case of feedback, improvements etc., feel free to create an issue or a PR.

## Why did I create engraved?
There are basically three simple reasons:
- I use google keep for small, short-living snippets of information as well as for notifications. I use OneNote for (structured) stuff I actually work on. But there's nothing in between... I need a tool to store more or less unstructured stuff, that I want to keep (so longer living than keep ;)) but without all the boilerplate from OneNote. It should also be easily accessible from mobile devices as well as from desktop computers.
- I wanted to try the MERN-stack (MongoDB, Express, React, Node).
- I wanted to have a go at implementing and thinking about a decent UI/UX concept.

## Was technologies, libraries, etc. are used?
The aim is to use only libraries that are really necessary. And to do the UI/UX stuff myself and not rely on things like Material or Office UI Fabric or Bootstrap, etc. I also try to use the newest versions of the depenencies, so I can tryout the newest features (e.g. React Hooks) :sunglasses:. 

### Client
- TypeScript
- React
- Styled Components (no SASS)
- RxJS (no redux, no mobx, etc.)

### Server
- TypeScript
- NodeJS
- MongoDB (no mongoose)
- Express
