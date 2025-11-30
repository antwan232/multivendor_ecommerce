// Prisma
import { User } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";

// Clerk
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

// Next.js
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		// Verify and parse the incoming Clerk webhook
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

			// Upsert user record in the database 
			const userDB = await prisma.user.upsert({
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

			// Sync userMetaData with the current role from prisma
			(await clerkClient()).users.updateUserMetadata(data.id, {
				privateMetadata: {
					role: userDB.role || "USER",
				},
			});
		}

		// Sync deleted user with prisma
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
