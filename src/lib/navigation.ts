import { intl } from '@/config/intl';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales: intl.locales });