import { Dispatch, HTMLAttributes, SetStateAction, useState } from "react";

interface ColorPaletteProps {
	extractedColors?: string[]; // Extracted Colors
	colors?: { color: string }[]; // List of selected colors from <Form />
	setColors: Dispatch<SetStateAction<{ color: string }[]>>;
}

export default function ColorPalette({
	extractedColors,
	colors,
	setColors,
}: ColorPaletteProps) {
	const [activeColor, setActiveColor] = useState<string>("");

	const handleAddProductColor = (color: string) => {
		const currColors = colors ?? [];
		if (!colors || !setColors || currColors.some((c) => c.color === color))
			return;

		const newColors = currColors.filter((color) => color.color !== "");
		setColors([...newColors, { color }]);
	};

	return (
		<div className="pt-10 w-80 h-40 rounded-b-md overflow-hidden">
			{/* Color palette container */}
			<div className="size-full rounded-md perspective-distant">
				{/* Active color display */}
				<div className="relative w-full flex items-center justify-center bg-white h-16 rounded-t-md">
					<ActiveColorCircle activeColor={activeColor} />
				</div>
				{/* Color blocks */}
				<div className="w-full h-20 absolute bottom-0 !flex items-center justify-center">
					{extractedColors?.map((color) => (
						<Color
							color={color}
							key={color}
							onMouseEnter={() => setActiveColor(color)}
							onClick={() => handleAddProductColor(color)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function ActiveColorCircle({ activeColor }: { activeColor: string }) {
	return (
		<div
			className="absolute w-16 h-16 grid place-items-center shadow-lg rounded-full -top-10"
			style={{ backgroundColor: activeColor || "#fff" }}>
			{/* Spinner icon */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				fill={activeColor ? "#fff" : "#000"}
				viewBox="0 0 16 16"
				className="animate-spin">
				<path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
				<path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z" />
			</svg>
		</div>
	);
}

type ColorProps = HTMLAttributes<HTMLDivElement> & { color: string };

function Color({ color, ...props }: ColorProps) {
	return (
		<div
			key={color}
			className="w-20 h-[80px] cursor-pointer transition-all duration-100 ease-linear relative hover:w-[120px] hover:duration-300"
			style={{ backgroundColor: color }}
			{...props}>
			{/* Color label */}
			<div className="w-full border-r h-8 text-center text-xs font-semibold absolute -top-6 text-black">
				{color}
			</div>
		</div>
	);
}
