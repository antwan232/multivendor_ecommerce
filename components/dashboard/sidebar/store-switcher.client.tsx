"use client";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";

interface StoreSwitcherProps extends ComponentPropsWithoutRef<typeof PopoverTrigger> {
	stores: Record<string, any>[];
}

export default function StoreSwitcher({ stores, className }: StoreSwitcherProps) {
	const router = useRouter();
	const params = useParams();
	const [open, setOpen] = useState(false);
	const formattedStores = stores.map((store) => ({
		label: store.name,
		value: store.url,
	}));
	const activeStore = formattedStores.find((store) => store.value === params.storeSegment);

	const handleSelectStore = (store: { label: string; value: string }) => {
		setOpen(false);
		router.push(`/dashboard/seller/stores/${store.value}`);
	};

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					role="combobox"
					aria-expanded={open}
					aria-label="Select a store"
					className={cn("w-63 justify-between", className)}>
					<StoreIcon className="mr-2 size-4" />
					{params?.storeSegment ? activeStore?.label : "Choose a store"}
					<ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-63 p-0">
				<Command>
					<CommandList>
						<CommandInput placeholder="Search stores..." />
						<CommandEmpty>No Store Selected.</CommandEmpty>
						<CommandGroup heading="Stores">
							{formattedStores.map((store) => (
								<CommandItem
									key={store.value}
									onSelect={() => handleSelectStore(store)}
									className="text-sm cursor-pointer">
									<StoreIcon className="mr-2 size-4" />
									{store.label}
									<Check
										className={cn("size-4 ml-auto opacity-0", {
											"opacity-100": params?.storeSegment && params.storeSegment === store.value,
										})}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandItem
							className="cursor-pointer"
							onSelect={() => {
								setOpen(false);
								router.push("/dashboard/seller/stores/new");
							}}>
							<PlusCircle className="mr-2 size-5" />
							Create Store
						</CommandItem>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
