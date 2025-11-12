import { User } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { redirect } from "next/navigation";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const evt = await verifyWebhook(req);
		const { data, type } = evt;

		if (type === "user.created" || type === "user.updated") {
			// Collect the information about user from clerk webhook
			const user: Partial<User> = {
				id: data.id,
				name: `${data.first_name} ${data.last_name}`,
				email: data.email_addresses[0].email_address,
				picture: data.image_url,
			};

			// Protect the route
			if (!user) redirect("/sign-in");

			// When user created or updated
			const User = await prisma.user.upsert({
				where: {
					email: user.email,
				},
				update: user,
				create: {
					email: user.email!,
					name: user.name!,
					picture: user.picture!,
					role: user.role! || "USER",
					id: user.id,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				},
			});

			// update userMetaData to the current role
			(await clerkClient()).users.updateUserMetadata(data.id, {
				privateMetadata: {
					role: User.role || "USER",
				},
			});
		}

		// When user deleted
		if (type === "user.deleted") {
			const userId = data.id;

			await prisma.user.delete({
				where: {
					id: userId,
				},
			});
		}

		return new Response("Webhook received", { status: 200 });
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error verifying webhook", { status: 400 });
	}
}
