import image1 from "@/assets/service-1.jpg";
import image2 from "@/assets/service-2.jpg";
import image3 from "@/assets/service-3.jpg";
import image4 from "@/assets/service-4.jpg";
import image5 from "@/assets/service-5.jpg";
import image6 from "@/assets/service-6.jpg";
import image7 from "@/assets/service-7.jpg";
import image8 from "@/assets/service-8.jpg";
import image9 from "@/assets/service-9.jpg";
import image10 from "@/assets/service-10.jpg";
import image11 from "@/assets/service-11.jpg";
import image12 from "@/assets/service-12.jpg";
import image13 from "@/assets/service-13.jpg";
import image14 from "@/assets/service-14.jpg";

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14];

export function ServiceImage({ id, name, className = "" }: { id: number; name: string; className?: string }) {
  const image = images[id - 1];
  if (!image) return null;
  return <img src={image} alt={name} width={474} height={474} loading="lazy" className={`aspect-[16/9] w-full rounded-lg object-cover ${className}`} />;
}