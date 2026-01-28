"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { ReactNode } from "react";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const CustomModal = ({ isOpen, onClose, title, children, size = "xs" }: IProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={size}
			classNames={{
				base: "max-h-[90vh] overflow-auto",
				wrapper: "p-4",
			}}
		>
			<ModalContent>
				<ModalHeader className="border-b px-4 md:px-6">
					<h3 className="text-lg md:text-xl text-background font-semibold">{title}</h3>
				</ModalHeader>
				<ModalBody className="space-y-4 py-4 md:py-6 px-4 md:px-6">
					{children}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CustomModal;