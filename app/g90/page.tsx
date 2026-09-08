import type {Metadata} from "next";

export const metadata:Metadata={
  title:"G90 — аналитика квартир",
  description:"Аналитика рынка квартир в радиусе 3 км от Гимназии №90 им. Қайыма Мұхамедханова"
};

export default function G90Page(){
  return <main style={{position:"fixed",inset:0,background:"#10151c",zIndex:9999}}>
    <iframe
      src="https://astana-apartment-map-timka240306-6616.vercel.app/"
      title="Аналитика квартир у Гимназии №90"
      style={{width:"100%",height:"100%",border:0,display:"block",background:"#10151c"}}
      allow="fullscreen"
    />
  </main>;
}
