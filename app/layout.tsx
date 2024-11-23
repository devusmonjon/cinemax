import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CineMax - Online Cinema",
  description:
    "CineMax - Online movie streaming platform, Movies, TV Shows and more",
  category: `
    Action, Adventure, Animation, Biography, Comedy, Crime, Documentary, Drama, Fantasy, Historical, Horror, Musical, Mystery, Romance, Sci-Fi, Sports, Thriller, War, Western, Family, Superhero, Short Film, Indie, Suspense, Blockbuster, Fiction, Classic, Teen, Kids, Award-winning, Streaming, Cinematic Universe, Spy, Noir, Drama-comedy, Zombie, Post-apocalyptic, Cyberpunk, Steampunk, Martial Arts, Heist, Space Opera, Satire, Paranormal, Romantic Comedy, Detective, Coming of Age, Nature, Art House, Experimental, Survival.

    Экшн, Приключения, Анимация, Биография, Комедия, Криминал, Документальные, Драма, Фэнтези, Исторические, Ужасы, Мюзиклы, Мистика, Романтика, Научная фантастика, Спорт, Триллеры, Военные, Вестерн, Семейные, Супергерои, Короткометражки, Индепендент, Саспенс, Блокбастеры, Фантастика, Классика, Молодёжные, Детские, Лауреаты премий, Стриминг, Кинематографическая вселенная, Шпионские, Нуар, Драмеди, Зомби, Постапокалипсис, Киберпанк, Стимпанк, Боевые искусства, Ограбления, Космическая опера, Сатира, Паранормальные, Романтическая комедия, Детективы, Подростковые, Природа, Арт-хаус, Экспериментальные, Выживание.

    Aksion, Sarguzasht, Animatsiya, Biografiya, Komediya, Jinoyat, Hujjatli, Drama, Fantaziya, Tarixiy, Dahshat, Musiqiy, Sirli, Melodrama, Ilmiy fantastika, Sport, Triller, Urush, G‘arb filmlari, Oilaviy, Superqahramonlar, Qisqa metrajli filmlar, Mustaqil kino, Hayajonli, Yirik loyihalar, Adabiyot asosida, Klassik, Yoshlar uchun, Bolalar, Mukofotli, Translatsiya, Kino olami, Josuslik, Noir janri, Zombi, Postapokalipsis, Kiberyo‘nalish, Steampunk, Jang san’ati, O‘g‘irliklar, Fazoviy opera, Satira, Paranormal voqealar, Romantik komediya, Detektiv, Voyaga yetishish, Tabiat, San’at, Tajriba filmlari, Omon qolish.
  `,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
