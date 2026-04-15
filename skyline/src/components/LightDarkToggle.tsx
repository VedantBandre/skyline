import { Switch } from "./ui/switch";
import Sun from "/src/assets/sun.svg?react";
import Moon from "/src/assets/moon.svg?react";
import { useTheme } from "./ThemeProvider";


type Props = {}

export default function LightDarkToggle ( {} : Props) {
    const {theme, toggleTheme} = useTheme()
    return (
        <div className="flex items-center gap-2 border dark:border-none dark:bg-zinc-900/75 p-2 rounded-md">
            <Sun className="size-4 dark:invert opacity-70"/>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme}/>
            <Moon className="size-4 dark:invert opacity-70"/>
        </div>
    );
}
