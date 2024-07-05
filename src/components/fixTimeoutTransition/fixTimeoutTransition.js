import Router from 'next/router'

export const fixTimeoutTransition = () => {
    const routeChange = () => {
        const tempFix = () => {
          const allStyleElems = document.querySelectorAll('style[media="x"]');
          allStyleElems.forEach((elem) => {
            elem.removeAttribute("media");
          });
        };
        tempFix();
      };
  
     Router.events.on("routeChangeComplete", routeChange );
     Router.events.on("routeChangeStart", routeChange );
};