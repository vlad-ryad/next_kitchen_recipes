"use client";

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useIngredientStore } from "@/store/ingredient.store";
import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { useState, useTransition } from "react";

const initialState = {
	name: "",
	category: "",
	unit: "",
	pricePerUnit: null as number | null,
	description: ""
};

const IngredientForm = () => {
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState(initialState);
	const { addIngredient } = useIngredientStore();
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (formData: FormData) => {
		startTransition(async () => {
			await addIngredient(formData);
			const storeError = useIngredientStore.getState().error;
			if (storeError) {
				setError(storeError);
			} else {
				setError(null);
				setFormData(initialState);
			}
		});
	};

	return (
		<Form className="w-full max-w-md mx-auto" action={handleSubmit}>
			{error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

			<Input
				isRequired
				name="name"
				placeholder="Название ингредиента"
				type="text"
				value={formData.name}
				classNames={{
					inputWrapper: "bg-default-100 h-10 sm:h-12",
					input: "text-sm sm:text-base"
				}}
				onChange={(e) => setFormData({ ...formData, name: e.target.value })}
			/>

			<div className="flex flex-col sm:flex-row gap-2 w-full mt-3">
				<div className="w-full sm:w-1/3">
					<Select
						isRequired
						name="category"
						placeholder="Категория"
						selectedKeys={formData.category ? [formData.category] : []}
						classNames={{
							trigger: "bg-default-100 w-full h-10 sm:h-12",
							innerWrapper: "text-sm sm:text-base",
						}}
						onChange={(e) => setFormData({ ...formData, category: e.target.value })}
					>
						{CATEGORY_OPTIONS.map((option) => (
							<SelectItem key={option.value} className="text-black">
								{option.label}
							</SelectItem>
						))}
					</Select>
				</div>

				<div className="w-full sm:w-1/3">
					<Select
						isRequired
						name="unit"
						placeholder="Ед. изм."
						selectedKeys={formData.unit ? [formData.unit] : []}
						classNames={{
							trigger: "bg-default-100 w-full h-10 sm:h-12",
							innerWrapper: "text-sm sm:text-base",
						}}
						onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
					>
						{UNIT_OPTIONS.map((option) => (
							<SelectItem key={option.value} className="text-black">
								{option.label}
							</SelectItem>
						))}
					</Select>
				</div>

				<div className="w-full sm:w-1/3">
					<Input
						isRequired
						name="pricePerUnit"
						placeholder="Цена"
						type="number"
						value={formData.pricePerUnit !== null ? formData.pricePerUnit.toString() : ""}
						classNames={{
							inputWrapper: "bg-default-100 h-10 sm:h-12",
							input: "text-sm sm:text-base"
						}}
						onChange={(e) => {
							const value = e.target.value ? parseFloat(e.target.value) : null;
							setFormData({ ...formData, pricePerUnit: value });
						}}
						endContent={
							<span className="text-default-500 text-sm sm:text-base">₽</span>
						}
					/>
				</div>
			</div>

			<Input
				name="description"
				placeholder="Описание (необязательно)"
				type="text"
				value={formData.description}
				classNames={{
					inputWrapper: "bg-default-100 h-10 sm:h-12 mt-3",
					input: "text-sm sm:text-base"
				}}
				onChange={(e) => setFormData({ ...formData, description: e.target.value })}
			/>

			<div className="flex w-full items-center justify-end mt-4">
				<Button
					color="primary"
					type="submit"
					isLoading={isPending}
					className="w-full sm:w-auto"
				>
					Добавить ингредиент
				</Button>
			</div>
		</Form>
	);
};

export default IngredientForm;