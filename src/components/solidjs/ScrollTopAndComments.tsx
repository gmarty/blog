import { onMount } from 'solid-js'
import { useTranslations } from '@/i18n'

const t = useTranslations()

export default function ScrollTopAndComments() {
  let divRef!: HTMLDivElement

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMount(() => {
    const handleScroll = () => {
      divRef.classList.toggle('md:hidden', window.scrollY < 50)
      divRef.classList.toggle('md:flex', window.scrollY >= 50)
    }
    window.addEventListener('scroll', handleScroll)
  })

  return (
    <div
      class="fixed bottom-8 right-8 hidden flex-col gap-3 md:hidden z-10"
      ref={divRef}
    >
      {/*<button*/}
      {/*  aria-label="Scroll To Comment"*/}
      {/*  class="rounded-full bg-gray-200 p-2 text-gray-500 dark:text-gray-300 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"*/}
      {/*>*/}
      {/*  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">*/}
      {/*    <path*/}
      {/*      fill-rule="evenodd"*/}
      {/*      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"*/}
      {/*      clip-rule="evenodd"*/}
      {/*    />*/}
      {/*  </svg>*/}
      {/*</button>*/}
      <button
        aria-label={t('components.scrollTopAndComments.scrollTop')}
        onClick={handleScrollToTop}
        class="rounded-full bg-gray-200 p-2 text-gray-500 dark:text-gray-300 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}
