import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCarById } from "@/lib/cars/data";
import CarDetailsClient from "./CarDetailsClient";

const CarDetailsPage = async ({ params }) => {
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const { token } = await auth.api.getToken({
        headers: await headers()
    });
    console.log("token data:", JSON.stringify(token));
    const car = await getCarById(id, token);

    return (
        <CarDetailsClient
            car={car}
            user={session?.user || null}
            token={token?.token || null}
        />
    );
};

export default CarDetailsPage;