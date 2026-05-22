import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCarById } from "@/lib/cars/data";
import CarDetailsClient from "@/components/CarDetailsClient";

const CarDetailsPage = async ({ params }) => {
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers()
    }).catch(() => null);

    const car = await getCarById(id);

    return (
        <CarDetailsClient
            car={car}
            user={session?.user}
        />
    );
};

export default CarDetailsPage;