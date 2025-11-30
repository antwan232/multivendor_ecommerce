import Image from "next/image";
import LogoImage from "@/public/assets/icons/logo-6.png";

interface LogoImgProps {
	width: string;
	height: string;
}

export default function LogoImg({ width, height }: LogoImgProps) {
	return (
		<div
			className="z-50"
			style={{ width, height }}>
			<Image
				alt="logo image from GoShop website."
				src={LogoImage}
				className="w-full h-full object-cover overflow-visible"
			/>
		</div>
	);
}
