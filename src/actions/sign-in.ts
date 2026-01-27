"use server";

import { signIn } from "@/auth/auth";

export async function signInWithCredentials(email: string, password: string) {
	const res = await signIn("credentials", {
		email,
		password,
		redirect: false
	});

	if (!res?.ok) {
		return {
			ok: false,
			error: "Неверный email или пароль"
		};
	}

	return { ok: true };
}
