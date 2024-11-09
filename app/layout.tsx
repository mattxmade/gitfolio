import { projectMetadata } from "./data/metadata";
import { headerContent, footerContent } from "./data/content";

import Nav from "./components/core/Nav";
import Logo from "./components/icons/Logo";
import "@/app/index.scss";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata = projectMetadata;

export default function RootLayout(props: RootLayoutProps) {
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
              <header>
                <p>{headerContent.subheading}</p>
                <Nav />
              </header>
              {props.children}
              <footer>
                {footerContent.madeWith ? (
                  <div className="made-with-container">
                    <p>{"["} Made with</p>
                    {footerContent.madeWith.map((item) => (
                      <Logo key={item.name + " logo"} logo={item.name} />
                    ))}
                    <p>{"]"}</p>
                  </div>
                ) : null}

                {footerContent.poweredBy ? (
                  <div className="made-with-container">
                    <p>Powered by</p>
                    {footerContent.poweredBy.map((item, i) => (
                      <Logo key={i} logo={item.name} />
                    ))}
                  </div>
                ) : null}
              </footer>
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
