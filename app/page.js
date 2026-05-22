import AvailableCars from "@/components/AvailableCars";
import Bannar from "@/components/Bannar";
import Brand from "@/components/Brand";
import PremiumExperience from "@/components/PremiumExperience";

const Home = () => {
    return (
        <div className="flex flex-col">
            <Bannar />
            <AvailableCars />
            <PremiumExperience />
            <Brand />
        </div>
    );
};

export default Home;