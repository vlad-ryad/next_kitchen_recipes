"use client";
import { layoutConfig } from "@/config/layout.config";
import { siteConfig } from "@/config/site.config";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "../../../store/auth.store";
import { Menu } from "lucide-react";

export const Logo = () => {
	return (
		<Image
			src="/logo_tatar_kitchen.png"
			alt={siteConfig.title}
			width={26}
			height={26}
			priority
			className="w-6 h-6 sm:w-7 sm:h-7"
		/>
	);
};

export default function Header() {
	const pathname = usePathname();
	const { isAuth, session, status, setAuthState } = useAuthStore();
	const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);

	const handleSignOut = async () => {
		try {
			await signOutFunc();
		} catch (error) {
			console.error("error", error);
		}
		setAuthState("unauthenticated", null);
	};

	const getNavItems = () => {
		return siteConfig.navItems
			.filter((item) => {
				if (item.href === "/ingredients") {
					return isAuth;
				}
				return true;
			})
			.map((item) => {
				const isActive = pathname === item.href;
				return (
					<NavbarItem key={item.href}>
						<Link
							href={item.href}
							className={`px-2 sm:px-3 py-1 text-sm sm:text-base transition-colors duration-200 ${isActive ? "text-blue-500 font-medium" : "text-foreground"
								} hover:text-blue-400`}
						>
							{item.label}
						</Link>
					</NavbarItem>
				);
			});
	};

	/* ===== МОБИЛЬНОЕ МЕНЮ ===== */
	const MobileMenu = () => (
		<Dropdown>
			<DropdownTrigger>
				<Button
					isIconOnly
					variant="light"
					className="sm:hidden bg-foreground/10 hover:bg-foreground/20"
					size="sm"
				>
					<Menu size={20} className="text-foreground" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Навигация"
				className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 min-w-[200px]"
			>
				{siteConfig.navItems
					.filter((item) => {
						if (item.href === "/ingredients") {
							return isAuth;
						}
						return true;
					})
					.map((item) => {
						const isActive = pathname === item.href;
						return (
							<DropdownItem
								key={item.href}
								className={`px-4 py-3 rounded-md transition-colors duration-200 mb-1 last:mb-0 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? "bg-blue-100 dark:bg-blue-900 font-medium" : ""
									}`}
								textValue={item.label}
							>
								<Link
									href={item.href}
									className={`w-full block ${isActive
										? "text-blue-600 dark:text-blue-400"
										: "text-gray-900 dark:text-white"
										}`}
								>
									{item.label}
								</Link>
							</DropdownItem>
						);
					})}
			</DropdownMenu>
		</Dropdown>
	);

	return (
		<div className="w-full">
			<Navbar
				style={{ height: layoutConfig.headerHeight }}
				className="px-3 sm:px-4 md:px-6 py-0"
				maxWidth="full"
				isBordered
			>
				<NavbarBrand className="gap-1 sm:gap-2">
					<MobileMenu />
					<Link href="/" className="flex items-center gap-1 sm:gap-2">
						<Logo />
						<p className="font-bold text-inherit text-sm sm:text-base md:text-lg">
							{siteConfig.title}
						</p>
					</Link>
				</NavbarBrand>

				<NavbarContent className="hidden sm:flex gap-2 md:gap-4" justify="center">
					{getNavItems()}
				</NavbarContent>

				<NavbarContent justify="end" className="hidden sm:flex">
					{isAuth && (
						<p className="text-xs sm:text-sm mr-2">
							Привет, {session?.user?.email?.split("@")[0]}!
						</p>
					)}
					{status === "loading" ? (
						<p className="text-xs sm:text-sm">Загрузка...</p>
					) : !isAuth ? (
						<>
							<NavbarItem>
								<Button
									color="secondary"
									variant="flat"
									onPress={() => setIsLoginOpen(true)}
									size="sm"
									className="text-xs sm:text-sm"
								>
									Логин
								</Button>
							</NavbarItem>
							<NavbarItem>
								<Button
									color="primary"
									variant="flat"
									onPress={() => setIsRegistrationOpen(true)}
									size="sm"
									className="text-xs sm:text-sm"
								>
									Регистрация
								</Button>
							</NavbarItem>
						</>
					) : (
						<NavbarItem>
							<Button
								color="secondary"
								variant="flat"
								onPress={handleSignOut}
								size="sm"
								className="text-xs sm:text-sm"
							>
								Выйти
							</Button>
						</NavbarItem>
					)}
				</NavbarContent>
			</Navbar>

			{/* Кнопки авторизации на новой строке для мобильных устройств */}
			{/* Добавляем отрицательный margin-top чтобы убрать белую полоску */}
			<div className="sm:hidden w-full border-t border-gray-200 dark:border-gray-700 mt-[-1px]">
				<div className="px-3 py-2 flex items-center justify-between">
					<div className="flex-1">
						{isAuth && (
							<p className="text-xs text-foreground/80 truncate">
								Привет, {session?.user?.email?.split("@")[0]}!
							</p>
						)}
					</div>

					<div className="flex gap-2">
						{status === "loading" ? (
							<p className="text-xs text-foreground/80">Загрузка...</p>
						) : !isAuth ? (
							<>
								<Button
									color="secondary"
									variant="flat"
									onPress={() => setIsLoginOpen(true)}
									size="sm"
									className="text-xs px-3 min-w-[70px]"
								>
									Логин
								</Button>
								<Button
									color="primary"
									variant="flat"
									onPress={() => setIsRegistrationOpen(true)}
									size="sm"
									className="text-xs px-3 min-w-[100px]"
								>
									Регистрация
								</Button>
							</>
						) : (
							<Button
								color="secondary"
								variant="flat"
								onPress={handleSignOut}
								size="sm"
								className="text-xs px-3"
							>
								Выйти
							</Button>
						)}
					</div>
				</div>
			</div>

			<RegistrationModal
				isOpen={isRegistrationOpen}
				onClose={() => setIsRegistrationOpen(false)}
			/>
			<LoginModal
				isOpen={isLoginOpen}
				onClose={() => setIsLoginOpen(false)}
			/>
		</div>
	);
}