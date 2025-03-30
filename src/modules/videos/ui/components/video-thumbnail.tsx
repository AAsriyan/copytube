import Image from "next/image";
import { formatDuration } from "@/lib/utils";
import { THUMBNAIL_FALLBACK_URL } from "@/modules/videos/constants";
interface VideoThumbnailProps {
  title: string;
  duration: number;
  imageUrl?: string | null;
  previewUrl?: string | null;
}

export const VideoThumbnail = ({
  imageUrl,
  previewUrl,
  title,
  duration,
}: VideoThumbnailProps) => {
  return (
    <div className="relative group">
      {/* Thumbnal wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          src={imageUrl ?? THUMBNAIL_FALLBACK_URL}
          alt={title}
          fill
          className="object-cover size-full group-hover:opacity-0"
        />
        <Image
          unoptimized={!!previewUrl}
          src={previewUrl ?? THUMBNAIL_FALLBACK_URL}
          alt={title}
          fill
          className="object-cover size-full opacity-0 group-hover:opacity-100"
        />
      </div>

      {/* Video duration box */}
      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1 py-0.5 rounded">
        {formatDuration(duration)}
      </div>
    </div>
  );
};
