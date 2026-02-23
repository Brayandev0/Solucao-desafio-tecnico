import type { Metadata } from "next";
import type { MetaDadosSEO } from "@/types";

export const getMetaData = ({
  description,
  image,
  title,
  url,
  type = "website",
}: MetaDadosSEO): Metadata => {
  const metaDataObject: Metadata = {
    title,
    description,
    openGraph: {
      type: type as "website",
      images: image ? [image] : [],
      title,
      description,
      url: url,
    },
    alternates: {
      canonical: url,
    },
    metadataBase: new URL("http://localhost:3000"),
    twitter: {
      title,
      description,
      images: image ? [image] : [],
    },
  };

  return metaDataObject;
};
