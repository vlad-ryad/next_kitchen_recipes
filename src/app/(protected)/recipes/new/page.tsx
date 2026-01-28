"use client";

import RecipeForm from "@/forms/recipe.form";

export default function NewRecipePage() {
	return (
		<div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-start">
			<div className="w-full max-w-4xl text-center">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
					Создать новый рецепт
				</h1>
			</div>
			<div className="w-full max-w-md flex justify-center">
				<RecipeForm />
			</div>
		</div>
	);
}