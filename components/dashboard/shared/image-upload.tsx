"use client";

// Next.js
import Image from "next/image";

// React
import { useEffect, useRef } from "react";

// Cloudinary
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
	type: "standard" | "profile" | "cover";
	dontShowPreview?: boolean;
	preset: string;
}

export default function ImageUpload({
	disabled,
	onChange,
	onRemove,
	value,
	type,
	dontShowPreview,
	preset,
}: ImageUploadProps) {
	// Make sure that hydaration has completed
	const isMount = useRef(false);
	useEffect(() => {
		isMount.current = true;
	}, []);

  const onUpload = (result: any) => {
    console.log('result.info.secure_url: ', result.info.secure_url);
		onChange(result.info.secure_url);
	};

	switch (type) {
		case "profile":
			return (
				<div className="relative rounded-full w-52 h-52 bg-gray-200 border-2 border-white shadow-2xl overflow-visible">
					{value.length > 0 && (
						<Image
							src={value[0]}
							alt="profile image of admin"
							width={300}
							height={300}
							className="w-52 h-52 rounded-full object-cover absolute inset-0"
						/>
					)}
					<CldUploadWidget
						uploadPreset={preset}
						onSuccess={onUpload}>
						{({ open }) => {
							const handleClick = () => {
								open();
							};

							return (
								<>
									<button
										type="button"
										className="z-20 absolute right-0 bottom-6 flex items-center font-medium text-[17px] h-14 w-14 justify-center  text-white bg-gradient-to-t from-blue-500 to-blue-300 border-none shadow-lg rounded-full hover:shadow-md active:shadow-sm"
										disabled={disabled}
										onClick={handleClick}>
										<svg
											viewBox="0 0 640 512"
											fill="white"
											height="1em"
											xmlns="http://www.w3.org/2000/svg">
											<path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
										</svg>
									</button>
								</>
							);
						}}
					</CldUploadWidget>
				</div>
			);
		case "cover":
			return <div>cover</div>;
		default:
			return <div>standard</div>;
	}
}
