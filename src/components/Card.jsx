import { Link } from "react-router-dom";

const Card = ({ link, img, name }) => {
  return (
    <Link
      to={link}
      className="flex flex-col w-72 h-72 bg-white rounded-3xl shadow-card overflow-hidden cursor-pointer transition transform duration-500 ease-out hover:-translate-y-2"
    >
      <div className="flex justify-center h-4/6 p-4 bg-gradient-to-b from-white to-gray-200">
        <img src={img} alt="" className="object-contain" />
      </div>

      <div className="bg-white px-auto py-6">
        <h2 className="text-center font-semibold capitalize">{name}</h2>
      </div>
    </Link>
  );
};

export default Card;
