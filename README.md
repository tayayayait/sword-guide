# KendoCoach

## Project info

AI posture analysis and coaching for Kendo practice.

## How can I edit this code?

You can work locally using your preferred IDE.

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

You can also edit files directly in GitHub or use GitHub Codespaces if you prefer.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## MediaPipe Pose model

This app uses MediaPipe PoseLandmarker (Tasks Vision). Download a pose landmarker model and place it at:

- `public/models/pose_landmarker_lite.task`

If you prefer a different filename or location, update `MODEL_PATH` in `src/lib/MediaPipeService.ts`.

## How can I deploy this project?

Build the app and deploy the `dist/` output with your preferred hosting provider.

```sh
npm run build
```
