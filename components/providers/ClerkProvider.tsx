"use client";

import { ClerkProvider } from "@clerk/nextjs";

import { ReactNode, Suspense } from "react";

export default function ClerkProviderClient({ children }: { children: ReactNode }) {
	return (
		<Suspense>
			<ClerkProvider afterSignOutUrl="/">{children}</ClerkProvider>
		</Suspense>
	);
}
