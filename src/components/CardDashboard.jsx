import PropTypes from "prop-types";

function CardDashboard({ name, total, image }) {
  return (
    <div className="bg-white rounded-2xl flex flex-col gap-4 p-4 font-Inter w-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-base font-semibold">{name}</p>
          <p className="font-bold text-xl">{total}</p>
        </div>
        <img src={image} className="w-12" alt="" />
      </div>
    </div>
  );
}

CardDashboard.propTypes = {
  name: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default CardDashboard;
