"use server";

import countries from "@/data/countries.json";
import prisma from "@/lib/prisma";

export const seedCountries = async () => {
	await prisma.country.createMany({ data: countries });
	try {
	} catch (error) {
		console.error(`Erro seeding countries: ${error}`);
	}
};
