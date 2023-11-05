import { ThemeSwitch } from "@/app/theme-switch";

export const metadata = {
  title: "Darkmode with Next.js and TailwindCSS",
  description:
    "Simple app to showcase dark mode with Next.js and TailwindCSS",
};

const ThemePage = () => {
 return (<ThemeSwitch />)
}
export default ThemePage;