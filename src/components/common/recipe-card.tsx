"use client";

import { IRecipe } from "@/types/recipe";
import { Card, CardBody, CardHeader, Button, Chip, Tooltip } from "@heroui/react";
import { useRecipeStore } from "@/store/recipe.store";
import Link from "next/link";
import { useTransition, useState } from "react";
import Image from "next/image";
import { UNIT_ABBREVIATIONS } from "@/constants/select-options";
import { useAuthStore } from "@/store/auth.store";

interface RecipeCardProps {
	recipe: IRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const { removeRecipe } = useRecipeStore();
	const { isAuth } = useAuthStore();
	const [isPending, startTransition] = useTransition();
	const [showAllIngredients, setShowAllIngredients] = useState(false);

	const handleDelete = () => {
		startTransition(async () => {
			try {
				await removeRecipe(recipe.id);
			} catch (error) {
				console.error("Ошибка при удалении рецепта:", error);
			}
		});
	};

	const getUnitLabel = (unit: string) => {
		const unitOption = UNIT_ABBREVIATIONS.find(
			(option) => option.value === unit
		);
		return unitOption ? unitOption.label : unit.toLowerCase();
	};

	// Адаптивное количество ингредиентов
	const getMaxVisibleIngredients = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth < 640) return 3; // mobile
			if (window.innerWidth < 1024) return 4; // tablet
			return 5; // desktop
		}
		return 5;
	};

	const MAX_VISIBLE_INGREDIENTS = getMaxVisibleIngredients();
	const ingredientsToShow = showAllIngredients
		? recipe.ingredients
		: recipe.ingredients.slice(0, MAX_VISIBLE_INGREDIENTS);
	const hasMoreIngredients = recipe.ingredients.length > MAX_VISIBLE_INGREDIENTS;

	return (
		<Card className="w-full max-w-full sm:max-w-sm min-w-[280px] md:min-w-[300px] flex flex-col hover:shadow-lg transition-shadow duration-300">
			{/* Изображение рецепта */}
			<div className="h-40 sm:h-48 overflow-hidden relative">
				{recipe.imageUrl ? (
					<Image
						src={recipe.imageUrl}
						alt={recipe.name}
						fill
						className="object-cover"
						sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
						<span className="text-gray-500 text-xs sm:text-sm">Нет изображения</span>
					</div>
				)}

				{/* Бейдж количества ингредиентов на изображении */}
				<div className="absolute top-2 sm:top-3 right-2 sm:right-3">
					<Chip size="sm" variant="solid" className="bg-black/70 text-white text-xs">
						{recipe.ingredients.length} ингр.
					</Chip>
				</div>
			</div>

			<CardHeader className="pb-1 sm:pb-2 px-3 sm:px-4">
				<div className="w-full">
					<h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 line-clamp-1 mb-1">
						{recipe.name}
					</h2>
				</div>
			</CardHeader>

			<CardBody className="pt-0 flex-1 flex flex-col px-3 sm:px-4">
				{/* Описание с возможностью раскрытия */}
				<div className="mb-2 sm:mb-4">
					<p className={`text-gray-600 text-xs sm:text-sm ${showAllIngredients ? '' : 'line-clamp-2'}`}>
						{recipe.description || "Без описания"}
					</p>
					{recipe.description && recipe.description.length > 80 && (
						<button
							onClick={() => setShowAllIngredients(!showAllIngredients)}
							className="text-xs text-primary hover:text-primary/80 mt-1 transition-colors"
						>
							{showAllIngredients ? 'Свернуть' : 'Читать далее'}
						</button>
					)}
				</div>

				{/* Ингредиенты - компактное отображение */}
				<div className="mb-2 sm:mb-4 flex-1">
					<div className="flex justify-between items-center mb-1 sm:mb-2">
						<h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Ингредиенты:</h3>
						{hasMoreIngredients && !showAllIngredients && (
							<Tooltip content={`Еще ${recipe.ingredients.length - MAX_VISIBLE_INGREDIENTS} ингредиентов`}>
								<span className="text-xs text-gray-500 cursor-help">
									+{recipe.ingredients.length - MAX_VISIBLE_INGREDIENTS}
								</span>
							</Tooltip>
						)}
					</div>

					<div className="space-y-1 sm:space-y-1.5">
						{ingredientsToShow.map((ing) => (
							<div key={ing.id} className="flex justify-between items-center text-xs sm:text-sm">
								<span className="text-gray-700 truncate mr-2 flex-1">
									{ing.ingredient.name}
								</span>
								<span className="text-gray-500 whitespace-nowrap text-xs ml-2">
									{ing.quantity} {getUnitLabel(ing.ingredient.unit)}
								</span>
							</div>
						))}
					</div>

					{/* Кнопка показать все/скрыть */}
					{hasMoreIngredients && (
						<button
							onClick={() => setShowAllIngredients(!showAllIngredients)}
							className="w-full text-center text-xs text-primary hover:text-primary/80 mt-1 sm:mt-2 py-1 border-t border-gray-100 transition-colors"
						>
							{showAllIngredients ? 'Скрыть' : `Показать все (${recipe.ingredients.length})`}
						</button>
					)}
				</div>

				{/* Кнопки действий */}
				{isAuth && (
					<div className="flex justify-between gap-1 sm:gap-2 pt-2 sm:pt-3 border-t border-gray-100">
						<Link href={`/recipes/${recipe.id}`} className="flex-1">
							<Button
								color="primary"
								variant="flat"
								size="sm"
								fullWidth
								className="text-xs sm:text-sm min-h-8"
							>
								Редактировать
							</Button>
						</Link>
						<Button
							color="danger"
							variant="light"
							size="sm"
							onPress={handleDelete}
							isLoading={isPending}
							className="text-xs sm:text-sm min-h-8 px-2 sm:px-3"
						>
							Удалить
						</Button>
					</div>
				)}
			</CardBody>
		</Card>
	);
};

export default RecipeCard;