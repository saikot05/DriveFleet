import Image from "next/image";

const AvailableCars = ({ cars }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {cars.map((car) => (
                <div key={car._id} className="border border-base-300 rounded-box w-full ">
                    <Image src={car.image} alt={car.title} width={500} height={500} className="w-full h-full object-cover" />
                    <h1 className="text-2xl font-bold">{car.title}</h1>
                </div>
            ))}
        </div>
    );
};

export default AvailableCars;