// UI Components
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandList,
} from "@/components/ui/command";

// Data
import { PropsWithChildren } from "react";

export default async function SidebarNav({ children }: PropsWithChildren) {
	"use cache";

	return (
		<nav className="relative grow">
			<Command className="rounded-lg overflow-y-scroll no-scrollbar bg-transparent">
				<CommandInput placeholder="Search..." />
				<CommandList className="py-2 overflow-visible">
					<CommandEmpty>No Links Found.</CommandEmpty>
					<CommandGroup className="overflow-visible pt-0 relative">{children}</CommandGroup>
				</CommandList>
			</Command>
		</nav>
	);
}
