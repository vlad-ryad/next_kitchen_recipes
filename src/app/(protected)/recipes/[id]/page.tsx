"use client";

import RecipeForm from "@/forms/recipe.form";
import { useRecipeStore } from "@/store/recipe.store";
import { IRecipe } from "@/types/recipe";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditRecipePage = () => {
	const { id } = useParams<{ id: string }>();
	const { recipes, isLoading, error } = useRecipeStore();
	const [recipe, setRecipe] = useState<IRecipe | null>(null);
	const [hasSearched, setHasSearched] = useState(false);

	useEffect(() => {
		if (recipes.length > 0 || error) {
			const foundRecipe = recipes.find((r) => r.id === id);
			setRecipe(foundRecipe || null);
			setHasSearched(true);
		}
	}, [recipes, id, error]);

	if (isLoading) return <p className="text-center">Загрузка...</p>;
	if (error) return <p className="text-red-500 text-center">{error}</p>;

	if (hasSearched && !recipe) {
		return <p className="text-red-500 text-center">Рецепт не найден</p>;
	}

	if (recipe) {
		return (
			<div className="container mx-auto p-4 flex flex-col items-center">
				<div className="w-full max-w-2xl text-center mb-6">
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
						Редактировать рецепт
					</h1>
					<p className="text-gray-700 text-lg sm:text-xl md:text-2xl font-medium">
						{recipe.name}
					</p>
				</div>
				<div className="w-full max-w-md">
					<RecipeForm initialRecipe={recipe} />
				</div>
			</div>
		);
	}

	return <p className="text-center">Загрузка...</p>;
};

export default EditRecipePage;