import Link from '@/solid/Link.tsx'
import { NAVIGATION } from '@/consts'
import { For } from 'solid-js'
import { useTranslations } from '@/i18n'

const t = useTranslations()

export default function MobileNav(props: {
  navigationLinks: typeof NAVIGATION
}) {
  let buttonRef!: HTMLButtonElement
  let menuRef!: HTMLDivElement

  const { navigationLinks } = props

  const isCurrentPath = (path: string) => {
    let { pathname } = location
    // Remove the last `/` if not the root path.
    if (pathname.length > 1 && pathname.slice(-1) === '/') {
      pathname = pathname.slice(0, -1)
    }
    return pathname === path
  }

  const toggleMenu = () => {
    const isNavHidden = document.body.style.overflow === ''
    menuRef.classList.toggle('translate-x-full', !isNavHidden)
    menuRef.classList.toggle('translate-x-0', isNavHidden)
    document.body.style.overflow = isNavHidden ? 'hidden' : ''
  }

  return (
    <>
      <button
        class="sm:hidden size-8 themed-ui-link"
        aria-label={t('components.mobileNav.toggleMenu')}
        ref={buttonRef}
        onClick={toggleMenu}
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
        </svg>
      </button>
      <div
        ref={menuRef}
        class="translate-x-full fixed left-0 top-0 h-full w-full opacity-95 bg-primary-50 dark:bg-gray-950 transition motion-reduce:transition-none z-20"
      >
        <div class="flex justify-end">
          <button
            class="mr-4 mt-4 size-8 themed-ui-link"
            aria-label={t('components.mobileNav.toggleMenu')}
            onClick={toggleMenu}
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        </div>
        <nav class="fixed mt-8">
          <ul>
            <For each={navigationLinks}>
              {({ href, title }) =>
                isCurrentPath(href) ? (
                  <li class="py-4">
                    <span class="px-12 py-4 text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100">
                      {t(title)}
                    </span>
                  </li>
                ) : (
                  <li class="py-4">
                    <Link
                      href={href}
                      class="px-12 py-4 text-2xl font-bold tracking-widest themed-ui-link"
                    >
                      {t(title)}
                    </Link>
                  </li>
                )
              }
            </For>
          </ul>
        </nav>
      </div>
    </>
  )
}
