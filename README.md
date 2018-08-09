[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

# engraved.

## What engraved does
It allows you to store information snippets (URLs, code, notes, etc.) and add keywords to find and access them again from everywhere.

## Why engraved was created
There are basically three reasons:
- I use google keep for small, short-living snippets of information as well as for notifications. I use OneNote for (structured) stuff I actually work on. But there's nothing in between... I need a tool to store more or less unstructured stuff, that I want to keep (so longer living than keep ;)) but without all the boilerplate from OneNote.
- I wanted to try the React-Node-MongoDB stack.
- I wanted to have a go at implementing and thinking about a decent UX concept.

## Technologies, libraries, etc.
The aim is to use only libraries that are really necessary. And to do the UI/UX stuff myself and not rely on things like Material or Office UI Fabric or Bootsrap, etc.

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
