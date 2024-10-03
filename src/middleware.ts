import createMiddleware from 'next-intl/middleware';
import { intl } from '@/config/intl';

export default createMiddleware({
    locales: intl.locales,
    defaultLocale: intl.defaultLocale,
    localeDetection: true
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};