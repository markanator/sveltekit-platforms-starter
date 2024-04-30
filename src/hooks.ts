import { env } from '$env/dynamic/public';
import type { Reroute } from '@sveltejs/kit';

const marketRoutes = new Set([env.PUBLIC_ROOT_DOMAIN, 'localhost:8888']);
const adminRoutes = new Set([`admin.${env.PUBLIC_ROOT_DOMAIN}`, 'admin.localhost:8888']);
const appRoutes = new Set([`app.${env.PUBLIC_ROOT_DOMAIN}`, 'app.localhost:8888']);

export const reroute: Reroute = ({ url }) => {
	const domain = url.host.replace('www.', '').toLowerCase();
	const hostname = domain.replace('.localhost:8888', `.${env.PUBLIC_ROOT_DOMAIN}`);
	const fullPath = `${url.pathname}${url.searchParams.toString().length > 0 ? `?${url.searchParams.toString()}` : ''}`;

	// rewrites for `/app/*` pages
	if (appRoutes.has(domain)) {
		return `/app${fullPath === '/' ? '' : fullPath}`;
	}
	// rewrite root application to `/admin/*` folder
	if (adminRoutes.has(domain)) {
		return `/admin${fullPath === '/' ? '' : fullPath}`;
	}
	// rewrite root application to `/home` folder
	if (marketRoutes.has(domain)) {
		return `/home${fullPath === '/' ? '' : fullPath}`;
	}
	// rewrite everything else to `/[domain]/*` dynamic routes
	return `/${hostname}${fullPath === '/' ? '' : fullPath}`;
};
