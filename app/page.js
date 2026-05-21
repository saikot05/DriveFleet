import AvailableCars from "@/components/AvailableCars";
import Bannar from "@/components/Bannar";
import Brand from "@/components/Brand";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Bannar />
      <AvailableCars />
      <Brand />
    </div>
  );
};

export default Home;