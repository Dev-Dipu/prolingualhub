import BackButton from "@/components/BackButton";
import React from "react";

const videos = [
  {
    lang: "English",
    src: "https://res.cloudinary.com/dbpty5rcx/video/upload/c_fill,ar_9:16/g_auto/f_auto,q_auto/v1/English_lesson_z4c7rn.mp4",
  },
  {
    lang: "Russian",
    src: "https://res.cloudinary.com/dbpty5rcx/video/upload/c_fill,ar_9:16/g_auto/f_auto,q_auto/v1/lv_0_20260108232837_xlcxie.mp4",
  },
];

export default function VideosPage() {
  return (
    <section className="font-[dm_mono] h-screen bg-white px-6 py-12 flex flex-col items-center">
      <BackButton />
      {/* Top text */}
      <h1 className="text-red-600 text-3xl md:text-4xl font-bold mb-16">
        ProlingualHub
      </h1>

      {/* Videos */}
      <div className="flex flex-col md:flex-row gap-16 items-center">
        {videos.map((video, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            
            <div className="w-[260px] sm:w-[300px] aspect-[9/16] rounded-md overflow-hidden bg-black shadow-xl">
              <video
                src={video.src}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Language text only */}
            <p className="text-gray-600 text-sm">
              {video.lang}
            </p>

          </div>
        ))}
      </div>

    </section>
  );
}
