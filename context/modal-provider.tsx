"use client";

// React, Next.js
import { createContext, useContext, useState } from "react";

// Prisma models
import { User } from "@/lib/generated/prisma/client";

interface ModalProviderProps {
	children: React.ReactNode;
}

export type ModalData = {
	user?: User;
};

type ModalContextType = {
	data: ModalData;
	isOpen: boolean;
	setOpen: (modal: React.ReactNode, rowData?: any) => void;
	setClose: () => void;
};

export const ModalContext = createContext<ModalContextType>({
	data: {},
	isOpen: false,
	setOpen: () => {},
	setClose: () => {},
});

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState<ModalData>({});
	const [showingModal, setShowingModal] = useState<React.ReactNode>(null);

	const setOpen = async (modal: React.ReactNode, rowData: any) => {
		if (modal) {
			setData({ ...data, ...rowData });
			setShowingModal(modal);
			setIsOpen(true);
		}
	};

	const setClose = () => {
		setIsOpen(false);
		setData({});
	};

	return (
		<ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
			{children}
			{showingModal}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within the modal provider");
	}
	return context;
};

export default ModalProvider;
