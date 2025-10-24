# Steps for installation

1. Install vite using the following command

   `npm create vite@latest`

2. Install tailwindCss reading the documentation attach in this
   [link](https://v3.tailwindcss.com/docs/guides/vite).

3. Run the following code to install daisyUI in your project

   `npm install daisyui@4`

4. configure your `tailwind.config.js` file with the following lines of code.

   ```/** @type {import('tailwindcss').Config} */
   import daisyui from "daisyui";
   import tailwindScrollbar from "tailwind-scrollbar";
   import daisyUIThemes from "daisyui/src/theming/themes";
   export default {
        content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
        theme: {
            extend: {},
        },
        plugins: [daisyui, tailwindScrollbar],
            daisyui: {
                themes: [
                "light",
                "retro",
                "coffee",
                "emerald",
                "valentine",
                {
                    dark: {
                        ...daisyUIThemes["dark"],
                        primary: "rgb(29, 155, 240)",
                        secondary: "rgb(24, 24, 24)",
                    },
                },
            ],
        },
   };
   ```

5. Install react-router-dom from the follwing command

   `npm i react-router-dom@7`

6. Install Clerk Authentication reading the documentation attach in this
   [link](https://clerk.com/docs/quickstarts/react).

7. Install Clerk Themes reading the documentation attach in this
   [link](https://clerk.com/docs/customization/themes).

8. Install Lucide React icon library reading the documentation attach in this
   [link](https://lucide.dev/guide/packages/lucide-react).
