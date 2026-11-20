"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { MessageIcon, OrderIcon, WishlistIcon } from "@/components/store/icons";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// Clerk
const UserButton = dynamic(() => import("@clerk/nextjs").then((mod) => mod.UserButton), {
	ssr: false,
});

export default function UserMenu() {
	// Get the current user
	const { user } = useUser();
	const userId = user?.id;
	console.log("userId: ", userId);
	return (
		<div className="relative group px-2 ">
			{/* Trigger */}
			<div>
				{userId ? (
					<Image
						src={user.imageUrl}
						alt={user.fullName!}
						width={40}
						height={40}
						className="w-10 h-10 object-cover rounded-full"
					/>
				) : (
					<div className="flex h-11 items-center py-0 mx-2 cursor-pointer">
						<span>
							<HugeiconsIcon icon={UserIcon} className="scale-125" />
						</span>
						<div className="ml-1 ">
							<b className="font-bold text-xs text-white leading-4">
								<span>Sign in / Register</span>
								<span className="text-white scale-[60%] flex justify-center items-center">
									<HugeiconsIcon icon={ArrowDown01Icon} />
								</span>
							</b>
						</div>
					</div>
				)}
			</div>
			{/* Content */}
			<div
				className={cn("hidden absolute top-0 -left-17 group-hover:block cursor-pointer", {
					"-left-[200px] lg:-left-[138px]": userId,
				})}>
				<div className="relative left-2 mt-10 right-auto bottom-auto pt-2.5 text-[#222] p-0 text-sm z-40 ">
					{/* Triangle */}
					<div
						className={cn(
							"w-0 h-0 absolute top-1 border-l-20! border-l-transparent! border-r-20 border-r-transparent! border-b-20 border-b-white -translate-x-1/2 left-1/2",
							{
								"translate-x-0 left-[135px] ": userId,
							},
						)}></div>
					{/* Menu */}
					<div className="rounded-3xl bg-white text-sm text-[#222] shadow-lg">
						<div className="w-[305px]">
							<div className="pt-5 px-6 pb-0">
								{userId ? (
									<div className="user-avatar flex flex-col items-center justify-center">
										<UserButton />
									</div>
								) : (
									<div className="space-y-1">
										<Button
											asChild
											className="grid content-center">
											<Link
												href="/sign-in"
												className="">
												Sign in
											</Link>
										</Button>

										<Link
											href="/sign-up"
											className="h-10 text-sm hover:underline text-main-primary flex items-center justify-center cursor-pointer">
											Register
										</Link>
									</div>
								)}
								{userId && (
									<p className="my-3 text-center text-sm text-main-primary cursor-pointer">
										<Button
											asChild
											variant={"link"}>
											<SignOutButton redirectUrl="/" />
										</Button>
									</p>
								)}
								<Separator />
							</div>
							{/* Links */}
							<div className="max-w-[calc(100vh-180px)] text-main-secondary overflow-y-auto overflow-x-hidden pt-0 px-2 pb-4">
								<ul className="grid grid-cols-3 gap-2 py-2.5 ^px-4 w-full">
									{links.map((item) => (
										<li
											key={item.title}
											className="grid place-items-center">
											<Link
												href={item.link}
												className="space-y-2">
												<div className="w-14 h-14 rounded-full p-2 grid place-items-center bg-gray-100 hover:bg-gray-200">
													<span className="text-gray-500">{item.icon}</span>
												</div>
												<span className="block text-xs">{item.title}</span>
											</Link>
										</li>
									))}
								</ul>
								<Separator className="max-w-[257px]! mx-auto" />
								<ul className="pt-2.5 pr-4 pb-1 pl-4 w-[288px]">
									{extraLinks.map((item, i) => (
										<li key={i}>
											<Link
												className="block text-sm text-main-primary py-1.5 hover:underline"
												href={item.link}>
												{item.title}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const links = [
	{
		icon: <OrderIcon />,
		title: "My Orders",
		link: "/profile/orders",
	},
	{
		icon: <MessageIcon />,
		title: "Messages",
		link: "/profile/messages",
	},
	{
		icon: <WishlistIcon />,
		title: "WishList",
		link: "/profile/wishlist",
	},
];
const extraLinks = [
	{
		title: "Profile",
		link: "/profile",
	},
	{
		title: "Settings",
		link: "/",
	},
	{
		title: "Become a Seller",
		link: "/become-seller",
	},
	{
		title: "Help Center",
		link: "",
	},
	{
		title: "Return & Refund Policy",
		link: "/",
	},
	{
		title: "Legal & Privacy",
		link: "",
	},
	{
		title: "Discounts & Offers",
		link: "",
	},
	{
		title: "Order Dispute Resolution",
		link: "",
	},
	{
		title: "Report a Problem",
		link: "",
	},
];

