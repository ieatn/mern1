import Search from "./Search"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <main>
            <div><Search /></div>
            <div>{children}</div>
        </main>

    )
  }
  