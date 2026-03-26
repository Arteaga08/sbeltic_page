import Navbar from '@/components/public/Navbar/Navbar'
import Footer from '@/components/public/Footer'

export default function PublicLayout({ children }) {
  return (
    <div style={{ background: 'var(--pub-bg)', color: 'var(--pub-text)' }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
