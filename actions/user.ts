"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const protectRoute = async (auth: "ADMIN" | "SELLER" | "USER") => {
	const user = await currentUser();
	if (!user) redirect("/");

	const role = user.privateMetadata.role as string;
	const allowedRoles = ["SELLER", "ADMIN"];

	if (role !== auth) {
		if (allowedRoles.includes(role)) redirect(`/dashboard/${role.toLowerCase()}`);
		else redirect("/");
	} else {
		return user;
	}
};
