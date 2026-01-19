import Image from "next/image";
import LinkButton from "./Link";
import { MoveRight } from "lucide-react";
import { cldUrl } from "@/utils/cloudinary";
type Props = {
  cover: string;
  title: string;
  category: string;
  url: string;
};

function Article({ cover, title, category, url }: Props) {
  const parts = cover.split("/");
  const filename = parts[parts.length - 1];
  const publicId = filename.split(".")[0];

  return (
    <article className="flex group flex-col  h-auto xl:min-h-[361px]">
      <div className="flex h-[230px] xl:max-h-[184px]">
    {/*     <Image
          src={cover}
          width={326}
          height={184}
          alt={title}
          style={{ width: "auto", height: "auto" }}
          className="object-cover object-center  w-full h-auto"
        /> */}

        <Image
          //src={image_1}
          src={cldUrl(publicId, { w: 326, h: 184 })}
          alt={title}
          className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 border border-gray-100"
          width={326}
          loading="lazy"
          sizes="(max-width: 768px) 50vw, (max-width: 36000px) 25vw, 240px"
          height={184}
        />
      </div>

      <div className="flex flex-col border-x border-b rounded-b-lg p-4 border-grey-200 group-hover:bg-grey-950 py-10 grow">
        <h4 className="text-primary font-bold text-xs uppercase">{category}</h4>
        <h3 className="text-lg font-bold text-grey-800 mt-2 group-hover:text-white">
          {title}
        </h3>

        <LinkButton
          className="max-w-[110px] text-sm px-0 max-h-12 group-hover:text-white"
          variant={"outline"}
          href={url ? url : "#"}
          label="Read more "
          icon={<MoveRight className="ml-2" />}
        />
      </div>
    </article>
  );
}

export default Article;
