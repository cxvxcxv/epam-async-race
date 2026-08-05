# 🏎️ Async Race

**Deployment:** https://epam-async-race-eight.vercel.app
**Score:** 400/400 pts

A Single Page Application for managing a collection of radio-controlled cars, running races, and tracking winners statistics.

## 🚀 Tech Stack

* React 19
* TypeScript (strict mode)
* Redux Toolkit for state management
* React Router
* Vite
* Tailwind CSS
* Fetch API for backend communication
* ESLint (Airbnb configuration)
* Prettier

## 📌 Project Overview

Async Race is a SPA that allows users to:

* Create and manage cars
* Edit car properties
* Start individual or group races
* Control car engines
* Track race winners
* View and sort race statistics

The application communicates with the provided Async Race API mock server.

Backend repository used during development:

https://github.com/mikhama/async-race-api

## 🧩 Main Features

### Garage

* Create cars
* Update cars
* Delete cars
* Generate 100 random cars
* Select car color
* Start/stop individual car engines
* Start race for current page cars
* Reset race
* Garage pagination (7 cars per page)
* Responsive race track animation

### Winners

* Display race winners
* Store number of victories
* Store best race time
* Sort by:

  * wins
  * best time
* Pagination (10 winners per page)

### Race

* Engine start/stop handling
* Async race simulation
* Winner detection
* Animated car movement
* Responsive animation for small screens
* Correct handling of actions during races

## ⚙️ Development

Install dependencies:

```bash
bun install
```

Run development server:

```bash
bun dev
```

Build production version:

```bash
bun run build
```

Run lint:

```bash
bun run lint
```

Fix lint issues:

```bash
bun run lint:fix
```

Format project:

```bash
bun run format
```

Check formatting:

```bash
bun run ci:format
```

## 🌐 Deployment

The application is deployed using:

* Platform: Vercel

Deployment URL:

https://epam-async-race-eight.vercel.app

## ✅ Implementation Checklist

Total: 400/400 pts

## 🚀 UI Deployment

* [ ] Deployment Platform: Successfully deploy UI on Vercel / Netlify / GitHub Pages / Cloudflare Pages

## ✅ Requirements to Commits and Repository

* [x] Commit guidelines compliance
* [x] Checklist included in README.md
* [x] Score calculation added
* [x] Deployment link added at the top of README.md

# Basic Structure — 80 pts

## Views

* [x] Two views implemented:

  * Garage
  * Winners

## Garage View Content

* [x] Garage page title
* [x] Car creation and editing panel
* [x] Race control panel
* [x] Garage section

## Winners View Content

* [x] Winners page title
* [x] Winners table
* [x] Winners pagination

## Persistent State

* [x] Garage pagination preserved
* [x] Winners pagination preserved
* [x] UI state preserved between navigation

# Garage View — 90 pts

## CRUD Operations

* [x] Create cars
* [x] Update cars
* [x] Delete cars
* [x] Validation for empty/invalid names
* [x] Removing cars removes related winner records

## Color Selection

* [x] Car color picker
* [x] Selected color displayed on car

## Random Cars

* [x] Generate 100 random cars
* [x] Random car names
* [x] Random colors

## Car Management

* [x] Update button near each car
* [x] Delete button near each car

## Pagination

* [x] Garage pagination
* [x] Seven cars per page

## Extra

* [x] Empty garage message
* [x] Automatically move to previous page after removing last car

# Winners View — 50 pts

## Winners

* [x] Display winners after races

* [x] Winners pagination

* [x] Winner table columns:

  * Number
  * Car icon
  * Name
  * Wins
  * Best time

* [x] Multiple wins increase counter

* [x] Best time updates only when improved

## Sorting

* [x] Sort by wins
* [x] Sort by best time
* [x] Ascending/descending order

# Race — 170 pts

## Engine Animation

* [x] Start engine animation
* [x] Stop engine animation
* [x] Handle engine API errors

## Responsive Animation

* [x] Animation works on screens from 500px

## Race Controls

* [x] Start race button
* [x] Reset race button
* [x] Winner announcement

## Button States

* [x] Disable start button while driving
* [x] Disable stop button when car is idle

## Actions During Race

* [x] Handle navigation during race
* [x] Handle car editing/deleting during race
* [x] Handle adding new cars during race

# Code Quality — 10 pts

## Prettier

* [x] Prettier configured
* [x] format script added
* [x] ci:format script added

## ESLint

* [x] Airbnb ESLint configuration
* [x] TypeScript ESLint configuration
* [x] lint script added

# Overall Code Quality

Implemented:

* Feature-based architecture
* Redux Toolkit state management
* Typed API layer
* Reusable UI components
* Separation between:

  * API
  * state management
  * UI components
  * business logic

## Author

Alisher Askar
