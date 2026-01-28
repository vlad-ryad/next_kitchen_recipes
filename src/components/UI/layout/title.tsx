"use client";

import { siteConfig } from "@/config/site.config";
import { usePathname } from "next/navigation";

const Title = () => {
	const pathname = usePathname();
	const currentNavItem = siteConfig.navItems.find(
		(item) => item.href === pathname
	);
	const pageTitle = currentNavItem ? currentNavItem.label : siteConfig.title;

	return (
		<div className="w-full flex justify-center my-4 sm:my-6">
			<h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center px-4">
				{pageTitle}
			</h1>
		</div>
	);
};

export default Title;