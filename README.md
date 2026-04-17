# Skyline
Skyline is a high-performance, responsive weather visualization platform built with React and TypeScript. It integrates real-time meteorological data with interactive geospatial mapping to provide a comprehensive weather intelligence interface.

**Live Demo:** [skyline-murex-omega.vercel.app](https://skyline-murex-omega.vercel.app/)
<p />
<img width="1600" height="900" alt="desktop" src="https://github.com/user-attachments/assets/85128e50-3746-4c44-8120-2bb3130f3a49" />
<!-- <br />
<img width="300" height="900" alt="mobile" src="https://github.com/user-attachments/assets/d17bbc74-ace5-4d16-9b14-3cb14d732238" />
</div> -->



## Technical Stack

* **Framework:** React 19 with Vite for optimized build tooling
* **Language:** TypeScript for type-safe state management and API integration
* **Styling:** Tailwind CSS v4 utilizing the OKLCH color space for high-perceptual accuracy in UI design
* **Mapping:** Leaflet and MapTiler SDK for vector tile rendering and geospatial overlays
* **Data Validation:** Zod for runtime schema validation of third-party API responses
* **Deployment:** Vercel (CI/CD)

## Core Features

* **Dynamic Geospatial Overlays:** Implementation of specialized tile layers from WeatherAPI to visualize temperature, precipitation, and atmospheric pressure directly on an interactive map.
* **Geocoding & Location Persistence:** Users can query global locations via a dropdown system or direct map interaction, utilizing coordinate-based data fetching.
* **Performance Optimization:** Integrated React Suspense with custom skeleton loading states to maintain a smooth UI during asynchronous data retrieval.
* **Responsive Layout Engine:** A specialized CSS Grid and Flexbox architecture that maintains uniform card dimensions across mobile, tablet, and desktop viewports.
* **Adaptive Theme System:** Native dark mode support using CSS variables and Tailwind's custom variant engine, optimized for reduced eye strain in low-light environments.

## Architecture and Design Patterns

### 1. Data Integrity and Validation
The application utilizes Zod to define rigorous schemas for incoming weather data. This ensures the UI is resilient against unexpected changes in third-party API payloads, particularly when transitioning between API subscription tiers.

### 2. Modern Typography and Color
Leverages the Geist Variable font family for optimal legibility and the OKLCH color model to ensure consistent contrast ratios and accessibility across different display technologies.

### 3. Modular Component Design
The project follows a modular structure where the mapping logic, legend systems, and weather forecast cards are encapsulated as reusable components, facilitating easier testing and scalability.

## Environment Setup

To run the project locally, you will need to configure the following environment variables in a `.env` file:

```env
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_MAPTILER_API_KEY=your_maptiler_api_key
```

## Installation
1. Clone the repository
2. Install dependencies
3. Start the development server

```bash
git clone https://github.com/VedantBandre/skyline.git
npm install
npm run dev
```

## Development Challenges Overcome
* **Synchronizing Map Overlays:** Addressed issues regarding tile layer refresh rates and timestamp synchronization to ensure weather overlays match real-time data.

* **Responsive Dashboarding:** Solved CSS Grid "cell-stretching" issues to ensure that heterogeneous content (hourly vs. daily forecasts) maintains a unified height and width in a dashboard view.

* **State Management:** Managed complex cross-component state for coordinates and map types without unnecessary re-renders.

## License
Distributed under the MIT License. See LICENSE for more information.
