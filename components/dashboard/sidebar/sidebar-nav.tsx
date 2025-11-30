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

export default function SidebarNav({ children }: PropsWithChildren) {
	return (
		<nav className="relative grow">
			<Command className="rounded-lg overflow-visible bg-transparent">
				<CommandInput placeholder="Search..." />
				<CommandList className="py-2 overflow-visible">
					<CommandEmpty>No Links Found.</CommandEmpty>
					<CommandGroup className="overflow-visible pt-0 relative">
						{children}
					</CommandGroup>
				</CommandList>
			</Command>
		</nav>
	);
}
