import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCarById } from "@/lib/cars/data";
import CarDetailsClient from "../../../components/CarDetailsClient";

const CarDetailsPage = async ({ params }) => {
    const { id } = await params;

    let session = null;
    let token = null;

    try {
        session = await auth.api.getSession({
            headers: await headers()
        });

        token = await auth.api.getToken({
            headers: await headers()
        });
    } catch (authError) {
        console.error("Auth token fetch failed:", authError);
    }

    console.log("Token in CarDetailsPage:", token);
    
    const car = await getCarById(id, token);

    return (
        <CarDetailsClient
            car={car}
            user={session?.user}
            token={token}
        />
    );
};

export default CarDetailsPage;