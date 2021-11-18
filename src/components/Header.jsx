const Header = ({ title }) => {
  return (
    <div className="py-6 m-auto flex justify-center items-center">
      <h1 className="font-bold text-bold text-lg lg:text-2xl">{title}</h1>
    </div>
  );
};

export default Header;
