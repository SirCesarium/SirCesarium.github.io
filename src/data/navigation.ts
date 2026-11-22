export interface NavLink {
	href: string;
	label: string;
}

export const navLinks: NavLink[] = [
	{ href: '/#work', label: 'Work' },
	{ href: '/#about', label: 'About' },
	{ href: '/#stack', label: 'Stack' },
	{ href: '/#contact', label: 'Contact' },
	{ href: '/blog', label: 'Blog' },
];
