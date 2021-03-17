import Header from './Header'

export const Page: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
