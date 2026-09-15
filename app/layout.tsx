import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://stroy-company.timka240306.chatgpt.site"),
  title: { default: "UIDOMHOME", template: "%s — UIDOMHOME" },
  description:
    "Жилые комплексы UIDOMHOME, квартиры в наличии и реализованные проекты в Астане.",
  icons: { icon: "/uidomhome-mark.webp", apple: "/uidomhome-mark.webp" },
  openGraph: {
    title: "UIDOMHOME",
    description: "Недвижимость в Астане",
    images: ["/og.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "UIDOMHOME",
    description: "Недвижимость в Астане",
    images: ["/og.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1786186669062704');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1786186669062704&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
