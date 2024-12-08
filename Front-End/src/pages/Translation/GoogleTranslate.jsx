import React, { useEffect, useRef } from 'react';

/**
 * GoogleTranslate Component
 * Embeds Google Translate into the application to enable language translation.
 *
 * This component dynamically loads the Google Translate script and initializes
 * the translation widget on the page. It ensures the widget is initialized only once
 * per session using a `useRef` hook.
 *
 * @component
 * @returns {JSX.Element} A container for the Google Translate widget.
 */
export default function GoogleTranslate() {
  /**
   * Ref to track if the Google Translate widget has been initialized.
   * @type {React.MutableRefObject<boolean>}
   */
  const isInitialized = useRef(false);

  /**
   * Initializes the Google Translate widget.
   * Ensures the widget is created only once by checking the `isInitialized` ref.
   */
  const googleTranslateElementInit = () => {
    if (isInitialized.current) return;

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: true,
      },
      "google-translate" // ID of the container element
    );
    isInitialized.current = true;
  };

  useEffect(() => {
    // Dynamically create and append the Google Translate script to the DOM
    const script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.id = 'google-translate-script';
    document.body.appendChild(script);

    // Attach the initialization function to the global window object
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Cleanup: Remove the script and clean up the global function on unmount
    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  /**
   * Container for the Google Translate widget.
   * The Google Translate script will target this container to render the widget.
   */
  return <div id="google-translate"></div>;
}
