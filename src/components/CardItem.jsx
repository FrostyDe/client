const CardItem = ({ release, rename, img, pokemonName, name }) => {
  return (
    <div className="flex flex-col w-60 ,h-80 bg-white rounded-3xl shadow-card overflow-hidden my-4">
      <div className="flex justify-center h-4/6 p-4 bg-gradient-to-b from-white to-gray-200">
        <img src={img} alt="" className="object-contain" />
      </div>

      <div className="flex flex-col gap-2 justify-start bg-white px-4 py-6">
        <h2 className="text-left font-semibold capitalize">{pokemonName}</h2>
        <h3 className="text-left font-medium capitalize">{name}</h3>
        <div className="flex flex-row justify-between items-center pt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg transition transform duration-500 ease-out hover:scale-110"
            onClick={release}
          >
            Release
          </button>
          <button
            className="px-4 py-2 bg-blue-800 text-white rounded-lg transition transform duration-500 ease-out hover:scale-110"
            onClick={rename}
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
