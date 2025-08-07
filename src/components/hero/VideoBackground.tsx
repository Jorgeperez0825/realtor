export default function VideoBackground() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Real Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/hero-video.mov" type="video/quicktime" />
        <source src="/hero-video.mov" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
      </video>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
    </div>
  );
}