import "./index.scss";

export const metadata = {
  title: "Portfolio",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          key="icons"
          rel="stylesheet"
          type="text/css"
        />
        <div id="root">
          <div className="wrapper">
            <div className="overlay">
              <header>Header</header>
              {children}
              <footer>Footer</footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

/**
 * =============================================================================
 * -----------------------------------------------------------------------------
 * TODO: Grab required icons as SVGs and remove link tag
 * -----------------------------------------------------------------------------
 *
 * Issue: Link tags for CDNs -- next Head is depreciated
 * Workaround : Add link to body [ stylesheet is "body ok"]
 *
 * SOURCE [ "body ok" ]
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
 *
 *
 * Others with similar isssue:
 * https://github.com/vercel/next.js/issues/46785

 * =============================================================================
 */
