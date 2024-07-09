import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404: This page could not be found.',
}
export default function NotFound() {
  return (
    <>
      <div>
        404: This page could not be found.
      </div>
    </>
  );
}
