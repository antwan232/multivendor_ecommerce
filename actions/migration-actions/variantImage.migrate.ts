"use server";

import prisma from "@/lib/prisma";

export const updateVariantImage = async () => {
	try {
		const variants = await prisma.productVariant.findMany({
			include: {
				images: true,
			},
		});

		for (const variant of variants) {
			if (variant.images.length > 0) {
				const firstImage = variant.images[0];

				await prisma.productVariant.update({
					where: {
						id: variant.id,
					},
					data: {
						variantImage: firstImage.url,
					},
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
};
