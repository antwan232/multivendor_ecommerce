"use client";

import { Input } from "@/components/ui/input";
import { PaintBucket } from "lucide-react";
import { useState } from "react";
import { SketchPicker } from "react-color";

export interface Detail<T = { [key: string]: string | number | undefined }> {
	[key: string]: T[keyof T];
}

interface ClickToAddProps<T extends Detail> {
	details: T[];
	setDetails: React.Dispatch<React.SetStateAction<T[]>>; // Setter function for details
	initialDetail: T;
	title?: string;
	colorPicker?: boolean;
}

export default function ClickToAdd<T extends Detail>({
	details,
	setDetails,
	title,
	initialDetail,
	colorPicker,
}: ClickToAddProps<T>) {
	const [colorPickerIndex, setColorPickerIndex] = useState<number | null>(null);

	const handleChangeInput = (
		index: number,
		property: string,
		value: string | number,
	) => {
		const updatedDetails = details.map((detail, i) =>
			i === index ? { ...detail, [property]: value } : detail,
		);
		setDetails(updatedDetails);
	};

	const handleDeleteInput = (index: number) => {
		if (details.length === 1) return;
		const updatedDetails = details.filter((_, i) => i !== index);
		setDetails(updatedDetails);
	};

	return (
		<div className="flex flex-col gap-y-4">
			{title && <div>{title}</div>}

			{details?.length > 0 &&
				details.map((detail, index) => (
					<div
						className="flex items-start gap-x-4"
						key={index + "detail"}>
						{Object.keys(detail).map((property, i) => (
							<div
								key={property + i}
								className="flex items-center gap-x-4">
								{/* Color picker toggle */}
								{property === "color" && colorPicker && (
									<div className="flex gap-x-4">
										<button
											onClick={() =>
												setColorPickerIndex((prevColorIndex) =>
													prevColorIndex === index ? null : index,
												)
											}
											type="button"
											className="cursor-pointer">
											<PaintBucket />
										</button>
										<span
											className="size-8 rounded-full"
											style={{
												backgroundColor: detail[property] as string,
											}}></span>
									</div>
								)}

								{/* Color picker */}
								{colorPickerIndex === index && property === "color" && (
									<SketchPicker
										color={detail[property] as string}
										onChange={(e) => handleChangeInput(index, property, e.hex)}
									/>
								)}

								{/* Input field for each property */}
								<Input
									className="w-28"
									type={
										typeof detail[property] === "number" ? "number" : "text"
									}
									name={property}
									placeholder={property}
									value={detail[property] as string}
									onChange={(e) =>
										handleChangeInput(
											index,
											property,
											e.target.type === "number"
												? parseFloat(e.target.value)
												: e.target.value,
										)
									}
									min={typeof detail[property] === "number" ? 0 : undefined}
									step={0.01}
								/>
							</div>
						))}
						<MinusButton onClick={() => handleDeleteInput(index)} />
						<PlusButton
							onClick={() => setDetails([...details, { ...initialDetail }])}
						/>
					</div>
				))}
		</div>
	);
}

const PlusButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button
			type="button"
			title="Add new detail"
			className="group cursor-pointer outline-none hover:rotate-90 duration-300"
			onClick={onClick}>
			{/* Plus icon */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="50px"
				height="50px"
				viewBox="0 0 24 24"
				className="w-8 h-8 stroke-blue-400 fill-none group-hover:fill-blue-primary group-active:stroke-blue-200 group-active:fill-blue-700 group-active:duration-0 duration-300">
				<path
					d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
					strokeWidth="1.5"
				/>
				<path
					d="M8 12H16"
					strokeWidth="1.5"
				/>
				<path
					d="M12 16V8"
					strokeWidth="1.5"
				/>
			</svg>
		</button>
	);
};

const MinusButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button
			type="button"
			title="Remove detail"
			className="group cursor-pointer outline-none hover:rotate-90 duration-300"
			onClick={onClick}>
			{/* Minus icon */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="50px"
				height="50px"
				viewBox="0 0 24 24"
				className="w-8 h-8 stroke-blue-400 fill-none group-hover:fill-white group-active:stroke-blue-200 group-active:fill-blue-700 group-active:duration-0 duration-300">
				<path
					d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
					strokeWidth="1.5"
				/>
				<path
					d="M8 12H16"
					strokeWidth="1.5"
				/>
			</svg>
		</button>
	);
};
