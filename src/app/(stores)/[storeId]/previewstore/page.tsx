import { handlError } from "@/components/handle-error";
import PreviewStoreClient from "./preview-store-client";
import { ImagesHomePageResType } from "@/Type/ImagesHomePage";
import { ImagesHomePageAPI } from "@/apiRequest/ImagesHomePageAPI";

interface PreviewStoreProps {
  params: { storeId: string };
}
async function getImagesHomePage(storeId: string) {
  let imagesHomePage: ImagesHomePageResType | null = null;
  try {
    imagesHomePage = await ImagesHomePageAPI.getImagesHomePage({
      storeId,
    });
  } catch (error: any) {
    if (error.statusCode !== 400) {
      handlError({ consoleError: "GET_IMAGESHOMEPAGE_ERROR", error });
    }
  }
  return imagesHomePage;
}

async function PreviewStore({ params }: PreviewStoreProps) {
  const imagesHomePage = await getImagesHomePage(params.storeId);
  console.log(imagesHomePage);
  return (
    <div>
      <PreviewStoreClient initObjectData={imagesHomePage} />
    </div>
  );
}

export default PreviewStore;
