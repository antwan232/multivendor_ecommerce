// UI Components
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from "@/components/ui/command";
import NavLinks from "./navLinks.client";

// Data
import { adminDashboardSidebarOptions } from "@/constants/data";

export default function SidebarNavAdmin() {
	return (
		<nav className="relative grow">
			<Command className="rounded-lg overflow-visible bg-transparent">
				<CommandInput placeholder="Search..." />
				<CommandList className="py-2 overflow-visible">
					<CommandEmpty>No Links Found.</CommandEmpty>
					<CommandGroup className="overflow-visible pt-0 relative">
						<NavLinks menuLinks={adminDashboardSidebarOptions} />
					</CommandGroup>
				</CommandList>
			</Command>
		</nav>
	);
}
