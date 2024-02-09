import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Universe',
  description: 'Universe Clicker'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>

        {/* For easier to read object formatting during development */}
        {/* <script dangerouslySetInnerHTML={{__html: `
          function getLevelIndentation(level){
              return level * 20 + "px";
          }
          window.devtoolsFormatters = [{
            header: function(obj, config){
                var level = config !== undefined ? config.level : 0;

                var elements = Object.keys(obj).map(function(key){
                    var child;
                    var childObj = obj[key];
                    if (typeof childObj === "object"){
                        child = ["object", {
                          object: childObj,
                          config: {
                            key: key,
                            level: level + 1
                          }
                        }];
                    } else {
                        child = key + ": " + childObj.toString();

                    }
                    return ["div", {style: "margin-left: " + getLevelIndentation(level)}, child];
                })

                return ["div", {}].concat(elements);
            },
            hasBody: function(){
                return true;
            }
          }]
        `}}>

        </script> */}
      </body>
    </html>
  )
}
