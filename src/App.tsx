export default function Parallax() {
  return (
    <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory">
      {[1, 2, 3, 4, 5].map((image) => (
        <div
          key={image}
          className="h-screen w-full flex items-center justify-center snap-start"
        >
          <img
            src={`/${image}.jpg`}
            className="w-80 h-96 object-cover rounded-lg shadow-xl"
          />
        </div>
      ))}
    </div>
  );
}
