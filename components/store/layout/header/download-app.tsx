// Next.js
import Link from "next/link";
import Image from "next/image";

import PlayStoreImg from "@/public/assets/icons/google-play.webp";
import AppStoreImg from "@/public/assets/icons/app-store.webp";

import { AppIcon } from "../../icons";

// Assets

export default function DownloadApp() {
	return (
		<div className="relative group">
			{/* Trigger */}
			<div className=" flex h-11 items-center px-2 cursor-pointer">
				<span className="text-[32px]">
					<AppIcon />
				</span>
				<div className="ml-1">
					<b className="max-w-20 inline-block font-medium text-xs text-white">
						Download the GoShop app
					</b>
				</div>
			</div>
			{/* Content */}
			<div className="absolute hidden top-0 group-hover:block left-20 sm:left-0 z-50 cursor-pointer">
				<div className="relative mt-12 -ml-20 w-75 bg-white rounded-3xl text-main-primary pt-2 px-1 pb-6 z-50 shadow-l">
					{/* Traingle */}
					<div
						className="w-0 h-0 absolute -top-1.5 left-15 sm:left-36 border-l-10 border-l-transparent
           border-b-10 border-white border-r-10 border-r-transparent"
					/>
					<div className="py-3 px-1 wrap-break-word">
						<div className="flex">
							<div className="mx-3">
								<h3 className="font-semibold text-md sm:text-xl text-primary m-0 max-w-40 mx-auto ">
									Download the GoShop app
								</h3>
								<div className="mt-4 flex items-center gap-x-2">
									<Link
										href=""
										className="rounded-3xl  bg-black grid place-items-center px-4 py-3">
										<Image
											src={AppStoreImg}
											alt="App store"
										/>
									</Link>
									<Link
										href=""
										className="rounded-3xl bg-black  grid place-items-center px-4 py-3">
										<Image
											src={PlayStoreImg}
											alt="Play store"
										/>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
