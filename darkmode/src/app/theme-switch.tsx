"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Theme } from "@/app/theme-provider";


export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }

  const onChangeTheme = () => {
    console.log(theme)
    setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };


  return (
    <button
      className={`w-fit absolute right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-white dark:bg-slate-800`}
      onClick={onChangeTheme}
    >
      {theme === Theme.LIGHT ? "Switch to dark" : "Switch to light"}
    </button>
  );
};